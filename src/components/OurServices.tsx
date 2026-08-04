"use client";

import { useState } from "react";
import Image from "next/image";

const SERVICES = [
  {
    id: 1,
    title: "Architectural Design",
    desc: "Timeless spaces shaped with purpose, precision and enduring value.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Interior Design",
    desc: "Curated interiors that reflect your personality and elevate your lifestyle.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Construction Management",
    desc: "Flawless execution from groundbreaking to the final finishing touches.",
    img: "/construction.png",
  },
  {
    id: 4,
    title: "Landscape Architecture",
    desc: "Harmonious outdoor spaces that blend nature with structural elegance.",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Urban Planning",
    desc: "Strategic development that builds sustainable and connected communities.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Sustainable Engineering",
    desc: "Innovative green building solutions focused on energy efficiency and environmental harmony.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
  },
];

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OurServices() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);

  const bringToFront = (id: number) => {
    setActiveId(id);
  };

  return (
    <section className="flex w-full flex-col items-center justify-center bg-[#0F0F0F] py-12 font-sans">
      {/* Header */}
      <div className="mb-24 px-4 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#25975B] px-6 py-2.5 text-xs font-semibold tracking-wider text-white uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" />
          Our Services
        </span>
        <h2 className="text-center font-opensans text-[56px] leading-[1.2] font-bold tracking-normal text-white md:text-[64px]">
          Integrated <span className="font-serif italic text-[#25975B]">Expertise</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg text-center">
          From visionary design to flawless execution, our multidisciplinary expertise ensures every project is
          delivered with precision, creativity and uncompromising quality.
        </p>
      </div>

      {/* Accordion Cards */}
      <div className="relative mx-auto flex h-[420px] w-full max-w-7xl justify-start overflow-x-auto px-5 md:h-[480px] md:justify-center md:overflow-visible">
        {SERVICES.map((service, idx) => {
          const isActive = service.id === activeId;
          return (
            // Outer element: fixed stacking position — never reflows on
            // click, so bringing a card forward never slides its neighbors.
            <div
              key={service.id}
              onClick={() => bringToFront(service.id)}
              className={`relative flex-none cursor-pointer ${
                idx !== 0 ? "-ml-[180px] md:-ml-[220px] lg:-ml-[200px]" : ""
              }`}
              style={{
                zIndex: isActive ? 50 : 50 - idx - 1,
                width: "340px",
                maxWidth: "85vw"
              }}
            >
              {/* Inner element: pops toward the viewer (scale + lift) to
                  read as "coming to front" rather than sliding sideways. */}
              <div
                className={`group relative h-full w-full origin-bottom overflow-hidden rounded-[24px] bg-[#0F0F0F] shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out ${
                  isActive ? "scale-105 md:scale-110 -translate-y-2 md:-translate-y-4" : "scale-100 translate-y-0"
                }`}
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className={`object-cover transition-all duration-700 ease-in-out ${
                    isActive
                      ? "grayscale-0 opacity-100"
                      : "opacity-50 grayscale"
                  }`}
                />

                {/* Dark overlay for text readability on active card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 ease-in-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Text Content */}
                <div
                  className={`absolute bottom-0 left-0 flex w-full flex-col items-center justify-end p-6 pb-4 transition-all duration-700 ease-in-out md:p-8 md:pb-6 lg:p-10 lg:pb-8 ${
                    isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <h3 className="mb-1.5 font-opensans text-[20px] font-bold text-white text-center">
                    {service.title}
                  </h3>
                  <p className="mb-5 max-w-sm text-[14px] text-white/85 text-center">
                    {service.desc}
                  </p>
                  <button
                    type="button"
                    className="self-center inline-flex h-[44px] w-full max-w-[240px] items-center justify-center gap-2 rounded-[8px] bg-[#25975B] px-[24px] py-[10px] text-sm font-medium text-white shadow-lg transition-colors hover:bg-[#1f7f4c]"
                  >
                    Talk To Our Team
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
