"use client"

import { motion } from "framer-motion"

interface ServiceTagProps {
  label: string
  selected?: boolean
  onClick?: () => void
}

export function ServiceTag({ label, selected = false, onClick }: ServiceTagProps) {
  return (
    <motion.div
      className={`service-tag ${selected ? "service-tag-selected" : ""}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {label}
    </motion.div>
  )
}
