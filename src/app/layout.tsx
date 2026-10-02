import type { Metadata } from "next";
import { Caveat, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// Aksen tulisan tangan (catatan kecil di hero, judul sekunder).
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.fallback.name,
    template: `%s | ${siteConfig.fallback.name}`,
  },
  description: siteConfig.fallback.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}