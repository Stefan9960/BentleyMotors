import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom teardrop/pin shape marker with "B"
const createPinMarkerIcon = () => {
    const pinColor = '#394D45'; // Bentley green
    
    return L.divIcon({
        className: 'bentley-pin-marker',
        html: `<div style="position: relative; width: 32px; height: 42px;">
            <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.16 24.84 0 16 0Z" fill="${pinColor}" stroke="white" stroke-width="1.5"/>
                <circle cx="16" cy="16" r="5" fill="white"/>
                <text x="16" y="20" text-anchor="middle" fill="${pinColor}" font-size="10" font-weight="bold" font-family="Montserrat, sans-serif">B</text>
            </svg>
        </div>`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -38],
    });
};

// Only the 4 permanent Bentley locations from the original site
const bentleyLocations = [
    { 
        id: 1, 
        name: "Bentley Factory & CW1 House", 
        city: "Crewe", 
        country: "United Kingdom", 
        lat: 53.1063, 
        lng: -2.4815, 
        description: "The Home of Bentley. Factory tours available year-round. See where Bentley cars are handcrafted by skilled artisans." 
    },
    { 
        id: 2, 
        name: "Bentley London", 
        city: "London", 
        country: "United Kingdom", 
        lat: 51.5074, 
        lng: -0.1278, 
        description: "Bentley's flagship showroom in the heart of London. View and configure your dream Bentley." 
    },
    { 
        id: 3, 
        name: "FAT Ice Race - Zell am See", 
        city: "Zell am See", 
        country: "Austria", 
        lat: 47.29, 
        lng: 12.79, 
        description: "Home of the legendary FAT Ice Race. A winter motorsport event held annually on the frozen lake." 
    },
    { 
        id: 4, 
        name: "Monterey Car Week", 
        city: "Monterey", 
        country: "California, USA", 
        lat: 36.5973, 
        lng: -121.8978, 
        description: "Annual celebration of automotive excellence. Home to Pebble Beach Concours d'Elegance." 
    }
];

export default function BentleyWorldMap() {
    const mapRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        if (!mapRef.current) return;
        
        // Create map with zoomControl set to false to remove default controls
        const map = L.map(mapRef.current, {
            zoomControl: false
        }).setView([20, 0], 2);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 1,
            maxZoom: 18
        }).addTo(map);
        
        bentleyLocations.forEach(location => {
            const marker = L.marker([location.lat, location.lng], {
                icon: createPinMarkerIcon()
            }).addTo(map);
            
            marker.bindPopup(`
                <div style="padding: 12px; max-width: 260px; font-family: 'Montserrat', sans-serif;">
                    <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 6px; color: #1f2937;">${location.name}</h3>
                    <p style="font-size: 11px; color: #6b7280; margin-bottom: 8px;">📍 ${location.city}, ${location.country}</p>
                    <p style="font-size: 12px; color: #374151; margin-bottom: 12px; line-height: 1.4;">${location.description}</p>
                    <button style="width: 100%; background-color: #394D45; color: white; border: none; padding: 8px; border-radius: 6px; font-size: 11px; font-weight: 500; cursor: pointer;">Learn More</button>
                </div>
            `);
            
            marker.on('click', () => {
                setSelectedLocation(location);
            });
        });
        
        // Custom zoom control with visible background
        const customZoomControl = L.Control.extend({
            options: {
                position: 'topleft'
            },
            onAdd: function(map) {
                const container = L.DomUtil.create('div', 'leaflet-bar custom-zoom-control');
                container.style.display = 'flex';
                container.style.flexDirection = 'column';
                container.style.gap = '12px';
                container.style.background = 'rgba(255, 255, 255, 0.9)'; // Changed to visible background
                container.style.border = '1px solid #ccc';
                container.style.borderRadius = '4px';
                container.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
                container.style.marginTop = '20px';
                container.style.marginLeft = '20px';
                
                // Zoom in button
                const zoomInBtn = L.DomUtil.create('button', 'leaflet-control-zoom-in', container);
                zoomInBtn.innerHTML = '+';
                zoomInBtn.style.width = '40px';
                zoomInBtn.style.height = '40px';
                zoomInBtn.style.fontSize = '24px';
                zoomInBtn.style.fontWeight = 'bold';
                zoomInBtn.style.backgroundColor = 'white';
                zoomInBtn.style.border = 'none';
                zoomInBtn.style.borderBottom = '1px solid #ccc';
                zoomInBtn.style.cursor = 'pointer';
                zoomInBtn.style.display = 'flex';
                zoomInBtn.style.alignItems = 'center';
                zoomInBtn.style.justifyContent = 'center';
                zoomInBtn.style.transition = 'all 0.2s';
                
                // Zoom out button
                const zoomOutBtn = L.DomUtil.create('button', 'leaflet-control-zoom-out', container);
                zoomOutBtn.innerHTML = '−';
                zoomOutBtn.style.width = '40px';
                zoomOutBtn.style.height = '40px';
                zoomOutBtn.style.fontSize = '24px';
                zoomOutBtn.style.fontWeight = 'bold';
                zoomOutBtn.style.backgroundColor = 'white';
                zoomOutBtn.style.border = 'none';
                zoomOutBtn.style.cursor = 'pointer';
                zoomOutBtn.style.display = 'flex';
                zoomOutBtn.style.alignItems = 'center';
                zoomOutBtn.style.justifyContent = 'center';
                zoomOutBtn.style.transition = 'all 0.2s';
                
                // Hover effects
                zoomInBtn.onmouseenter = () => {
                    zoomInBtn.style.backgroundColor = '#f0f0f0';
                };
                zoomInBtn.onmouseleave = () => {
                    zoomInBtn.style.backgroundColor = 'white';
                };
                zoomOutBtn.onmouseenter = () => {
                    zoomOutBtn.style.backgroundColor = '#f0f0f0';
                };
                zoomOutBtn.onmouseleave = () => {
                    zoomOutBtn.style.backgroundColor = 'white';
                };
                
                // Click handlers
                zoomInBtn.onclick = () => map.zoomIn();
                zoomOutBtn.onclick = () => map.zoomOut();
                
                L.DomEvent.disableClickPropagation(container);
                
                return container;
            }
        });
        
        map.addControl(new customZoomControl());
        
        return () => {
            map.remove();
        };
    }, []);
    
    return (
        <div className="w-full px-4 md:px-8 lg:px-10 xl:px-12">
            <div className="w-full bg-[#f5f3ee] overflow-hidden shadow-xl">
                <div ref={mapRef} style={{ height: '550px', width: '100%', minHeight: '550px' }}></div>
                
                {selectedLocation && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLocation(null)}>
                        <div className="bg-white rounded-xl max-w-[450px] w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="relative h-[180px] bg-gradient-to-r from-[#394D45] to-[#4a6a5c]">
                                <button 
                                    className="absolute top-3 left-3 w-8 h-8 bg-black/50 rounded-full text-white flex items-center justify-center hover:bg-black/70 transition"
                                    onClick={() => setSelectedLocation(null)}
                                >
                                    ✕
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                                    <h3 className="text-white text-[20px] font-bold">{selectedLocation.name}</h3>
                                    <p className="text-white/80 text-[13px] mt-1">{selectedLocation.city}, {selectedLocation.country}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-[14px] text-gray-600 leading-relaxed">{selectedLocation.description}</p>
                                <button className="mt-6 w-full bg-[#394D45] hover:bg-[#4a6a5c] text-white text-[13px] font-semibold py-3 rounded transition-colors">
                                    EXPLORE LOCATION
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}