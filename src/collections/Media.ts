import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "./access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
    useAsTitle: "alt",
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    mimeTypes: ["image/*"],
    adminThumbnail: "thumbnail",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, fit: "cover" },
      { name: "card", width: 960, height: 720, fit: "cover" },
    ],
  },
  fields: [
    {
      name: "alt",
      label: "Image description",
      type: "text",
      required: true,
      maxLength: 200,
    },
  ],
};
