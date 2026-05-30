export const metadata = {
  title: "About Us | Edukatory",
  description: "Learn more about Edukatory and our mission.",
};

export default function AboutUsPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-[#f6f9fc] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#0f8b8d]">
            About ELS
          </p>
          <h1 className="text-4xl text-[#0b2349] md:text-5xl font-bold mb-6">
            A Premium Education and Language Pathway Center
          </h1>
          <p className="text-lg text-[#5f6f86] md:text-xl leading-8 max-w-4xl mx-auto">
            ELS supports students who need academic rebuilding, GED preparation,
            English development, and a structured pathway toward university and
            future opportunities.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-6 text-[#5f6f86] text-base md:text-lg leading-8">
          <p>
            ELS is a premium education and language pathway center focused on
            academic rebuilding, GED preparation, English development, and
            university progression for students seeking a more structured and
            supportive alternative to traditional education systems.
          </p>
          <p>
            We work with students from different backgrounds including those who
            struggled in traditional schools, need a fresh academic start, want a
            faster pathway to university, or simply learn better in a smaller and
            more focused environment.
          </p>
          <p>
            Alongside our GED and university pathway programs, ELS also offers
            English language programs designed to strengthen communication skills,
            academic English, confidence, and overall readiness for international
            education and future opportunities. Our language programs support
            students at different levels, from foundation English development to
            more advanced academic preparation.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#f6f9fc] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold text-[#0b2349] mb-5">
              More Than Exam Preparation
            </h2>
            <div className="space-y-5 text-[#5f6f86] leading-8">
              <p>
                At ELS, we do more than prepare students for exams. We help
                students rebuild confidence, improve discipline, strengthen
                academic foundations, and develop clear direction for their
                future.
              </p>
              <p>
                Every student begins with an assessment so we can understand
                their academic level, English proficiency, learning gaps, and
                overall readiness. Based on this, we place students into the
                program that best fits their goals and current situation.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm border border-[#e7edf5]">
            <h3 className="text-xl font-semibold text-[#0b2349] mb-5">
              Student Support Areas
            </h3>
            <ul className="space-y-4 text-[#5f6f86]">
              <li>Academic level and English proficiency assessment</li>
              <li>Learning gap identification and placement guidance</li>
              <li>Academic writing, IELTS, and SAT preparation support</li>
              <li>University planning, applications, and enrollment guidance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b2349] mb-5">
            Structured Pathways for Different Student Needs
          </h2>
          <p className="text-[#5f6f86] text-base md:text-lg leading-8">
            Our programs range from foundation level academic and language
            development to intensive GED and university preparation pathways.
            Depending on the program, students may also receive support with
            academic writing, IELTS or SAT preparation, university planning,
            applications, and enrollment guidance.
          </p>
        </div>
      </section>

      {/* Difference */}
      <section className="bg-[#f6f9fc] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#0b2349] mb-10">
            What Makes ELS Different
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Structured Systems",
                text: "Clear academic systems help students follow a managed pathway instead of casual tutoring.",
              },
              {
                title: "Progress Tracking",
                text: "Students are monitored closely so learning gaps, improvement, and readiness are easier to identify.",
              },
              {
                title: "Family Communication",
                text: "Close communication with families helps students stay accountable and continue progressing.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 shadow-sm border border-[#e7edf5]"
              >
                <h3 className="text-xl font-semibold text-[#0b2349] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#5f6f86] leading-7">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-8 md:p-10 shadow-sm border border-[#e7edf5]">
            <p className="text-[#5f6f86] text-base md:text-lg leading-8">
              What makes ELS different is our structured and managed approach. We
              are not a casual tutoring center or a place that simply gives
              worksheets and mock tests. We operate with clear academic systems,
              progress tracking, intervention support, and close communication
              with families to help students stay accountable and continue
              progressing.
            </p>
            <p className="mt-5 text-[#5f6f86] text-base md:text-lg leading-8">
              ELS is built for families looking for serious academic support,
              strong English development, clear direction, and a professionally
              managed pathway toward university and future opportunities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}