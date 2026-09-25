import type { Payload, PayloadRequest } from "payload";
import type { Consultation } from "./validation";
import { isPromoCode, normalizePromoCode } from "./campaigns";

export class PromoError extends Error {}

export async function lookupPromo(
  payload: Payload,
  input: string,
  req?: Partial<PayloadRequest>,
) {
  const code = normalizePromoCode(input);
  if (!isPromoCode(code))
    throw new PromoError("Please enter a valid promo code.");
  const result = await payload.find({
    collection: "promo-codes",
    where: { code: { equals: code } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
    req,
  });
  const promo = result.docs[0];
  if (!promo) throw new PromoError("This promo code is invalid or inactive.");
  if (promo.usedAt)
    throw new PromoError("This promo code has already been used.");
  const venue = promo.venue;
  if (!promo.active || !venue || typeof venue !== "object" || !venue.active)
    throw new PromoError("This promo code is invalid or inactive.");
  return { promo, venue };
}

async function findRequest(payload: Payload, requestKey: string) {
  const result = await payload.find({
    collection: "consultation-requests",
    where: { requestKey: { equals: requestKey } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  return result.docs[0];
}

export async function saveConsultation(payload: Payload, data: Consultation) {
  // A response lost in transit can be retried without consuming another code or sending another email.
  const previous = await findRequest(payload, data.requestKey);
  if (previous) return { request: previous, created: false };
  const transactionID = await payload.db.beginTransaction();
  if (transactionID == null)
    throw new Error("Consultations require database transactions.");
  const req = { transactionID };
  try {
    const match =
      data.source === "qr"
        ? await lookupPromo(payload, data.promoCode, req)
        : null;
    const request = await payload.create({
      collection: "consultation-requests",
      overrideAccess: true,
      req,
      data: {
        requestKey: data.requestKey,
        studentName: data.studentName,
        guardianName: data.guardianName,
        phone: data.phone,
        email: data.email || undefined,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        program: data.program,
        notes: data.notes,
        source: data.source,
        promo: match?.promo.id,
        promoCode: match?.promo.code || null,
        venue: match?.venue.id,
        establishment: match?.venue.name,
        notificationStatus: "pending",
      },
    });
    if (match)
      await payload.update({
        collection: "promo-codes",
        id: match.promo.id,
        overrideAccess: true,
        req,
        data: { usedAt: new Date().toISOString() },
      });
    await payload.db.commitTransaction(transactionID);
    return { request, created: true };
  } catch (error) {
    await payload.db.rollbackTransaction(transactionID);
    // Resolve races after rollback: unique indexes allow only one committed redemption.
    const previous = await findRequest(payload, data.requestKey);
    if (previous) return { request: previous, created: false };
    if (data.source === "qr") await lookupPromo(payload, data.promoCode);
    throw error;
  }
}
