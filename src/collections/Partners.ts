import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "./access";

export const Partners: CollectionConfig = {
  slug: "partners",
  admin: {
    group: "Homepage",
    useAsTitle: "name",
    defaultColumns: ["name", "order", "_status"],
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
    { name: "logo", type: "upload", relationTo: "media", required: true },
    { name: "website", type: "text", maxLength: 500 },
    { name: "order", type: "number", required: true, defaultValue: 0, min: 0 },
  ],
};
