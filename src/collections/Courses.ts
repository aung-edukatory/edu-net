import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "./access";

const paragraphs = (name: string, label: string) => ({
  name,
  label,
  type: "array" as const,
  fields: [{ name: "paragraph", type: "textarea" as const, required: true }],
});

export const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "order", "_status"],
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { drafts: true },
  defaultSort: ["category", "order"],
  fields: [
    { name: "title", type: "text", required: true, maxLength: 120 },
    {
      name: "cardTitle",
      label: "Homepage card title",
      type: "text",
      required: true,
      maxLength: 120,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      maxLength: 140,
      validate: (value: string | null | undefined) =>
        !value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
          ? true
          : "Use lowercase letters, numbers, and hyphens only.",
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: ["GED", "Junior Courses", "Adult Courses", "Corporate Courses"],
    },
    { name: "cardLabel", type: "text", required: true, maxLength: 40 },
    { name: "cardSummary", type: "textarea", required: true, maxLength: 220 },
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "order", type: "number", required: true, defaultValue: 0, min: 0 },
    { name: "subtitle", type: "textarea", maxLength: 320 },
    { name: "duration", type: "text", maxLength: 100 },
    paragraphs("overview", "Overview"),
    {
      name: "audience",
      label: "Who is this for?",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "sections",
      type: "array",
      fields: [
        { name: "heading", type: "text", required: true },
        paragraphs("content", "Paragraphs"),
      ],
    },
  ],
};
