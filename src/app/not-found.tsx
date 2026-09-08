import Link from "next/link";

import Container from "@/components/Container";

export default function NotFound() {
  return (
    <main className="bg-white text-[var(--navy)]">
      <Container className="flex min-h-[58vh] items-center justify-center py-20">
        <section className="max-w-xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--muted)]">
            404
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-[var(--navy)] sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-5 text-base leading-7 text-[var(--muted)]">
            Sorry, we could not find the page you are looking for. It may have
            been moved, renamed, or the link may be incorrect.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--navy)] transition-transform hover:-translate-y-0.5"
            >
              Go home
            </Link>
            <Link
              href="/#courses"
              className="inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-white px-5 py-3 text-sm font-bold text-[var(--muted)] transition-colors hover:border-[var(--navy)] hover:text-[var(--navy)]"
            >
              Browse courses
            </Link>
          </div>

          <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
            If you need help, please use the contact details in the header or
            book a consultation.
          </p>
        </section>
      </Container>
    </main>
  );
}
