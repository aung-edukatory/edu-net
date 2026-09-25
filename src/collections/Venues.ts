import type { CollectionConfig } from "payload";
import { authenticated } from "./access";

export const Venues: CollectionConfig = {
  slug: "venues",
  admin: {
    group: "Consultations",
    useAsTitle: "name",
    defaultColumns: ["name", "active"],
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: () => false,
  },
  fields: [
    { name: "name", type: "text", required: true, maxLength: 100 },
    { name: "active", type: "checkbox", defaultValue: true, required: true },
  ],
};
