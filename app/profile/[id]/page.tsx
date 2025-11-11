"use client";
import BackNavigation from "@/components/ui/global/BackNavigation";
import { UserGender } from "@/types/user";
import ReviewItems from "@/components/ui/global/review/ReviewItems";
import UserCard from "@/components/ui/global/user/UserCard";

export default function TaskerProfile({ params }: { params: { id: string } }) {
  // Mock data for the tasker
  const tasker = {
    id: params.id,
    name: "Kevin Kibet",
    gender: "Male",
    rating: 4.5,
    price: 90,
    service: "Cleaning",
    description: "Friendly and experienced kitchen assistant.",
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
      {
        id: "5",
        name: "Kevin Kibet",
        rating: 4.5,
        text: "John was absolutely fantastic! He helped me prep meals for a family gathering, and everything was smooth. He's friendly, fast, and really knows his way around the kitchen. Highly recommended!",
      },
    ],
  };

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <BackNavigation />
      {/* Profile */}
      <div className="px-24">
        <UserCard
          id={"3"}
          profileImage="#"
          name={tasker.name}
          rating={tasker.rating}
          about={tasker.description}
          gender={tasker.gender.toLowerCase() as UserGender}
        />
        <ReviewItems
          reviews={tasker.reviews}
          rating={tasker.rating}
          name={tasker.name}
        />
      </div>
    </main>
  );
}
