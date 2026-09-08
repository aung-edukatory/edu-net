import Container from "@/components/Container";

import { facilityItems } from "./data";
import Icon from "./Icon";

export default function CampusSection() {
  return (
    <section id="campus" className="bg-white">
      <Container className="grid overflow-hidden lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative min-h-[420px] overflow-hidden bg-[linear-gradient(150deg,var(--text-inverse-muted)_0%,var(--text-inverse-muted)_38%,var(--text-inverse-muted)_72%,var(--navy)_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(252,253,254,0.08),rgba(2,31,61,0.12)_55%,rgba(2,31,61,0.34))]" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-[var(--navy)]" />
          <div className="absolute bottom-28 left-[8%] h-52 w-14 bg-white/48" />
          <div className="absolute bottom-28 left-[20%] h-72 w-16 bg-white/58" />
          <div className="absolute bottom-28 left-[34%] h-64 w-14 bg-white/44" />
          <div className="absolute bottom-28 left-[48%] h-80 w-[4.5rem] bg-white/60" />
          <div className="absolute bottom-28 left-[64%] h-60 w-14 bg-white/42" />
          <button
            type="button"
            className="absolute left-8 top-1/2 inline-flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--gold)] text-white shadow-[0_18px_42px_rgba(2,31,61,0.18)]"
            aria-label="Play campus video"
          >
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-8 w-8 fill-current"
              aria-hidden="true"
            >
              <path d="M8 6.5v11l9-5.5-9-5.5Z" />
            </svg>
          </button>
        </div>

        <div className="bg-[var(--navy)] px-7 py-16 text-white sm:px-10 lg:px-12">
          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] sm:text-4xl">
            School support designed for real progress.
          </h2>

          <div className="mt-10 space-y-8">
            {facilityItems.map((item) => (
              <article key={item.title} className="flex gap-4">
                <span className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-white/8 text-[var(--gold)]">
                  <Icon kind={item.icon} className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-lg font-black tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-inverse-muted)]">
                    {item.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
