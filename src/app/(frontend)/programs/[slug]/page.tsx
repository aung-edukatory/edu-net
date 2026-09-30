import CourseDetailPage, { generateDetailMetadata } from "@/components/course/CourseDetailPage";
import { courseDetails } from "@/data/courses";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courseDetails.map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }: Props) {
  return generateDetailMetadata({ params, section: "programs" });
}

export default function Page({ params }: Props) {
  return <CourseDetailPage params={params} section="programs" />;
}
