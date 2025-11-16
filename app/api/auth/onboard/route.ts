import { NextResponse } from "next/server";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // ✅ Get the userId of the authenticated user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // ✅ Fetch the Clerk user directly (no parentheses!)
    const clerkUser = await currentUser()
    const profileImage = clerkUser?.imageUrl ?? null;
    const email = clerkUser?.emailAddresses[0].emailAddress
    const firstName = clerkUser?.firstName
    const lastName = clerkUser?.lastName
    const { role, phoneNumber, description, skills, gender } = await req.json();

    // ✅ Upsert user in Prisma
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        role,
        phone_number: phoneNumber,
        bio: description,
        skills: role === "tasker" ? skills : [],
        profile_image: profileImage,
        email,
        last_name: lastName,
        first_name: firstName,
        gender
      },
      create: {
        clerkId: userId,
        role,
        phone_number: phoneNumber,
        bio: description,
        skills: role === "tasker" ? skills : [],
        profile_image: profileImage,
        email,
        last_name: lastName,
        first_name: firstName,
        gender
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
