import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    console.log("Loading...")
  try {
    const { userId,  } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { role, phoneNumber, description, skills } = await req.json();

    // ✅ Create or update user in Prisma
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        role,
        phone_number: phoneNumber,
        bio: description,
        skills: role === "tasker" ? skills : [],
      },
      create: {
        clerkId: userId,
        role,
        phone_number: phoneNumber,
        bio: description,
        skills: role === "tasker" ? skills : [],
      },
    });

    return NextResponse.json({ message: "Onboarding complete", user });
  } catch (err) {
    console.error("Error completing onboarding:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
