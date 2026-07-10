export default function Stats() {
  const stats = [
    { number: "225", label: "PROJECTS DELIVERED" },
    { number: "38", label: "ACTIVE PROJECTS" },
    { number: "15", label: "CITIES OF OPERATION" },
  ];

  return (
    <section className="w-full bg-[#0F0F0F] pb-8 pt-0 md:pb-12 md:pt-4">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-12 px-5 md:flex-row md:gap-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative flex flex-1 flex-col items-center justify-center text-center"
          >
            <h2 className="mb-2 font-sans text-[84px] font-bold leading-none tracking-tight text-white">
              {stat.number}
              <span className="text-[#25975B]">+</span>
            </h2>
            <p className="text-xs font-medium uppercase tracking-widest text-white/70 sm:text-sm">
              {stat.label}
            </p>

            {/* Divider */}
            {index < stats.length - 1 && (
              <div className="absolute right-0 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-white/10 md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
