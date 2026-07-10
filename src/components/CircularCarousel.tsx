"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ---------------------------------- data --------------------------------- */

type CardData = { id: number; title: string; desc: string; img: string };

const CARDS: CardData[] = [
  { id: 1,  title: "Beverage Branding",   desc: "Fresh and vibrant packaging design for premium juice products with natural ingredients", img: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&h=800&fit=crop" },
  { id: 2,  title: "Apparel Design",      desc: "Minimalist fashion collection with sustainable materials and modern aesthetics", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=800&fit=crop" },
  { id: 3,  title: "Luxury Packaging",    desc: "Premium product packaging with attention to detail and sophisticated finishes", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=800&fit=crop" },
  { id: 4,  title: "Cosmetics Brand",     desc: "Clean beauty brand identity with elegant and timeless design approach", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=800&fit=crop" },
  { id: 5,  title: "Fashion Editorial",   desc: "Editorial photography and art direction for contemporary fashion magazine", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=800&fit=crop" },
  { id: 6,  title: "Botanical Series",    desc: "Natural product line with organic ingredients and eco-friendly packaging", img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=800&fit=crop" },
  { id: 7,  title: "Product Photography", desc: "Professional product photography with creative lighting and composition", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop" },
  { id: 8,  title: "Streetwear Brand",    desc: "Urban fashion line with bold graphics and contemporary street style", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop" },
  { id: 9,  title: "Tech Accessories",    desc: "Minimalist tech product design with user-centered functionality", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop" },
  { id: 10, title: "Wellness Products",   desc: "Holistic wellness brand with natural and calming visual identity", img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=800&fit=crop" },
  { id: 11, title: "Home Decor",          desc: "Contemporary home accessories with Scandinavian design influence", img: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=800&fit=crop" },
];

const POSITIONS = [
  { height: 810, z: 286, rotateY: 48,   clip: "polygon(0% 0%, 100% 10%, 100% 90%, 0% 100%)" },
  { height: 755, z: 215, rotateY: 35,   clip: "polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)" },
  { height: 645, z: 143, rotateY: 15,   clip: "polygon(0% 0%, 100% 7%, 100% 93%, 0% 100%)" },
  { height: 545, z: 86,  rotateY: 15,   clip: "polygon(0% 0%, 100% 7%, 100% 93%, 0% 100%)" },
  { height: 460, z: 60,  rotateY: 6,    clip: "polygon(0% 0%, 100% 7%, 100% 93%, 0% 100%)" },
  { height: 405, z: 0,   rotateY: 0,    clip: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
  { height: 460, z: 70,  rotateY: -12,  clip: "polygon(0% 7%, 100% 0%, 100% 100%, 0% 93%)" },
  { height: 545, z: 116, rotateY: -15,  clip: "polygon(0% 7%, 100% 0%, 100% 100%, 0% 93%)" },
  { height: 645, z: 176, rotateY: -15,  clip: "polygon(0% 7%, 100% 0%, 100% 100%, 0% 93%)" },
  { height: 755, z: 254, rotateY: -35,  clip: "polygon(0% 8%, 100% 0%, 100% 100%, 0% 92%)" },
  { height: 810, z: 312, rotateY: -48,  clip: "polygon(0% 10%, 100% 0%, 100% 100%, 0% 90%)" },
];

const CENTER_SLOT = 5;
const TOTAL = CARDS.length;

const CARD_WIDTH = 320;
const SLOT_GAP = 8;
const SLOT_STEP = CARD_WIDTH + SLOT_GAP;
const MAX_HEIGHT = Math.max(...POSITIONS.map((p) => p.height));

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
      className="flex min-h-screen w-full select-none flex-col items-center justify-center overflow-hidden bg-[#0F0F0F] px-5 py-20 font-sans"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") rotate("prev");
        if (e.key === "ArrowRight") rotate("next");
      }}
      tabIndex={0}
    >
      {/* Header */}
      <div className="mb-8 px-4 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#25975B] px-4 py-2 text-xs font-bold tracking-wider text-white uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Types of Projects
        </span>
        <h2 className="font-opensans text-[64px] leading-[72px] font-bold whitespace-nowrap text-white">
          Whatever You&apos;re Building,
        </h2>
        <p className="font-serif text-[64px] leading-[72px] font-bold text-[#25975B] italic">
          It Starts Here
        </p>
        <p className="mx-auto mt-3 max-w-xl text-lg text-white/70">
          The next image you see could be the beginning of your own project.
        </p>
        <a
          href="#consultation"
          className="mt-5 inline-block rounded-lg bg-[#25975B] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#1f7f4c]"
        >
          Request A Consultation
        </a>
      </div>

      {/* Carousel + arrows + caption */}
      <div className="relative -mt-16 w-full md:-mt-24">
        {/* Prev */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => rotate("prev")}
          className="absolute bottom-4 left-2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#25975B]/60 bg-[#0F0F0F] text-[#25975B] shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#25975B] hover:text-white md:left-6"
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
          className="absolute right-2 bottom-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#25975B]/60 bg-[#0F0F0F] text-[#25975B] shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#25975B] hover:text-white md:right-6"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={containerRef}
          className="w-full cursor-grab overflow-hidden [perspective:1500px] [perspective-origin:50%_50%]"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => onDragMove(e.clientX)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
          onTouchEnd={onDragEnd}
        >
          <div
            className="relative [transform-style:preserve-3d]"
            style={{ height: MAX_HEIGHT }}
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
                  className={`absolute top-1/2 left-1/2 w-[320px] shrink-0 overflow-hidden bg-[#161616] [transform-style:preserve-3d] ${
                    isCenter ? "z-10" : "z-0"
                  }`}
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

        {/* Active card info */}
        <div ref={infoRef} className="mt-10 text-center">
          <h3 className="mb-3 text-2xl font-bold text-[#25975B] md:text-3xl">
            {centerCard.title}
          </h3>
          <p className="mx-auto max-w-md text-base leading-relaxed text-white/70 md:text-lg">
            {centerCard.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
