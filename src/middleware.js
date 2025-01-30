// src/middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/about", "/learn"],
  async afterAuth(auth, req) {
    if (!auth.userId || req.nextUrl.pathname.startsWith("/_next")) {
      return;
    }

    // For admin routes, call a separate API route to check role
    if (req.nextUrl.pathname.startsWith("/admin")) {
      try {
        const roleCheck = await fetch(new URL("/api/user/role", req.url));
        const { role } = await roleCheck.json();

        if (role !== "ADMIN") {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
