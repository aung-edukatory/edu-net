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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ course?: string | string[] }>;
}) {
  const { course } = await searchParams;
  return (
    <main id="top" className="bg-white text-[var(--navy)]">
      
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <CoursesSection initialTab={course === "junior" ? "Junior Courses" : "GED"} />
      <GedGraduatesSection />
      {/* <CampusSection /> */}
      <TeachersSection />
      <TeacherCtaSection />
      {/* <ResourcesSection /> */}
      <TestimonialsSection />
      <NewsSection />
      <PartnersSection />
     
    </main>
  );
}
