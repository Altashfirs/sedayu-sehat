import { Facility } from './types';

// Helper to determine category based on name
const getCategory = (name: string): string => {
    const n = name.toLowerCase();
    if (n.includes('rs ') || n.includes('rumah sakit')) return 'Rumah Sakit';
    if (n.includes('puskesmas')) return 'Puskesmas';
    if (n.includes('pustu')) return 'Puskesmas Pembantu';
    if (n.includes('klinik') || n.includes('clinic')) return 'Klinik';
    if (n.includes('praktik')) return 'Praktik Dokter';
    if (n.includes('laboratorium') || n.includes('lab ')) return 'Laboratorium';
    if (n.includes('optik')) return 'Optik';
    if (n.includes('apotek')) return 'Apotek';
    return 'Lainnya';
};

// Data derived from the provided CSV file (Sampled for performance, comprehensive coverage)
export const HEALTH_FACILITIES: Facility[] = [
    { id: 1, no: 1, name: "RS Islam Hidayatullah Yogyakarta", address: "Jl Veteran No.184 Pandeyan Umbulharjo Yogyakarta", coordinates: { lat: -7.8154, lng: 110.388 } },
    { id: 2, no: 2, name: "RS Tk. III 04.06.03 Dr. Soetarto", address: "Jl. Juadi No.19, Kotabaru, Kec. Gondokusuman", coordinates: { lat: -7.7857, lng: 110.377 } },
    { id: 3, no: 3, name: "RS PKU Muhammadiyah Yogyakarta", address: "Jl K.H. Ahmad Dahlan No. 20 Ngupasan Gondomanan Yogyakarta", coordinates: { lat: -7.80088, lng: 110.36231 } },
    { id: 4, no: 4, name: "RS Umum Panti Rapih", address: "Jl. Cik Di Tiro 30 Yogyakarta", coordinates: { lat: -7.7773, lng: 110.3767 } },
    { id: 5, no: 5, name: "RS Bethesda Yogyakarta", address: "Jl Jend. Sudirman No. 70 Kotabaru Yogyakarta", coordinates: { lat: -7.7836, lng: 110.377 } },
    { id: 7, no: 7, name: "RS Mata Dr. Yap", address: "Jl Cik Di Tiro No. 5 Yogyakarta", coordinates: { lat: -7.78, lng: 110.375 } },
    { id: 9, no: 9, name: "RS Umum Daerah Kota Yogyakarta", address: "Jl Wirosaban No. 1 Yogyakarta", coordinates: { lat: -7.82585, lng: 110.378 } },
    { id: 17, no: 17, name: "RS Siloam Yogyakarta", address: "Jl. Laksda Adisucipto Nomor 32 34 Yogyakarta 55221", coordinates: { lat: -7.78329, lng: 110.39069 } },
    { id: 19, no: 19, name: "Puskesmas Tegalrejo", address: "Jl. Magelang Karangwaru, Kec. Tegalrejo", coordinates: { lat: -7.772547077, lng: 110.3589277 } },
    { id: 20, no: 20, name: "Puskesmas Jetis", address: "Jl. Diponegoro 91, Kec. Jetis", coordinates: { lat: -7.783216677, lng: 110.3599674 } },
    { id: 25, no: 25, name: "Puskesmas Gedongtengen", address: "Jl. Pringgokusuman 30, Kec. Gedong Tengen", coordinates: { lat: -7.791211777, lng: 110.3551213 } },
    { id: 29, no: 29, name: "Puskesmas Kraton", address: "Jalan langenastran kidul 3 Panembahan Kraton", coordinates: { lat: -7.811994578, lng: 110.3615724 } },
    { id: 33, no: 33, name: "Puskesmas Umbulharjo I", address: "Jl. Veteran 43, Kec. Umbulharjo", coordinates: { lat: -7.806299477, lng: 110.3920851 } },
    { id: 35, no: 35, name: "Puskesmas Kotagede I", address: "Jl. Kemasan 12, Kec. Kota Gede", coordinates: { lat: -7.822080131, lng: 110.400625 } },
    { id: 46, no: 46, name: "Klinik Kecantikan Pratama Naavagreen Plus", address: "Jl. Abu Bakar Ali No. 18 Kotabaru Gondokusuman Yogyakarta", coordinates: { lat: -7.7882101, lng: 110.3690645 } },
    { id: 48, no: 48, name: "Klinik Utama Prodia Health Care", address: "Jl. Bintaran Kulon No. 28 Wirogunan Mergangsan Yogyakarta", coordinates: { lat: -7.8028104, lng: 110.3698925 } },
    { id: 54, no: 54, name: "Klinik Natasha Skin Clinic Center", address: "Jl. Brigjend Katamso No. 300 Keparakan Mergangsan Yogyakarta", coordinates: { lat: -7.8139828, lng: 110.3660204 } },
    { id: 61, no: 61, name: "Klinik Utama Peri Gigi", address: "Jl. Prof. Yohanes Kav. E dan F Terban Gondokusuman Yogyakarta", coordinates: { lat: -7.7815037, lng: 110.3766492 } },
    { id: 78, no: 78, name: "Klinik Gigi Utama FDC Dental Clinic", address: "Jl. P. Diponegoro No. 63 Gowongan Jetis Yogyakarta", coordinates: { lat: -7.7830004, lng: 110.361511 } },
    { id: 87, no: 87, name: "Klinik Pratama Biddokkes Polda DIY", address: "Jl. Sekardwijan No. 6 Balapan, Klitren, Gondokusuman Yogyakarta.", coordinates: { lat: -7.7856022, lng: 110.3820661 } },
    { id: 105, no: 105, name: "Klinik Pratama Rumah Sehat UGM", address: "Jl. Prof. dr. Sardjito No. 25 Terban Gondokusuman Yogyakarta", coordinates: { lat: -7.7756957, lng: 110.369829 } },
    { id: 140, no: 140, name: "Klinik Pratama Polresta Yogyakarta", address: "Jl. Aipda KS. Tubun No. 20, Ngampilan", coordinates: { lat: -7.797399777, lng: 110.3607397 } },
    { id: 162, no: 162, name: "Klinik Utama ZAP Yogyakarta Suroto", address: "Jl. Suroto No. 16 RT 001, Kotabaru, Gondokusuman", coordinates: { lat: -7.7837314, lng: 110.3749104 } },
    { id: 177, no: 177, name: "Lab Kesehatan Dinas Kesehatan D I Yogyakarta", address: "Ngadinegaran MJ III/62 Mantrijeron", coordinates: { lat: -7.816161184, lng: 110.3643835 } },
    { id: 180, no: 180, name: "Laboratorium Medis Umum Utama CITO", address: "Jl. Atmosukarto No. 4 Kotabaru Gondokusuman Yogyakarta", coordinates: { lat: -7.788530044, lng: 110.3752513 } },
    { id: 184, no: 184, name: "Praktik Perseorangan dr. Adam Izza Fahrian", address: "Jl. Ibu Ruswo No 51 Gondomanan Kota Yogyakarta", coordinates: { lat: -7.803427868, lng: 110.3682541 } },
    { id: 198, no: 198, name: "Praktik Perseorangan dr. Ary Kamal Firdaous", address: "Apotek K 24 Gondomanan, Jl. Brigjen Katamso No. 117", coordinates: { lat: -7.807836381, lng: 110.3693649 } },
    { id: 212, no: 212, name: "Praktik dr. Elena Mahotsaha Vediyen", address: "Jl. Prof. Herman Yohanes No. 1034 Terban", coordinates: { lat: -7.77869215, lng: 110.3796066 } },
    { id: 282, no: 282, name: "Praktik dr. Yuliana Guwanto", address: "Jl. Bangirejo Taman No.24 Karangwaru Tegalrejo Yogyakarta", coordinates: { lat: -7.777962101, lng: 110.3635388 } },
    { id: 284, no: 284, name: "Praktik drg. Abdul Kadir", address: "Jl. Dongkelan No. 100 Minggiran Suryodiningratan", coordinates: { lat: -7.825873045, lng: 110.3572781 } },
    { id: 288, no: 288, name: "Praktik drg. Antonia Damararum", address: "Jl. KHA. Dahlan no 99 Yogyakarta", coordinates: { lat: -7.801164179, lng: 110.3584305 } },
    { id: 374, no: 374, name: "Pranoto Optic Jl. C Simanjuntak", address: "Jl. C Simanjuntak No. 6 Yogyakarta", coordinates: { lat: -7.779878515, lng: 110.3730193 } },
    { id: 378, no: 378, name: "Optik Melawai Urip Sumoharjo", address: "Jl. Urip Sumoharjo No. 29 (75) Yogyakarta", coordinates: { lat: -7.782768202, lng: 110.3833927 } },
    { id: 382, no: 382, name: "Optik RS Mata dr. Yap", address: "Jl. Cik Dik Tiro No. 5 Yogyakarta", coordinates: { lat: -7.780607081, lng: 110.3749676 } },
    { id: 391, no: 391, name: "Optik Seis Plaza Malioboro", address: "Malioboro No. 52-58 Suryatmajan", coordinates: { lat: -7.792990187, lng: 110.3665629 } },
    { id: 408, no: 408, name: "OPTIK TELKOMEDIKA", address: "Jl. Kenari No.3 Semaki Yogyakarta", coordinates: { lat: -7.797448541, lng: 110.3853109 } },
    { id: 45, no: 45, name: "Klinik Max + Dental Giwangan", address: "Jl. Imogiri Timur No. 113 D Giwangan", coordinates: { lat: -7.8274437, lng: 110.387573 } },
    { id: 50, no: 50, name: "LBC Jl. Bhayangkara", address: "Jl. Bhayangkara No. 42 Ngupasan", coordinates: { lat: -7.796403603, lng: 110.3617004 } },
    { id: 53, no: 53, name: "Klinik Pratama Seger Waras BNNP DIY", address: "Jl. Brigjen Katamso Komplek Perkantoran Keparakan", coordinates: { lat: -7.8093341, lng: 110.3673457 } },
    { id: 64, no: 64, name: "Larissa Aesthetic Center Galeria", address: "Galeria Mall Lantai 1, Jl. Jend. Sudirman", coordinates: { lat: -7.7822069, lng: 110.3763466 } },
    { id: 96, no: 96, name: "Klinik Pratama Pertamina", address: "Jl. Margo Utomo No. 20 Gowongan Jetis", coordinates: { lat: -7.7882912, lng: 110.3663579 } },
    { id: 104, no: 104, name: "Klinik Utama Prodia Mangkubumi", address: "Jl. P. Mangkubumi No. 50 Gowongan Jetis", coordinates: { lat: -7.7849732, lng: 110.3644656 } },
    { id: 141, no: 141, name: "Klinik Utama Hi-Lab", address: "Jl. Magelang no. 156-160, Karangwaru", coordinates: { lat: -7.7742228, lng: 110.3587701 } },
    { id: 386, no: 386, name: "Argus Optik", address: "Jl. Jendral Sudirman No 4 Yogyakarta", coordinates: { lat: -7.782846332, lng: 110.3674189 } },
    { id: 405, no: 405, name: "CENTRAL OPTIC", address: "Jl. Kranggan no. 41 Cokrodiningratan Yogyakarta", coordinates: { lat: -7.781427212, lng: 110.3639236 } }
].map(f => ({
    ...f,
    category: getCategory(f.name)
}));

export const YOGYAKARTA_CENTER = { lat: -7.8014, lng: 110.3647 };
