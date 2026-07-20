"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// hero.png (1569x1002) and ills.png (1440x920) are near-identical aspect
// ratios, so laid out with matching `object-cover fill` boxes, a point at
// normalized fraction (u,v) of either canvas lands at the same (u,v) of the
// section. We scale + translate the illustration so the house it contains
// lines up with the one baked into the background photo.
//   ills house bbox (normalized): x:[0.375, 0.894]  y:[0.577, 0.775]
//   hero house bbox (normalized): x:[0.437, 0.892]  y:[0.532, 0.699]
const ILLS_SCALE = 0.87;
const ILLS_TRANSLATE_X = 11.25; // %
const ILLS_TRANSLATE_Y = 2.71; // %

// mhero.png (633x1000, portrait) is a completely different crop/aspect than
// ills.png (1440x920, landscape), so the desktop shortcut above — same
// scale on both axes, justified by near-identical aspect ratios — doesn't
// hold. These values are solved directly against the actual mobile section
// box (390x877 at a 390px-wide viewport) so the illustrated house lands on
// the photographed one: mhero house bbox (normalized): x:[0.308, 0.774]
// y:[0.665, 0.748]. Non-uniform scale (x != y) because matching both axes
// exactly means matching the aspect distortion `object-cover` already
// applies unevenly to the two source images at this container's aspect ratio.
const MOBILE_ILLS_SCALE_X = 0.28;
const MOBILE_ILLS_SCALE_Y = 0.32;
const MOBILE_ILLS_TRANSLATE_X = 21; // %
const MOBILE_ILLS_TRANSLATE_Y = 30.5; // %

