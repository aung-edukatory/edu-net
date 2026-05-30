import Container from "@/components/Container";

import { applicationCards, upcomingEvents } from "./data";
import Icon from "./Icon";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24">
      <div className="absolute right-[-5rem] top-10 h-52 w-52 rounded-full bg-[#ffbf1f]/16 blur-3xl" />
      <Container className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
        <div className="max-w-xl">
          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[#0b2349] sm:text-4xl">
            Welcome to ELS
          </h2>
          <p className="mt-5 text-base leading-8 text-[#5f6f86]">
            ELS is a premium education and language pathway center specializing in GED preparation, English
            programs, academic rebuilding, and university progression.
          </p>
          <p className="mt-4 text-base leading-8 text-[#5f6f86]">
            We support students who need a more structured and supportive alternative to traditional education
            through personalized assessments, guided academic pathways, and professionally managed support
            systems.
          </p>
          <p className="mt-4 text-base leading-8 text-[#5f6f86]">
            At ELS, we focus not only on academic results, but also on building confidence, discipline, communication
            skills, and long term educational direction for every student.
          </p>
          <a
            href="/about-us"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
          >
            Learn more
            <Icon kind="arrow" className="h-4 w-4" />
          </a>
        </div>

        <div className="relative rounded-[30px] border border-[#e4eaf3] bg-white p-8 shadow-[0_24px_60px_rgba(11,35,73,0.08)]">
          <div className="mt-8 space-y-6">
            {upcomingEvents.map((event) => (
              <article
                key={event.title}
                className="border-b border-[#edf1f6] pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ae10]">
                      {event.date}
                    </div>
                    <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-[#0b2349]">
                      {event.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#eef3fb] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#60708a]">
                    On site
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#6b7891]">
                  {event.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute -bottom-6 -right-6 hidden h-28 w-28 rounded-[32px] bg-[linear-gradient(145deg,#ffcf55,#f5a623_55%,#0b2349)] shadow-[0_20px_40px_rgba(11,35,73,0.18)] sm:block" />
        </div>
      </Container>

      {/* <Container className="mt-10 grid gap-6 md:grid-cols-2">
        {applicationCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[28px] bg-[#102a57] px-7 py-8 text-white shadow-[0_22px_50px_rgba(11,35,73,0.12)]"
          >
            <h3 className="text-2xl font-black tracking-[-0.04em]">
              {card.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#d2def3]">
              {card.detail}
            </p>
            <a
              href={card.href}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
            >
              {card.label}
            </a>
          </article>
        ))}
      </Container> */}
    </section>
  );
}
