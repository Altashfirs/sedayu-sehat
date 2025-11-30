import React, { useEffect, useState } from 'react';
import { Facility, AnalysisResult } from '../types';
import { analyzeFacility } from '../services/geminiService';
import { Sparkles, Loader2, Stethoscope, Lightbulb, Info, Link as LinkIcon, ExternalLink } from 'lucide-react';

interface AnalysisPanelProps {
    facility: Facility;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ facility }) => {
    const [data, setData] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setLoading(true);
            setData(null); // Reset previous data
            try {
                const result = await analyzeFacility(facility);
                if (isMounted) {
                    setData({ ...result, loading: false });
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [facility]);

    if (loading) {
        return (
            <div className="p-6 bg-teal-50 border border-teal-200 rounded-lg flex flex-col items-center justify-center min-h-[200px] animate-pulse">
                <Loader2 className="h-8 w-8 text-teal-600 animate-spin mb-3" />
                <p className="text-teal-600 text-sm font-medium">Dr. AI sedang mencari info medis...</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-4">
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-3 border-b border-teal-100 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-teal-600" />
                <h3 className="text-sm font-bold text-teal-900">Analisis Layanan Kesehatan</h3>
            </div>
            
            <div className="p-4 space-y-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Info className="h-4 w-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rangkuman Medis</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed text-justify">{data.summary}</p>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="h-4 w-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Layanan Unggulan</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data.activities.map((act, idx) => (
                            <span key={idx} className="bg-teal-100 text-teal-800 text-xs px-2.5 py-1 rounded-full font-medium border border-teal-200">
                                {act}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-orange-600 mt-0.5" />
                        <div>
                            <span className="text-xs font-bold text-orange-800 block mb-1">Tips Pasien</span>
                            <p className="text-xs text-orange-900 leading-relaxed">{data.tips}</p>
                        </div>
                    </div>
                </div>

                {/* Sources Section for Grounding */}
                {data.sources && data.sources.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                            <LinkIcon className="h-3 w-3 text-slate-400" />
                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Sumber Referensi</span>
                        </div>
                        <ul className="space-y-1">
                            {data.sources.slice(0, 3).map((source, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={source.uri} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[10px] text-teal-600 hover:text-teal-800 flex items-center gap-1 hover:underline truncate"
                                    >
                                        <ExternalLink className="h-3 w-3" />
                                        {source.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalysisPanel;