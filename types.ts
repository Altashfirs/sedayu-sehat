export interface Coordinate {
    lat: number;
    lng: number;
}

export interface Facility {
    id: number;
    no: number;
    name: string;
    address: string;
    category: string; // e.g., Rumah Sakit, Puskesmas, Klinik
    coordinates: Coordinate;
    distance?: number; // Calculated distance in km
}

export interface AnalysisResult {
    summary: string;
    activities: string[]; // Re-purposed as "Layanan Unggulan"
    tips: string;
    sources?: { title: string; uri: string }[];
    loading: boolean;
}

export enum ViewMode {
    MAP = 'MAP',
    LIST = 'LIST'
}