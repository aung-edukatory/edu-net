import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "./access";

export const Graduates: CollectionConfig = {
  slug: "graduates",
  labels: { singular: "GED Graduate", plural: "GED Graduates" },
  admin: {
    group: "Homepage",
    useAsTitle: "name",
    defaultColumns: ["name", "year", "order", "_status"],
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { drafts: true },
  defaultSort: ["-year", "order"],
  fields: [
    { name: "name", type: "text", required: true, maxLength: 100 },
    { name: "year", type: "number", required: true, min: 2000, max: 2100 },
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "order", type: "number", required: true, defaultValue: 0, min: 0 },
  ],
};
