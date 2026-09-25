
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const response = await fetch("/api/notices");

        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }

        const data = await response.json();

        const noticeList = Array.isArray(data) ? data : [];
        setNotices(noticeList.slice(0, 3));
      } catch (error) {
        console.error("Notice fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotices();
  }, []);

  return (
    <section
      id="notices"
      className="relative overflow-hidden flex justify-center items-center bg-slate-50 py-24 sm:py-28">

      <div className="relative flex flex-col justify-center items-center gap-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto flex justify-center items-center flex-col mb-16 max-w-3xl text-center">

          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Latest{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notices
            </span>
          </h2>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-52 animate-pulse bg-slate-200" />

                <div className="space-y-4 p-7">
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-6 w-4/5 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : notices.length === 0 ? (
          /* Empty state */
          <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
              📢
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No notices yet
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              There are no announcements available at the moment.
              Please check back soon.
            </p>
          </div>
        ) : (
          /* Notices */
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {notices.map((notice, index) => (
              <article
                key={notice._id}
                className="group relative flex translate-y-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-[0_20px_50px_rgba(79,70,229,0.14)]"
                style={{
                  animation: `noticeFadeUp 0.7s ease-out ${index * 150}ms both`,
                }}
              >
                {/* Top gradient line */}
                <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Image */}
                {notice.image ? (
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={notice.image}
                      alt={notice.title}
                      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-70" />

                    {/* Date badge */}
                    <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
                      <span className="text-xs font-bold text-indigo-600">
                        {notice.createdAt
                          ? new Date(
                            notice.createdAt
                          ).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                          : ""}
                      </span>
                    </div>

                    {/* Floating number */}
                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-xs font-bold text-white backdrop-blur-md">
                      0{index + 1}
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-200/30 blur-2xl" />

                    <span className="relative text-5xl transition-transform duration-500 group-hover:scale-110">
                      📢
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col p-7">

                  {/* Category */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />

                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                      Announcement
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="line-clamp-2 text-xl font-extrabold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
                    {notice.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                    {notice.description}
                  </p>

                </div>
              </article>
            ))}
          </div>
        )}

        {/* View All */}
        {!loading && (
          <div className="mt-14 flex justify-center">
            <Link
              href="/notices"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-600/20"
            >
              <span className="relative z-10">View All Notices</span>

              <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

              {/* Hover shine */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>
        )}
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes noticeFadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
