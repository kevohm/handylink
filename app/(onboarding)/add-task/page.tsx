"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageContainer } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { ServiceTag } from "@/components/ui/service-tag"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/components/ui/global/Navbar"

export default function AddTask() {
  const [selectedService, setSelectedService] = useState<string>("Cleaning")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const services = ["Cleaning", "Shopping", "Mount TV", "Plumbing"]

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <PageContainer maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-start mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Create your first Task</h1>
          <p className="text-grey">This is a task you want to do</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 mb-6">
            {services.map((service) => (
              <ServiceTag
                key={service}
                label={service}
                selected={selectedService === service}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>

          <div className="space-y-4">
            <Input
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter your budget"
            />

            <Textarea
              label="What does the task entails?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you need done..."
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button variant="primary" fullWidth href="/profile">
            Create Task
          </Button>
        </motion.div>
      </PageContainer>
    </main>
  )
}
