"use client"

import { motion } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { Rating } from "@/components/ui/rating"
import { Button } from "@/components/ui/button"

interface TaskerCardProps {
  id: string
  name: string
  rating: number
  reviewCount: number
  service: string
  gender: string
  price: number
  description: string
  delay?: number
}

export function TaskerCard({
  id,
  name,
  rating,
  reviewCount,
  service,
  gender,
  price,
  description,
  delay = 0,
}: TaskerCardProps) {
  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center mb-4">
        <Avatar src="/placeholder.svg?height=100&width=100" alt={name} size="md" className="mr-3" />
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <div className="flex items-center gap-1">
            <Rating value={rating} size="sm" />
            <span className="text-sm text-gray-500">({reviewCount} Reviews)</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        {service} • {gender} • ${price} per task
      </div>

      <p className="mb-6">{description}</p>

      <div className="flex gap-3">
        <Button variant="outline" href={`/profile/${id}`} className="flex-1">
          Check Profile
        </Button>
        <Button variant="primary" href={`/book/${id}`} className="flex-1">
          Book Now
        </Button>
      </div>
    </motion.div>
  )
}
