
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PriorityNoticeModal() {
  const [notice, setNotice] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function checkPriorityNotice() {
      try {
        // Check if popup was already shown in this browser session
        const hasSeenNotice = sessionStorage.getItem("priority_notice_shown");
        if (hasSeenNotice) return;

        const res = await fetch("/api/notices/priority");

        if (!res.ok) return;

        const data = await res.json();


        if (data && data.image) {
          setNotice(data);
          setIsOpen(true);
          // Mark as shown for this session
          sessionStorage.setItem("priority_notice_shown", "true");
        }
      } catch (error) {
        console.error("Failed to load priority notice", error);
      }
    }

    checkPriorityNotice();
  }, []);

  if (!isOpen || !notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Notice Image */}
        <div className="relative h-72 w-full bg-slate-100">
          <Image
            src={notice.image}
            alt={notice.title || "Priority Notice"}
            fill
            className="object-contain"
          />
        </div>

        {/* Notice Content */}
        <div className="p-6">
          <span className="inline-block text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full mb-2">
            Important Announcement
          </span>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {notice.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {notice.text || notice.description}
          </p>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Got it, thanks!
          </button>
        </div>

      </div>
    </div>
  );
}