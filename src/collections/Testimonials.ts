import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "./access";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    group: "Homepage",
    description: "Testimonials shown in Why families choose Edukatory.",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order", "_status"],
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { drafts: true },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true, maxLength: 120 },
    { name: "role", type: "text", required: true, maxLength: 120 },
    { name: "quote", type: "textarea", required: true, maxLength: 3000 },
    { name: "order", type: "number", required: true, defaultValue: 0, min: 0 },
  ],
};
