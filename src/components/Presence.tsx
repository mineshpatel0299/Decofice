"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

const LOCATIONS = [
  {
    name: "Noida",
    coords: [28.5355, 77.3910],
    image: "https://images.unsplash.com/photo-1645938374927-d74b9349be51?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mukteshwar",
    coords: [29.4727, 79.6457],
    image: "https://images.unsplash.com/photo-1562746446-ddeaf6a9be27?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Delhi",
    coords: [28.6139, 77.2090],
    image: "https://images.unsplash.com/photo-1662852742109-2c05a1274bf8?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Gurugram",
    coords: [28.4595, 77.0266],
    image: "https://images.unsplash.com/photo-1643194928486-f215bfb93fe7?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Punjab",
    coords: [31.1471, 75.3412],
    image: "https://images.unsplash.com/photo-1761924422461-2aad2800020b?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Goa",
    coords: [15.2993, 74.1240],
    image: "https://images.unsplash.com/photo-1558894930-0e1f89b9f0ce?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Presence() {
  const [activeCity, setActiveCity] = useState<string>("Mukteshwar");

  return (
    <section className="w-full bg-[#0F0F0F] py-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-5">
        <h2 className="text-center font-sans text-4xl md:text-[56px] leading-[1.2] font-bold tracking-normal text-white mb-6">
          A Presence That Continues To <span className="font-serif italic text-[#25975B] font-medium">Grow</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg text-center mb-10">
          Every new location represents another partnership built on trust, thoughtful
          design and uncompromising execution.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {LOCATIONS.map((loc) => {
            const isActive = loc.name === activeCity;
            return (
              <button
                key={loc.name}
                onClick={() => setActiveCity(loc.name)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "border border-white bg-transparent text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {loc.name}
              </button>
            );
          })}
          <button className="flex items-center gap-1.5 rounded-full bg-[#25975B] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e7a49]">
            More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Map Interactive Section */}
      <div className="relative w-full">
        <div className="relative w-full h-[548px] overflow-hidden z-0">
          <Map locations={LOCATIONS} activeCity={activeCity} />
        </div>
      </div>
    </section>
  );
}
