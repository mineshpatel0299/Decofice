export default function VisitUs() {
  return (
    <section className="w-full bg-[#0F0F0F] py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-5">
        <h2 className="mb-16 text-center font-sans text-4xl font-bold tracking-tight text-white md:text-[56px] leading-tight">
          Visit <span className="font-serif italic font-medium text-[#25975B]">Us</span>
        </h2>

        <div className="flex w-full flex-col md:flex-row justify-center items-center md:items-start gap-12 md:gap-0">
          {/* Noida Location */}
          <div className="flex flex-1 flex-col items-center text-center">
            <h3 className="mb-2 font-sans text-4xl md:text-5xl font-bold text-white tracking-wide">
              Noida
            </h3>
            <p className="mb-6 text-xs md:text-sm font-medium uppercase tracking-widest text-white/60">
              HEADQUARTERS
            </p>
            <p className="mb-8 max-w-sm text-sm md:text-base text-white/80 leading-relaxed">
              Ofis Square Tower, Block A, Sector 3,
              <br />
              Noida, Uttar Pradesh
            </p>
            <button className="flex items-center gap-2 rounded bg-[#25975B] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e7a49]">
              Get Directions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="hidden h-48 w-px bg-white/10 md:block"></div>
          {/* Mobile Divider */}
          <div className="block h-px w-48 bg-white/10 md:hidden"></div>

          {/* Gurugram Location */}
          <div className="flex flex-1 flex-col items-center text-center">
            <h3 className="mb-2 font-sans text-4xl md:text-5xl font-bold text-white tracking-wide">
              Gurugram
            </h3>
            <p className="mb-6 text-xs md:text-sm font-medium uppercase tracking-widest text-white/60">
              (OPENING SOON)
            </p>
            <p className="mb-8 max-w-sm text-sm md:text-base text-white/80 leading-relaxed">
              Two Horizon Centre, Golf Course Road,
              <br />
              Gurgaon, Haryana
            </p>
            <button className="flex items-center gap-2 rounded bg-[#E8F3ED] px-8 py-2.5 text-sm font-medium text-[#25975B] transition-colors hover:bg-white cursor-default">
              Launching Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
