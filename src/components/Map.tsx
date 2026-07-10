"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
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
        />
      ))}
      <MapController activeLocation={activeLocation} />
    </MapContainer>
  );
}
