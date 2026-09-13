import type { CollectionConfig } from "payload";

import { authenticated } from "./access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    group: "Administration",
    useAsTitle: "email",
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
    unlock: ({ req }) =>
      req.user ? { id: { equals: req.user.id } } : false,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      maxLength: 100,
    },
  ],
};
