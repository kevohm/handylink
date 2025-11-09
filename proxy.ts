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
  // Ignore static and API routes
  if (req.nextUrl.pathname.startsWith("/api")) {
     const { userId } = await auth();

     if (!userId) {
       return NextResponse.json(
         { error: "Not authenticated" },
         { status: 401 }
       );
     }
    return NextResponse.next();
  }

  const { userId } = await auth();

  // 🔹 Not logged in
  if (!userId) {
    if (protectedRoutes(req)) {
      try {
        await auth.protect(); // will redirect to /sign-in
      } catch {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }
    return NextResponse.next();
  }

  // 🔹 Logged in: check if user exists in DB
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });

  // 🧭 Case 1: User not in DB → redirect to onboarding
  if (!user && !onboardingRoutes(req)) {
    return NextResponse.redirect(new URL("/select-role", req.url));
  }

  // 🧭 Case 2: User exists but is trying to access onboarding → redirect to home
  if (user && onboardingRoutes(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🧭 Case 3: Everything else → allow
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
