"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Real Estate Solution", href: "#solutions" },
  { label: "About Us", href: "#about" },
  { label: "Start Your Project", href: "#start" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add background if scrolled past threshold
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide navbar if scrolling down, show if scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsHidden(true); // Scrolling down
      } else {
        setIsHidden(false); // Scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "bg-[#0F0F0F]/95 backdrop-blur-md shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1800px] items-center justify-between px-8 sm:px-12 lg:px-16 transition-all duration-300 ${
          isScrolled ? "py-4" : "py-7"
        }`}
      >
        <Link href="/" aria-label="Home" className="text-white shrink-0">
          <Logo className="h-9 w-9" />
        </Link>

        <ul className="hidden items-center gap-9 text-[15px] font-medium text-white/90 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#contact"
          className="shrink-0 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-white/90"
        >
          Contact Us
        </Link>
      </nav>
    </header>
  );
}
