"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CalendarCheck, Send, X } from "lucide-react";
import {
  parseConsultationUrl,
  type CampaignContext,
} from "@/lib/consultation/campaigns";
import {
  pattayaToday,
  programLabels,
  timeLabels,
  validateConsultation,
} from "@/lib/consultation/validation";

export default function BookConsultationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [campaign, setCampaign] = useState<CampaignContext | null>(null);
  const [qrNotice, setQrNotice] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const submittingRef = useRef(false);

  const closeForm = useCallback(() => {
    if (submittingRef.current) return;
    setIsOpen(false);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage("");
    setQrNotice("");
    setCampaign(null);
  }, []);

  useEffect(() => {
    // Defer until hydration; cancellation also makes Strict Mode setup safe.
    const frame = requestAnimationFrame(() => {
      const url = new URL(window.location.href);
      const context = parseConsultationUrl(url.searchParams);
      if (!context.requested) return;
      setCampaign(context.campaign);
      setQrNotice(
        context.invalid
          ? "This consultation QR link is invalid. You can still book a normal consultation below."
          : "",
      );
      setIsOpen(true);
      for (const key of ["consultation", "source", "promo"])
        url.searchParams.delete(key);
      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = triggerRef.current;
    const origin =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(document.body.children)
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement && element !== dialog,
      )
      .map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => {
      element.inert = true;
    });
    const focusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]',
        ),
      ).filter((element) => element.getClientRects().length > 0);
    const keepFocus = (event: FocusEvent) => {
      if (!dialog.contains(event.target as Node))
        (focusable()[0] ?? dialog).focus();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeForm();
      }
      if (event.key === "Tab") {
        const controls = focusable();
        const first = controls[0];
        const last = controls.at(-1);
        if (!first) {
          event.preventDefault();
          dialog.focus();
        } else if (
          event.shiftKey &&
          (document.activeElement === first ||
            !controls.includes(document.activeElement as HTMLElement))
        ) {
          event.preventDefault();
          last?.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            !controls.includes(document.activeElement as HTMLElement))
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLInputElement>('[name="studentName"]')?.focus();
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", keepFocus);

    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", keepFocus);
      if (origin?.isConnected && origin !== document.body) origin.focus();
      else if (trigger?.isConnected) trigger.focus();
    };
  }, [isOpen, closeForm]);

  useEffect(() => {
    if (isSubmitted)
      dialogRef.current?.querySelector<HTMLElement>("[data-success]")?.focus();
  }, [isSubmitted]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current || isSubmitted) return;
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
      ...(campaign ?? { source: "website" }),
      ...(campaign ? { promoCode: formData.get("promoCode") } : {}),
    };
    const validation = validateConsultation(payload, pattayaToday());
    if (!validation.ok) {
      setErrorMessage(validation.message);
      return;
    }
    submittingRef.current = true;
    setIsSubmitting(true);

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

        setErrorMessage(
          response.status === 400 && data?.message
            ? data.message
            : "We couldn't send your consultation request. Please try again.",
        );
        return;
      }

      setIsSubmitted(true);
    } catch {
      setErrorMessage(
        "We couldn't send your consultation request. Please try again.",
      );
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const modal = isOpen ? (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex overflow-y-auto bg-[var(--navy)]/60 px-4 py-6 backdrop-blur-sm sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      aria-busy={isSubmitting}
      onClick={closeForm}
    >
      <div
        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(2,31,61,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-4 sm:px-6">
          <div>
            <h2
              id="consultation-modal-title"
              className="text-xl font-black tracking-[-0.04em] text-[var(--navy)]"
            >
              Book consultation
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Fill in your details and our admissions team will contact you.
            </p>
          </div>

          <button
            type="button"
            onClick={closeForm}
            disabled={isSubmitting}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--navy)] hover:text-[var(--navy)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--muted)]"
            aria-label="Close appointment form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="bg-[var(--surface)] px-5 py-8 sm:px-6">
            <div className="rounded-xl border border-[var(--border)] bg-white p-5 text-center">
              <CalendarCheck
                className="mx-auto h-10 w-10 text-[var(--navy)]"
                strokeWidth={2.1}
                aria-hidden="true"
              />
              <p
                data-success
                tabIndex={-1}
                role="status"
                className="mt-4 text-lg font-black text-[var(--navy)]"
              >
                Appointment request received
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Thank you. Our team will contact you shortly to confirm the
                appointment.
              </p>
              <button
                type="button"
                onClick={closeForm}
                className="mt-5 inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form
            className="grid gap-4 bg-[var(--surface)] px-5 py-5 sm:grid-cols-2 sm:px-6"
            onSubmit={handleSubmit}
          >
            {qrNotice ? (
              <p role="status" className="text-sm text-red-700 sm:col-span-2">
                {qrNotice}
              </p>
            ) : null}
            {campaign ? (
              <dl className="rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--navy)] sm:col-span-2">
                <dt className="font-bold">Venue / Establishment</dt>
                <dd>{campaign.establishment}</dd>
              </dl>
            ) : null}
            {campaign ? (
              <label className="grid gap-2 text-sm font-bold text-[var(--navy)] sm:col-span-2">
                Promo code
                <input
                  name="promoCode"
                  type="text"
                  maxLength={64}
                  required={Boolean(campaign)}
                  disabled={isSubmitting}
                  autoCapitalize="none"
                  spellCheck={false}
                  className="rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--navy)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--navy)]"
                  placeholder="Enter promo code"
                />
              </label>
            ) : null}
            <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">
              Student name
              <input
                name="studentName"
                maxLength={100}
                type="text"
                required
                disabled={isSubmitting}
                className="rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--navy)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--navy)]"
                placeholder="Enter student name"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">
              Parent / guardian name
              <input
                name="guardianName"
                maxLength={100}
                type="text"
                disabled={isSubmitting}
                className="rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--navy)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--navy)]"
                placeholder="Enter contact person"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">
              Phone number
              <input
                name="phone"
                maxLength={50}
                type="tel"
                required
                disabled={isSubmitting}
                className="rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--navy)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--navy)]"
                placeholder="+66 ..."
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">
              Email
              <input
                name="email"
                maxLength={254}
                type="email"
                disabled={isSubmitting}
                className="rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--navy)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--navy)]"
                placeholder="name@example.com"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">
              Preferred date
              <input
                name="preferredDate"
                min={pattayaToday()}
                type="date"
                required
                disabled={isSubmitting}
                aria-describedby="consultation-date-hint"
                onFocus={(event) => {
                  event.currentTarget.min = pattayaToday();
                }}
                onClick={(event) => {
                  const input = event.currentTarget;
                  input.min = pattayaToday();
                  try {
                    input.showPicker?.();
                  } catch {
                    // Keep native date entry available if the browser blocks opening.
                  }
                }}
                className="rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--navy)] outline-none transition-colors focus:border-[var(--navy)]"
              />

            </label>

            <label className="grid gap-2 text-sm font-bold text-[var(--navy)]">
              Preferred time
              <select
                name="preferredTime"
                required
                disabled={isSubmitting}
                className="rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--navy)] outline-none transition-colors focus:border-[var(--navy)]"
              >
                <option value="">Select time</option>
                {Object.entries(timeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-[var(--navy)] sm:col-span-2">
              Program of interest
              <select
                name="program"
                required
                disabled={isSubmitting}
                className="rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--navy)] outline-none transition-colors focus:border-[var(--navy)]"
              >
                <option value="">Select program</option>
                {Object.entries(programLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-[var(--navy)] sm:col-span-2">
              Notes
              <textarea
                name="notes"
                maxLength={2000}
                rows={4}
                disabled={isSubmitting}
                className="resize-none rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-[var(--navy)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--navy)]"
                placeholder="Tell us what you would like to discuss"
              />
            </label>

            {errorMessage ? (
              <p
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 sm:col-span-2"
              >
                {errorMessage}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 pt-1 sm:col-span-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-white px-5 py-3 text-sm font-bold text-[var(--muted)] transition-colors hover:border-[var(--navy)] hover:text-[var(--navy)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--muted)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
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
        ref={triggerRef}
        type="button"
        onClick={() => {
          setIsSubmitted(false);
          setErrorMessage("");
          setQrNotice("");
          setCampaign(null);
          setIsOpen(true);
        }}
        className="inline-flex items-center justify-center gap-3 rounded-md bg-[var(--gold)] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
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
