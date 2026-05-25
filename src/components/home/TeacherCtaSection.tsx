import Container from "@/components/Container";

import Icon from "./Icon";

export default function TeacherCtaSection() {
  return (
    <section className="bg-white pb-24">
      <Container>
        <div className="flex flex-col gap-6 rounded-[28px] border border-[#dbe3ef] bg-[linear-gradient(135deg,#0b2349_0%,#17386f_100%)] px-6 py-8 text-white shadow-[0_24px_60px_rgba(11,35,73,0.14)] sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ffcf55]">
              Join Our Team
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
              Become a teacher
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#d7e4fb] sm:text-base">
              Interested in teaching with Edukatory? Apply through our form and
              we&apos;ll review your details.
            </p>
          </div>

          <a
            href="https://forms.gle/sBySiUawMthg4zq18"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#ffbf1f] px-6 py-4 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
          >
            Become a teacher
            <Icon kind="arrow" className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
