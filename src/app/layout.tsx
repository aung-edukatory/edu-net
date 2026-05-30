import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FooterSection, SiteHeader, TopBar } from "@/components/home";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edukatory | GED preparation and Language Courses",
  description:
    "Unlock your potential at Edukatory. Get GED preparation and tailored language courses to boost your academic and professional success.",
  keywords: [
    "premium education center Pattaya",
    "academic support Thailand",
    "structured learning support",
    "student development programs",
    "personalized education support",
    "education pathway Thailand",
    "learning support center Pattaya",
    "future ready students",
    "academic growth support",
    "English and academic pathways",
  ],
  icons: {
    icon: "/favicon.png", // or "/favicon.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TopBar />
        <SiteHeader />
        {children}

        <FooterSection />
      </body>
    </html>
  );
}
