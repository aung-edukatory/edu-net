import Container from "@/components/Container";

import { applicationCards, upcomingEvents } from "./data";
import Icon from "./Icon";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24">
      <div className="absolute right-[-5rem] top-10 h-52 w-52 rounded-full bg-[var(--gold)]/16 blur-3xl" />
      <Container className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
        <div className="max-w-xl">
          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[var(--navy)] sm:text-4xl">
            Welcome to ELS
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--muted)]">
            ELS is a premium education and language pathway center specializing in GED preparation, English
            programs, academic rebuilding, and university progression.
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            We support students who need a more structured and supportive alternative to traditional education
            through personalized assessments, guided academic pathways, and professionally managed support
            systems.
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            At ELS, we focus not only on academic results, but also on building confidence, discipline, communication
            skills, and long term educational direction for every student.
          </p>
          <a
            href="/about-us"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Learn more
            <Icon kind="arrow" className="h-4 w-4" />
          </a>
        </div>

        <div className="relative rounded-[30px] border border-[var(--border)] bg-white p-8 shadow-[0_24px_60px_rgba(2,31,61,0.08)]">
          <div className="mt-8 space-y-6">
            {upcomingEvents.map((event) => (
              <article
                key={event.title}
                className="border-b border-[var(--border)] pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold-deep)]">
                      {event.date}
                    </div>
                    <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-[var(--navy)]">
                      {event.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                    On site
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {event.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute -bottom-6 -right-6 hidden h-28 w-28 rounded-[32px] bg-[linear-gradient(145deg,var(--gold-light),var(--gold-deep)_55%,var(--navy))] shadow-[0_20px_40px_rgba(2,31,61,0.18)] sm:block" />
        </div>
      </Container>

      {/* <Container className="mt-10 grid gap-6 md:grid-cols-2">
        {applicationCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[28px] bg-[var(--navy)] px-7 py-8 text-white shadow-[0_22px_50px_rgba(2,31,61,0.12)]"
          >
            <h3 className="text-2xl font-black tracking-[-0.04em]">
              {card.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-inverse-muted)]">
              {card.detail}
            </p>
            <a
              href={card.href}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              {card.label}
            </a>
          </article>
        ))}
      </Container> */}
    </section>
  );
}
