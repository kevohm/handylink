
// app/api/me/route.ts
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // ✅ Get authenticated user

 
  const { userId } = await auth();
  console.log(userId)
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // ✅ Fetch user details from your Prisma DB
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    console.log(user)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ user },{status:200});
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
