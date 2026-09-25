
"use client";

import { useEffect, useRef, useState } from "react";

const information = [
  {
    number: "390+",
    title: "Students",
  },
  {
    number: "ECD–12",
    title: "Education",
  },
  {
    number: "Co-ed",
    title: "School",
  },
  {
    number: "Day",
    title: "School",
  },
];

export default function QuickInfo() {
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
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 -mt-10 px-5 sm:-mt-14 lg:px-8"
    >
      <div
        className={`mx-auto transition-all duration-700 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">

          <div className="grid grid-cols-2 md:grid-cols-4">

            {information.map((item, index) => (
              <div
                key={item.title + item.number}
                className={`group relative px-5 py-7 text-center transition-all duration-500 sm:px-8 sm:py-8 ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100 + 150}ms`,
                }}
              >
                {/* Vertical divider */}
                {index !== 0 && (
                  <div className="absolute left-0 top-1/2 hidden h-10 -translate-y-1/2 bg-slate-200 md:block w-px" />
                )}

                {/* Mobile divider */}
                {index > 1 && (
                  <div className="absolute left-1/2 top-0 h-px w-16 -translate-x-1/2 bg-slate-200 md:hidden" />
                )}

                <div className="transition-transform duration-300 group-hover:-translate-y-1">

                  <strong
                    className={`block text-2xl font-bold tracking-tight text-slate-900 transition-all duration-700 sm:text-3xl ${
                      visible
                        ? "scale-100 opacity-100"
                        : "scale-90 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${index * 100 + 250}ms`,
                    }}
                  >
                    {item.number}
                  </strong>

                  <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:text-xs">
                    {item.title}
                  </span>

                </div>

                {/* Small accent */}
                <div className="mx-auto mt-4 h-0.5 w-0 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-6" />
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
