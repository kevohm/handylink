"use client"

import { Star } from "lucide-react"

interface RatingProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Rating({ value, max = 5, size = "md", className = "" }: RatingProps) {
  const sizeClass = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <div className={`rating ${className}`}>
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={`${i < value ? "rating-star" : "text-gray-300"} ${sizeClass[size]}`}
          fill={i < value ? "currentColor" : "none"}
        />
      ))}
    </div>
  )
}
