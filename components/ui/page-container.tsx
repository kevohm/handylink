"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PageContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  centered?: boolean
}

export function PageContainer({ children, className = "", maxWidth = "xl", centered = true }: PageContainerProps) {
  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-[643px]",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  }

  return (
    <motion.div
      className={`w-full ${centered ? "mx-auto" : ""} ${maxWidthClass[maxWidth]} p-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
