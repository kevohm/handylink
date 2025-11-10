"use client";

import BackNavigation from "@/components/ui/global/BackNavigation";
import ReviewItems from "@/components/ui/global/review/ReviewItems";
import TaskItems from "@/components/ui/global/task/TaskItems";
import { UserGender } from "@/types/user";
import UserCard from "@/components/ui/global/user/UserCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/api/me`);
      setUser(data?.user || null);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  getCurrentUser()
  // Fallback to empty lists if user data not ready
  const services = [
    {
      id: "1",
      category: "Cleaning",
      price: 90,
      description: "Friendly and experienced kitchen assistant.",
    },
    {
      id: "2",
      category: "Cleaning",
      price: 90,
      description: "Friendly and experienced kitchen assistant.",
    },
    {
      id: "3",
      category: "Cleaning",
      price: 90,
      description: "Friendly and experienced kitchen assistant.",
    },
  ];

  const reviews = [
    {
      id: "1",
      name: "Kevin Kibet",
      rating: 4.5,
      text: "John was absolutely fantastic! He helped me prep meals for a family gathering, and everything was smooth. He's friendly, fast, and really knows his way around the kitchen. Highly recommended!",
    },
    {
      id: "2",
      name: "Kevin Kibet",
      rating: 4.5,
      text: "John was absolutely fantastic! He helped me prep meals for a family gathering, and everything was smooth. He's friendly, fast, and really knows his way around the kitchen. Highly recommended!",
    },
    {
      id: "3",
      name: "Kevin Kibet",
      rating: 4.5,
      text: "John was absolutely fantastic! He helped me prep meals for a family gathering, and everything was smooth. He's friendly, fast, and really knows his way around the kitchen. Highly recommended!",
    },
    {
      id: "4",
      name: "Kevin Kibet",
      rating: 4.5,
      text: "John was absolutely fantastic! He helped me prep meals for a family gathering, and everything was smooth. He's friendly, fast, and really knows his way around the kitchen. Highly recommended!",
    },
  ];

  if (!user) {
    return (
      <main className="min-h-screen pb-20 flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      <BackNavigation />
      <div className="px-24">
        <UserCard
          id={user.id}
          profileImage={user?.profile_image || ""}
          name={`${user.first_name ?? ""} ${user.last_name ?? ""}`}
          rating={4.5}
          about={user.bio || "No bio available."}
          gender={"male" as UserGender} // Default until gender is added to API
        />
        <TaskItems tasks={services} />
        <ReviewItems
          reviews={reviews}
          rating={4.5}
          name={`${user.first_name ?? ""} ${user.last_name ?? ""}`}
        />
      </div>
    </main>
  );
}
