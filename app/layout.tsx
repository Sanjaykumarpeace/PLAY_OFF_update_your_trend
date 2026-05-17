import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: "PLAY OFF - Update Your Trend | Premium Streetwear, Yelahanka Bengaluru",
  description:
    "A cinematic premium fashion brand experience for Play Off, a modern streetwear and lifestyle store in Kattigenahalli, Yelahanka, Bengaluru.",
  keywords: [
    "Play Off",
    "Update Your Trend",
    "Yelahanka fashion store",
    "Bengaluru streetwear",
    "Kattigenahalli clothing",
    "premium fashion Bengaluru"
  ],
  openGraph: {
    title: "PLAY OFF - Update Your Trend",
    description: "Local Bengaluru fashion energy, reimagined as a global premium streetwear destination.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="grain">{children}</body>
    </html>
  );
}
