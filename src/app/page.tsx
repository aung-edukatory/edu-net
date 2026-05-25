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

export default function Home() {
  return (
    <main id="top" className="bg-white text-[#10233f]">
      
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <CoursesSection />
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
