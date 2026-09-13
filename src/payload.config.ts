import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Courses } from "@/collections/Courses";
import { Graduates } from "@/collections/Graduates";
import { Media } from "@/collections/Media";
import { News } from "@/collections/News";
import { Partners } from "@/collections/Partners";
import { Testimonials } from "@/collections/Testimonials";
import { Users } from "@/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const requiredEnv = (name: "DATABASE_URL" | "PAYLOAD_SECRET") => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required.`);
  return value;
};

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: "/src/components/admin/Branding#Logo",
        Icon: "/src/components/admin/Branding#Icon",
      },
    },
    meta: {
      titleSuffix: " — ELS Content Manager",
      icons: {
        icon: [{ url: "/favicon.png", type: "image/png" }],
      },
    },
  },
  collections: [Users, Media, Graduates, Courses, News, Partners, Testimonials],
  db: postgresAdapter({
    pool: { connectionString: requiredEnv("DATABASE_URL") },
  }),
  editor: lexicalEditor(),
  secret: requiredEnv("PAYLOAD_SECRET"),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
