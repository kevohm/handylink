// pages/api/me.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // ✅ Use the new `auth()` helper instead of `getAuth(req)`
  const { userId } = await auth();
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  try {
    // ✅ Fetch user details from Clerk
    const user = await prisma.user.findUnique({
      where:{
        clerkId:userId
      }
    })
    if(!user) throw new Error("Unauthorized")

    // return res.status(200).json({ user });
    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Error fetching user or saving to DB:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
