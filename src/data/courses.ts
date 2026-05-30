export type CourseTab =
  | "GED"
  | "Junior Courses"
  | "Adult Courses"
  | "Corporate Courses";

export type CourseCard = {
  title: string;
  detail: string;
  mentor: string;
  meta: string;
  image: string;
  href: string;
};

export const courseTabs: CourseTab[] = [
  "GED",
  "Junior Courses",
  "Adult Courses",
  "Corporate Courses",
];

export const coursesByTab: Record<CourseTab, CourseCard[]> = {
  GED: [
    {
      title: "GED Foundation",
      detail: "16 weeks academic rebuilding program",
      mentor: "Foundation readiness for GED preparation",
      meta: "GED",
      image: "/courses/ged/ged-foundation.png",
      href: "/courses/ged-foundation",
    },
    {
      title: "GED Fast Track",
      detail: "Direct GED preparation for ready students",
      mentor: "Ages 15+ English Level: At least B1",
      meta: "GED",
      image: "/courses/ged/ged-fast-track.png",
      href: "/courses/ged-fast-track",
    },
    {
      title: "GED Pathway",
      detail: "Structured GED and university pathway support",
      mentor: "Academic planning and guided progression",
      meta: "GED",
      image: "/courses/ged/ged-pathway.png",
      href: "/courses/ged-pathway",
    },
    {
      title: "Complete Pathway",
      detail: "Comprehensive academic and university preparation pathway",
      mentor: "Academic support with progression guidance",
      meta: "GED",
      image: "/courses/ged/complete-pathway.png",
      href: "/courses/complete-pathway",
    },
    {
      title: "Complete Pathway Plus",
      detail: "Extended pathway support for stronger academic readiness",
      mentor: "Managed support for long-term student development",
      meta: "GED",
      image: "/courses/ged/complete-pathway-plus.png",
      href: "#",
    },
  ],
  "Junior Courses": [
    {
      title: "EDUKIDS ENGLISH ADVENTURE",
      detail: "Fun English learning for young learners",
      mentor: "Junior language development",
      meta: "Junior",
      image: "/courses/junior-course/edukids-english-adventure.png",
      href: "/courses/edukids-english-adventure",
    },
    {
      title: "EDUKIDS THAI ADVENTURE",
      detail: "Thai language learning for young learners",
      mentor: "Junior language development",
      meta: "Junior",
      image: "/courses/junior-course/edukids-thai-adventure.png",
      href: "/courses/edukids-thai-adventure",
    },
    {
      title: "EDUKIDS CHINESE ADVENTURE",
      detail: "Chinese language learning for young learners",
      mentor: "Junior language development",
      meta: "Junior",
      image: "/courses/junior-course/edukids-chinese-adventure.png",
      href: "/courses/edukids-chinese-adventure",
    },
    {
      title: "EDUKIDS ENGLISH WEEKENDER",
      detail: "Weekend English support for young learners",
      mentor: "Saturday learning option",
      meta: "Junior",
      image: "/courses/junior-course/edukids-english-weekender.png",
      href: "/courses/edukids-english-weekender",
    },
    {
      title: "EDUKIDS THAI WEEKENDER",
      detail: "Weekend Thai support for young learners",
      mentor: "Saturday learning option",
      meta: "Junior",
      image: "/courses/junior-course/edukids-thai-weekender.png",
      href: "/courses/edukids-thai-weekender",
    },
    {
      title: "EDUKIDS CHINESE WEEKENDER",
      detail: "Weekend Chinese support for young learners",
      mentor: "Saturday learning option",
      meta: "Junior",
      image: "/courses/junior-course/edukids-chinese-weekender.png",
      href: "/courses/edukids-chinese-weekender",
    },
  ],
  "Adult Courses": [
    {
      title: "EDU ENGLISH",
      detail: "English communication and confidence development",
      mentor: "Adult language program",
      meta: "Adult",
      image: "/courses/adjust-course/edu-english.png",
      href: "/courses/edu-english",
    },
    {
      title: "EDU THAI",
      detail: "Thai language support for adult learners",
      mentor: "Adult language program",
      meta: "Adult",
      image: "/courses/adjust-course/edu-thai.png",
      href: "/courses/edu-thai",
    },
    {
      title: "EDU CHINESE",
      detail: "Chinese language support for adult learners",
      mentor: "Adult language program",
      meta: "Adult",
      image: "/courses/adjust-course/edu-chinese.png",
      href: "/courses/edu-chinese",
    },
    {
      title: "EDU BUSINESS ENGLISH",
      detail: "Business English for professional communication",
      mentor: "Workplace communication support",
      meta: "Adult",
      image: "/courses/adjust-course/edu-business-english.png",
      href: "/courses/edu-business-english",
    },
    {
      title: "EDU ENGLISH ON-LINE",
      detail: "Online English learning for flexible study",
      mentor: "Online adult language program",
      meta: "Adult",
      image: "/courses/adjust-course/edu-english-online.png",
      href: "/courses/edu-english-online",
    },
    {
      title: "EDU BUSINESS ONLINE",
      detail: "Online Business English for professionals",
      mentor: "Online workplace communication support",
      meta: "Adult",
      image: "/courses/adjust-course/edu-business-online.png",
      href: "/courses/edu-business-online",
    },
  ],
  "Corporate Courses": [
    {
      title: "EDUCOR ENGLISH IN-SCHOOL",
      detail: "English language support delivered in school",
      mentor: "Institutional English program",
      meta: "Corporate",
      image: "/courses/copoerate-course/EDUCOR-English-In-school.png",
      href: "/courses/educor-english-in-school",
    },
    {
      title: "EDUCOR BUSINESS ENGLISH IN-SCHOOL",
      detail: "Business English support delivered in school",
      mentor: "Institutional business English program",
      meta: "Corporate",
      image: "/courses/copoerate-course/EDUCOR-Business-English-In-School.png",
      href: "/courses/educor-business-english-in-school",
    },
    {
      title: "EDUCOR ENGLISH ON-SITE",
      detail: "On-site English training for organizations",
      mentor: "Corporate language training",
      meta: "Corporate",
      image: "/courses/copoerate-course/EDUCOR-English-On-Site.png",
      href: "/courses/educor-english-on-site",
    },
    {
      title: "EDUCOR BUSINESS ENGLISH ON-SITE",
      detail: "On-site Business English training for organizations",
      mentor: "Corporate workplace communication training",
      meta: "Corporate",
      image: "/courses/copoerate-course/EDUCOR-Business-English-On-Site.png",
      href: "/courses/educor-business-english-on-site",
    },
  ],
};

