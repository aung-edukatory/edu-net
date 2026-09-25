import { Resend } from "resend";
import type { Payload, PayloadRequest } from "payload";
import type { ConsultationRequest } from "@/payload-types";
import { consultationEmail } from "./email";

/** Email failure must never undo an accepted consultation or redeem a second code. */
export async function sendConsultationNotification(
  payload: Payload,
  request: ConsultationRequest,
  req?: Partial<PayloadRequest>,
) {
  let status = request.notificationStatus;
  let notifiedAt = request.notifiedAt;
  if (status !== "sent") {
    try {
      const apiKey = process.env.RESEND_API_KEY;
      const from = process.env.CONTACT_SENDER_EMAIL;
      const to = process.env.CONTACT_RECEIVER_EMAIL;
      if (!apiKey || !from || !to)
        throw new Error("Email configuration is missing");
      const venue =
        typeof request.venue === "object" ? request.venue?.id : request.venue;
      const { error } = await new Resend(apiKey).emails.send(
        {
          from,
          to,
          replyTo: request.email || undefined,
          ...consultationEmail({
            studentName: request.studentName,
            guardianName: request.guardianName || "",
            phone: request.phone,
            email: request.email || "",
            preferredDate: request.preferredDate,
            preferredTime: request.preferredTime,
            program: request.program,
            notes: request.notes || "",
            source: request.source,
            requestKey: request.requestKey,
            promoCode: request.promoCode || "",
            campaign:
              request.source === "qr"
                ? {
                    source: "qr",
                    sourceId: String(venue),
                    establishment: request.establishment || "",
                  }
                : null,
          }),
        },
        { idempotencyKey: `consultation-${request.requestKey}` },
      );
      if (error) throw error;
      status = "sent";
      notifiedAt = new Date().toISOString();
    } catch {
      status = "failed";
      payload.logger.error(
        `Consultation ${request.id}: email notification failed; retry from CMS.`,
      );
    }
  }
  return payload.update({
    req,
    collection: "consultation-requests",
    id: request.id,
    overrideAccess: true,
    context: { notificationUpdate: true },
    data: { notificationStatus: status, notifiedAt, retryNotification: false },
  });
}
