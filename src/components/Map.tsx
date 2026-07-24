"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.divIcon({
  className: "custom-marker",
  html: `<div class="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25975B]/30 backdrop-blur-[2px]">
           <div class="h-4 w-4 rounded-full bg-[#25975B]"></div>
         </div>`,
  iconSize: [56, 56],
  iconAnchor: [28, 28],
});

const activeIcon = L.divIcon({
  className: "custom-marker-active",
  html: `<div class="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25975B]/50 backdrop-blur-[2px]">
           <div class="absolute h-full w-full animate-ping rounded-full bg-[#25975B] opacity-60"></div>
           <div class="h-[18px] w-[18px] rounded-full bg-[#25975B]"></div>
         </div>`,
  iconSize: [64, 64],
  iconAnchor: [32, 32],
});

function MapController({ activeLocation }: { activeLocation: any }) {
  const map = useMap();

  useEffect(() => {
    if (activeLocation) {
      map.flyTo(activeLocation.coords, 8, {
        duration: 1.5,
      });
    } else {
      map.flyTo([25.0, 77.0], 5, { duration: 1.5 });
    }
  }, [activeLocation, map]);

  return null;
}

export default function Map({ locations, activeCity }: { locations: any[]; activeCity: string | null }) {
  const activeLocation = locations.find((l) => l.name === activeCity);

  return (
    <MapContainer
      center={activeLocation ? activeLocation.coords : [25.0, 77.0]}
      zoom={activeLocation ? 8 : 5}
      style={{ height: "100%", width: "100%", background: "#f0f0f0" }}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      {locations.map((loc) => (
        <Marker
          key={loc.name}
          position={loc.coords}
          icon={loc.name === activeCity ? activeIcon : customIcon}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={1} className="location-tooltip">
            <div className="w-[340px] rounded-2xl bg-[#D6D6D6] p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
              <h3 className="mb-4 text-[24px] font-semibold tracking-tight text-[#1a1a1a]">
                {loc.name}
              </h3>
              <div className="relative h-[180px] w-full overflow-hidden rounded-xl shadow-inner">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="h-full w-full object-cover"
                />
                
                <div className="absolute bottom-0 left-0 flex w-full items-center gap-3 bg-black/40 px-4 py-3 backdrop-blur-md">
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/20">
                    <div className="h-[10px] w-[10px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                  </div>
                  <span className="text-[15px] font-medium text-white shadow-sm">
                    Luxury Villa: In Progress
                  </span>
                </div>
              </div>
            </div>
          </Tooltip>
        </Marker>
      ))}
      <MapController activeLocation={activeLocation} />
    </MapContainer>
  );
}
