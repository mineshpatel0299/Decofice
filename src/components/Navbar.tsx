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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

      // Hide navbar if scrolling down, show if scrolling up (never while the
      // mobile menu is open, so it doesn't disappear out from under the user)
      if (
        !isMobileMenuOpen &&
        currentScrollY > lastScrollY.current &&
        currentScrollY > 150
      ) {
        setIsHidden(true); // Scrolling down
      } else {
        setIsHidden(false); // Scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled || isMobileMenuOpen
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

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="#contact"
            className="hidden shrink-0 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-white/90 lg:inline-block"
          >
            Contact Us
          </Link>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="relative flex h-9 w-9 flex-col items-center justify-center gap-1.25 lg:hidden"
          >
            <span
              className={`block h-0.5 w-6 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-y-1.75 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-white transition-opacity duration-200 ease-in-out ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "-translate-y-1.75 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-white/10 bg-[#0F0F0F]/95 px-8 py-6 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-base font-medium text-white/90 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block rounded-lg bg-white px-7 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-white/90"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
