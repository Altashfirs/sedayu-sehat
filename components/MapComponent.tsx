import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Facility, Coordinate } from '../types';
import L from 'leaflet';

// Use online URLs for icons to avoid bundler import issues in browser-only environments
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const iconShadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: iconShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icon for user location
const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const selectedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface MapProps {
    facilities: Facility[];
    userLocation: Coordinate | null;
    selectedFacility: Facility | null;
    onSelectFacility: (f: Facility) => void;
}

// Helper to center map on selection
const MapController: React.FC<{ center: Coordinate, zoom: number }> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([center.lat, center.lng], zoom, { animate: true });
    }, [center, zoom, map]);
    return null;
};

const MapComponent: React.FC<MapProps> = ({ facilities, userLocation, selectedFacility, onSelectFacility }) => {
    const [routePath, setRoutePath] = useState<[number, number][]>([]);
    
    // Determine map center
    const center = selectedFacility 
        ? selectedFacility.coordinates 
        : userLocation || { lat: -7.8014, lng: 110.3647 };
        
    const zoom = selectedFacility ? 15 : 13;

    // Fetch Road Route using OSRM
    useEffect(() => {
        if (!userLocation || !selectedFacility) {
            setRoutePath([]);
            return;
        }

        const fetchRoute = async () => {
            try {
                // OSRM Public API (Project OSRM Demo Server)
                // Format: /route/v1/driving/{lon},{lat};{lon},{lat}
                const start = `${userLocation.lng},${userLocation.lat}`;
                const end = `${selectedFacility.coordinates.lng},${selectedFacility.coordinates.lat}`;
                const url = `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
                    const coordinates = data.routes[0].geometry.coordinates;
                    // OSRM returns [lon, lat], Leaflet needs [lat, lon]
                    const path = coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
                    setRoutePath(path);
                } else {
                    // Fallback to straight line if API says no route
                    setRoutePath([
                        [userLocation.lat, userLocation.lng],
                        [selectedFacility.coordinates.lat, selectedFacility.coordinates.lng]
                    ]);
                }
            } catch (error) {
                console.error("Error fetching route:", error);
                // Fallback to straight line on error
                setRoutePath([
                    [userLocation.lat, userLocation.lng],
                    [selectedFacility.coordinates.lat, selectedFacility.coordinates.lng]
                ]);
            }
        };

        fetchRoute();
    }, [userLocation, selectedFacility]);

    return (
        <MapContainer 
            center={[center.lat, center.lng]} 
            zoom={zoom} 
            scrollWheelZoom={true} 
            className="h-full w-full z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapController center={center} zoom={zoom} />

            {/* User Location Marker */}
            {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                    <Popup>
                        <div className="font-bold text-center">You are here</div>
                    </Popup>
                </Marker>
            )}

            {/* Facility Markers */}
            {facilities.map((facility) => (
                <Marker 
                    key={facility.id} 
                    position={[facility.coordinates.lat, facility.coordinates.lng]}
                    icon={selectedFacility?.id === facility.id ? selectedIcon : DefaultIcon}
                    eventHandlers={{
                        click: () => onSelectFacility(facility),
                    }}
                >
                    <Popup>
                        <div className="text-sm">
                            <h3 className="font-bold">{facility.name}</h3>
                            <p className="text-xs text-gray-600 mb-1">{facility.category}</p>
                            <button 
                                onClick={() => onSelectFacility(facility)}
                                className="mt-1 bg-blue-600 text-white text-xs px-2 py-1 rounded w-full hover:bg-blue-700"
                            >
                                View Details
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* Road Routing Line (Replaces simple straight line) */}
            {routePath.length > 0 && (
                <Polyline 
                    positions={routePath}
                    pathOptions={{ color: 'blue', weight: 5, opacity: 0.7, lineCap: 'round', lineJoin: 'round' }}
                >
                    <Popup>Recommended Driving Route</Popup>
                </Polyline>
            )}
        </MapContainer>
    );
};

export default MapComponent;