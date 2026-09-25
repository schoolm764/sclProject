
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Notices", "#notices"],
  ["Admissions", "#admissions"],
  ["Contact", "#contact"],
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the very top
      if (currentScrollY <= 30) {
        setShowNavbar(true);
        setScrolled(false);
        lastScrollY = currentScrollY;
        return;
      }

      // Add scrolled styling
      setScrolled(true);

      // Scrolling DOWN → hide navbar
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setMenuOpen(false);
      }

      // Scrolling UP → show navbar
      if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-[#202020]
        transition-transform duration-500 ease-in-out
        ${
          showNavbar
            ? "translate-y-0"
            : "-translate-y-full"
        }
        ${
          scrolled
            ? "border-b border-slate-200/70 bg-white/90 py-3 shadow-sm backdrop-blur-md"
            : "bg-white/95 py-4"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* BRAND */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
            <Image
              src="/images/scl-logo.png"
              alt="Madhyabindu Sky Line Academy"
              fill
              sizes="44px"
              className="object-contain p-0.5"
              priority
            />
          </div>

          <div className="hidden min-[400px]:block">
            <p className="text-[14px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[15px]">
              Madhyabindu Skyline Academy
            </p>

            <p className="mt-1 text-[11px] font-medium tracking-wide text-slate-500">
              KAWASOTI · NAWALPUR
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center lg:flex text-[#202020]">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50/80 p-1">
            {links.map(([name, href]) => (
              <a
                key={name}
                href={href}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-slate-600 transition hover:bg-white hover:text-blue-700 hover:shadow-sm"
              >
                {name}
              </a>
            ))}
          </div>

          <a
            href="#admissions"
            className="ml-4 inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-[13px] font-semibold transition hover:bg-blue-800"
          >
            <span className="text-white">Apply Now</span>
            <span className="text-sm text-white">↗</span>
          </a>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`h-0.5 w-5 bg-slate-800 transition ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />

          <span
            className={`h-0.5 w-5 bg-slate-800 transition ${
              menuOpen ? "opacity-0" : ""
            }`}
          />

          <span
            className={`h-0.5 w-5 bg-slate-800 transition ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`absolute left-0 top-full w-full border-t border-slate-200 bg-white px-5 py-5 shadow-lg transition-all duration-200 lg:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col">
          {links.map(([name, href]) => (
            <a
              key={name}
              href={href}
              onClick={closeMenu}
              className="border-b border-slate-100 py-3.5 text-[15px] font-medium text-slate-700 transition hover:text-blue-700"
            >
              {name}
            </a>
          ))}

          <a
            href="#admissions"
            onClick={closeMenu}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold transition hover:bg-blue-800"
          >
            <span className="text-white">Apply Now</span>
            <span className="text-white">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
