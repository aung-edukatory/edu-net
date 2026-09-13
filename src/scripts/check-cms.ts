import { getPayload } from "payload";

import config from "@payload-config";

const payload = await getPayload({ config });
const collections = [
  "users",
  "media",
  "graduates",
  "courses",
  "news",
  "partners",
  "testimonials",
] as const;

for (const collection of collections) {
  const { totalDocs } = await payload.count({
    collection,
    overrideAccess: true,
  });
  payload.logger.info(`${collection}: ${totalDocs}`);
}

process.exit(0);
