"use client";

import { type FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarCheck, Send, X } from "lucide-react";

export default function BookConsultationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const closeForm = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      studentName: formData.get("studentName"),
      guardianName: formData.get("guardianName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      preferredDate: formData.get("preferredDate"),
      preferredTime: formData.get("preferredTime"),
      program: formData.get("program"),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;

        throw new Error(data?.message ?? "Could not submit appointment.");
      }

      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not submit appointment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const modal = isOpen ? (
    <div
      className="fixed inset-0 z-[100] flex overflow-y-auto bg-[#0b2349]/60 px-4 py-6 backdrop-blur-sm sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      onClick={closeForm}
    >
      <div
        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(11,35,73,0.28)]"
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
              Fill in your details and our admissions team will contact you.
            </p>
          </div>

          <button
            type="button"
            onClick={closeForm}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6f0] text-[#60708a] transition-colors hover:border-[#0b2349] hover:text-[#0b2349]"
            aria-label="Close appointment form"
            autoFocus
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="bg-[#f5f8fc] px-5 py-8 sm:px-6">
            <div className="rounded-xl border border-[#dfe6f0] bg-white p-5 text-center">
              <CalendarCheck
                className="mx-auto h-10 w-10 text-[#0b2349]"
                strokeWidth={2.1}
                aria-hidden="true"
              />
              <p className="mt-4 text-lg font-black text-[#0b2349]">
                Appointment request received
              </p>
              <p className="mt-2 text-sm leading-6 text-[#60708a]">
                Thank you. Our team will contact you shortly to confirm the
                appointment.
              </p>
              <button
                type="button"
                onClick={closeForm}
                className="mt-5 inline-flex items-center justify-center rounded-md bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form
            className="grid gap-4 bg-[#f5f8fc] px-5 py-5 sm:grid-cols-2 sm:px-6"
            onSubmit={handleSubmit}
          >
            <label className="grid gap-2 text-sm font-bold text-[#0b2349]">
              Student name
              <input
                name="studentName"
                type="text"
                required
                className="rounded-md border border-[#dfe6f0] bg-white px-4 py-3 text-sm font-medium text-[#0b2349] outline-none transition-colors placeholder:text-[#8c9bb0] focus:border-[#0b2349]"
                placeholder="Enter student name"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#0b2349]">
              Parent / guardian name
              <input
                name="guardianName"
                type="text"
                className="rounded-md border border-[#dfe6f0] bg-white px-4 py-3 text-sm font-medium text-[#0b2349] outline-none transition-colors placeholder:text-[#8c9bb0] focus:border-[#0b2349]"
                placeholder="Enter contact person"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#0b2349]">
              Phone number
              <input
                name="phone"
                type="tel"
                required
                className="rounded-md border border-[#dfe6f0] bg-white px-4 py-3 text-sm font-medium text-[#0b2349] outline-none transition-colors placeholder:text-[#8c9bb0] focus:border-[#0b2349]"
                placeholder="+66 ..."
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#0b2349]">
              Email
              <input
                name="email"
                type="email"
                className="rounded-md border border-[#dfe6f0] bg-white px-4 py-3 text-sm font-medium text-[#0b2349] outline-none transition-colors placeholder:text-[#8c9bb0] focus:border-[#0b2349]"
                placeholder="name@example.com"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#0b2349]">
              Preferred date
              <input
                name="preferredDate"
                type="date"
                required
                className="rounded-md border border-[#dfe6f0] bg-white px-4 py-3 text-sm font-medium text-[#0b2349] outline-none transition-colors focus:border-[#0b2349]"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#0b2349]">
              Preferred time
              <select
                name="preferredTime"
                required
                className="rounded-md border border-[#dfe6f0] bg-white px-4 py-3 text-sm font-medium text-[#0b2349] outline-none transition-colors focus:border-[#0b2349]"
              >
                <option value="">Select time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#0b2349] sm:col-span-2">
              Program of interest
              <select
                name="program"
                required
                className="rounded-md border border-[#dfe6f0] bg-white px-4 py-3 text-sm font-medium text-[#0b2349] outline-none transition-colors focus:border-[#0b2349]"
              >
                <option value="">Select program</option>
                <option value="ged">GED Preparation</option>
                <option value="language">Language Course</option>
                <option value="academic">Academic Support</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#0b2349] sm:col-span-2">
              Notes
              <textarea
                name="notes"
                rows={4}
                className="resize-none rounded-md border border-[#dfe6f0] bg-white px-4 py-3 text-sm font-medium text-[#0b2349] outline-none transition-colors placeholder:text-[#8c9bb0] focus:border-[#0b2349]"
                placeholder="Tell us what you would like to discuss"
              />
            </label>

            {errorMessage ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 sm:col-span-2">
                {errorMessage}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 pt-1 sm:col-span-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-md border border-[#dfe6f0] bg-white px-5 py-3 text-sm font-bold text-[#45566f] transition-colors hover:border-[#0b2349] hover:text-[#0b2349]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {isSubmitting ? "Sending..." : "Submit appointment"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsSubmitted(false);
          setErrorMessage("");
          setIsOpen(true);
        }}
        className="inline-flex items-center justify-center gap-3 rounded-md bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
      >
        <CalendarCheck
          className="h-5 w-5"
          strokeWidth={2.1}
          aria-hidden="true"
        />
        Book consultation
      </button>

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
