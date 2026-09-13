import { Resend } from "resend";
import { consultationEmail } from "@/lib/consultation/email";
import {
  pattayaToday,
  validateConsultation,
} from "@/lib/consultation/validation";

const sendFailure =
  "We couldn't send your consultation request. Please try again.";
const MAX_BODY_BYTES = 16_384;

export async function POST(request: Request) {
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  ) {
    return Response.json(
      { message: "Please send a JSON request." },
      { status: 415 },
    );
  }
  let body: unknown;
  try {
    // Bound actual streamed bytes, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const decoder = new TextDecoder();
    let text = "";
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return Response.json(
          { message: "Request is too large." },
          { status: 413 },
        );
      }
      text += decoder.decode(value, { stream: true });
    }
    body = JSON.parse(text + decoder.decode());
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }
  const result = validateConsultation(body, pattayaToday());
  if (!result.ok)
    return Response.json({ message: result.message }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_SENDER_EMAIL;
  const to = process.env.CONTACT_RECEIVER_EMAIL;
  if (!apiKey || !from || !to) {
    console.error("Consultation email configuration is missing.");
    return Response.json({ message: sendFailure }, { status: 503 });
  }
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: result.value.email || undefined,
      ...consultationEmail(result.value),
    });
    if (error) throw error;
    return Response.json({ message: "Appointment request sent." });
  } catch (error) {
    console.error("Failed to send consultation email", error);
    return Response.json({ message: sendFailure }, { status: 502 });
  }
}
