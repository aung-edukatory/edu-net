"use client";

import { useEffect, useRef, useState } from "react";
import { normalizePromoCode } from "@/lib/consultation/campaigns";

export type VerifiedPromo = { promoCode: string; establishment: string };

type Props = {
  disabled: boolean;
  verified: VerifiedPromo | null;
  onVerified: (promo: VerifiedPromo | null) => void;
};

export default function ConsultationPromoField({
  disabled,
  verified,
  onVerified,
}: Props) {
  const [code, setCode] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef<AbortController | null>(null);
  useEffect(() => () => pending.current?.abort(), []);

  const apply = async () => {
    pending.current?.abort();
    const controller = new AbortController();
    pending.current = controller;
    onVerified(null);
    setError("");
    setChecking(true);
    try {
      const response = await fetch("/api/consultation/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoCode: normalizePromoCode(code) }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (controller.signal.aborted) return;
      if (!response.ok) {
        setError(
          result.message ||
            "We couldn't verify your promo code. Please try again.",
        );
      } else {
        setCode(result.promoCode);
        onVerified({
          promoCode: result.promoCode,
          establishment: result.establishment,
        });
      }
    } catch {
      if (!controller.signal.aborted)
        setError("We couldn't verify your promo code. Please try again.");
    } finally {
      if (!controller.signal.aborted) setChecking(false);
    }
  };

  return (
    <div className="grid gap-3 sm:col-span-2">
      <label
        htmlFor="consultation-promo"
        className="text-sm font-bold text-[var(--navy)]"
      >
        Promo code
      </label>
      <div className="flex gap-2">
        <input
          id="consultation-promo"
          name="promoCode"
          type="text"
          maxLength={64}
          required
          disabled={disabled}
          value={code}
          autoCapitalize="characters"
          spellCheck={false}
          aria-describedby="consultation-promo-status"
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            pending.current?.abort();
            setChecking(false);
            setCode(event.target.value);
            setError("");
            onVerified(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (code.trim() && !checking && !disabled) void apply();
            }
          }}
          className="min-w-0 flex-1 rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--navy)]"
          placeholder="Enter promo code"
        />
        <button
          type="button"
          disabled={disabled || checking || !code.trim()}
          onClick={apply}
          className="rounded-md bg-[var(--navy)] px-4 py-3 text-sm font-bold text-white disabled:opacity-50"
        >
          {checking ? "Checking..." : "Apply"}
        </button>
      </div>
      <div id="consultation-promo-status" role="status" className="text-sm">
        {error ? (
          <p className="text-red-700">{error}</p>
        ) : verified ? (
          <div className="rounded-md border border-[var(--border)] bg-white px-4 py-3 text-[var(--navy)]">
            <p className="mb-2 text-green-700">Promo code verified</p>
            <dl>
              <dt className="font-bold">Venue / Establishment</dt>
              <dd>{verified.establishment}</dd>
            </dl>
          </div>
        ) : (
          <p className="text-[var(--muted)]">
            Apply your promo code to verify the venue before submitting.
          </p>
        )}
      </div>
    </div>
  );
}
