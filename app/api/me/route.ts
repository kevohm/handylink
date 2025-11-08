// pages/api/me.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // ✅ Use the new `auth()` helper instead of `getAuth(req)`
  const { userId } = await auth();
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  try {
    // ✅ Fetch user details from Clerk
    const clerkAdapter = await clerkClient();
    const clerkUser = await clerkAdapter.users.getUser(userId);

    const email = clerkUser.emailAddresses?.[0]?.emailAddress ?? null;
    const firstName = `${clerkUser.firstName ?? ""}`.trim() || null;
    const lastName = `${clerkUser.lastName ?? ""}`.trim() || null;

    // ✅ Upsert into MongoDB (via Prisma)
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: { email, last_name: lastName, first_name: firstName },
      create: {
        clerkId: userId,
        email,
        last_name: lastName,
        first_name: firstName,
      },
    });

    return res.status(200).json({ user });
  } catch (error: any) {
    console.error("Error fetching user or saving to DB:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
