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
// hold. mhero.png is the same photo as hero.png, just resized + cropped
// (confirmed via OpenCV template matching across 3 patches: hero -> mhero
// is a uniform scale of 0.600 plus offset (-243.85, 335.94)). Running the
// known-good desktop house bbox through that mapping gives the house's
// location in mhero.png itself: x:[0.265,0.941] y:[0.656,0.756] normalized.
//
// The mobile <Image> below uses object-CONTAIN, not -cover like every other
// image in this file: this container is much taller than wide, while
// ills.png is landscape, so object-cover would scale it to cover the
// container's height and crop away most of its width — including the
// garage half of the house — before our transform ever runs (a transform
// can reposition/resize the already-cropped box, but can't un-crop content
// object-fit discarded). Contain scales ills.png to fit its full,
// uncropped width in the box instead (letterboxed top/bottom), so the
// whole house survives and these scale/translate values — solved so
// ills.png's own house bbox lands exactly on the coordinates above — have
// full-width source to work with.
const MOBILE_ILLS_SCALE_X = 1.7861;
const MOBILE_ILLS_SCALE_Y = 1.7176;
const MOBILE_ILLS_TRANSLATE_X = -49.21; // %
const MOBILE_ILLS_TRANSLATE_Y = -24.21; // %

// Extra horizontal nudge applied to both the mobile background photo and its
// illustration overlay together, so the villa sits more centered in the
// mobile viewport. Negative shifts left.
const MOBILE_HERO_SHIFT_X = -5; // %

