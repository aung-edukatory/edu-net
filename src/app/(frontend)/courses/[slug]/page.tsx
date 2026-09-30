import CourseDetailPage, { generateDetailMetadata } from "@/components/course/CourseDetailPage";

type Props = { params: Promise<{ slug: string }> };

export function generateMetadata({ params }: Props) {
  return generateDetailMetadata({ params, section: "courses" });
}

export default function Page({ params }: Props) {
  return <CourseDetailPage params={params} section="courses" />;
}
