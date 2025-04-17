"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface LogoProps {
  showText?: boolean
  className?: string
}

export function Logo({ showText = false, className = "" }: LogoProps) {
  return (
    <Link href="/">
      <motion.div
        className={`flex items-center gap-2 ${className}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Image src="/images/logo.svg" alt="Handy Link Logo" width={30} height={50} />
        {showText && (
          <div className="flex items-center">
            <span className="text-green-light font-bold">Handy</span>
            <span className="font-bold"> Link</span>
          </div>
        )}
      </motion.div>
    </Link>
  )
}
