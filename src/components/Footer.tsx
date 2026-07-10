import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111A14] bg-gradient-to-b from-[#121c15] to-[#0a0a0a] pt-16 md:pt-20 pb-8 border-t border-white/5 relative overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col px-5 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-20 mb-16">
          {/* Left Column - Brand */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="text-white w-[140px] mb-2">
              <Logo className="w-full h-auto" />
            </div>
            <p className="text-white font-medium text-[15px] tracking-wide -mt-3">
              Experience the dream
            </p>
            <p className="text-white/60 text-[13px] -mt-2">
              CIN: U72900KL2021PTC069994
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Right Area - Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 lg:gap-12 w-full max-w-[800px]">
            {/* Company */}
            <div className="flex flex-col gap-5">
              <h4 className="text-white font-medium mb-1 text-[15px]">Company</h4>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Real Estate Solution</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Projects</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Start Your Project</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">About Us</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Contact Us</Link>
            </div>

            {/* Policy */}
            <div className="flex flex-col gap-5">
              <h4 className="text-white font-medium mb-1 text-[15px]">Policy</h4>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Onboarding Policy</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Shipping & Delivery Policy</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Pricing Policy</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Copyright & Trademark Policy</Link>
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-5">
              <h4 className="text-white font-medium mb-1 text-[15px]">Terms</h4>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Terms of Use Agreement</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Professional Payment</Link>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Refund/Return</Link>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-5">
              <h4 className="text-white font-medium mb-1 text-[15px]">Resources</h4>
              <Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Blogs</Link>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-[#25975B] opacity-40 mb-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-2">
          <p className="text-[13px] text-white/50 text-center md:text-left">
            Copyright © 2025 Decofice Technologies Private Limited | All rights reserved
          </p>

          {/* Payment Methods - Custom precise elements to match image perfectly */}
          <div className="flex items-center gap-4">
             <span className="italic font-bold text-white/80 text-[15px] tracking-tight pr-1">UPI<span className="text-[#F79E1B] text-[16px] leading-[0] -ml-0.5">&gt;</span></span>
             <div className="flex -space-x-[6px] items-center">
                <div className="w-[22px] h-[22px] rounded-full bg-[#EB001B] opacity-90 z-10"></div>
                <div className="w-[22px] h-[22px] rounded-full bg-[#F79E1B] opacity-90"></div>
             </div>
             <span className="italic font-bold text-[#1434CB] text-[18px] tracking-tighter ml-1">VISA</span>
             <span className="italic font-bold text-white text-[15px] tracking-tight ml-1">RuPay<span className="text-[#F79E1B] text-[16px] leading-[0] -ml-0.5">&gt;</span></span>
             <div className="bg-[#006FCF] text-white font-bold px-[4px] py-[3px] rounded-[3px] text-[11px] leading-[0.9] tracking-tighter flex items-center ml-2">AM<br/>EX</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
