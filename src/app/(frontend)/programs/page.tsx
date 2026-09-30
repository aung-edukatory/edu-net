import type { Metadata } from "next";
import CourseCatalog from "@/components/course/CourseCatalog";

const title = "Programs | ELS Pattaya";
const description =
  "Explore GED Foundation, Fast Track, and academic pathways at ELS Pattaya. Find a program to support your next step toward university.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/programs" },
  openGraph: {
    title,
    description,
    url: "/programs",
    siteName: "ELS Pattaya",
    type: "website",
  },
  twitter: { card: "summary", title, description },
};

export const dynamic = "force-dynamic";

export default function ProgramsPage() {
  return <CourseCatalog kind="programs" />;
}
