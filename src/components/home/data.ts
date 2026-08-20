import type { IconKind } from "./types";

export const navigation = [
  // { label: "Home", href: "#top" },
  { label: "About", href: "/#about" },
  { label: "Courses", href: "/#courses" },
  { label: "Programs", href: "/#courses" },
  { label: "Teachers", href: "/#teachers" },
  { label: "News", href: "/#news" },
  { label: "Contact us", href: "/contact-us" },
];

export const siteIdentity = {
  name: "ELS",
  tagline: "GED • English • Academic Pathways",
  footerSummary:
    "ELS is a focused learning school helping students prepare for GED, improve English, and build the confidence needed for future academic success.",
  footerNote: "Guided learning for GED, English, and academic pathways.",
  copyright: "© 2026 Edukatory",
};

export const contactDetails = {
  hours: "Mon - Fri 8:30 - 7:00pm",
  phone: "033 045 413",
  phoneHref: "tel:+6633045413",
  whatsapp: "+66 65 502 2088",
  whatsappHref: "https://wa.me/66655022088",
  email: "admin@elspattaya.com",
  emailHref: "mailto:admin@elspattaya.com",
  instagram: "@edukatorylanguageschool",
  instagramHref: "https://www.instagram.com/edukatorylanguageschool/",
  facebook: "ELS Pattaya",
  facebookHref: "https://www.facebook.com/edukatorylanguageschool",
  locationShort: "Chaiyapruek 2, Pattaya 20150, Thailand",
  locationLong:
    "32/84-85 1-2F Moo 9, Chaiyapruek 2, Nongprue, Banglamung, Chon Buri 20150, Thailand",
  locationHref:
    "https://www.google.com/maps/search/?api=1&query=32%2F84-85%201-2F%20Moo%209%2C%20Chaiyapruek%202%2C%20Nongprue%2C%20Banglamung%2C%20Chon%20Buri%2020150%2C%20Thailand",
};

export const heroSpotlightLeadCard = {
  title: "A school built for focused progress",
  detail:
    "Structured classes, expert mentoring, and practical study support that empower every learner to achieve real, measurable results.",
  href: "#",
};

export const heroSpotlightActionCards: Array<{
  title: string;
  detail: string;
  href: string;
  icon: Extract<IconKind, "calendar" | "faq" | "usersRound">;
  tone: string;
}> = [
  {
    title: "PATHWAY CONSULTATION",
    detail: "Tell us about your goals and academic background. Our advisors will recommend the most suitable ELS pathway for you.",
    href: "#",
    icon: "usersRound",
    tone: "bg-[linear-gradient(145deg,#4f7cff_0%,#2f62ff_56%,#315cff_100%)]",
  },
  {
    title: "FAQ",
    detail:
      "Find answers to common questions about our programs, admissions, schedules, fees, and student support services.",
    href: "/faq",
    icon: "faq",
    tone: "bg-[linear-gradient(145deg,#9ed056_0%,#83bd42_55%,#79b63c_100%)]",
  },
  {
    title: "ACADEMIC CALENDAR",
    detail: "View intake dates, academic schedules, holidays, and exam periods to help you plan your learning journey.",
    href: "#",
    icon: "calendar",
    tone: "bg-[linear-gradient(145deg,#ff646c_0%,#ff4e59_55%,#ff4854_100%)]",
  },
];

export const upcomingEvents = [
  {
    title: "Free GED orientation",
    date: "May 12, 2026",
    detail: "Meet our advisors and choose the right starting level.",
  },
  {
    title: "English placement day",
    date: "May 20, 2026",
    detail: "Take a short level check and receive a study recommendation.",
  },
  {
    title: "Parent progress briefing",
    date: "June 02, 2026",
    detail: "Learn how Edukatory tracks weekly student improvement.",
  },
];

export const applicationCards = [
  {
    title: "Enroll at Edukatory",
    detail:
      "Start with a friendly consultation, level check, and a recommended study plan for your goal.",
    href: "#contact",
    label: "Book consultation",
  },
  {
    title: "Request a study plan",
    detail:
      "Tell us your timeline, target exams, and current level so our team can guide your next step.",
    href: "#contact",
    label: "Get guidance",
  },
];