export const courseDetails = [
  {
    slug: "ged-foundation",
    title: "GED Foundation Program",
    subtitle:
      "Not every student is ready for GED preparation. Starting too early can be expensive.",
    category: "GED",
    duration: "4 Months - 160 Hours",
    image: "/courses/ged/ged-foundation.png",
    overview: [
      "One of the biggest mistakes families make is enrolling a student into GED preparation before they are academically ready.",
      "The result is often predictable: low scores and repeated failures, frustration and loss of confidence, expensive retests, delayed university plans, and students giving up before reaching their goals.",
      "At Edukatory Language School (ELS), we take a different approach. We do not place students into GED preparation simply because they want to start. We first assess whether they are truly ready. If they are not, we rebuild the foundation first.",
      "The GED Foundation Program is a structured 16-week academic rebuilding program designed for students who need stronger English, Mathematics, Science, Social Studies, study habits, and academic confidence before entering GED preparation.",
      "This is not a GED test preparation course. It is a readiness program designed to prevent students from entering GED preparation before they have the skills needed to succeed.",
      "Our goal is simple: help students become academically stable, confident, and prepared for the demands of GED preparation and future university pathways.",
    ],
    whoIsThisFor: [
      "Students who have gaps in English, reading, or writing",
      "Students who struggle with Mathematics fundamentals",
      "Students who lack confidence in academic work",
      "Students who have been out of school for an extended period",
      "Students who need stronger study habits and discipline",
      "Students who are not yet ready for GED-level coursework",
      "Students who want a structured pathway instead of being pushed directly into GED preparation",
    ],
    sections: [
      {
        heading: "What Makes ELS Different?",
        content: [
          "Many programs focus only on helping students pass an exam. We focus on building students who can succeed beyond the exam.",
          "Every student receives structured daily instruction, weekly assessments, homework monitoring, attendance tracking, academic intervention when needed, progress reviews throughout the program, and placement decisions based on readiness, not guesswork.",
          "Students are not promoted simply because time has passed. Students progress when they demonstrate academic readiness.",
        ],
      },
      {
        heading: "What Students Will Build",
        content: [
          "English & Language Arts: students strengthen reading comprehension, academic vocabulary, grammar and sentence structure, writing skills, and critical thinking.",
          "Mathematics: students develop confidence in fractions and decimals, ratios and percentages, algebra foundations, geometry concepts, and problem solving.",
          "Science: students learn how to interpret graphs and charts, analyze information, understand scientific reasoning, and draw evidence-based conclusions.",
          "Social Studies: students improve their ability to read informational texts, analyze sources, understand civics and government concepts, interpret maps, charts, and data, and apply reasoning skills to real-world information.",
        ],
      },
      {
        heading: "More Than Academic Knowledge",
        content: [
          "Success in GED preparation requires more than subject knowledge.",
          "Students must also develop study discipline, independent learning habits, homework responsibility, focus and stamina, time management, and academic confidence.",
          "These skills are built into the program every week.",
        ],
      },
      {
        heading: "How Progress Is Measured",
        content: [
          "Students are continuously monitored through weekly assessments, homework completion tracking, attendance reviews, reading evaluations, writing evaluations, mathematics performance reviews, and academic readiness checkpoints.",
          "Families receive clear feedback when intervention or additional support is needed.",
        ],
      },
      {
        heading: "What Success Looks Like",
        content: [
          "By the end of the GED Foundation Program, students should be able to read and understand academic texts independently, write structured academic responses, apply foundational mathematics with confidence, interpret graphs, charts, and evidence, complete academic tasks with greater independence, and demonstrate readiness for GED preparation.",
          "Students who successfully meet readiness standards may progress into GED Fast Track, GED Pathway, Complete Pathway, or Complete Pathway Plus based on their assessment results and academic goals.",
        ],
      },
      {
        heading: "Start With an Assessment",
        content: [
          "Every student's journey begins with an Assessment & Placement Evaluation.",
          "This assessment identifies academic strengths, learning gaps, English proficiency level, GED readiness, and the recommended academic pathway.",
          "At the end of the assessment, families receive a clear recommendation based on evidence, not assumptions.",
        ],
      },
      {
        heading: "Not Sure If Your Child Is Ready for GED Preparation?",
        content: [
          "Book an Assessment & Placement Evaluation and receive a personalized academic pathway recommendation from the ELS academic team.",
          "Structured Pathways. Managed Progress.",
        ],
      },
    ],
  },
  {
    slug: "ged-fast-track",
    title: "GED Fast Track Program",
    subtitle: "Direct GED preparation for students ready to move forward.",
    category: "GED",
    duration: "4 Months - 200 Hours",
    image: "/courses/ged/ged-fast-track.png",
    overview: [
      "Not every student needs academic rebuilding. Some students already have the foundation they need and are ready to focus directly on passing the GED.",
      "The GED Fast Track Program is designed for students who are academically prepared and want a structured, performance-driven pathway toward GED completion.",
      "This is not a foundation program. This is direct GED preparation.",
      "Every lesson, assessment, practice session, and readiness checkpoint is designed around one objective: passing the GED and progressing toward the next stage of a student's educational journey.",
      "Our goal is not to place students into the fastest program. Our goal is to place them into the right program.",
    ],
    whoIsThisFor: [
      "Students who have sufficient English proficiency for GED-level learning",
      "Students who can complete independent academic work",
      "Students who have stable study habits and attendance",
      "Students who demonstrate foundational mathematics readiness",
      "Students who can work under timed conditions",
      "Students who are ready to begin direct GED preparation",
      "Students who require additional academic rebuilding may be recommended for the GED Foundation Program before entering Fast Track",
    ],
    sections: [
      {
        heading: "Why Students Fail the GED",
        content: [
          "Most GED failures are not caused by a lack of effort. They are often caused by weak reading stamina, poor time management during exams, inconsistent practice, weak mathematical reasoning, difficulty interpreting evidence, graphs, and data, lack of exposure to GED-style questions, and taking the exam before true readiness is achieved.",
          "Many students spend months studying without understanding how the GED is actually assessed. The result is repeated failures, expensive retests, delayed university plans, and loss of confidence.",
          "At ELS, preparation is structured around performance, not guesswork.",
        ],
      },
      {
        heading: "What Makes ELS Different?",
        content: [
          "Many GED programs focus on completing a textbook. We focus on readiness.",
          "Students do not progress because they finish lessons. Students progress because they demonstrate measurable performance under GED-style conditions.",
          "Every student receives structured GED curriculum, timed practice every week, GED-style assessments, error tracking systems, performance monitoring, academic intervention when required, and readiness reviews before testing approval.",
          "This creates accountability, consistency, and a clearer pathway toward successful GED completion.",
        ],
      },
      {
        heading: "What Students Will Master",
        content: [
          "Reasoning Through Language Arts (RLA): students develop reading comprehension, evidence-based analysis, vocabulary development, critical reading skills, constructed response writing, extended response preparation, and GED-level reading stamina.",
          "Mathematical Reasoning: students strengthen algebra, equations and inequalities, quantitative reasoning, geometry concepts, data analysis, calculator proficiency, and multi-step problem solving.",
          "Science: students learn to interpret scientific information, analyze graphs and data, evaluate evidence, understand experiments and variables, and apply scientific reasoning.",
          "Social Studies: students build the ability to analyze sources, interpret maps and charts, understand civics and government concepts, evaluate historical and economic information, and apply evidence-based reasoning.",
        ],
      },
      {
        heading: "Built for Real Exam Performance",
        content: [
          "The GED is not simply a knowledge test. It measures how effectively students can think, analyze, interpret, and perform under time pressure.",
          "That is why timed performance is built into the program from the beginning.",
          "Students regularly complete timed reading exercises, timed mathematics sets, GED-style practice sections, mixed-subject assessments, mock examinations, and readiness benchmarking.",
          "This helps students develop the confidence and stamina required for official testing.",
        ],
      },
      {
        heading: "Progress Is Measured",
        content: [
          "Every student is monitored through weekly assessments, homework compliance, attendance reviews, error tracking systems, reading performance analysis, mathematics performance analysis, timed practice results, and readiness checkpoints.",
          "Families receive clear academic feedback throughout the program.",
        ],
      },
      {
        heading: "Official GED Readiness Matters",
        content: [
          "One of the most important principles at ELS is simple: not every student should take the GED simply because they want to.",
          "Students must demonstrate readiness before official testing is recommended.",
          "This protects students from avoidable failures, unnecessary retest costs, academic frustration, and delayed educational plans.",
          "Our responsibility is not to send students to exams. Our responsibility is to send students when they are ready.",
        ],
      },
      {
        heading: "What Success Looks Like",
        content: [
          "Students who successfully complete the Fast Track Program should be able to handle GED-level reading passages confidently, solve GED-style mathematics problems independently, interpret graphs, charts, and evidence accurately, write evidence-based responses, manage timed testing conditions effectively, and demonstrate readiness for official GED examinations.",
        ],
      },
      {
        heading: "The Goal: GED Completion and Progression",
        content: [
          "The GED is not the destination. It is the bridge.",
          "For many students, successful GED completion leads to university applications, degree pathways, career progression, international education opportunities, and greater academic confidence and independence.",
          "The Fast Track Program is designed to help students reach that next stage as efficiently and responsibly as possible.",
        ],
      },
      {
        heading: "Start With an Assessment",
        content: [
          "Every student begins with an Assessment & Placement Evaluation.",
          "This evaluation identifies academic readiness, English proficiency, learning strengths, learning gaps, and the recommended pathway.",
          "At the end of the assessment, families receive a clear recommendation based on evidence and academic readiness.",
        ],
      },
      {
        heading: "Ready to Start Your GED Journey?",
        content: [
          "Book an Assessment & Placement Evaluation and discover whether the GED Fast Track Program is the right pathway for you.",
          "Structured Pathways. Managed Progress.",
        ],
      },
    ],
  },
  {
    slug: "ged-pathway",
    title: "GED Pathway Program",
    subtitle:
      "Complete your GED, prepare for university, and move forward with direction.",
    category: "GED",
    duration: "4 Months - 240 Hours",
    image: "/courses/ged/ged-pathway.png",
    overview: [
      "Passing the GED is important. But for most students, it is not the final goal. The real goal is what comes next: university, a degree, a future career, and a clear academic direction.",
      "The GED Pathway Program was designed for students who want more than exam preparation.",
      "It combines structured GED preparation with academic development and university pathway guidance, helping students build the skills, discipline, and confidence required for higher education.",
      "This is not simply GED tutoring. It is a structured transition program from GED preparation to university readiness.",
      "The GED Pathway Program was created to help students prepare for the GED while simultaneously developing the habits, skills, and academic maturity needed for university progression.",
    ],
    whoIsThisFor: [
      "Students who are academically ready for GED preparation",
      "Students who want structured guidance beyond the GED",
      "Students who need support developing academic discipline",
      "Students who want stronger writing and communication skills",
      "Students who require university pathway planning and discussion",
      "Students who want a more managed educational journey",
      "Students who require significant academic rebuilding may first be recommended for the GED Foundation Program",
    ],
    sections: [
      {
        heading: "Why GED Completion Alone Is Not Enough",
        content: [
          "Many students successfully pass the GED but struggle with what happens next.",
          "They may have questions such as which university to choose, what program fits their goals, whether they are academically ready for university-level work, how to improve writing and independent study skills, and what to do after passing the GED.",
          "Without direction, many students lose momentum after completing their exams.",
          "The GED Pathway Program was created to solve that problem by combining GED preparation with university readiness development.",
        ],
      },
      {
        heading: "The Difference Between Fast Track and Pathway",
        content: [
          "GED Fast Track is designed for students whose primary goal is GED completion. It focuses on direct GED preparation, exam performance, GED readiness, and structured test execution.",
          "GED Pathway is designed for students whose goal is GED completion and university progression.",
          "Pathway includes everything in Fast Track plus academic writing development, independent study reinforcement, university pathway discussions, academic goal planning, structured progress reviews, and university readiness development.",
          "The destination is different. Fast Track focuses on passing the GED. Pathway focuses on passing the GED and preparing students for what comes next.",
        ],
      },
      {
        heading: "What Makes ELS Different?",
        content: [
          "Many institutions prepare students for an exam. ELS prepares students for progression.",
          "Every student receives structured GED curriculum, weekly assessments, timed GED practice, academic monitoring, error tracking systems, performance reviews, readiness validation, and university pathway support.",
          "Students are not pushed toward testing because a schedule says they should be. Students move forward when readiness has been demonstrated.",
        ],
      },
      {
        heading: "What Students Will Develop",
        content: [
          "GED Academic Skills: students build competency in Reasoning Through Language Arts, Mathematical Reasoning, Science, and Social Studies.",
          "Reasoning Through Language Arts (RLA): students develop reading comprehension, evidence analysis, vocabulary development, critical reading, constructed response writing, and extended response preparation.",
          "Mathematical Reasoning: students strengthen algebra, equations and inequalities, geometry, data interpretation, quantitative reasoning, and calculator proficiency.",
          "Science: students develop scientific reasoning, data analysis, evidence evaluation, graph interpretation, and experimental understanding.",
          "Social Studies: students build source analysis, historical reasoning, civics and government concepts, economic reasoning, and evidence-based interpretation.",
        ],
      },
      {
        heading: "University Readiness Development",
        content: [
          "Success at university requires more than passing an exam.",
          "Students must learn how to work independently, manage deadlines, read longer academic materials, organize written responses, develop study discipline, and take responsibility for their learning.",
          "These expectations are built into the Pathway Program throughout the learning process.",
        ],
      },
      {
        heading: "Academic Writing Support",
        content: [
          "One of the most common challenges students face after GED completion is academic writing.",
          "The Pathway Program includes structured writing development designed to strengthen paragraph organization, evidence-based writing, argument development, academic communication, and written reasoning.",
          "These skills support both university readiness and long-term academic success.",
        ],
      },
      {
        heading: "Built Around Real Performance",
        content: [
          "The GED is not passed through memorization. It is passed through reasoning, analysis, and performance under timed conditions.",
          "Students complete timed reading practice, timed mathematics practice, GED-style assessments, mock examinations, performance reviews, and readiness benchmarking.",
          "This helps students build confidence before official testing.",
        ],
      },
      {
        heading: "Progress Is Measured",
        content: [
          "Every student is monitored through weekly assessments, attendance reviews, homework tracking, reading performance analysis, writing development reviews, mathematics performance reviews, timed practice monitoring, and university readiness discussions.",
          "Families receive structured feedback throughout the program.",
        ],
      },
      {
        heading: "No Fake Readiness",
        content: [
          "At ELS, readiness is earned. Students are not approved for official GED testing simply because they completed a course.",
          "Students must demonstrate stable attendance, consistent homework completion, successful timed practice, academic readiness, and GED Ready benchmarking.",
          "This protects students from avoidable failures, unnecessary retests, and delayed educational plans.",
        ],
      },
      {
        heading: "What Success Looks Like",
        content: [
          "By the end of the GED Pathway Program, students should be able to handle GED-level academic work confidently, complete official GED examinations with readiness, write structured academic responses, work independently with greater confidence, demonstrate stronger study habits, understand their university options, and transition into higher education with a clearer plan.",
        ],
      },
      {
        heading: "The Goal: A Stronger Transition to University",
        content: [
          "The GED is not the finish line. It is the bridge.",
          "The GED Pathway Program helps students move from uncertainty to direction, preparation to qualification, and GED student to university applicant.",
          "For families seeking a more complete academic journey, Pathway provides the structure, accountability, and support required to move forward with confidence.",
        ],
      },
      {
        heading: "Start With an Assessment",
        content: [
          "Every student begins with an Assessment & Placement Evaluation.",
          "This assessment identifies academic readiness, English proficiency, learning strengths, learning gaps, university progression goals, and the recommended pathway.",
          "At the end of the assessment, families receive a clear recommendation based on evidence, readiness, and long-term educational objectives.",
        ],
      },
      {
        heading: "Looking Beyond the GED?",
        content: [
          "Book an Assessment & Placement Evaluation and discover whether the GED Pathway Program is the right next step toward university progression.",
          "Structured Pathways. Managed Progress.",
        ],
      },
    ],
  },
  {
    slug: "complete-pathway",
    title: "Complete Pathway Program",
    subtitle:
      "An intensive GED-to-university preparation program for students ready to accelerate.",
    category: "GED",
    duration: "2 Months - 160 Hours",
    image: "/courses/ged/complete-pathway.png",
    overview: [
      "Some students need more than weekly classes. They need a focused, intensive, and highly managed academic pathway designed to move them from GED preparation toward university progression as efficiently as possible.",
      "The Complete Pathway Program is ELS's premium intensive academic pathway.",
      "It combines GED preparation, academic monitoring, university planning support, and official GED testing into a single managed program designed for students who are serious about accelerating their educational goals.",
      "This is not casual tutoring. This is a structured academic execution program.",
      "Many students have already made the decision to pursue higher education. What they need is a clear system to help them get there.",
    ],
    whoIsThisFor: [
      "Students who want intensive GED preparation",
      "Students who need close academic monitoring",
      "Students who want university planning support",
      "Students who prefer a faster and more structured pathway",
      "Students who are committed to achieving measurable progress",
      "Students who need accountability and direction",
    ],
    sections: [
      {
        heading: "What Makes Complete Pathway Different?",
        content: [
          "Unlike traditional GED preparation programs, Complete Pathway combines multiple stages of the student journey into one managed system.",
          "Students receive intensive GED preparation, structured academic monitoring, university pathway planning, academic writing support, mock testing and readiness validation, official GED test attempts included, academic progress reviews, and guided progression toward university readiness.",
          "The focus is not simply passing an exam. The focus is preparing students for what comes after the exam.",
        ],
      },
      {
        heading: "Intensive Academic Support",
        content: [
          "Reasoning Through Language Arts (RLA): students receive focused instruction in reading comprehension, evidence-based analysis, academic writing, constructed responses, and extended response preparation.",
          "Mathematical Reasoning: students strengthen algebra, quantitative reasoning, geometry, data analysis, and GED problem-solving strategies.",
          "Science: students develop scientific reasoning, graph interpretation, evidence evaluation, and data analysis.",
          "Social Studies: students develop source analysis, historical reasoning, civics and government concepts, and economic reasoning.",
        ],
      },
      {
        heading: "Official GED Testing Included",
        content: [
          "One of the key advantages of Complete Pathway is that the first official GED testing attempts are included within the program.",
          "Students do not simply study. They prepare, validate readiness, and progress toward official testing through a structured process.",
          "Every testing recommendation is supported by academic evidence and readiness benchmarks.",
        ],
      },
      {
        heading: "University Planning Support",
        content: [
          "Passing the GED is only part of the journey.",
          "Students also receive university pathway discussions, goal clarification sessions, academic progression planning, educational direction support, and transition preparation for higher education.",
          "This helps students make informed decisions about what comes next.",
        ],
      },
      {
        heading: "The Goal",
        content: [
          "The objective of Complete Pathway is simple: move students from GED preparation to university readiness through a structured, intensive, and highly managed academic pathway.",
        ],
      },
      {
        heading: "Start With an Assessment",
        content: [
          "Every student begins with an Assessment & Placement Evaluation.",
          "This allows the ELS academic team to determine readiness, identify learning gaps, and recommend the most appropriate pathway.",
        ],
      },
      {
        heading: "Ready to Accelerate Your Academic Journey?",
        content: [
          "Book an Assessment & Placement Evaluation and discover whether Complete Pathway is the right fit for your goals.",
          "Structured Pathways. Managed Progress.",
        ],
      },
    ],
  },
];