const FILTERS = [
  {
    label: "Resorts",
    caption: "Crafting escapes worth traveling for.",
    image: "/hero.png",
    alt: "Resort pool at dusk",
  },
  {
    label: "Office Space",
    caption: "Workspaces built for focus and growth.",
    image: "/construction.png",
    alt: "Office space under construction",
  },
  {
    label: "Cafes",
    caption: "Inviting spaces that bring people together.",
    image: "/ss.png",
    alt: "Cafe interior design",
  },
  {
    label: "Farm House",
    caption: "Rustic retreats rooted in nature.",
    image: "/why-decofice-section.png",
    alt: "Farm house exterior",
  },
];

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const [activeFilter, setActiveFilter] = useState(0);
  const active = FILTERS[activeFilter];
  const glassCardRef = useRef<HTMLDivElement>(null);
  const mobileGlassCardRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLSpanElement>(null);
  const textRef2 = useRef<HTMLSpanElement>(null);
  const textRef3 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Glass card animation: slides up from its bottom edge (desktop + mobile variant)
    const glassCardTargets = [glassCardRef.current, mobileGlassCardRef.current].filter(
      (el): el is HTMLDivElement => el !== null
    );
    if (glassCardTargets.length) {
      gsap.fromTo(
        glassCardTargets,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, ease: "power3.out", delay: 2.6 }
      );
    }

    // Left head text animation: stagger reveal
    gsap.fromTo(
      [textRef1.current, textRef2.current, textRef3.current],
      { y: "100%" },
      { y: "0%", duration: 1, stagger: 0.15, ease: "power4.out", delay: 2.2 }
    );
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-neutral-950">
      {/* Background photo — desktop crop */}
      <Image
        src="/hero.png"
        alt="Modern mountain estate at dusk"
        fill
        preload
        sizes="100vw"
        className="hidden object-cover lg:block"
      />

      {/* Background photo — mobile-specific portrait crop */}
      <Image
        src="/mhero.png"
        alt="Modern mountain estate at dusk"
        fill
        preload
        sizes="100vw"
        className="object-cover lg:hidden"
      />

      {/* Positioning frame matching the content column's max-w-[1800px] container,
          so the glass card's right offset stays in sync with the left content's
          margin instead of drifting apart on screens wider than 1800px */}
      <div className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[1800px] lg:block">
        {/* Glass card — wrapper with clipPath to mask the bottom edge, preventing it from showing below the house while sliding up */}
        <div
          className="pointer-events-auto absolute top-[24.56vh] right-[11.67vw] z-10 h-[45.56vh] w-[25.42vw]"
          style={{ clipPath: "polygon(-20% -20%, 120% -20%, 120% 100%, -20% 100%)" }}
        >
          <div
            ref={glassCardRef}
            className="flex h-full w-full flex-col gap-[7.41vh] rounded-[65px] border border-white/25 bg-white/3 px-[2.08vw] pt-[3.93vh] pb-[7.93vh] shadow-2xl backdrop-blur-sm opacity-0"
          >
            <div className="flex flex-nowrap gap-[0.42vw]">
              {FILTERS.map((filter, i) => (
              <span
                key={filter}
                className={
                  i === 0
                    ? "shrink-0 rounded-full bg-white px-[0.83vw] py-[0.74vh] text-[0.73vw] font-medium whitespace-nowrap text-neutral-900"
                    : "shrink-0 rounded-full border border-white/40 px-[0.83vw] py-[0.74vh] text-[0.73vw] font-medium whitespace-nowrap text-white"
                }
              >
                {filter}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-[0.52vw]">
            <p className="max-w-[8.33vw] text-[1.04vw] leading-snug text-white">
              Crafting escapes worth traveling for.
            </p>

            <div className="relative h-[14.44vh] w-[12.14vw] shrink-0 overflow-hidden rounded-2xl">
              <Image
                src="/hero.png"
                alt="Resort pool at dusk"
                fill
                sizes="233px"
                className="object-cover"
              />
              <button
                type="button"
                aria-label="View resorts"
                className="group absolute bottom-[0.83vw] left-[0.83vw] flex h-[2.19vw] w-[2.19vw] items-center justify-center rounded-full text-white shadow-lg"
              >
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 h-full w-full transition-colors group-hover:[&>circle]:fill-[#1f7f4c]"
                >
                  <circle cx="20.6576" cy="20.6576" r="20.6576" fill="#25975B" />
                </svg>
                <ArrowUpRightIcon className="relative h-[1.04vw] w-[1.04vw]" />
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Illustration, aligned on top of the house baked into the photo —
          in front of the glass card above (desktop) */}
      <Image
        src="/ills.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="hidden object-cover lg:block"
        style={{
          zIndex: 20,
          transformOrigin: "0 0",
          transform: `translate(${ILLS_TRANSLATE_X}%, ${ILLS_TRANSLATE_Y}%) scale(${ILLS_SCALE})`,
        }}
      />

      {/* Illustration, aligned on top of the house baked into mhero.png —
          z-index above the content column (z-30) so it renders in front of
          the mobile glass card, letting the card tuck behind it */}
      <Image
        src="/ills.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover lg:hidden"
        style={{
          zIndex: 35,
          transformOrigin: "0 0",
          transform: `translate(${MOBILE_ILLS_TRANSLATE_X}%, ${MOBILE_ILLS_TRANSLATE_Y}%) scale(${MOBILE_ILLS_SCALE_X}, ${MOBILE_ILLS_SCALE_Y})`,
        }}
      />

      {/* Dark overlay confined to a band at the very bottom of the section */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[70.93vh] z-25 h-[31.11vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, #0F0F0F 46.27%)",
        }}
      />

      <Navbar />

      <div className="relative z-30 mx-auto flex min-h-screen max-w-[1800px] flex-col px-8 pt-[14.69vh] pb-16 sm:px-12 lg:pr-16 lg:pl-[11.67vw]">
        <div className="flex flex-1 flex-col items-center justify-start pt-[5.87vh] text-center lg:items-start lg:text-left">
          <h1 className="font-serif text-6xl leading-[1.05] font-bold tracking-tight text-[#f5f0e6] sm:text-7xl lg:text-8xl">
            <span className="block overflow-hidden" style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
              <span ref={textRef1} className="block translate-y-[100%]">Design.</span>
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
              <span ref={textRef2} className="block translate-y-[100%]">Build.</span>
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
              <span ref={textRef3} className="block translate-y-[100%]">Deliver.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xs text-base leading-relaxed text-white/85 sm:max-w-sm sm:text-lg lg:mt-8 lg:max-w-md lg:text-2xl">
            Architecture, Interior Design, Construction &amp; Project
            Management under one roof.
          </p>

          {/* Mobile-only glass card — desktop keeps the absolutely positioned
              version above, tucked over the hero photo */}
          <div
            ref={mobileGlassCardRef}
            className="mt-8 flex w-full max-w-sm flex-col gap-5 rounded-4xl border border-white/25 bg-white/5 p-5 opacity-0 shadow-2xl backdrop-blur-sm lg:hidden"
          >
            <div className="flex flex-nowrap gap-1.5 overflow-x-auto scrollbar-none">
              {FILTERS.map((filter, i) => (
                <span
                  key={filter}
                  className={
                    i === 0
                      ? "shrink-0 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap text-neutral-900"
                      : "shrink-0 rounded-full border border-white/40 px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap text-white"
                  }
                >
                  {filter}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <p className="max-w-36 text-left text-sm leading-snug text-white">
                Crafting escapes worth traveling for.
              </p>

              <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src="/hero.png"
                  alt="Resort pool at dusk"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
                <button
                  type="button"
                  aria-label="View resorts"
                  className="group absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg"
                >
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-full w-full transition-colors group-hover:[&>circle]:fill-[#1f7f4c]"
                  >
                    <circle cx="20.6576" cy="20.6576" r="20.6576" fill="#25975B" />
                  </svg>
                  <ArrowUpRightIcon className="relative h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-4 lg:mt-10 lg:w-auto lg:max-w-none lg:flex-row lg:flex-wrap lg:items-center">
            <a
              href="#start"
              className="w-full rounded-full bg-[#25975B] px-8 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-[#456b52] lg:w-auto lg:rounded-lg"
            >
              Start Your Project
            </a>
            <a
              href="#consultation"
              className="w-full rounded-full border border-white/70 px-8 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 lg:w-auto lg:rounded-lg"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
