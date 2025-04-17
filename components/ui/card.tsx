"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  selected?: boolean
  hover?: boolean
}

export function Card({ children, className = "", onClick, selected = false, hover = true }: CardProps) {
  const selectedClass = selected ? "card-selected" : ""
  const hoverClass = hover ? "card-hover" : ""

  return (
    <motion.div
      className={`card ${selectedClass} ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
