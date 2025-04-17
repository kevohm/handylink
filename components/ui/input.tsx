"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  name?: string
  required?: boolean
  label?: string
}

export function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  name,
  required = false,
  label,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="w-full">
      {label && (
        <label className="capitalize block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <motion.input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={`input-field ${className}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  )
}
