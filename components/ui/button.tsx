"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "text" | "outline"
  onClick?: () => void
  className?: string
  href?: string
  icon?: ReactNode
  fullWidth?: boolean
  type?: "button" | "submit" | "reset"
  padding?: string
}

export function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  href,
  icon,
  fullWidth = false,
  type = "button",
  padding,
}: ButtonProps) {
  const baseClass = "btn flex items-center justify-center gap-2 rounded-full"
  let variantClass = ""

  switch (variant) {
    case "primary":
      variantClass = "btn-primary px-6 py-2"
      break
    case "outline":
      variantClass = "border border-green-light text-green-light hover:bg-green-light hover:text-black px-6 py-2"
      break
    case "text":
      variantClass = "btn-text px-6 py-2"
      break
    default:
      variantClass = "btn-primary px-6 py-2"
  }

  let widthClass = ""

  if (fullWidth) {
    widthClass = "w-full"
  }

  const buttonContent = (
    <>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </>
  )

  const paddingClass = padding || ""
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  }

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${variantClass} ${widthClass} ${paddingClass} ${className}`}>
        <motion.span className="flex items-center justify-center gap-2 w-full" {...motionProps}>
          {buttonContent}
        </motion.span>
      </Link>
    )
  }

  return (
    <motion.button
      className={`${baseClass} ${variantClass} ${widthClass} ${paddingClass} ${className}`}
      onClick={onClick}
      type={type}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  )
}
