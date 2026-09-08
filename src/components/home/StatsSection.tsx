import Container from "@/components/Container";

const stats = [
  { value: "150+", label: "Students" },
  { value: "20", label: "Programs" },
  { value: "98%", label: "GED pass rate" },
  { value: "3", label: "Languages" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-[var(--border)] bg-white py-8">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] px-6 py-7 text-center shadow-[0_14px_34px_rgba(2,31,61,0.06)]"
            >
              <div className="text-4xl font-black tracking-[-0.06em] text-[var(--navy)]">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                {stat.label}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
