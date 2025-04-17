"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface AvatarProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function Avatar({ src, alt, size = "md", className = "" }: AvatarProps) {
  const sizeClass = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  return (
    <motion.div
      className={`rounded-full overflow-hidden ${sizeClass[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={size === "xl" ? 96 : size === "lg" ? 64 : size === "md" ? 48 : 32}
        height={size === "xl" ? 96 : size === "lg" ? 64 : size === "md" ? 48 : 32}
        className="w-full h-full object-cover"
      />
    </motion.div>
  )
}
