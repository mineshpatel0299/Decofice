import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Real Estate Solution", href: "#solutions" },
  { label: "About Us", href: "#about" },
  { label: "Start Your Project", href: "#start" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-[1800px] items-center justify-between px-8 py-7 sm:px-12 lg:px-16">
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
          className="shrink-0 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-white/90"
        >
          Contact Us
        </Link>
      </nav>
    </header>
  );
}
