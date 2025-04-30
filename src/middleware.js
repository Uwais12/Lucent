// src/middleware.js
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// List of public routes that don't require authentication
const publicRoutes = [
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/auth/webhook',
  '/api/webhooks/stripe', // Allow Stripe webhooks to bypass auth
  '/landing-page(.*)',
];

const isPublic = createRouteMatcher(publicRoutes);

export default clerkMiddleware({
  publicRoutes: publicRoutes,
  ignoredRoutes: [
    "/api/auth/webhook",
    "/api/webhooks/stripe",
  ],
  afterAuth(auth, req) {
    // Handle authenticated state
    if (!auth.userId && !isPublic(req.url)) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.append('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // For subscriptions check, we need to call the API
    // We'll check only in specific routes like premium course access
    const isSubscriptionProtectedRoute = req.nextUrl.pathname.startsWith('/course') || 
      req.nextUrl.pathname.startsWith('/lesson');
      
    if (auth.userId && isSubscriptionProtectedRoute) {
      // Add a flag to the request to indicate that it should check subscription
      // The actual check will be done in the page/component using a hook or API call
      // This avoids making database calls in the middleware
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-subscription-check-required', 'true');
      
      // Return the request with the modified headers
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
