import type { Metadata } from "next";
import CourseCatalog from "@/components/course/CourseCatalog";

const title = "Courses | ELS Pattaya";
const description =
  "Explore English, Thai, and Chinese language courses for junior learners, adults, and organizations at ELS Pattaya.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/courses" },
  openGraph: {
    title,
    description,
    url: "/courses",
    siteName: "ELS Pattaya",
    type: "website",
  },
  twitter: { card: "summary", title, description },
};

export const dynamic = "force-dynamic";

export default function CoursesPage() {
  return <CourseCatalog kind="courses" />;
}
