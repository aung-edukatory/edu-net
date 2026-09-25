import { getPayload } from "payload";
import config from "@payload-config";
import { lookupPromo, PromoError } from "@/lib/consultation/service";
import { readRequestBody } from "@/lib/consultation/request-body";

export async function POST(request: Request) {
  const parsed = await readRequestBody(request);
  if ("response" in parsed) return parsed.response;
  const body = parsed.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("promoCode" in body) ||
    typeof body.promoCode !== "string" ||
    body.promoCode.length > 64
  )
    return Response.json(
      { message: "Please enter a valid promo code." },
      { status: 400 },
    );
  try {
    const payload = await getPayload({ config });
    const { promo, venue } = await lookupPromo(payload, body.promoCode);
    return Response.json({ promoCode: promo.code, establishment: venue.name });
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof PromoError
            ? error.message
            : "We couldn't verify your promo code. Please try again.",
      },
      { status: error instanceof PromoError ? 400 : 503 },
    );
  }
}
