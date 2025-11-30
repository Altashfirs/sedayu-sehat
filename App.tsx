import React, { useState, useEffect, useMemo } from 'react';
import { HEALTH_FACILITIES } from './constants';
import { Facility, Coordinate, ViewMode } from './types';
import { calculateDistance } from './utils/geoUtils';
import MapComponent from './components/MapComponent';
import AnalysisPanel from './components/AnalysisPanel';
import { MapPin, Navigation2, Search, Filter, Menu, Map as MapIcon, LocateFixed, Car, HeartPulse } from 'lucide-react';

const App: React.FC = () => {
    const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
    const [facilities, setFacilities] = useState<Facility[]>(HEALTH_FACILITIES);
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.MAP);
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [locationStatus, setLocationStatus] = useState<string>('Menunggu izin lokasi...');

    // 1. Mandatory Feature: Get GPS Location
    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationStatus('Geolocation tidak didukung');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                setLocationStatus('Lokasi ditemukan');
            },
            (error) => {
                console.error("Geo error:", error);
                setLocationStatus('Akses lokasi ditolak');
            }
        );
    }, []);

    // 2. Spatial Data Processing: Calculate Distances
    useEffect(() => {
        if (userLocation) {
            const updated = HEALTH_FACILITIES.map(f => ({
                ...f,
                distance: calculateDistance(userLocation, f.coordinates)
            })).sort((a, b) => (a.distance || 0) - (b.distance || 0)); // Sort by nearest
            setFacilities(updated);
        }
    }, [userLocation]);

    // 3. Search & Filter
    const filteredFacilities = useMemo(() => {
        return facilities.filter(f => {
            const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'All' || f.category === filterCategory;
            return matchesSearch && matchesCategory;
        });
    }, [facilities, searchTerm, filterCategory]);

    // Extract categories unique values
    const categories = ['All', ...Array.from(new Set(HEALTH_FACILITIES.map(f => f.category))).sort()];

    const handleSelectFacility = (facility: Facility) => {
        setSelectedFacility(facility);
        if (window.innerWidth < 768) {
            setViewMode(ViewMode.LIST); // Switch to detail view on mobile
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-slate-50 font-sans text-slate-900">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-teal-100 p-4 z-20 flex justify-between items-center h-16 shrink-0">
                <div className="flex items-center gap-2 text-teal-700">
                    <div className="bg-teal-600 p-1.5 rounded-lg shadow-sm">
                        <HeartPulse className="text-white h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight">Sedayu Sehat DIY</h1>
                        <p className="text-[10px] text-teal-600 font-medium uppercase tracking-wide">Navigasi Layanan Kesehatan Jogja</p>
                    </div>
                </div>
                
                {/* Mobile Toggle */}
                <button 
                    className="md:hidden bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition"
                    onClick={() => setViewMode(viewMode === ViewMode.MAP ? ViewMode.LIST : ViewMode.MAP)}
                >
                    {viewMode === ViewMode.MAP ? <Menu className="h-5 w-5 text-slate-700" /> : <MapIcon className="h-5 w-5 text-slate-700" />}
                </button>
            </header>

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden relative">
                
                {/* Sidebar / List View */}
                <aside className={`
                    absolute md:relative w-full md:w-[420px] h-full bg-white z-10 flex flex-col border-r border-slate-200 shadow-xl md:shadow-none transition-transform duration-300
                    ${viewMode === ViewMode.LIST ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    
                    {/* Search & Filter Section */}
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50 space-y-3">
                        {/* Status Bar */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 w-fit shadow-sm">
                            <LocateFixed className={`h-3 w-3 ${userLocation ? 'text-teal-500' : 'text-orange-500'}`} />
                            <span>{locationStatus}</span>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Cari RS, Klinik, Dokter..."
                                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-slate-400" />
                            <select 
                                className="flex-1 text-sm border border-slate-200 rounded-lg py-2 px-2 bg-white focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                {categories.map(d => <option key={d} value={d}>{d === 'All' ? 'Semua Kategori' : d}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Facility List */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-slate-50/30">
                        {filteredFacilities.length === 0 ? (
                            <div className="text-center py-10 text-slate-400 text-sm flex flex-col items-center">
                                <HeartPulse className="h-10 w-10 text-slate-200 mb-2" />
                                Tidak ada fasilitas kesehatan ditemukan.
                            </div>
                        ) : (
                            filteredFacilities.map(facility => (
                                <div 
                                    key={facility.id}
                                    onClick={() => handleSelectFacility(facility)}
                                    className={`
                                        p-4 rounded-xl cursor-pointer transition-all duration-200 border relative overflow-hidden
                                        ${selectedFacility?.id === facility.id 
                                            ? 'bg-teal-50 border-teal-200 shadow-md ring-1 ring-teal-200' 
                                            : 'bg-white border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm'}
                                    `}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="pr-2">
                                            <h3 className="font-bold text-slate-800 text-sm">{facility.name}</h3>
                                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                                {facility.category}
                                            </span>
                                        </div>
                                        {facility.distance !== undefined && (
                                            <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap">
                                                {facility.distance} km
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-start gap-1.5 mt-2">
                                        <MapPin className="h-3 w-3 text-slate-400 mt-0.5 shrink-0" />
                                        <p className="text-xs text-slate-500 leading-snug line-clamp-2">{facility.address}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Detail Panel (Available when something is selected) */}
                    {selectedFacility && (
                        <div className="border-t border-slate-200 bg-white p-4 max-h-[60%] overflow-y-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="font-bold text-lg text-slate-900 leading-tight w-3/4">{selectedFacility.name}</h2>
                                <button onClick={() => setSelectedFacility(null)} className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-full">Tutup</button>
                            </div>
                            
                            {/* Route Info */}
                            {userLocation && (
                                <div className="flex items-center justify-between bg-teal-600 text-white p-3 rounded-lg shadow-sm mb-4">
                                    <div className="flex items-center gap-2">
                                        <Navigation2 className="h-5 w-5" />
                                        <span className="text-sm font-medium">Jarak: {selectedFacility.distance} km</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs bg-teal-700 px-3 py-1.5 rounded-md font-semibold">
                                        <Car className="h-3.5 w-3.5" />
                                        <span>Est. {Math.ceil((selectedFacility.distance || 0) * 3)} mnt</span>
                                    </div>
                                </div>
                            )}

                            {/* 4. AI Analysis Integration */}
                            <AnalysisPanel facility={selectedFacility} />
                        </div>
                    )}
                </aside>

                {/* Map View */}
                <main className="flex-1 relative bg-slate-100 h-full">
                    <MapComponent 
                        facilities={filteredFacilities}
                        userLocation={userLocation}
                        selectedFacility={selectedFacility}
                        onSelectFacility={handleSelectFacility}
                    />
                </main>
            </div>
        </div>
    );
};

export default App;