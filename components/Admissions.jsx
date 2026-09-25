
"use client";

import { useEffect, useRef, useState } from "react";

export default function Admissions() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="admissions"
      ref={sectionRef}
      className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-slate-950 py-20 sm:min-h-[620px] sm:py-24 lg:min-h-[680px] lg:py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl sm:h-96 sm:w-96" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl sm:h-[450px] sm:w-[450px]" />

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full flex flex-col gap-4 px-5 text-center sm:px-8 lg:px-10">

        {/* Label */}
        <div
          className={`transition-all duration-700 ${visible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
            }`}
        >
          <span className=" inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-blue-300 backdrop-blur-sm sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            ADMISSIONS
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-6  text-3xl font-bold leading-tight tracking-[-0.035em] text-white transition-all duration-700 delay-100 sm:mt-7 sm:text-5xl sm:leading-[1.08] lg:text-6xl ${visible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
            }`}
        >
          Give your child a place to{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-300 via-white to-blue-200 bg-clip-text text-transparent">
            learn, grow and dream.
          </span>
        </h2>

        {/* Description */}
        <p
          className={`mx-auto mt-5  text-sm leading-6 text-slate-400 transition-all duration-700 delay-200 sm:mt-6 sm:text-base sm:leading-7 ${visible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
            }`}
        >
          Our team is ready to help you
          take the next step.
        </p>

        {/* CTA */}
        <div
          className={`mt-8 transition-all duration-700 delay-300 sm:mt-9 ${visible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
            }`}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-950/40 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-blue-600/20 sm:px-7 sm:py-3.5"
          >
            Contact Academy

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}