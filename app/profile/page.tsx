
import BackNavigation from "@/components/ui/global/BackNavigation";
import ReviewItems from "@/components/ui/global/review/ReviewItems";
import TaskItems from "@/components/ui/global/task/TaskItems";
import UserCard from "@/components/ui/global/user/UserCard";
import { UserGender } from "@/types/user";
import axios from "axios";
import { cookies } from "next/headers";
import Profile from "@/components/ui/global/profile/Profile"
// ✅ Helper to fetch user on the server
export async function getCurrentUser() {
  try {
    // This automatically forwards cookies to your API route
    const cookieStore = await cookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString() // ⭐ Forward all cookies manually
      },
      cache: "no-store",
    });
    console.log(res)
    if (!res.ok) return null;

    const data = await res.json();
    return data?.user ?? null;
  } catch (error) {
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

  return <Profile user={user}/>
}
