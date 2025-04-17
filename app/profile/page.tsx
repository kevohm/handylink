"use client";

import BackNavigation from "@/components/ui/global/BackNavigation";
import ReviewItems from "@/components/ui/global/review/ReviewItems";
import TaskItems from "@/components/ui/global/task/TaskItems";
import { UserGender } from "@/types/user";
import UserCard from "@/components/ui/global/user/UserCard";

export default function Profile() {
  // Mock data
  const profile = {
    name: "Kevin Kibet",
    gender: "male",
    bio: "Friendly and experienced kitchen assistant.",
    rating: 4.5,
    services: [
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
    ],
    reviews: [
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
    ],
  };

  return (
    <main className="min-h-screen pb-20">
      <BackNavigation />
      <div className="px-24">
        <UserCard
          id={"3"}
          name={profile.name}
          rating={profile.rating}
          about={profile.bio}
          gender={profile.gender.toLowerCase() as UserGender}
        />
        <TaskItems tasks={profile.services} />
        <ReviewItems
          reviews={profile.reviews}
          rating={profile.rating}
          name={profile.name}
        />
      </div>
    </main>
  );
}
