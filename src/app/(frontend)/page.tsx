import {
  AboutSection,
  CampusSection,
  CoursesSection,
  FooterSection,
  GedGraduatesSection,
  HeroSection,
  NewsSection,
  PartnersSection,
  ResourcesSection,
  SiteHeader,
  StatsSection,
  TeacherCtaSection,
  TeachersSection,
  TestimonialsSection,
  TopBar,
} from "@/components/home";
import {
  getCmsCourseCards,
  getCmsGraduates,
  getCmsNews,
  getCmsPartners,
  getCmsTestimonials,
} from "@/lib/cms/content";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ course?: string | string[] }>;
}) {
  const { course } = await searchParams;
  const [courses, graduates, news, partners, testimonials] = await Promise.all([
    getCmsCourseCards(),
    getCmsGraduates(),
    getCmsNews(),
    getCmsPartners(),
    getCmsTestimonials(),
  ]);
  return (
    <main id="top" className="bg-white text-[var(--navy)]">
      
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <CoursesSection
        initialTab={course === "junior" ? "Junior Courses" : "GED"}
        courses={courses ?? undefined}
      />
      <GedGraduatesSection graduates={graduates ?? undefined} />
      {/* <CampusSection /> */}
      <TeachersSection />
      <TeacherCtaSection />
      {/* <ResourcesSection /> */}
      <TestimonialsSection items={testimonials ?? undefined} />
      <NewsSection stories={news ?? undefined} />
      <PartnersSection items={partners ?? undefined} />
     
    </main>
  );
}
