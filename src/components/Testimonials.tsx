import React from "react";

const testimonials = [
  {
    name: "Anjali Kumar",
    location: "New Delhi",
    text: "Decofice transformed my old, tired apartment into a stunning modern space. I never imagined it could look so good! The team was professional and attentive to my needs. Thanks to decofice, my home feels brand new.",
  },
  {
    name: "Rajesh Patel",
    location: "Mumbai",
    text: "Decofice truly stands out for its exceptional expertise. They consistently deliver on time while maintaining a strong commitment to environmental standards, which is something we deeply appreciate. The designs they created for our office space not only look great but also serve practical purposes, enhancing both the atmosphere and functionality of the area. Their attention to detail and understanding of our needs made the entire experience enjoyable and fulfilling.",
  },
  {
    name: "Rohit Nanda",
    location: "Surat",
    text: "Decofice exceeded our expectations in every way. As a leading architectural firm, their innovative approach to design combines aesthetic appeal with a strong emphasis on sustainability and functionality. They took the time to understand our vision, incorporating eco-friendly materials and energy-efficient solutions that not only enhanced the beauty of the space but also minimized environmental impact. The result was a stunning, functional design that truly reflects our values and needs, making the entire experience a pleasure.",
  },
  {
    name: "Vinod Mehta",
    location: "Hyderabad",
    text: "From beginning to end, decofice provided unmatched quality and service. Their design for our school building was both innovative and inspiring.",
  },
  {
    name: "Tariq Syed",
    location: "Coimbatore",
    text: "They transformed my workspace into a modern hub of productivity. The flow and design have certainly elevated my business.",
  },
  {
    name: "Priya Menon",
    location: "Goa",
    text: "Decofice helped us integrate sustainable practices into our villa project, and we couldn't be happier with the results. It's refreshing to find a company so committed to environmental responsibility.",
  },
  {
    name: "Amit Sharma",
    location: "Pune",
    text: "The innovative solutions provided by Decofice were a game-changer for our primary home. They took the time to understand our family's lifestyle and integrate it perfectly into the final design.",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-[#0F0F0F] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <div className="flex flex-col items-center justify-center mb-16">
          {/* Badge */}
          <span className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#25975B] px-4 py-2 text-xs font-bold tracking-wider text-white uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            TESTIMONIALS
          </span>

          {/* Heading */}
          <h2 className="mb-4 text-center font-sans text-4xl font-bold tracking-tight text-white md:text-[56px] leading-tight">
            Their <span className="font-serif italic font-medium text-[#25975B]">Experience</span> Their{" "}
            <span className="font-serif italic font-medium text-[#25975B]">Perspective</span>
          </h2>

          {/* Subtitle */}
          <p className="text-center text-sm md:text-base text-white/80">
            Real conversations with the people who entrusted Decofice with their vision.
          </p>
        </div>

        {/* Masonry Grid - Explicit Columns to align bottom cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {[testimonials[0], testimonials[1]].map((testimonial, idx) => (
              <div
                key={testimonial.name}
                className={`break-inside-avoid rounded-2xl bg-[#1D1D1D] p-6 md:p-8 flex flex-col ${
                  idx === 1 ? "flex-1" : ""
                }`}
                style={{
                  animation: "float 6s ease-in-out infinite",
                  animationDelay: `${(0 * 2 + idx) * 0.4}s`,
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      testimonial.name
                    )}&background=25975B&color=fff&rounded=true&size=100`}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col leading-tight gap-1">
                    <h4 className="text-[15px] font-medium text-white">
                      {testimonial.name},
                    </h4>
                    <p className="text-[14px] text-white/70">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] md:text-[15px] text-white/80 leading-[1.6]">
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            {[testimonials[2], testimonials[3]].map((testimonial, idx) => (
              <div
                key={testimonial.name}
                className={`break-inside-avoid rounded-2xl bg-[#1D1D1D] p-6 md:p-8 flex flex-col ${
                  idx === 1 ? "flex-1" : ""
                }`}
                style={{
                  animation: "float 6s ease-in-out infinite",
                  animationDelay: `${(1 * 2 + idx) * 0.4}s`,
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      testimonial.name
                    )}&background=25975B&color=fff&rounded=true&size=100`}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col leading-tight gap-1">
                    <h4 className="text-[15px] font-medium text-white">
                      {testimonial.name},
                    </h4>
                    <p className="text-[14px] text-white/70">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] md:text-[15px] text-white/80 leading-[1.6]">
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            {[testimonials[4], testimonials[5], testimonials[6]].map(
              (testimonial, idx) => (
                <div
                  key={testimonial.name}
                  className={`break-inside-avoid rounded-2xl bg-[#1D1D1D] p-6 md:p-8 flex flex-col ${
                    idx === 2 ? "flex-1" : ""
                  }`}
                  style={{
                    animation: "float 6s ease-in-out infinite",
                    animationDelay: `${(2 * 2 + idx) * 0.4}s`,
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        testimonial.name
                      )}&background=25975B&color=fff&rounded=true&size=100`}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col leading-tight gap-1">
                      <h4 className="text-[15px] font-medium text-white">
                        {testimonial.name},
                      </h4>
                      <p className="text-[14px] text-white/70">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-[14px] md:text-[15px] text-white/80 leading-[1.6]">
                    {testimonial.text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
        `
      }} />
    </section>
  );
}