export const featuredCourses = [
  {
    title: "GED Foundation Track",
    detail:
      "A paced start for learners who need academic structure, confidence, and a clear progression map.",
    meta: "12 weeks",
    mentor: "Robin Lucas",
    art: "linear-gradient(135deg, #f8cc62 0%, #f9f0d5 38%, #81b5ff 100%)",
  },
  {
    title: "Academic English Studio",
    detail:
      "Reading, writing, and speaking intensives shaped around practical communication and assessment goals.",
    meta: "16 weeks",
    mentor: "Nicky Gasang",
    art: "linear-gradient(135deg, #7fb4ff 0%, #d6e8ff 45%, #ffe9a8 100%)",
  },
  {
    title: "Junior Academic Bridge",
    detail:
      "A supportive program for younger learners building English, study habits, and school confidence.",
    meta: "10 weeks",
    mentor: "Ms. Daisy",
    art: "linear-gradient(135deg, #ffb4ad 0%, #fff0d9 42%, #94d7b2 100%)",
  },
];

export const facilityItems: Array<{
  title: string;
  detail: string;
  icon: Extract<IconKind, "campus" | "research" | "support">;
}> = [
  {
    title: "GED preparation",
    detail:
      "Step-by-step subject coaching, practice tests, and progress reports for GED candidates.",
    icon: "campus",
  },
  {
    title: "Academic mentoring",
    detail:
      "Personal guidance that helps students stay accountable and understand what to improve next.",
    icon: "support",
  },
  {
    title: "English confidence",
    detail:
      "Practical reading, writing, speaking, and vocabulary support for real academic growth.",
    icon: "research",
  },
];

export const teachers = [
  {
    name: "Ms. Krystal Escoto",
    role: "Administrator",
    image: "/team/ms-krystal.jpg",
  },
  {
    name: "Mr. Gene Vaughn",
    role: "English | Social Studies",
    image: "/team/gene.jpg",
  },
  {
    name: "Ms. Daisy",
    role: "Front Desk Manager",
    image: "/team/daisy.jpg",
  },
  {
    name: "Mr. Robin Lucas",
    role: "Math | Science",
    image: "/team/robin.jpg",
  },
  {
    name: "Ms. Sha Singh",
    role: "English | Social Studies",
    image: "/team/sha.jpg",
  },
];

export const partners = [
  {
    name: "Assumption University of Thailand",
    image: "/partners/assumption-university.png",
  },
  {
    name: "Bangkok University International",
    image: "/partners/bu-international.jpg",
  },
  {
    name: "Edukatory Partner Mark Navy",
    image: "/partners/site.png",
  },
  {
    name: "Edukatory Partner Mark Cyan",
    image: "/partners/site2.png",
  },
];

export const books = [
  {
    title: "Future Ready",
    author: "Campus edition",
    cover: "from-[#f3a339] via-[#ee7d3f] to-[#c65b2e]",
  },
  {
    title: "Practice & Progress",
    author: "Study workbook",
    cover: "from-[#7f9dd8] via-[#5879b9] to-[#304b82]",
  },
  {
    title: "Title Template",
    author: "Reading series",
    cover: "from-[#f0efe5] via-[#d8d6c6] to-[#9f9778]",
  },
  {
    title: "Space of Light",
    author: "Creative writing",
    cover: "from-[#1c2538] via-[#334d72] to-[#0c1017]",
  },
];

export const testimonials = [
  {
    quote:
      "I express my deep gratitude to my teachers for their support, encouragement and patience during the process of preparing for the GED test. Thanks to your efforts, difficult topics became understandable and the preparation became effective and motivating. You did not just explain the material, but inspired the study, therefore I believed in myself and the need for new heights. Your methodology, attentive attitude and individual approach played a decisive role in my success. Thank you for your work, care and dedication!",
    name: "Ekaterina M",
    role: "Parent",
  },
  {
    quote:
      "My daughter gets excellent schooling for GED here.",
    name: "Khun Nok",
    role: "Parent",
  },
  {
    quote:
      "I am impressed with your curriculum and teaching methods which is different from other schools. Well planned worksheets for practice make my child think beyond prescribed Textbooks.",
    name: "Kira Sims",
    role: "Parent",
  },
  {
    quote:
      "I am very happy that I found this learning center school, My speaking level has improved considerably due to the instructor's determination and encouragement whenever possible.",
    name: "Joey",
    role: "Student",
  },
  
];

