"use client"

import { useState } from "react"
import { Logo } from "@/components/ui/logo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TaskerCard } from "@/components/ui/tasker-card"
import { Avatar } from "@/components/ui/avatar"
import Navbar from "@/components/ui/global/Navbar"
import SearchInput from "@/components/ui/global/SearchInput"

export default function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("Kitchen helper, friendly male, $100 budget")

  // Mock data for taskers
  const taskers = [
    {
      id: "1",
      name: "Kevin Kibet",
      rating: 4.5,
      reviewCount: 120,
      service: "Cleaning",
      gender: "Male",
      price: 90,
      description: "Friendly and experienced kitchen assistant.",
    },
    {
      id: "2",
      name: "Kevin Kibet",
      rating: 4.5,
      reviewCount: 120,
      service: "Cleaning",
      gender: "Male",
      price: 90,
      description: "Friendly and experienced kitchen assistant.",
    },
    {
      id: "3",
      name: "Kevin Kibet",
      rating: 4.5,
      reviewCount: 120,
      service: "Cleaning",
      gender: "Male",
      price: 90,
      description: "Friendly and experienced kitchen assistant.",
    },
    {
      id: "4",
      name: "Kevin Kibet",
      rating: 4.5,
      reviewCount: 120,
      service: "Cleaning",
      gender: "Male",
      price: 90,
      description: "Friendly and experienced kitchen assistant.",
    },
    {
      id: "5",
      name: "Kevin Kibet",
      rating: 4.5,
      reviewCount: 120,
      service: "Cleaning",
      gender: "Male",
      price: 90,
      description: "Friendly and experienced kitchen assistant.",
    },
  ]

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <Navbar/>

      {/* Search Bar */}
      <div className="px-24 flex flex-col space-y-5">
        <div className="max-w-xl w-full mx-auto">
          <SearchInput/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {taskers.map((tasker, index) => (
            <TaskerCard
              key={tasker.id}
              id={tasker.id}
              name={tasker.name}
              rating={tasker.rating}
              reviewCount={tasker.reviewCount}
              service={tasker.service}
              gender={tasker.gender}
              price={tasker.price}
              description={tasker.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
