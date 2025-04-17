"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Rating } from "@/components/ui/rating"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock, DollarSign } from "lucide-react"

export default function BookTasker({ params }: { params: { id: string } }) {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [budget, setBudget] = useState("")
  const [details, setDetails] = useState("")

  // Mock data for the tasker
  const tasker = {
    id: params.id,
    name: "Kevin Kibet",
    gender: "Male",
    rating: 4.5,
    price: 90,
    service: "Cleaning",
    description: "Friendly and experienced kitchen assistant.",
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <motion.nav
        className="flex items-center py-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="text" href={`/profile/${params.id}`} className="mr-auto" icon={<ArrowLeft size={18} />}>
          <span className="sr-only">Back</span>
        </Button>

        <Logo showText className="absolute left-1/2 transform -translate-x-1/2" />
      </motion.nav>

      {/* Booking Form */}
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar src="/placeholder.svg?height=100&width=100" alt={tasker.name} size="lg" className="mr-4" />
          <div>
            <h1 className="text-2xl font-bold mb-1">Book {tasker.name}</h1>
            <div className="flex items-center gap-2">
              <Rating value={tasker.rating} size="sm" />
              <span className="text-gray-600">
                {tasker.service} • ${tasker.price} per task
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10"
                label="Date"
                required
              />
            </div>

            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-10"
                label="Time"
                required
              />
            </div>
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="pl-10"
              label="Budget"
              placeholder={`Suggested: $${tasker.price}`}
              required
            />
          </div>

          <Textarea
            label="Task Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe what you need help with..."
            required
          />

          <Button variant="primary" fullWidth href="/booking-confirmation">
            Book Now
          </Button>
        </motion.div>
      </div>
    </main>
  )
}