// The mobile background photo is `fill` + object-cover, so its box exactly
// matches the section. Shifting that box via translateX(MOBILE_HERO_SHIFT_X)
// slides the whole covered area left, uncovering a bare strip of the
// section's dark background on the right. Scaling the box up (about its
// center) makes it overhang the section on both sides so the shift no
// longer exposes an edge. Solved so scale*(1+shift/2) >= 1 with a small
// margin: at shift=-5%, ~1.111 is the exact break-even, 1.15 keeps a
// buffer against viewport/rounding differences without visibly zooming in.
const MOBILE_HERO_SCALE = 1.15;

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
  const pRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Left head text animation: stagger reveal
    gsap.fromTo(
      [textRef1.current, textRef2.current, textRef3.current],
      { y: "100%" },
      { y: "0%", duration: 1, stagger: 0.15, ease: "power4.out", delay: 2.2 }
    );

    gsap.fromTo(
      glassCardRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.4 }
    );

    gsap.fromTo(
      pRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.6 }
    );

    gsap.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.8 }
    );

    // Mobile-only: the glass card already paints beneath the mobile
    // illustration overlay here (that Image is z-35, this card sits in the
    // z-auto content column), so rising it up from below reads as it
    // sliding out from behind the house. Scoped to <lg (matches the
    // `lg:hidden` breakpoint on the card itself) so desktop is untouched.
    const mm = gsap.matchMedia();
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        mobileGlassCardRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 2.6 }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-neutral-950 lg:min-h-screen">
      {/* Background photo — desktop crop */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ zIndex: 0, transform: "scale(1.05)" }}
      >
        <Image
          src="/hero.png"
          alt="Modern mountain estate at dusk"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Background photo — mobile-specific portrait crop */}
      <Image
        src="/mhero.png"
        alt="Modern mountain estate at dusk"
        fill
        preload
        sizes="100vw"
        className="object-cover lg:hidden"
        style={{
          transform: `scale(${MOBILE_HERO_SCALE}) translateX(${MOBILE_HERO_SHIFT_X}%)`,
        }}
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
            className="flex h-full w-full flex-col gap-[7.41vh] rounded-[65px] border border-white/25 bg-white/3 px-[2.08vw] pt-[3.93vh] pb-[7.93vh] shadow-2xl backdrop-blur-sm"
          >
            <div className="flex flex-nowrap gap-[0.42vw]">
              {FILTERS.map((filter, i) => (
              <button
                key={filter.label}
                type="button"
                onClick={() => setActiveFilter(i)}
                aria-pressed={i === activeFilter}
                className={
                  i === activeFilter
                    ? "shrink-0 rounded-full bg-white px-[0.83vw] py-[0.74vh] text-[0.73vw] font-medium whitespace-nowrap text-neutral-900 transition-colors"
                    : "shrink-0 rounded-full border border-white/40 px-[0.83vw] py-[0.74vh] text-[0.73vw] font-medium whitespace-nowrap text-white transition-colors hover:border-white"
                }
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-[0.52vw]">
            <p className="max-w-[8.33vw] text-[1.04vw] leading-snug text-white">
              {active.caption}
            </p>

            <div className="relative h-[14.44vh] w-[12.14vw] shrink-0 overflow-hidden rounded-2xl">
              <Image
                src={active.image}
                alt={active.alt}
                fill
                sizes="233px"
                className="object-cover"
              />
              <button
                type="button"
                aria-label={`View ${active.label}`}
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
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ zIndex: 20, transform: "scale(1.05)" }}
      >
        <Image
          src="/ills.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
          style={{
            transformOrigin: "0 0",
            transform: `translate(${ILLS_TRANSLATE_X}%, ${ILLS_TRANSLATE_Y}%) scale(${ILLS_SCALE})`,
          }}
        />
      </div>

      {/* Illustration, aligned on top of the house baked into mhero.png.
          Content column is raised above this on mobile (z-40 vs 35) so the
          glass card and CTA buttons render in front of it. */}
      <Image
        src="/ills.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="pointer-events-none object-contain lg:hidden"
        style={{
          zIndex: 35,
          transformOrigin: "0 0",
          transform: `translate(${MOBILE_ILLS_TRANSLATE_X}%, ${MOBILE_ILLS_TRANSLATE_Y}%) scale(${MOBILE_ILLS_SCALE_X}, ${MOBILE_ILLS_SCALE_Y}) translateX(${(MOBILE_HERO_SHIFT_X / MOBILE_ILLS_SCALE_X).toFixed(2)}%)`,
        }}
      />

      {/* Dark overlay confined to a band at the very bottom of the section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-25 hidden h-[15vh] lg:block"
        style={{
          background:
            "linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, #0F0F0F 100%)",
        }}
      />

      <Navbar />

      <div className="pointer-events-none relative mx-auto flex min-h-dvh max-w-[1800px] flex-col px-8 pt-10 pb-8 sm:px-12 lg:z-30 lg:min-h-screen lg:pt-[14.69vh] lg:pb-16 lg:px-[11.67vw]">
        <div className="pointer-events-none flex flex-1 flex-col items-center justify-start pt-10 text-center lg:pt-[5.87vh] lg:items-start lg:text-left">
          <h1 className="font-serif text-[38px] leading-[1.1] font-bold tracking-normal text-[#f5f0e6] sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[86px] 2xl:text-[100px]">
            <span className="inline-block overflow-hidden align-top lg:block" style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
              <span ref={textRef1} className="block translate-y-[100%]">Design.</span>
            </span>{" "}
            <span className="inline-block overflow-hidden align-top lg:block" style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
              <span ref={textRef2} className="block translate-y-[100%]">Build.</span>
            </span>
            <span className="block overflow-hidden" style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
              <span ref={textRef3} className="block translate-y-[100%]">Deliver.</span>
            </span>
          </h1>

          <p ref={pRef} className="mt-6 max-w-xs text-base leading-relaxed text-white/85 sm:max-w-sm sm:text-lg lg:mt-8 lg:max-w-lg lg:text-[18px] xl:text-[22px] lg:leading-[1.6]">
            Architecture, Interior Design, Construction &amp; Project
            Management under one roof.
          </p>

          {/* Mobile-only glass card — desktop keeps the absolutely positioned
              version above, tucked over the hero photo */}
          <div
            ref={mobileGlassCardRef}
            className="pointer-events-auto relative mt-21 -translate-x-1 translate-y-20 opacity-0 flex h-46.5 w-64 flex-col gap-6 rounded-3xl border border-white/25 bg-white/5 pt-5 pr-3 pb-5 pl-3 shadow-2xl backdrop-blur-sm lg:hidden"
          >
            <div className="flex flex-nowrap gap-1.5 overflow-x-auto scrollbar-none">
              {FILTERS.map((filter, i) => {
                const width =
                  filter.label === "Office Space"
                    ? "w-16.5"
                    : filter.label === "Farm House"
                      ? "w-14.5"
                      : "w-11";
                return (
                  <button
                    key={filter.label}
                    type="button"
                    onClick={() => setActiveFilter(i)}
                    aria-pressed={i === activeFilter}
                    className={
                      i === activeFilter
                        ? `flex h-4.5 ${width} shrink-0 items-center justify-center rounded-full bg-white px-2 text-[8px] font-medium whitespace-nowrap text-neutral-900 transition-colors`
                        : `flex h-4.5 ${width} shrink-0 items-center justify-center rounded-full border border-white/40 px-2 text-[8px] font-medium whitespace-nowrap text-white transition-colors hover:border-white`
                    }
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <p className="max-w-36 text-left text-[8px] leading-snug text-white">
                {active.caption}
              </p>

              <div className="relative h-11 w-16.5 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={active.image}
                  alt={active.alt}
                  fill
                  sizes="66px"
                  className="object-cover"
                />
                <button
                  type="button"
                  aria-label={`View ${active.label}`}
                  className="group absolute bottom-1 left-1 flex h-4 w-4 items-center justify-center rounded-full text-white shadow-lg"
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
                  <ArrowUpRightIcon className="relative h-2 w-2" />
                </button>
              </div>
            </div>
          </div>

          {/* The villa sits at a fixed 65.6-75.6% of viewport height (it's
              positioned via percentage transforms tied to the section, so
              that band holds regardless of device height — verified at
              780-932px). Everything above it, though, is ordinary flow
              content sized in fixed px/rem, so its height barely changes
              with viewport height. A plain vh margin can't reconcile a
              fixed-height block with a viewport-proportional one, so this
              solves for clearance directly: 75.6vh (villa's bottom edge)
              minus ~515px (that flow content's rough height) gives the gap
              still needed at any device height, floored at 2rem so it
              never goes negative on short viewports. */}
          <div ref={ctaRef} className="pointer-events-auto relative z-40 top-8 mt-[max(2rem,calc(75.6vh-515px))] flex w-full max-w-sm flex-col items-center gap-2.5 lg:top-0 lg:z-auto lg:mt-10 lg:w-auto lg:max-w-none lg:flex-row lg:flex-wrap lg:items-center lg:gap-4">
            <a
              href="#start"
              className="flex h-9 w-46.25 items-center justify-center rounded-lg bg-[#25975B] px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#456b52] lg:h-auto lg:w-auto lg:rounded-lg lg:px-8 lg:py-4"
            >
              Start Your Project
            </a>
            <a
              href="#consultation"
              className="flex h-9 w-46.25 items-center justify-center rounded-lg border border-white/70 px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 lg:h-auto lg:w-auto lg:rounded-lg lg:px-8 lg:py-4"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