export type NewsStory = {
  slug: string;
  title: string;
  detail: string;
  tag: string;
  image: string;
  content: string[];
};

export const newsStories: NewsStory[] = [
  {
    slug: "tips-to-grade-high-gpa-in-university-life",
    title: "Tips to grade high GPA in university life",
    detail:
      "A practical guide to time blocks, revision loops, and keeping ambitious coursework manageable.",
    tag: "Career guide",
    image: "/blog/Why-Learning-a-Second-Language-Boosts-Your-Career.png",
    content: [
      "Demo article text for this news detail page. Replace this paragraph later with the full article content, quotes, and any supporting information you want readers to see.",
      "A second demo paragraph can explain the main point of the story in more detail. For now, it is only here to prove the article layout, spacing, and route wiring are working correctly.",
      "Use this page as the structure for future posts. You can expand it with author names, publish dates, related stories, or a richer content source when the real articles are ready.",
    ],
  },
  {
    slug: "intercultural-communication-starts-in-class",
    title: "Intercultural communication starts in class",
    detail: "Why mixed projects create stronger speaking confidence.",
    tag: "Campus life",
    image: "/blog/Why-Learning-English-is-Important_.png",
    content: [
      "Demo article text for this news detail page. Replace this content with the real story once the editorial copy is available.",
      "This placeholder paragraph shows how body copy wraps inside the article template and helps confirm the route behaves like a real content page.",
      "You can later swap these paragraphs for CMS content, markdown, or hard-coded copy without changing the page structure.",
    ],
  },
  {
    slug: "study-makes-you-perfect-when-the-routine-is-real",
    title: "Study makes you perfect when the routine is real",
    detail: "How to build consistency with shorter, repeatable sessions.",
    tag: "Study habits",
    image: "/blog/English-Spelling-Confusing.png",
    content: [
      "Demo article text for this news detail page. It is intentionally simple and only exists to support the new detail route for the news section.",
      "This placeholder can later become a real article about study routines, revision methods, and practical academic consistency.",
      "For now, the page is focused on proving navigation from the homepage card title into a standalone news detail view.",
    ],
  },
  {
    slug: "technology-education-is-now-part-of-every-pathway",
    title: "Technology education is now part of every pathway",
    detail:
      "Digital research, presentation tools, and AI literacy now sit beside core subjects.",
    tag: "Innovation",
    image: "/blog/Why-Learning-English-is-Important_.png",
    content: [
      "Demo article text for this news detail page. The final version can describe how technology skills support academic progress and career readiness.",
      "A second placeholder paragraph gives the template enough depth to look like a true article instead of a single-card preview.",
      "When you are ready, replace these demo paragraphs with your real article body while keeping the same reusable news page layout.",
    ],
  },
];

export function getNewsStoryBySlug(slug: string) {
  return newsStories.find((story) => story.slug === slug);
}

type FooterLink = {
  label: string;
  href: string;
  disabled?: boolean;
};

export const footerLinks: Record<"school" | "support", FooterLink[]> = {
  school: [
    { label: "About us", href: "/about-us" },
    { label: "Campus life", href: "#"},
    { label: "Admissions", href: "#", disabled: true },
  ],
  support: [
    { label: "Courses Listings", href: "/#courses" },
    { label: "Events", href: "#" },
    { label: "Teachers", href: "/#teachers" },
    { label: "News", href: "/#news" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact us", href: "/contact-us" },
  ],
};

export const socialLinks: Array<{
  label: string;
  href: string;
  icon: Extract<IconKind, "briefcase" | "camera" | "users">;
}> = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/edukatorylanguageschool",
    icon: "users",
  },
  {
    label: "LinkedIn",
    href: "#top",
    icon: "briefcase",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/edukatorylanguageschool/?e=87cb269a-942b-48b3-8ace-186b4852bf09&g=5",
    icon: "camera",
  },
];
