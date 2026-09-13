import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "./access";

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "News article", plural: "News & study tips" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "publishedAt", "featured", "_status"],
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { drafts: true },
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", type: "text", required: true, maxLength: 140 },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      maxLength: 160,
      validate: (value: string | null | undefined) =>
        !value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
          ? true
          : "Use lowercase letters, numbers, and hyphens only.",
    },
    { name: "tag", type: "text", required: true, maxLength: 60 },
    { name: "summary", type: "textarea", required: true, maxLength: 320 },
    { name: "coverImage", type: "upload", relationTo: "media", required: true },
    { name: "publishedAt", type: "date", required: true },
    { name: "featured", type: "checkbox", defaultValue: false },
    {
      name: "content",
      type: "array",
      required: true,
      minRows: 1,
      fields: [{ name: "paragraph", type: "textarea", required: true }],
    },
    { name: "seoDescription", type: "textarea", maxLength: 160 },
  ],
};
