export type CampaignContext = {
  source: "qr";
  sourceId: string;
  establishment: string;
};

export const normalizePromoCode = (value: string) => value.trim().toUpperCase();
export const isPromoCode = (value: string) =>
  /^[A-Z0-9][A-Z0-9_-]{0,63}$/.test(value);

export function parseConsultationUrl(params: URLSearchParams) {
  const requested = params.get("consultation") === "1";
  const qrPromo =
    requested &&
    params.getAll("consultation").length === 1 &&
    params.getAll("qrpromo").length === 1 &&
    params.get("qrpromo") === "1";
  return { requested, qrPromo };
}
