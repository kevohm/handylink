import BackNavigation from "@/components/ui/global/BackNavigation";
import ReviewItems from "@/components/ui/global/review/ReviewItems";
import TaskItems from "@/components/ui/global/task/TaskItems";
import UserCard from "@/components/ui/global/user/UserCard";
import { UserGender } from "@/types/user";

// ✅ Helper to fetch user on the server
async function getCurrentUser() {
  try {
      const baseURL =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseURL}/api/me`, {
      cache: "no-store", // ensures fresh data each time
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include"
    });

    if (!res.ok) {
      console.error("Failed to fetch user:", res.statusText);
      return null;
    }

    const data = await res.json();
    console.log(data)
    return data?.user ?? null;
  } catch (error) {
    console.log(error)
    console.error("Error fetching user:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const user = await getCurrentUser();
  

  if (!user) {
    return (
      <main className="min-h-screen pb-20 flex items-center justify-center">
        <p className="text-gray-500">Failed to load user profile.</p>
      </main>
    );
  }

  const services = [
    {
      id: "1",
      category: "Cleaning",
      price: 90,
      description: "Friendly and experienced kitchen assistant.",
    },
    {
      id: "2",
      category: "Cooking",
      price: 120,
      description: "Skilled chef specializing in home meals.",
    },
    {
      id: "3",
      category: "Errands",
      price: 60,
      description: "Reliable help for groceries and light errands.",
    },
  ];

  const reviews = [
    {
      id: "1",
      name: "Kevin Kibet",
      rating: 4.5,
      text: "John was absolutely fantastic! He helped me prep meals for a family gathering, and everything was smooth.",
    },
    {
      id: "2",
      name: "Mary Njoroge",
      rating: 4.7,
      text: "Very polite and efficient! Highly recommended.",
    },
    {
      id: "3",
      name: "James Mwangi",
      rating: 4.6,
      text: "Professional and reliable service.",
    },
  ];

  return (
    <main className="min-h-screen pb-20">
      <BackNavigation />
      <div className="px-4 md:px-12 lg:px-24 space-y-8">
        <UserCard
          id={user.id}
          profileImage={user?.profile_image || ""}
          name={`${user.first_name ?? ""} ${user.last_name ?? ""}`}
          rating={4.5}
          about={user.bio || "No bio available."}
          gender={"male" as UserGender} // temporary fallback
        />

        <section>
          <TaskItems tasks={services} />
        </section>

        <section>
          <ReviewItems
            reviews={reviews}
            rating={4.5}
            name={`${user.first_name ?? ""} ${user.last_name ?? ""}`}
          />
        </section>
      </div>
    </main>
  );
}
