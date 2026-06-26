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
  metadataBase: new URL("https://www.elspattaya.com"),
  title: "ELS Pattaya | GED Preparation and Language Courses",
  description:
    "ELS Pattaya helps students prepare for GED, improve English, and build confidence for future academic success.",
  keywords: [
    "ELS Pattaya",
    "GED preparation Pattaya",
    "GED courses Thailand",
    "English language courses Pattaya",
    "language school Pattaya",
    "academic support Thailand",
    "structured learning support",
    "student development programs",
    "personalized education support",
    "education pathway Thailand",
  ],
  alternates: {
    canonical: "https://www.elspattaya.com/",
  },
  openGraph: {
    title: "ELS Pattaya | GED Preparation and Language Courses",
    description:
      "ELS Pattaya helps students prepare for GED, improve English, and build confidence for future academic success.",
    url: "https://www.elspattaya.com/",
    siteName: "ELS Pattaya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELS Pattaya | GED Preparation and Language Courses",
    description:
      "ELS Pattaya helps students prepare for GED, improve English, and build confidence for future academic success.",
  },
  icons: {
    icon: "/favicon.png",
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
