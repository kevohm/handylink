import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins, Passion_One } from "next/font/google";

// Load fonts properly with Next.js font optimization
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const passionOne = Passion_One({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-passion-one",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handy Link - Find Trusted Help, Fast",
  description:
    "Connect instantly with skilled taskers ready to make your space shine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <html lang="en" className={`${poppins.variable} ${passionOne.variable}`}>
        <body className="font-[var(--font-poppins)]">{children}</body>
      </html>
    </ClerkProvider>
  );
}
