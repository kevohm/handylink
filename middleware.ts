import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "./lib/prisma";

const onboardingRoutes = createRouteMatcher([
  "/create-profile",
  "/select-role",
  "/add-task",
]);

const protectedRoutes = createRouteMatcher([
  "/account",
  "/book",
  "/booking-confirmation",
  "/profile",
  "/profile/[id]",
  "/add-task",
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip API routes entirely
  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const { userId } = await auth();

  // If no userId, let auth.protect handle protected routes
  if (!userId) {
    if (protectedRoutes(req)) {
      try {
        await auth.protect(); // redirects if not logged in
      } catch {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }
    return NextResponse.next();
  }

  // ✅ Check if user exists in your database
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });

  // 1️⃣ Logged-in users accessing onboarding routes are allowed
  if (userId && onboardingRoutes(req)) {
    return NextResponse.next();
  }

  // 2️⃣ Protected routes
  if (protectedRoutes(req)) {
    // Redirect to sign-in if user does not exist in DB
    if (!user) {
      return NextResponse.redirect(new URL("/create-profile", req.url));
    }
  }

  // 3️⃣ Default: allow access
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
