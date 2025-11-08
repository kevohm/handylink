"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth();
  if (!userId) return { error: "No logged-in user" };

  const role = formData.get("role") as "client" | "tasker";
  const phoneNumber = formData.get("phoneNumber") as string;
  const description = formData.get("description") as string;
  const skills = formData.getAll("skills") as string[]; // get multiple selected services

  try {
    // 1️⃣ Update Clerk user metadata
    const clerkAdapter = await clerkClient();
    await clerkAdapter.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        role,
      },
    });

    // 2️⃣ Update your MongoDB user record
    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        role,
        phone_number: phoneNumber,
        bio: description,
        skills: role === "tasker" ? skills : [],
      },
    });

    return { message: "Onboarding complete", user };
  } catch (err) {
    console.error("Error completing onboarding:", err);
    return { error: "Something went wrong during onboarding." };
  }
};
