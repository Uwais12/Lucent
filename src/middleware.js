import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export default clerkMiddleware({
  publicRoutes: ["/", "/about", "/learn"],
  async afterAuth(auth, req) {
    // Allow public routes and static files
    if (!auth.userId || req.nextUrl.pathname.startsWith('/_next')) {
      return;
    }

    // Check if trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      try {
        await connectToDatabase();
        const user = await User.findOne({ clerkId: auth.userId });
        
        if (!user || user.role !== 'ADMIN') {
          // Redirect to home if not admin
          return NextResponse.redirect(new URL('/', req.url));
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        // Redirect to home on error
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
