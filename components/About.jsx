
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const points = [
  "ECD to Grade 10",
  "Co-educational education",
  "Student-focused learning",
  "Kawasoti, Nawalpur",
];

export default function About() {
  const sectionRef = useRef(null)
  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      { threshold: 0.15 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-slate-50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">

        {/* IMAGE SIDE */}
        <div
          className={`relative transition-all duration-1000 transform ${visible
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
            }`}
        >
          {/* Main image container */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-100 shadow-2xl shadow-slate-900/10 h-[420px] sm:h-[500px]">
            <Image
              src="/images/scl-logo.png"
              alt="Students at Madhyabindu Skyline Academy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 hover:scale-105"
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating experience card */}
          <div
            className={`absolute -bottom-7 left-5 rounded-2xl border border-white bg-white px-5 py-4 shadow-xl shadow-slate-900/10 transition-all delay-300 duration-700 transform sm:left-8 ${visible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
              }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-700">
                ✦
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Learning With Purpose
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Growing minds. Building character.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative frame line */}
          <div className="absolute -bottom-3 -right-3 -z-10 h-32 w-32 rounded-3xl border-2 border-blue-100 sm:-bottom-5 sm:-right-5" />
        </div>

        {/* CONTENT SIDE */}
        <div
          className={`transition-all duration-1000 transform ${visible
              ? "translate-x-0 opacity-100"
              : "translate-x-10 opacity-0"
            }`}
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-blue-600" />
            <span className="text-[11px] font-bold tracking-[0.18em] text-blue-700">
              ABOUT THE ACADEMY
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-5 max-w-xl text-4xl font-bold leading-[1.1] tracking-[-0.035em] text-slate-900 sm:text-5xl">
            A place where curiosity
            <span className="text-blue-700"> becomes confidence.</span>
          </h2>

          {/* Description */}
          <div className="mt-7 max-w-xl space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
            <p>
              Madhyabindu Skyline Academy is committed to providing
              students with a strong academic foundation while
              encouraging creativity, discipline, and personal growth.
            </p>
            <p>
              Our learning environment helps students develop the
              knowledge, confidence, and skills they need to prepare
              for their future.
            </p>
          </div>

          {/* Points Grid */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((point, index) => (
              <div
                key={point}
                className={`flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 transition-all duration-500 transform hover:border-blue-100 hover:bg-blue-50/50 ${visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                  }`}
                style={{
                  transitionDelay: `${400 + index * 100}ms`,
                }}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                  ✓
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Location detail */}
          <div className="mt-8 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="text-blue-600">●</span>
            Kawasoti, Nawalpur, Nepal
          </div>
        </div>
      </div>
    </section>
  );
}