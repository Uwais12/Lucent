// src/middleware.js
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = [
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/auth/webhook',
  '/landing-page(.*)',
];

const isPublic = createRouteMatcher(publicRoutes);

export default clerkMiddleware({
  publicRoutes: publicRoutes,
  ignoredRoutes: [
    "/api/auth/webhook",
  ],
  afterAuth(auth, req) {
    if (!auth.userId && !isPublic(req.url)) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.append('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
