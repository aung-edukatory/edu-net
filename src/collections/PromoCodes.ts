import type { CollectionConfig } from "payload";
import { authenticated } from "./access";
import { isPromoCode, normalizePromoCode } from "@/lib/consultation/campaigns";

export const PromoCodes: CollectionConfig = {
  slug: "promo-codes",
  admin: {
    group: "Consultations",
    useAsTitle: "code",
    defaultColumns: ["code", "venue", "active", "usedAt"],
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: () => false,
  },
  fields: [
    {
      name: "code",
      type: "text",
      required: true,
      unique: true,
      maxLength: 64,
      access: { update: () => false },
      hooks: {
        beforeValidate: [
          ({ value }) =>
            typeof value === "string" ? normalizePromoCode(value) : value,
        ],
      },
      validate: (value: unknown) =>
        (typeof value === "string" && isPromoCode(normalizePromoCode(value))) ||
        "Use letters, numbers, hyphens or underscores (maximum 64 characters).",
      admin: {
        description:
          "Codes are permanent and can be redeemed once. Disable unused codes instead of deleting them.",
      },
    },
    {
      name: "venue",
      type: "relationship",
      relationTo: "venues",
      required: true,
      access: { update: () => false },
    },
    { name: "active", type: "checkbox", defaultValue: true, required: true },
    {
      name: "usedAt",
      type: "date",
      admin: { readOnly: true },
      access: { create: () => false, update: () => false },
    },
  ],
};
