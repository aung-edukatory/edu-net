import type { CollectionConfig, Field } from "payload";
import { authenticated } from "./access";
import { programLabels, timeLabels } from "@/lib/consultation/validation";
import { sendConsultationNotification } from "@/lib/consultation/notifications";

const stored = (field: Field): Field =>
  ({
    ...field,
    admin: { ...field.admin, readOnly: true },
    access: { create: () => false, update: () => false },
  }) as Field;

export const ConsultationRequests: CollectionConfig = {
  slug: "consultation-requests",
  admin: {
    group: "Consultations",
    useAsTitle: "studentName",
    defaultColumns: [
      "studentName",
      "establishment",
      "promoCode",
      "notificationStatus",
      "createdAt",
    ],
  },
  access: {
    read: authenticated,
    create: () => false,
    update: authenticated,
    delete: () => false,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, context }) => {
        if (doc.retryNotification && !context.notificationUpdate) {
          return sendConsultationNotification(req.payload, doc, req);
        }
        return doc;
      },
    ],
  },
  fields: [
    stored({ name: "requestKey", type: "text", required: true, unique: true }),
    stored({ name: "studentName", type: "text", required: true }),
    stored({ name: "guardianName", type: "text" }),
    stored({ name: "phone", type: "text", required: true }),
    stored({ name: "email", type: "email" }),
    stored({ name: "preferredDate", type: "text", required: true }),
    stored({
      name: "preferredTime",
      type: "select",
      required: true,
      options: Object.entries(timeLabels).map(([value, label]) => ({
        value,
        label,
      })),
    }),
    stored({
      name: "program",
      type: "select",
      required: true,
      options: Object.entries(programLabels).map(([value, label]) => ({
        value,
        label,
      })),
    }),
    stored({ name: "notes", type: "textarea" }),
    stored({
      name: "source",
      type: "select",
      required: true,
      options: ["website", "qr"],
    }),
    stored({
      name: "promo",
      type: "relationship",
      relationTo: "promo-codes",
      unique: true,
    }),
    // Immutable snapshot plus a unique index protects against simultaneous redemptions.
    stored({ name: "promoCode", type: "text", unique: true }),
    stored({ name: "venue", type: "relationship", relationTo: "venues" }),
    stored({ name: "establishment", type: "text" }),
    stored({
      name: "notificationStatus",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: ["pending", "sent", "failed"],
    }),
    stored({ name: "notifiedAt", type: "date" }),
    {
      name: "retryNotification",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "To retry a pending or failed email, check this box and save. The consultation and promo redemption remain unchanged.",
      },
    },
  ],
};
