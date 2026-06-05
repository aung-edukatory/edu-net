"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";
import { CheckCircle2, Send, X } from "lucide-react";

type CourseEnquiryButtonProps = {
  courseSlug: string;
  courseTitle: string;
};

export default function CourseEnquiryButton({
  courseSlug,
  courseTitle,
}: CourseEnquiryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setIsSubmitting(false);
    setIsSubmitted(false);
    setErrorMessage("");
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      courseSlug,
      courseTitle,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;

        throw new Error(data?.message ?? "Could not send enquiry.");
      }

      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not send enquiry.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setIsSubmitted(false);
          setErrorMessage("");
        }}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Send enquiry
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex overflow-y-auto bg-[#0b2349]/60 px-4 py-6 backdrop-blur-sm sm:items-center sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-enquiry-title"
          onClick={closeModal}
        >
          <div
            className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(11,35,73,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#dfe6f0] px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0f8b8d]">
                  Course enquiry
                </p>
                <h2
                  id="course-enquiry-title"
                  className="mt-1 text-xl font-black tracking-[-0.04em] text-[#0b2349]"
                >
                  {courseTitle}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6f0] text-[#60708a] transition-colors hover:border-[#0b2349] hover:text-[#0b2349]"
                aria-label="Close enquiry form"
                autoFocus
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="bg-[#f5f8fc] px-5 py-8 sm:px-6">
                <div className="rounded-xl border border-[#dfe6f0] bg-white p-5 text-center">
                  <CheckCircle2
                    className="mx-auto h-10 w-10 text-[#0b2349]"
                    strokeWidth={2.1}
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-lg font-black text-[#0b2349]">
                    Enquiry sent
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#60708a]">
                    Thank you. Our team will review your enquiry and contact you
                    shortly.
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-5 inline-flex items-center justify-center rounded-md bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="grid gap-4 bg-[#f5f8fc] px-5 py-5 sm:px-6"
                onSubmit={handleSubmit}
              >
                <label className="grid gap-2 text-sm font-bold text-[#0b2349]">
                  Name
                  <input
                    name="name"
                    type="text"
                    required
                    className="rounded-md border border-[#dfe6f0] bg-white px-4 py-3 text-sm font-medium text-[#0b2349] outline-none transition-colors placeholder:text-[#8c9bb0] focus:border-[#0b2349]"
                    placeholder="Enter your name"
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
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    className="resize-none rounded-md border border-[#dfe6f0] bg-white px-4 py-3 text-sm font-medium text-[#0b2349] outline-none transition-colors placeholder:text-[#8c9bb0] focus:border-[#0b2349]"
                    placeholder="Tell us what you would like to know"
                  />
                </label>

                {errorMessage ? (
                  <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {errorMessage}
                  </p>
                ) : null}

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-md border border-[#dfe6f0] bg-white px-5 py-3 text-sm font-bold text-[#45566f] transition-colors hover:border-[#0b2349] hover:text-[#0b2349] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {isSubmitting ? "Sending..." : "Send enquiry"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
