import Image from "next/image";

function Badge({ active, text }: { active?: boolean; text: string }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
        active
          ? "bg-white text-black font-semibold shadow-sm"
          : "border border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      {text}
    </span>
  );
}

export default function WhyDecofice() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0F0F0F] bg-cover bg-center py-24 font-sans"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Huge Background Text */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center select-none">
        <div
          className="flex flex-col items-center text-center font-serif text-[128px] leading-[0.8] tracking-tighter text-white mix-blend-overlay opacity-40"
        >
          <span className="pr-8 md:pr-16 lg:pr-32 xl:pr-48">
            <span className="font-normal">One</span> <span className="font-black">Vision.</span>
          </span>
          <span className="pl-16 md:pl-32 lg:pl-64 xl:pl-96">
            <span className="font-normal">One</span> <span className="font-black">Team.</span>
          </span>
        </div>
      </div>

      {/* Top Badge */}
      <div className="relative z-10 mb-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#25975B] px-4 py-2 text-xs font-bold tracking-wider text-white uppercase shadow-[0_0_20px_rgba(37,151,91,0.4)]">
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]" />
          Why Decofice
        </span>
      </div>



      {/* Cards Layout */}
      <div className="relative z-10 mx-auto flex w-full flex-col justify-between gap-8 px-5 md:flex-row md:px-12 lg:gap-16 lg:px-24 xl:px-32">
        
        {/* Left Column */}
        <div className="flex w-full flex-col gap-8 md:w-1/2 lg:gap-32">
          {/* Card 1 */}
          <div 
            className="group relative mx-auto flex h-[233px] w-[364px] flex-col items-center justify-center gap-[16px] overflow-hidden rounded-[24px] border border-white/10 bg-black/40 px-[24px] py-[14px] text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all"
            style={{
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)"
            }}
          >
            <h3 className="text-[24px] font-bold leading-snug text-[#30E988]">
              Integrated <br /> Design & Build
            </h3>
            <p className="max-w-[280px] text-[16px] text-white/80">
              Architecture, interiors and execution working together from day one.
            </p>
            <div className="flex w-full flex-nowrap items-center justify-center gap-1.5">
              <Badge active text="Architecture" />
              <Badge text="Interiors" />
              <Badge text="Construction" />
              <Badge text="PMC" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            className="group relative mx-auto flex h-[233px] w-[364px] flex-col items-center justify-center gap-[16px] overflow-hidden rounded-[24px] border border-white/10 bg-black/40 px-[24px] py-[14px] text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all"
            style={{
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)"
            }}
          >
            <h3 className="text-[24px] font-bold leading-snug text-[#3ccb7f]">
              Precision <br /> Execution
            </h3>
            <p className="max-w-[280px] text-[16px] text-white/80">
              Every detail planned and delivered with uncompromising quality.
            </p>
            <div className="flex w-full flex-nowrap items-center justify-center gap-1.5">
              <Badge active text="Quality" />
              <Badge text="Timeline" />
              <Badge text="Craftsmanship" />
            </div>
          </div>
        </div>

        {/* Right Column (Staggered) */}
        <div className="mt-8 flex w-full flex-col gap-8 md:mt-24 md:w-1/2 lg:gap-32">
          {/* Card 3 */}
          <div 
            className="group relative mx-auto flex h-[233px] w-[364px] flex-col items-center justify-center gap-[16px] overflow-hidden rounded-[24px] border border-white/10 bg-black/60 px-[24px] py-[14px] text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all"
            style={{
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)"
            }}
          >
            <h3 className="text-[24px] font-bold leading-snug text-[#3ccb7f]">
              Complete <br /> Accountability
            </h3>
            <p className="max-w-[280px] text-[16px] text-white/80">
              One trusted partner throughout the entire project lifecycle.
            </p>
            <div className="flex w-full flex-nowrap items-center justify-center gap-1.5">
              <Badge active text="One Team" />
              <Badge text="One Process" />
              <Badge text="One Responsibility" />
            </div>
          </div>

          {/* Card 4 */}
          <div 
            className="group relative mx-auto flex h-[233px] w-[364px] flex-col items-center justify-center gap-[16px] overflow-hidden rounded-[24px] border border-white/10 bg-black/60 px-[24px] py-[14px] text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all"
            style={{
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)"
            }}
          >
            <h3 className="text-[24px] font-bold leading-snug text-[#3ccb7f]">
              Built Around Your <br /> Vision
            </h3>
            <p className="max-w-[280px] text-[16px] text-white/80">
              Every solution is tailored to your goals and aspirations.
            </p>
            <div className="flex w-full flex-nowrap items-center justify-center gap-1.5">
              <Badge active text="Customized" />
              <Badge text="Flexible" />
              <Badge text="Future Ready" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="relative z-10 mt-24 pb-12 text-center px-4">
        <h3 className="text-lg font-medium text-white/90 sm:text-xl md:text-2xl">
          Proof of what happens when vision meets execution.
        </h3>
      </div>
    </section>
  );
}
