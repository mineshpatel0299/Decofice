import Image from "next/image";
import Navbar from "./Navbar";

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

const FILTERS = ["Resorts", "Office Space", "Cafes", "Farm House"];

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
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-neutral-950">
      {/* Background photo */}
      <Image
        src="/hero.png"
        alt="Modern mountain estate at dusk"
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />

      {/* Glass card — sits behind the illustration; the house cutout's
          opaque pixels overlap and hide part of it, the rest shows through. */}
      <div className="absolute top-55.5 right-56 z-10 hidden h-123 w-122 flex-col gap-20 rounded-[65px] border border-white/25 bg-white/3 px-10 py-16 shadow-2xl backdrop-blur-sm lg:flex">
        <div className="flex flex-nowrap gap-2">
          {FILTERS.map((filter, i) => (
            <span
              key={filter}
              className={
                i === 0
                  ? "shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-neutral-900"
                  : "shrink-0 rounded-full border border-white/40 px-4 py-2 text-sm font-medium whitespace-nowrap text-white"
              }
            >
              {filter}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <p className="max-w-[10rem] text-xl leading-snug text-white">
            Crafting escapes worth traveling for.
          </p>

          <div className="relative h-39 w-58.25 shrink-0 overflow-hidden rounded-2xl">
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
              className="group absolute bottom-4 left-4 flex h-10.5 w-10.5 items-center justify-center rounded-full text-white shadow-lg"
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
              <ArrowUpRightIcon className="relative h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Illustration, aligned on top of the house baked into the photo —
          in front of the glass card above */}
      <Image
        src="/ills.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
        style={{
          zIndex: 20,
          transformOrigin: "0 0",
          transform: `translate(${ILLS_TRANSLATE_X}%, ${ILLS_TRANSLATE_Y}%) scale(${ILLS_SCALE})`,
        }}
      />

      {/* Dark overlay confined to a band at the very bottom of the section */}
      <div
        className="pointer-events-none absolute inset-x-0 top-191.5 z-25 h-84"
        style={{
          background:
            "linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, #0F0F0F 46.27%)",
        }}
      />

      <Navbar />

      <div className="relative z-30 mx-auto flex min-h-screen max-w-[1800px] flex-col px-8 pt-40 pb-16 sm:px-12 lg:px-16">
        <div className="flex flex-1 flex-col justify-start pt-16">
          <h1 className="font-serif text-8xl leading-[1.05] font-bold tracking-tight text-[#f5f0e6]">
            <span className="block">Design.</span>
            <span className="block">Build.</span>
            <span className="block">Deliver.</span>
          </h1>

          <p className="mt-8 max-w-md text-2xl leading-relaxed text-white/85">
            Architecture, Interior Design, Construction &amp; Project
            Management under one roof.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#start"
              className="rounded-lg bg-[#25975B] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#456b52]"
            >
              Start Your Project
            </a>
            <a
              href="#consultation"
              className="rounded-lg border border-white/70 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
