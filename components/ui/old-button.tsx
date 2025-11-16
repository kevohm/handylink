"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import Link from "next/link"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "text" | "outline"
  onClick?: () => void
  className?: string
  href?: string
  icon?: ReactNode
  fullWidth?: boolean
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  href,
  icon,
  fullWidth = false,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseClass = "btn flex items-center justify-center gap-2"
  let variantClass = ""

  switch (variant) {
    case "primary":
      variantClass = "btn-primary"
      break
    case "text":
      variantClass = "btn-text"
      break
    case "outline":
      variantClass = "border border-green-light text-green-light hover:bg-green-light hover:text-black"
      break
  }

  const widthClass = fullWidth ? "w-full" : ""

  const buttonContent = (
    <>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </>
  )

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  }

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${variantClass} ${widthClass} ${className}`}>
        <motion.span className="flex items-center justify-center gap-2 w-full" {...motionProps}>
          {buttonContent}
        </motion.span>
      </Link>
    )
  }

  return (
    <motion.button
      className={`${baseClass} ${variantClass} ${widthClass} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  )
}
