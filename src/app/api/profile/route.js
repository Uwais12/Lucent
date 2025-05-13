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

    // 3) Find or create the user doc - NOT using lean() to allow method calls
    let userDoc = await User.findOne({ clerkId: userId });
    let isNewUser = false;
    
    if (!userDoc) {
      // Only create if not found
      userDoc = new User({ clerkId: userId });
      // Initialize default fields for a new user if necessary (e.g., streak)
      userDoc.dailyStreak = 0; 
      isNewUser = true;
      // Save immediately to have an _id and other defaults for subsequent operations
      // Or, ensure updateDailyStreak and other logic correctly initializes for a brand new doc
      // For simplicity, we can let updateDailyStreak handle first-time setup.
    }

    let needsSave = false;

    // --- Daily Quiz Count Reset Logic ---
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    if (!userDoc.lastQuizDate || new Date(userDoc.lastQuizDate) < today) {
      userDoc.dailyQuizCount = 0; // Reset count
      userDoc.lastQuizDate = today; // Update last quiz date check
      needsSave = true;
    }
    // --- End Quiz Count Reset Logic ---

    // --- Streak Update Logic & Badge Awarding ---
    const streakBeforeUpdate = userDoc.dailyStreak || 0;
    // updateDailyStreak method handles its own logic for incrementing/resetting streak and lastDailyActivity
    const awardedBadgesFromStreak = userDoc.updateDailyStreak(); 
    
    let streakStatus = { broken: false, previousStreak: 0 };
    // If streak is now 1, and it was > 1 before, it means it was broken and reset by updateDailyStreak.
    // Or if it was 0 and became 1, it's a new streak.
    // The updateDailyStreak method resets to 1 on a break.
    if (userDoc.dailyStreak === 1 && streakBeforeUpdate > 1) {
      streakStatus = {
        broken: true,
        previousStreak: streakBeforeUpdate
      };
    }
    // If awardedBadgesFromStreak has items, or if streak value changed, or if it's a new user establishing a streak
    if (awardedBadgesFromStreak?.length > 0 || userDoc.dailyStreak !== streakBeforeUpdate || isNewUser && userDoc.dailyStreak === 1) {
      needsSave = true;
    }
    // --- End Streak Update Logic ---
    
    // Always update last overall activity
    userDoc.lastActivity = new Date();
    if (isNewUser) needsSave = true; // Ensure new user is saved

    if (needsSave) {
      await userDoc.save();
    }
    
    // For a newly created user, the initial save within the if(!userDoc) block might be better
    // Or, if we defer save until here, ensure all fields are set up by methods called.
    // If isNewUser was true and save happened: fetch again or use the saved doc.
    // For simplicity, current logic will save if needsSave is true.
    // If new user, userDoc was new User({clerkId}), updateDailyStreak sets streak to 1 and lastDailyActivity.
    // Then it gets saved here.

    // 4) Return user doc with streak status (and updated quiz count)
    const userObject = userDoc.toObject(); // Convert to plain object for response
    let nr = NextResponse.json({
      ...userObject,
      streakStatus,
      awardedBadges: awardedBadgesFromStreak || [] // Include badges from streak update
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    })
    console.log(nr)
    return nr;
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
