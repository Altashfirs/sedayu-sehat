import { GoogleGenAI } from "@google/genai";
import { Facility, AnalysisResult } from '../types';

const apiKey = process.env.VITE_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeFacility = async (facility: Facility): Promise<Omit<AnalysisResult, 'loading'>> => {
    if (!apiKey) {
        return {
            summary: "API Key hilang. Mohon konfigurasi environment variable.",
            activities: ["Data tidak tersedia"],
            tips: "Aktifkan Gemini API untuk wawasan pintar.",
            sources: []
        };
    }

    try {
        const prompt = `
            Bertindaklah sebagai asisten kesehatan lokal Yogyakarta yang pintar.
            Lakukan analisis mendalam tentang fasilitas kesehatan ini menggunakan Google Search:
            
            Nama: ${facility.name}
            Alamat: ${facility.address}
            Kategori: ${facility.category}
            
            Cari informasi terbaru di internet mengenai layanan unggulan, jam operasional, ulasan pasien, dan ketersediaan layanan BPJS jika ada.
            
            Berikan output HANYA dalam format JSON valid (tanpa markdown code block) dengan struktur berikut:
            {
                "summary": "Penjelasan detail mengenai fasilitas kesehatan ini, spesialisasi medis, dan kualitas pelayanan (min 2 kalimat). Gunakan Bahasa Indonesia yang sopan dan informatif.",
                "activities": ["Layanan 1", "Layanan 2", "Layanan 3"],
                "tips": "Satu tips penting bagi pasien (misal: pendaftaran online, jam buka poli, atau ketersediaan parkir)."
            }
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                // Activate Google Search Grounding
                tools: [{ googleSearch: {} }],
                // Note: responseMimeType: 'application/json' cannot be used with tools
            }
        });

        const text = response.text || "{}";
        
        // Extract Sources from Grounding Metadata
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
            ?.map((chunk: any) => {
                if (chunk.web) {
                    return { title: chunk.web.title, uri: chunk.web.uri };
                }
                return null;
            })
            .filter((s: any) => s !== null) as { title: string; uri: string }[] || [];

        // Manual JSON cleanup (remove markdown code blocks if present)
        const jsonString = text.replace(/```json\n|\n```/g, "").trim();
        
        // Attempt to find JSON object if mixed with text
        const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
        const cleanJson = jsonMatch ? jsonMatch[0] : jsonString;

        const parsedData = JSON.parse(cleanJson);
        
        return {
            ...parsedData,
            sources: sources
        };

    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return {
            summary: "Maaf, analisis tidak dapat dilakukan saat ini. Pastikan koneksi internet lancar.",
            activities: ["Layanan Umum Medis"],
            tips: "Bawa KTP dan kartu asuransi/BPJS saat berkunjung.",
            sources: []
        };
    }
};
