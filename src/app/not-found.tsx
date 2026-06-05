import Link from "next/link";

import Container from "@/components/Container";

export default function NotFound() {
  return (
    <main className="bg-white text-[#10233f]">
      <Container className="flex min-h-[58vh] items-center justify-center py-20">
        <section className="max-w-xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#60708a]">
            404
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-[#0b2349] sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-5 text-base leading-7 text-[#60708a]">
            Sorry, we could not find the page you are looking for. It may have
            been moved, renamed, or the link may be incorrect.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
            >
              Go home
            </Link>
            <Link
              href="/#courses"
              className="inline-flex items-center justify-center rounded-md border border-[#dfe6f0] bg-white px-5 py-3 text-sm font-bold text-[#45566f] transition-colors hover:border-[#0b2349] hover:text-[#0b2349]"
            >
              Browse courses
            </Link>
          </div>

          <p className="mt-6 text-sm leading-6 text-[#60708a]">
            If you need help, please use the contact details in the header or
            book a consultation.
          </p>
        </section>
      </Container>
    </main>
  );
}
