"use client"

import { motion } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function BookingConfirmation() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-6"
        >
          <CheckCircle className="mx-auto text-green-light w-20 h-20" />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Booking Confirmed!
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Your booking has been confirmed. The tasker will be notified and will contact you shortly to confirm the
          details.
        </motion.p>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button variant="primary" fullWidth href="/search">
            Find Another Tasker
          </Button>
          <Button variant="text" fullWidth href="/dashboard">
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    </main>
  )
}
