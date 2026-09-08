import Container from "@/components/Container";

import { books } from "./data";

export default function ResourcesSection() {
  return (
    <section className="bg-[var(--surface)] py-24">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[var(--navy)] sm:text-4xl">
              Learning resources
            </h2>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--navy)] transition-transform hover:-translate-y-0.5"
          >
            Browse all
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {books.map((book) => (
            <article
              key={book.title}
              className="rounded-[24px] border border-[var(--border)] bg-white p-4 shadow-[0_14px_36px_rgba(2,31,61,0.08)]"
            >
              <div
                className={`flex h-60 flex-col rounded-[20px] bg-gradient-to-br ${book.cover} p-5 text-white`}
              >
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/80">
                  Edukatory Resources
                </div>
                <div className="mt-auto">
                  <h3 className="max-w-[8rem] text-3xl font-black leading-[0.98] tracking-[-0.05em]">
                    {book.title}
                  </h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-[var(--navy)]">{book.title}</div>
                  <div className="text-sm text-[var(--muted)]">{book.author}</div>
                </div>
                <a
                  href="#contact"
                  className="rounded-full bg-[var(--gold)] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--navy)]"
                >
                  Buy now
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
