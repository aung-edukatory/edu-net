import Container from "@/components/Container";

export default function Loading() {
  return (
    <main className="bg-white py-16 sm:py-20">
      <Container className="max-w-4xl">
        <div className="h-5 w-28 rounded-full bg-[var(--surface-muted)]" />
        <div className="mt-6 overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-[0_24px_60px_rgba(2,31,61,0.08)]">
          <div className="h-72 animate-pulse bg-[var(--surface-muted)] sm:h-80 lg:h-[420px]" />
          <div className="space-y-5 px-6 py-8 sm:px-8 sm:py-10">
            <div className="h-4 w-24 rounded-full bg-[var(--gold-light)]" />
            <div className="h-10 w-4/5 rounded-2xl bg-[var(--surface-muted)]" />
            <div className="h-6 w-3/4 rounded-2xl bg-[var(--surface-muted)]" />
            <div className="h-24 rounded-[24px] bg-[var(--surface)]" />
            <div className="h-24 rounded-[24px] bg-[var(--surface)]" />
          </div>
        </div>
      </Container>
    </main>
  );
}
