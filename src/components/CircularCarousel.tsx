"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ---------------------------------- data --------------------------------- */

type CardData = { id: number; title: string; desc: string; tags: string[]; img: string };

const CARDS: CardData[] = [
  { id: 1,  title: "Residential Living",      desc: "Crafting homes that blend comfort, character and timeless design.", tags: ["Villas", "Farm Houses", "Bungalows", "Flats"], img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=800&fit=crop" },
  { id: 2,  title: "Commercial Spaces",       desc: "Designing workspaces that inspire productivity and reflect brand identity.", tags: ["Offices", "Corporate Parks", "Co-working Spaces", "Retail Stores"], img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop" },
  { id: 3,  title: "Hospitality & Resorts",   desc: "Creating memorable guest experiences through immersive design.", tags: ["Resorts", "Hotels", "Boutique Stays", "Restaurants"], img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=800&fit=crop" },
  { id: 4,  title: "Healthcare Facilities",   desc: "Building spaces that prioritize wellness, safety and accessibility.", tags: ["Hospitals", "Clinics", "Wellness Centers", "Diagnostic Labs"], img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=800&fit=crop" },
  { id: 5,  title: "Educational Institutes",  desc: "Shaping environments that nurture learning and creativity.", tags: ["Schools", "Colleges", "Libraries", "Training Centers"], img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=800&fit=crop" },
  { id: 6,  title: "Retail & Showrooms",      desc: "Curating spaces that showcase products and elevate the shopping experience.", tags: ["Showrooms", "Boutiques", "Malls", "Flagship Stores"], img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop" },
  { id: 7,  title: "Industrial & Warehousing", desc: "Engineering functional spaces built for efficiency and scale.", tags: ["Factories", "Warehouses", "Logistics Hubs", "Manufacturing Units"], img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=800&fit=crop" },
  { id: 8,  title: "Luxury Estates",          desc: "Designing statement homes with bespoke craftsmanship and scale.", tags: ["Mansions", "Penthouses", "Private Estates", "Vacation Homes"], img: "https://images.unsplash.com/photo-1613977257592-4871e5fcaf98?w=600&h=800&fit=crop" },
  { id: 9,  title: "Institutional Buildings", desc: "Delivering civic and institutional spaces built to last generations.", tags: ["Government Buildings", "Community Centers", "Religious Spaces", "Auditoriums"], img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=800&fit=crop" },
  { id: 10, title: "Interior Renovations",    desc: "Reimagining existing spaces with fresh character and function.", tags: ["Home Makeovers", "Office Refits", "Heritage Restoration", "Space Optimization"], img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=800&fit=crop" },
  { id: 11, title: "Landscape & Outdoor",     desc: "Extending design beyond walls into gardens, courtyards and open spaces.", tags: ["Gardens", "Courtyards", "Rooftop Decks", "Poolside Spaces"], img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=800&fit=crop" },
];

const POSITIONS = [
  { height: 1075, z: 286, rotateY: 48,   clip: "polygon(0% 0%, 100% 10%, 100% 90%, 0% 100%)" },
  { height: 890,  z: 215, rotateY: 35,   clip: "polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)" },
  { height: 745,  z: 143, rotateY: 15,   clip: "polygon(0% 0%, 100% 7%, 100% 93%, 0% 100%)" },
  { height: 635,  z: 86,  rotateY: 15,   clip: "polygon(0% 0%, 100% 7%, 100% 93%, 0% 100%)" },
  { height: 555,  z: 60,  rotateY: 6,    clip: "polygon(0% 0%, 100% 7%, 100% 93%, 0% 100%)" },
  { height: 500,  z: 0,   rotateY: 0,    clip: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
  { height: 555,  z: 70,  rotateY: -12,  clip: "polygon(0% 7%, 100% 0%, 100% 100%, 0% 93%)" },
  { height: 635,  z: 116, rotateY: -15,  clip: "polygon(0% 7%, 100% 0%, 100% 100%, 0% 93%)" },
  { height: 745,  z: 176, rotateY: -15,  clip: "polygon(0% 7%, 100% 0%, 100% 100%, 0% 93%)" },
  { height: 890,  z: 254, rotateY: -35,  clip: "polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)" },
  { height: 1075, z: 312, rotateY: -48,  clip: "polygon(0% 10%, 100% 0%, 100% 100%, 0% 90%)" },
];

const CENTER_SLOT = 5;
const TOTAL = CARDS.length;

const CARD_WIDTH = 360;
const SLOT_GAP = 8;
const SLOT_STEP = CARD_WIDTH + SLOT_GAP;
const MAX_HEIGHT = Math.max(...POSITIONS.map((p) => p.height));
// The center slot's card is shorter than the tallest side cards, so the track
// (sized to fit the tallest cards) leaves empty space around the visible
// center card when it's simply centered in the box.
const CENTER_CARD_HEIGHT = POSITIONS[CENTER_SLOT].height;
const BASE_EMPTY_SPACE = (MAX_HEIGHT - CENTER_CARD_HEIGHT) / 2;
// Shift every card's vertical anchor up within the track by this many raw px
// (still centered as a group, just off-center in the box) so the header sits
// closer to the cards. The slack has to go somewhere — it lands below, where
// the caption already reaches up into it via INFO_PANEL_MARGIN_TOP, so it's
// absorbed for free instead of being visible. Bounded well under the tallest
// side cards' own headroom so nothing clips against the track's overflow.
const CENTER_ANCHOR_SHIFT = 90;
const EMPTY_SPACE_ABOVE_CENTER_CARD = Math.max(0, BASE_EMPTY_SPACE - CENTER_ANCHOR_SHIFT);
const EMPTY_SPACE_BELOW_CENTER_CARD = BASE_EMPTY_SPACE + CENTER_ANCHOR_SHIFT;
// Pull the info panel up by that amount, minus the gap we actually want, so
// it sits close to the cards instead of floating below them.
const DESIRED_GAP_BELOW_CARDS = 4;
const INFO_PANEL_MARGIN_TOP =
  DESIRED_GAP_BELOW_CARDS - EMPTY_SPACE_BELOW_CENTER_CARD;

// The center card is flat (no rotation, no clip-path), so it should never be
// cropped by the arc overlays meant to mask the tilted side cards' corners.
// Size each overlay to land exactly on the center card's own top/bottom edge
// (which sits EMPTY_SPACE_*_CENTER_CARD away from the track's edge, since the
// center card is off-center in a track sized for the tallest side card)
// instead of a flat, hand-picked height that stops matching the card
// geometry the moment POSITIONS changes.
const ARC_OVERLAY_CLEARANCE = 2; // hairline buffer so it meets the card without a seam
const ARC_BOTTOM_OVERLAY_EDGE_OFFSET = 16; // matches the -bottom-4 utility
const ARC_BOTTOM_OVERLAY_HEIGHT = Math.max(
  0,
  EMPTY_SPACE_BELOW_CENTER_CARD + ARC_BOTTOM_OVERLAY_EDGE_OFFSET - ARC_OVERLAY_CLEARANCE
);
// Top overlay sits slightly lower than the bottom one (a smaller edge offset,
// matching the -top-2 utility below) so it reads a touch further down.
const ARC_TOP_OVERLAY_EDGE_OFFSET = 8; // matches the -top-2 utility
const ARC_TOP_OVERLAY_HEIGHT = Math.max(
  0,
  EMPTY_SPACE_ABOVE_CENTER_CARD + ARC_TOP_OVERLAY_EDGE_OFFSET - ARC_OVERLAY_CLEARANCE
);

/** Horizontal offset (px) of a slot from the centered wheel axis */
const xFor = (slot: number) => (slot - CENTER_SLOT) * SLOT_STEP;

/** Blur strength grows with distance from the center slot */
const blurFor = (slot: number) => {
  const d = Math.abs(slot - CENTER_SLOT);
  if (d === 0) return 0;
  if (d === 1) return 3;
  if (d === 2) return 5;
  return 8;
};

/* -------------------------------- component ------------------------------- */

export default function CircularCarousel() {
  // order[slot] = card id currently sitting in that slot
  const [order, setOrder] = useState<number[]>(() => CARDS.map((c) => c.id));

  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<Map<number, HTMLDivElement>>(new Map());
  const firstRender = useRef(true);
  // Track previous order to detect cards that wrapped across the seam
  const prevOrder = useRef<number[]>(order);

  // drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const processedSteps = useRef(0);

  const centerCard = CARDS.find((c) => c.id === order[CENTER_SLOT])!;

  /* Apply slot styles whenever the order changes */
  useLayoutEffect(() => {
    order.forEach((id, slot) => {
      const el = cardEls.current.get(id);
      if (!el) return;
      const pos = POSITIONS[slot];

      const oldSlot = prevOrder.current.indexOf(id);
      const didWrap = !firstRender.current && Math.abs(slot - oldSlot) > TOTAL / 2;

      if (firstRender.current || didWrap) {
        // Snap instantly if it's the first render or if the card wrapped
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          x: xFor(slot),
          y: -CENTER_ANCHOR_SHIFT,
          z: pos.z,
          rotationY: pos.rotateY,
          height: pos.height,
          clipPath: pos.clip,
          filter: `blur(${blurFor(slot)}px)`,
        });
      } else {
        // Tween all properties smoothly
        gsap.to(el, {
          xPercent: -50,
          yPercent: -50,
          x: xFor(slot),
          y: -CENTER_ANCHOR_SHIFT,
          z: pos.z,
          rotationY: pos.rotateY,
          height: pos.height,
          clipPath: pos.clip, // animate clip-path now that it has uniform units
          filter: `blur(${blurFor(slot)}px)`,
          duration: 0.7,
          ease: "power3.inOut",
        });
      }
    });

    prevOrder.current = order;

    // fade the info panel in for the new center card
    if (!firstRender.current && infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    }

    firstRender.current = false;
  }, [order]);

  const rotate = (direction: "prev" | "next") => {
    setOrder((prev) =>
      direction === "next"
        ? [...prev.slice(1), prev[0]]
        : [prev[prev.length - 1], ...prev.slice(0, -1)]
    );
  };

  /* ------------------------------ drag support ----------------------------- */

  const onDragStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    processedSteps.current = 0;
    containerRef.current?.classList.add("cursor-grabbing");
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    const distance = clientX - startX.current;
    const steps = Math.floor(Math.abs(distance) / 60);
    if (steps > processedSteps.current) {
      rotate(distance > 0 ? "prev" : "next");
      processedSteps.current = steps;
    }
  };

  const onDragEnd = () => {
    isDragging.current = false;
    containerRef.current?.classList.remove("cursor-grabbing");
  };

  /* --------------------------------- render -------------------------------- */

  return (
    <section
      className="flex min-h-screen w-full select-none flex-col items-center justify-center overflow-hidden bg-[#0F0F0F] px-5 pt-8 pb-1 font-sans"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") rotate("prev");
        if (e.key === "ArrowRight") rotate("next");
      }}
      tabIndex={0}
    >
      {/* Header */}
      <div className="mb-2 px-4 text-center">
        <span className="mb-1 inline-flex items-center gap-2 rounded-full bg-[#25975B] px-6 py-1.5 text-xs font-semibold tracking-wider text-white uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Types of Projects
        </span>
        <h2 className="font-opensans text-[28px] leading-snug font-bold tracking-normal text-white sm:text-4xl sm:leading-[1.2] lg:whitespace-nowrap lg:text-[40px] lg:leading-[1.2]">
          Whatever You&apos;re Building,
        </h2>
        <p className="font-serif text-[28px] leading-snug font-bold text-[#25975B] italic sm:text-4xl sm:leading-[1.2] lg:text-[40px] lg:leading-[1.2]">
          It Starts Here
        </p>
        <p className="mx-auto mt-1 max-w-3xl text-base leading-snug text-white/80 md:text-lg text-center">
          The next image you see could be the beginning of your own project.
        </p>
        <a
          href="#consultation"
          className="mt-2 inline-block rounded-lg bg-[#25975B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1f7f4c] lg:mt-2 lg:px-8 lg:py-2.5"
        >
          Request A Consultation
        </a>
      </div>

      {/* Carousel + arrows + caption */}
      <div
        className="relative -mt-2 w-full [--cs:0.78] sm:[--cs:0.85] md:mt-0 lg:[--cs:0.68]"
        style={{ ["--track-center" as string]: `calc(var(--cs) * ${MAX_HEIGHT / 2}px)` }}
      >
        {/* Prev/Next — centered on the image track up to the lg breakpoint,
            then bottom-aligned with the caption text block below the track
            once there's room to sit beside it instead of on top of it. */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => rotate("prev")}
          className="absolute top-(--track-center) left-2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#25975B]/60 bg-[#0F0F0F] text-[#25975B] shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#25975B] hover:text-white md:left-6 lg:top-auto lg:bottom-0 lg:translate-y-0"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Next */}
        <button
          type="button"
          aria-label="Next"
          onClick={() => rotate("next")}
          className="absolute top-(--track-center) right-2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#25975B]/60 bg-[#0F0F0F] text-[#25975B] shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#25975B] hover:text-white md:right-6 lg:top-auto lg:bottom-0 lg:translate-y-0"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Track — a dedicated positioning context sized exactly to the
            track's own (scaled) height, so the arc overlays anchor to the
            visible cards regardless of how tall the info panel below ends
            up being. `--cs` (set on the ancestor above) shrinks the whole
            3D wheel uniformly on small screens while staying 1 (a no-op) at
            the lg breakpoint, so desktop is pixel-identical to before. */}
        <div
          className="relative w-full"
          style={{ height: `calc(var(--cs) * ${MAX_HEIGHT}px)` }}
        >
          {/* Top Arc Curve Overlay — height is derived (ARC_TOP_OVERLAY_HEIGHT),
              not a flat guess, so it always stops short of the flat center
              card instead of cropping it into looking square. */}
          <div
            className="pointer-events-none absolute -top-[-1] left-0 z-10 w-full bg-[#0F0F0F]"
            style={{
              height: `calc(var(--cs) * ${ARC_TOP_OVERLAY_HEIGHT}px)`,
              clipPath: "ellipse(70% 100% at 50% 0%)",
            }}
            aria-hidden
          />

          {/* Bottom Arc Curve Overlay */}
          <div
            className="pointer-events-none absolute -bottom-1 left-0 z-10 w-full bg-[#0F0F0F]"
            style={{
              height: `calc(var(--cs) * ${ARC_BOTTOM_OVERLAY_HEIGHT}px)`,
              clipPath: "ellipse(70% 100% at 50% 100%)",
            }}
            aria-hidden
          />

          {/* Track */}
          <div
            ref={containerRef}
            className="flex h-full w-full cursor-grab items-center justify-center overflow-hidden [perspective:1500px] [perspective-origin:50%_50%]"
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
    
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
            onTouchEnd={onDragEnd}
          >
            <div
              className="relative w-full shrink-0 [transform-style:preserve-3d]"
              style={{
                height: MAX_HEIGHT,
                transform: "scale(var(--cs))",
                transformOrigin: "center center",
              }}
            >
              {order.map((id, slot) => {
                const card = CARDS.find((c) => c.id === id)!;
                const isCenter = slot === CENTER_SLOT;
                return (
                  <div
                    key={card.id}
                    ref={(el) => {
                      if (el) cardEls.current.set(card.id, el);
                      else cardEls.current.delete(card.id);
                    }}
                    className={`absolute top-1/2 left-1/2 shrink-0 overflow-hidden bg-[#161616] [transform-style:preserve-3d] ${
                      isCenter ? "z-10" : "z-0"
                    }`}
                    style={{ width: CARD_WIDTH }}
                  >
                    {/* Side edge shading */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 [transform:translateZ(-8px)]"
                      aria-hidden
                    />
                    {/* Back panel + soft shadow */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-[#161616] shadow-[0_0_40px_rgba(0,0,0,0.6)] [transform:translateZ(-16px)]"
                      aria-hidden
                    />
                    <img
                      src={card.img}
                      alt={card.title}
                      draggable={false}
                      className="pointer-events-none relative z-[1] block h-full w-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active card info */}
        <div
          ref={infoRef}
          className="relative z-20 px-4 text-center"
          style={{ marginTop: `calc(var(--cs) * ${INFO_PANEL_MARGIN_TOP}px)` }}
        >
          <h3 className="mb-1 font-opensans text-lg leading-none font-semibold tracking-normal text-[#25975B] lg:text-[24px]">
            {centerCard.title}
          </h3>
          <p className="mx-auto max-w-md font-opensans text-sm leading-snug font-normal tracking-normal text-white/70 lg:text-[16px] lg:leading-none">
            {centerCard.desc}
          </p>
          <p className="mx-auto mt-1 max-w-md font-opensans text-base leading-snug font-semibold tracking-normal text-white lg:text-[20px] lg:leading-none">
            {centerCard.tags.join(" • ")}
          </p>
        </div>
      </div>
    </section>
  );
}
