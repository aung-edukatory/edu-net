import Container from "@/components/Container";

const stats = [
  { value: "150+", label: "Students" },
  { value: "20", label: "Programs" },
  { value: "98%", label: "GED pass rate" },
  { value: "3", label: "Languages" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-[#dfe6f0] bg-white py-8">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[24px] border border-[#e4eaf3] bg-[#f8fbff] px-6 py-7 text-center shadow-[0_14px_34px_rgba(11,35,73,0.06)]"
            >
              <div className="text-4xl font-black tracking-[-0.06em] text-[#0b2349]">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-[#6b7891]">
                {stat.label}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
