"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

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
  const [order, setOrder] = useState(() => SERVICES.map((service) => service.id));
  const containerRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const flipTweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  const bringToFront = (id: number) => {
    if (id === order[0]) return;
    if (containerRef.current) {
      flipStateRef.current = Flip.getState(containerRef.current.children);
    }
    setOrder((prev) => [id, ...prev.filter((cardId) => cardId !== id)]);
  };

  useLayoutEffect(() => {
    if (!flipStateRef.current) return;
    // Interrupt-safe: kill any tween still running from a rapid second click
    // before starting the next one, so their transforms never fight.
    flipTweenRef.current?.kill();
    flipTweenRef.current = Flip.from(flipStateRef.current, {
      duration: 0.9,
      ease: "power4.inOut",
      absolute: true,
      onComplete: () => {
        flipStateRef.current = null;
      },
    });
  }, [order]);

  return (
    <section className="flex w-full flex-col items-center justify-center bg-[#0F0F0F] py-24 font-sans">
      {/* Header */}
      <div className="mb-12 px-4 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#25975B] px-4 py-2 text-xs font-bold tracking-wider text-white uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" />
          Our Services
        </span>
        <h2 className="text-center font-opensans text-[56px] leading-[1.1] font-bold tracking-tight text-white md:text-[64px]">
          Integrated <span className="font-serif italic text-[#25975B]">Expertise</span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-white/80 md:text-xl">
          From visionary design to flawless execution, our multidisciplinary expertise ensures every project is
          delivered with precision, creativity and uncompromising quality.
        </p>
      </div>

      {/* Accordion Cards */}
      <div
        ref={containerRef}
        className="relative mx-auto flex h-[500px] w-full max-w-7xl justify-start overflow-x-auto px-5 md:h-[586px] md:justify-center md:overflow-visible"
      >
        {order.map((id, idx) => {
          const service = SERVICES.find((s) => s.id === id)!;
          const isActive = idx === 0;
          return (
            // Outer element: owned by GSAP Flip, position/stacking only — no
            // transform-based CSS transitions here, so Flip's slide never
            // fights a competing CSS transform on the same node.
            <div
              key={service.id}
              onClick={() => bringToFront(service.id)}
              className={`relative flex-none cursor-pointer ${
                idx !== 0 ? "-ml-[220px] md:-ml-[260px] lg:-ml-[250px]" : ""
              }`}
              style={{
                zIndex: 50 - idx,
                width: "415.7px",
                maxWidth: "85vw"
              }}
            >
              {/* Inner element: owned by Tailwind, scale/lift + color
                  transition only — always reflects "am I first?" so it can
                  never drift out of sync with the stack order. */}
              <div
                className={`group relative h-full w-full overflow-hidden rounded-[24px] bg-[#0F0F0F] shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out ${
                  isActive ? "scale-105 md:scale-110 -translate-y-2 md:-translate-y-4" : "scale-100 translate-y-0"
                }`}
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className={`object-cover transition-all duration-500 ease-out ${
                    isActive
                      ? "grayscale-0 opacity-100"
                      : "opacity-50 grayscale"
                  }`}
                />

                {/* Dark overlay for text readability on active card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 ease-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Text Content */}
                <div
                  className={`absolute bottom-0 left-0 flex w-full flex-col items-start justify-end p-8 pb-4 transition-all duration-500 ease-out md:p-10 md:pb-6 lg:p-12 lg:pb-8 ${
                    isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <h3 className="mb-1.5 font-opensans text-[24px] font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mb-4 max-w-md text-[16px] text-white/85">
                    {service.desc}
                  </p>
                  <button
                    type="button"
                    className="self-center inline-flex h-[48px] w-[351px] items-center justify-between rounded-[8px] bg-[#25975B] px-[28px] py-[12px] text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#1f7f4c] md:text-base"
                  >
                    Talk To Our Team
                    <ArrowRightIcon className="h-5 w-5" />
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
