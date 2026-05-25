export default function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
        inverse
          ? "border border-white/15 bg-white/8"
          : "bg-[#0b2349] shadow-[0_18px_40px_rgba(11,35,73,0.18)]"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 text-[#ffbf1f]"
        aria-hidden="true"
      >
        <path
          d="M12 2.4 18.6 5v5.2c0 5.1-3.7 8.6-6.6 10.4-2.9-1.8-6.6-5.3-6.6-10.4V5L12 2.4Z"
          fill="currentColor"
        />
        <path
          d="m12 6.8 1.2 2.6 2.8.3-2.1 1.9.6 2.8L12 13l-2.5 1.4.6-2.8-2.1-1.9 2.8-.3L12 6.8Z"
          fill="#ffffff"
        />
      </svg>
    </span>
  );
}
