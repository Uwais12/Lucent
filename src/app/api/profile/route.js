// /src/app/api/profile/route.js
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// Add a short revalidation time for profile data
// export const revalidate = 60; // 1 minute // Removing this line

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
    return nr;
  } catch (err) {
    console.error("Error in GET /api/profile:", err);
    // Return a 500
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    
    const { username, occupation, companyName, workplace: newWorkplaceDetails } = body;

    let userToUpdate = await User.findOne({ clerkId: userId });
    if (!userToUpdate) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateFields = { $set: { lastActivity: new Date() } };
    let needsProfileSetupCompletion = false;

    // If profile setup is not complete, username is required.
    if (!userToUpdate.profileSetupComplete && !username) {
      return NextResponse.json(
        { error: "Username is required to complete profile setup." },
        { status: 400 }
      );
    }

    if (username) {
      updateFields.$set.username = username;
      // Only set profileSetupComplete to true if a username is being successfully set.
      // This handles the case where it might be called multiple times before username is set.
      if (!userToUpdate.profileSetupComplete) {
          needsProfileSetupCompletion = true;
      }
    }

    if (occupation !== undefined) { // Allow setting occupation to empty string
      updateFields.$set.occupation = occupation;
    }

    if (companyName !== undefined) { // Allow setting companyName to empty string
      updateFields.$set['workplace.company'] = companyName;
    }
    
    // Handle general workplace updates if newWorkplaceDetails is provided
    // This merges with specific companyName update if both are somehow sent
    if (newWorkplaceDetails && typeof newWorkplaceDetails === 'object') {
        for (const key in newWorkplaceDetails) {
            if (Object.prototype.hasOwnProperty.call(newWorkplaceDetails, key) && newWorkplaceDetails[key] !== undefined) {
                 updateFields.$set[`workplace.${key}`] = newWorkplaceDetails[key];
            }
        }
    }

    if (Object.keys(updateFields.$set).length === 1 && !needsProfileSetupCompletion) { // Only lastActivity was added
      return NextResponse.json({ error: "No data to update" }, { status: 400 });
    }
    
    if (needsProfileSetupCompletion) {
        updateFields.$set.profileSetupComplete = true;
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { clerkId: userId },
        updateFields,
        { new: true }
      ).lean(); // Use lean for the final returned object if not modifying further

      if (!updatedUser) { // Should not happen if userToUpdate was found
        return NextResponse.json({ error: "User not found during update" }, { status: 404 });
      }

      return NextResponse.json({
        message: "Profile updated successfully",
        user: {
            username: updatedUser.username,
            occupation: updatedUser.occupation,
        workplace: updatedUser.workplace,
            profileSetupComplete: updatedUser.profileSetupComplete
        }
      });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern?.username) { // MongoDB duplicate key error for username
        return NextResponse.json(
          { error: "Username already taken. Please choose a different one." },
          { status: 409 } // 409 Conflict
        );
      }
      // Re-throw other errors
      throw error;
    }

  } catch (err) {
    console.error("Error in PUT /api/profile:", err);
    return NextResponse.json({ error: "Server error updating profile" }, { status: 500 });
  }
}
