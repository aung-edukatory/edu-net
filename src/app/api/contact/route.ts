import { getPayload } from "payload";
import config from "@payload-config";
import {
  pattayaToday,
  validateConsultation,
} from "@/lib/consultation/validation";
import { readRequestBody } from "@/lib/consultation/request-body";
import { PromoError, saveConsultation } from "@/lib/consultation/service";
import { sendConsultationNotification } from "@/lib/consultation/notifications";

export async function POST(request: Request) {
  const parsed = await readRequestBody(request);
  if ("response" in parsed) return parsed.response;
  const result = validateConsultation(parsed.body, pattayaToday());
  if (!result.ok)
    return Response.json({ message: result.message }, { status: 400 });
  try {
    const payload = await getPayload({ config });
    const saved = await saveConsultation(payload, result.value);
    if (saved.created) {
      try {
        await sendConsultationNotification(payload, saved.request);
      } catch {
        // The saved request remains accepted even if persisting email status fails.
        payload.logger.error(
          `Consultation ${saved.request.id}: notification status could not be saved.`,
        );
      }
    }
    return Response.json({ message: "Appointment request received." });
  } catch (error) {
    if (error instanceof PromoError)
      return Response.json({ message: error.message }, { status: 400 });
    console.error("Consultation request could not be saved.");
    return Response.json(
      {
        message:
          "We couldn't save your consultation request. Please try again.",
      },
      { status: 503 },
    );
  }
}
