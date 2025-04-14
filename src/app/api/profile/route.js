// /src/app/api/profile/route.js
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request) {
  try {
    // 1) Pass the request to getAuth
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    // 2) Connect to Mongo
    await connectToDatabase();

    // 3) Find or create the user doc
    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      user = await User.create({ clerkId: userId });
    }

    // Update daily streak if user has activity today
    const now = new Date();
    const lastActivity = user.lastDailyActivity ? new Date(user.lastDailyActivity) : null;
    
    if (lastActivity) {
      // Check if last activity was yesterday or today
      const diffDays = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        // Already logged today, no streak update needed
      } else if (diffDays === 1) {
        // Last activity was yesterday, increment streak
        user.dailyStreak += 1;
        user.lastDailyActivity = now;
        await user.save();
      } else {
        // Streak broken
        const oldStreak = user.dailyStreak;
        user.dailyStreak = 1;
        user.lastDailyActivity = now;
        await user.save();
        
        // Add streak status to response
        return NextResponse.json({
          ...user.toObject(),
          streakStatus: {
            broken: true,
            previousStreak: oldStreak
          }
        });
      }
    } else {
      // First activity
      user.dailyStreak = 1;
      user.lastDailyActivity = now;
      await user.save();
    }

    // 4) Return user doc with streak status
    return NextResponse.json({
      ...user.toObject(),
      streakStatus: {
        broken: false
      }
    });
  } catch (err) {
    console.error("Error in GET /api/profile:", err);
    // Return a 500
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
