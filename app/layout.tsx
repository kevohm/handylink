import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

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
      <html lang="en">
        <head>
          {/* Load Poppins and Passion One from Google Fonts CDN */}
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Passion+One:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style={{
            fontFamily: "'Poppins', 'Passion One', sans-serif",
          }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
