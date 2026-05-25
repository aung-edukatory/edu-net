import Container from "@/components/Container";

export default function Loading() {
  return (
    <main className="bg-white py-16 sm:py-20">
      <Container className="max-w-4xl">
        <div className="h-5 w-28 rounded-full bg-[#e8eef6]" />
        <div className="mt-6 overflow-hidden rounded-[32px] border border-[#dbe3ef] bg-white shadow-[0_24px_60px_rgba(11,35,73,0.08)]">
          <div className="h-72 animate-pulse bg-[#edf2f8] sm:h-80 lg:h-[420px]" />
          <div className="space-y-5 px-6 py-8 sm:px-8 sm:py-10">
            <div className="h-4 w-24 rounded-full bg-[#fff1c9]" />
            <div className="h-10 w-4/5 rounded-2xl bg-[#edf2f8]" />
            <div className="h-6 w-3/4 rounded-2xl bg-[#edf2f8]" />
            <div className="h-24 rounded-[24px] bg-[#f5f8fc]" />
            <div className="h-24 rounded-[24px] bg-[#f5f8fc]" />
          </div>
        </div>
      </Container>
    </main>
  );
}
