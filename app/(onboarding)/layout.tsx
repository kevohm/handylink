import type React from "react"
import type { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
export const metadata: Metadata = {
  title: "Handy Link - Onboarding",
  description: "Connect instantly with skilled taskers ready to make your space shine.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return <>{children}</>;
}
