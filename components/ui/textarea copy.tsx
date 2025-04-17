"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

interface TextareaProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  name?: string
  required?: boolean
  label?: string
}

export function Textarea({
  placeholder = "",
  value,
  onChange,
  className = "",
  name,
  required = false,
  label,
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <motion.textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={`textarea-field ${className}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  )
}
