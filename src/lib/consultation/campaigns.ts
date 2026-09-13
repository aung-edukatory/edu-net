// Add venues here; names used in notifications must come from this mapping.
export const consultationSources: Record<string, { name: string }> = {
  cafe01: { name: "Cafe 01" },
};

export type CampaignContext = {
  source: "qr";
  sourceId: string;
  establishment: string;
};

// Resolve venue information for both URL parsing and server validation.
export function resolveCampaign(
  sourceId: unknown,
): CampaignContext | null {
  if (typeof sourceId !== "string") return null;
  const id = sourceId.trim();
  if (!Object.hasOwn(consultationSources, id)) return null;
  return {
    source: "qr",
    sourceId: id,
    establishment: consultationSources[id].name,
  };
}

export function parseConsultationUrl(params: URLSearchParams) {
  const requested = params.get("consultation") === "1";
  const unique = ["consultation", "source"].every(
    (key) => params.getAll(key).length === 1,
  );
  const campaign =
    requested && unique
      ? resolveCampaign(params.get("source"))
      : null;
  return { requested, campaign, invalid: requested && !campaign };
}
