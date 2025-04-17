import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


const isOnboardingRoute = createRouteMatcher(['/create-profile', "/select-role", "/add-task"])

const isProtectedRoute = createRouteMatcher([ '/account', '/book', '/booking-confirmation', '/profile', '/profile/[id]', '/add-task'])

interface SessionClaims {
  metadata?: {
    onboardingComplete?: boolean;
  };
}

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims, userId } = await auth() as { sessionClaims: SessionClaims, userId: string | null };
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next();
  }
  if (isProtectedRoute(req)) await auth.protect();
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL('/select-role', req.url);
    return NextResponse.redirect(onboardingUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}