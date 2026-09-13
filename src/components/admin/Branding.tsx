import Image from "next/image";

function BrandImage({ size }: { size: number }) {
  return (
    <Image
      src="/newlogo.png"
      alt="ELS Pattaya"
      width={size}
      height={size}
      style={{
        display: "block",
        backgroundColor: "#fff",
        borderRadius: size > 100 ? 16 : 6,
        objectFit: "contain",
      }}
    />
  );
}

export function Logo() {
  return <BrandImage size={180} />;
}

export function Icon() {
  return <BrandImage size={32} />;
}
