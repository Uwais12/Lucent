// /src/app/api/profile/route.js
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// Add a short revalidation time for profile data
export const revalidate = 60; // 1 minute

export async function GET(request) {
  try {
    // 1) Pass the request to getAuth
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    // 2) Connect to Mongo
    await connectToDatabase();

    // 3) Find or create the user doc - using lean() for better performance
    let user = await User.findOne({ clerkId: userId }).lean();
    
    if (!user) {
      // Only create if not found
      const newUser = new User({ clerkId: userId });
      await newUser.save();
      user = newUser.toObject();
      
      // Return immediately since we just created this user
      return NextResponse.json(user, {
        headers: {
          'Cache-Control': 'private, max-age=10, stale-while-revalidate=30'
        }
      });
    }

    // For existing users, check if streak needs updating
    const now = new Date();
    const lastActivity = user.lastDailyActivity ? new Date(user.lastDailyActivity) : null;
    let streakStatus = { broken: false };
    let needsUpdate = false;
    
    if (lastActivity) {
      // Check if last activity was yesterday or today
      const diffDays = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        // Already logged today, no streak update needed
      } else if (diffDays === 1) {
        // Last activity was yesterday, increment streak
        needsUpdate = true;
        user.dailyStreak += 1;
        user.lastDailyActivity = now;
      } else {
        // Streak broken
        needsUpdate = true;
        const oldStreak = user.dailyStreak;
        user.dailyStreak = 1;
        user.lastDailyActivity = now;
        streakStatus = {
          broken: true,
          previousStreak: oldStreak
        };
      }
    } else {
      // First activity
      needsUpdate = true;
      user.dailyStreak = 1;
      user.lastDailyActivity = now;
    }
    
    // Only update if needed to reduce database writes
    if (needsUpdate) {
      await User.updateOne(
        { clerkId: userId },
        { 
          $set: { 
            dailyStreak: user.dailyStreak,
            lastDailyActivity: user.lastDailyActivity,
            lastActivity: now
          } 
        }
      );
    }

    // 4) Return user doc with streak status
    return NextResponse.json({
      ...user,
      streakStatus
    }, {
      headers: {
        'Cache-Control': 'private, max-age=30, stale-while-revalidate=60'
      }
    });
  } catch (err) {
    console.error("Error in GET /api/profile:", err);
    // Return a 500
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    // 1) Pass the request to getAuth
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    // 2) Connect to Mongo
    await connectToDatabase();

    // 3) Get request body
    const body = await request.json();
    
    // 4) Update workplace information if provided using findOneAndUpdate
    // This is more efficient than find + save
    if (body.workplace) {
      const updatedUser = await User.findOneAndUpdate(
        { clerkId: userId },
        { 
          $set: { 
            'workplace': {
              ...body.workplace
            },
            'lastActivity': new Date()
          } 
        },
        { new: true, projection: { workplace: 1 } }
      ).lean();
      
      if (!updatedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // 7) Return only the updated fields
      return NextResponse.json({
        workplace: updatedUser.workplace,
        message: "Profile updated successfully"
      });
    }
    
    return NextResponse.json({ error: "No data to update" }, { status: 400 });
  } catch (err) {
    console.error("Error in PUT /api/profile:", err);
    // Return a 500
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
