
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin authentication
  const [isAdmin, setIsAdmin] = useState(false);

  // Delete states
  const [deleteNotice, setDeleteNotice] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Error
  const [error, setError] = useState("");

  // Fetch notices + check admin
  useEffect(() => {
    async function loadPage() {
      try {
        setLoading(true);

        // Fetch notices and authentication at the same time
        const [noticeResponse, authResponse] = await Promise.all([
          fetch("/api/notices"),
          fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
          }),
        ]);

        if (!noticeResponse.ok) {
          throw new Error("Failed to load notices");
        }

        const noticeData = await noticeResponse.json();

        setNotices(
          Array.isArray(noticeData) ? noticeData : []
        );

        // If /api/auth/me succeeds, user is authenticated.
        // Your backend should make sure this endpoint only succeeds
        // for an admin/staff account.
        if (authResponse.ok) {
          const user = await authResponse.json();

          if (user?.role == "admin") {

            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Failed to load notices:", err);
        setError("Unable to load notices.");
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, []);

  // Delete notice
  async function handleDelete() {
    if (!deleteNotice) return;

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/notices/${deleteNotice._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.status === 401 || response.status === 403) {
        setIsAdmin(false);
        setError("You are not authorized to delete this notice.");
        setDeleteNotice(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      // Remove from UI immediately
      setNotices((currentNotices) =>
        currentNotices.filter(
          (notice) => notice._id !== deleteNotice._id
        )
      );

      setDeleteNotice(null);
    } catch (err) {
      console.error("Delete notice error:", err);
      setError("Failed to delete the notice. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="relative min-h-screen flex justify-center overflow-hidden w-full bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">

      <Link
        href="/"
        className="inline-flex absolute right-2 top-2 items-center gap-2 px-4 py-2 text-sm font-medium text-slate-900 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-600 hover:text-indigo-600 hover:shadow-md transition-all duration-200"
      >
        <span className="text-black">Home</span>
        <span>🏠</span>
      </Link>

      <div className="relative mx-auto flex flex-col justify-center max-w-6xl">

        {/* Header */}
        <header className="mb-14 text-center flex flex-col items-center gap-4 animate-[fadeDown_0.6s_ease-out]">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-600" />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Stay Updated
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            School{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notices
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Important announcements, examination schedules,
            events, and updates from our school.
          </p>

        </header>

        {/* Error */}
        {error && (
          <div className="mx-auto mb-8 flex max-w-3xl items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 animate-[fadeUp_0.3s_ease-out]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100">
              !
            </span>

            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-56 animate-pulse bg-slate-200" />

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
          /* Empty */
          <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm animate-[fadeUp_0.6s_ease-out]">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
              📢
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              No notices available
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              There are currently no announcements to display.
              Please check back later.
            </p>
          </div>
        ) : (
          /* Notice Grid */
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

            {notices.map((notice, index) => (
              <article
                key={notice._id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-[0_20px_50px_rgba(79,70,229,0.14)]"
                style={{
                  animation: `fadeUp 0.65s ease-out ${index * 100
                    }ms both`,
                }}
              >
                {/* Top hover line */}
                <div className="absolute left-0 right-0 top-0 z-20 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Image */}
                {notice.image ? (
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={notice.image}
                      alt={notice.title}
                      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Date */}
                    <div className="absolute bottom-4 left-4 rounded-xl border border-white/30 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
                      <span className="text-xs font-bold text-indigo-600">
                        {notice.createdAt
                          ? new Date(
                            notice.createdAt
                          ).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                          : ""}
                      </span>
                    </div>

                    {/* Admin delete */}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteNotice(notice); console.log(notice, 's');
                        }
                        }
                        aria-label="Delete notice"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-5 w-5"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v5" />
                          <path d="M14 11v5" />
                        </svg>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">

                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-200/40 blur-2xl" />

                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm transition-transform duration-500 group-hover:scale-110">
                      📢
                    </div>

                    {/* Delete */}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteNotice(notice)
                        }
                        aria-label="Delete notice"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-md transition-all duration-300 hover:scale-110 hover:bg-red-50 hover:text-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-5 w-5"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v5" />
                          <path d="M14 11v5" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col p-7">

                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />

                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                      Announcement
                    </span>
                  </div>

                  <h2 className="line-clamp-2 text-xl font-extrabold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
                    {notice.title}
                  </h2>

                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-500">
                    {notice.text ||
                      notice.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="border-t border-slate-100 pt-5">
                      <span className="text-xs font-medium text-slate-400">
                        Official School Notice
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteNotice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm animate-[modalFade_0.2s_ease-out]"
          onClick={() => {
            if (!deleting) {
              setDeleteNotice(null);
            }
          }}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-white/20 bg-white p-6 shadow-2xl animate-[modalUp_0.3s_ease-out] sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v5" />
                <path d="M14 11v5" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Delete this notice?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This action cannot be undone. The following notice
              will be permanently removed:
            </p>

            {/* Notice being deleted */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="line-clamp-2 text-sm font-bold text-slate-800">
                {deleteNotice.title}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteNotice(null)}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Deleting...
                  </>
                ) : (
                  <>
                    Delete
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeDown {
                    from {
                        opacity: 0;
                        transform: translateY(-15px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes modalFade {
                    from {
                        opacity: 0;
                    }

                    to {
                        opacity: 1;
                    }
                }

                @keyframes modalUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.97);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
    </main>
  );
}
