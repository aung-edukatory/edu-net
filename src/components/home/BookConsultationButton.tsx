"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, X } from "lucide-react";

const CONSULTATION_CALENDAR_URL =
  "https://calendar.google.com/calendar/embed?src=krystal%40edukatory.com&ctz=Asia%2FBangkok";

export default function BookConsultationButton() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-3 rounded-md bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
      >
        <CalendarCheck
          className="h-5 w-5"
          strokeWidth={2.1}
          aria-hidden="true"
        />
        Book consultation
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex overflow-y-auto bg-[#0b2349]/60 px-4 py-6 backdrop-blur-sm sm:items-center sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-modal-title"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="my-auto w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-[0_32px_80px_rgba(11,35,73,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#dfe6f0] px-5 py-4 sm:px-6">
              <div>
                <h2
                  id="consultation-modal-title"
                  className="text-xl font-black tracking-[-0.04em] text-[#0b2349]"
                >
                  Book consultation
                </h2>
                <p className="mt-1 text-sm text-[#60708a]">
                  Select an available time from our Google Calendar.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6f0] text-[#60708a] transition-colors hover:border-[#0b2349] hover:text-[#0b2349]"
                aria-label="Close consultation calendar"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-[#f5f8fc] p-2 sm:p-3">
              <iframe
                src={CONSULTATION_CALENDAR_URL}
                title="Edukatory consultation calendar"
                className="h-[70vh] min-h-[360px] w-full rounded-[24px] bg-white sm:min-h-[500px]"
                style={{ border: 0 }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
