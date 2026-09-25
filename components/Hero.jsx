
"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen lg:pt-0 pt-15 overflow-hidden bg-[#f8fafc]">

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/school-hero.jpg"
          alt=""
          className="h-full w-full object-cover"
        />

        {/* Elegant overlay */}
        <div className="absolute inset-0 bg-slate-950/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/25" />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />
      </div>

      {/* Decorative glow */}
      <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />

      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-20 pt-0 lg:px-8">

        <div className="max-w-4xl">

          {/* Badge */}
          <div
            className={`mb-7 transition-all duration-700 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-white/90 backdrop-blur-md sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
              LEARN WHAT MATTERS.
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white transition-all delay-100 duration-700 sm:text-6xl lg:text-7xl xl:text-[82px] ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Inspiring Young Minds,
            <br />

            <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-white bg-clip-text text-transparent">
              Building Bright Futures.
            </span>
          </h1>

          {/* Description */}
          <p
            className={`mt-7 max-w-2xl text-base leading-7 text-white/70 transition-all delay-200 duration-700 sm:text-lg sm:leading-8 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Madhyabindu Sky,ine Academy provides quality education
            from Early Childhood Development through Grade 12 in a
            caring, supportive, and inspiring environment.
          </p>

          {/* Buttons */}
          <div
            className={`mt-9 flex flex-col gap-3 transition-all delay-300 duration-700 sm:flex-row ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <a
              href="#about"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/20"
            >
              Explore Our School

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              Contact Us
            </a>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] font-medium tracking-[0.2em] text-white/40 sm:flex"
      >
        <span>SCROLL TO EXPLORE</span>

        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-1.5 w-1 rounded-full bg-white/70 animate-bounce" />
        </span>
      </a>

    </section>
  );
}
