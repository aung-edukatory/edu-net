import { resolveCampaign, type CampaignContext } from "./campaigns";

export const timeLabels = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};
export const programLabels = {
  ged: "GED Preparation",
  language: "Language Course",
  academic: "Academic Support",
  other: "Other",
};

export function localToday(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

// Appointments take place in Pattaya, independent of the server's timezone.
export function pattayaToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) =>
    parts.find((value) => value.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export type Consultation = {
  studentName: string;
  guardianName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: keyof typeof timeLabels;
  program: keyof typeof programLabels;
  notes: string;
  promoCode: string;
  campaign: CampaignContext | null;
};

type ValidationResult =
  { ok: true; value: Consultation } | { ok: false; message: string };

export function validateConsultation(
  input: unknown,
  today: string,
): ValidationResult {
  const fail = (message: string): ValidationResult => ({ ok: false, message });
  if (!input || typeof input !== "object" || Array.isArray(input))
    return fail("Invalid request body.");
  const body = input as Record<string, unknown>;
  const limits = {
    studentName: 100,
    guardianName: 100,
    phone: 50,
    email: 254,
    preferredDate: 10,
    preferredTime: 20,
    program: 30,
    notes: 2000,
    source: 7,
    sourceId: 64,
    promoCode: 64,
    establishment: 100,
  };
  for (const key of Object.keys(body)) {
    if (!Object.hasOwn(limits, key)) return fail("Invalid request body.");
    const value = body[key];
    if (
      typeof value !== "string" ||
      value.length > limits[key as keyof typeof limits] ||
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)
    )
      return fail("Please check your form fields and their length.");
    if (key !== "notes" && /[\r\n]/.test(value))
      return fail("Please check your form fields.");
  }
  const get = (key: string) =>
    typeof body[key] === "string" ? body[key].trim() : "";
  const studentName = get("studentName");
  if (!studentName) return fail("Please enter the student name.");
  const phone = get("phone").replace(/[\s()-]/g, "");
  if (!/^\+?[0-9]{7,15}$/.test(phone))
    return fail("Please enter a valid phone number.");
  const email = get("email");
  if (email && !/^[^\s@<>]+@[^\s@<>.]+(?:\.[^\s@<>.]+)+$/.test(email))
    return fail("Please enter a valid email address.");
  const preferredDate = get("preferredDate");
  const parsed = new Date(`${preferredDate}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) ||
    !Number.isFinite(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== preferredDate
  )
    return fail("Please choose a valid date.");
  if (preferredDate < today)
    return fail("Please choose today or a future date.");
  const preferredTime = get("preferredTime");
  const program = get("program");
  if (!Object.hasOwn(timeLabels, preferredTime))
    return fail("Please choose a supported consultation time.");
  if (!Object.hasOwn(programLabels, program))
    return fail("Please choose a supported program.");
  let campaign: CampaignContext | null = null;
  const promoCode = get("promoCode");
  if (promoCode && !/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(promoCode))
    return fail("Please enter a promo code using letters, numbers, hyphens or underscores.");
  if (get("source") === "qr") {
    if (!promoCode) return fail("Please enter a promo code.");
    campaign = resolveCampaign(body.sourceId);
    if (
      !campaign ||
      (body.establishment !== undefined &&
        get("establishment") !== campaign.establishment)
    )
      return fail("This consultation QR link is invalid.");
  } else if (
    (body.source !== undefined && get("source") !== "website") ||
    ["sourceId", "establishment"].some(
      (key) => body[key] !== undefined,
    )
  ) {
    return fail("This consultation QR link is invalid.");
  }
  return {
    ok: true,
    value: {
      studentName,
      guardianName: get("guardianName"),
      phone,
      email,
      preferredDate,
      preferredTime: preferredTime as keyof typeof timeLabels,
      program: program as keyof typeof programLabels,
      notes: get("notes"),
      promoCode,
      campaign,
    },
  };
}
