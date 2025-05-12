import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User"; // Ensure User model is imported
import { calculateXP, calculateGems } from "@/lib/rewards"; // Assuming these are correctly imported

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    await connectToDatabase();

    // Fetch user including subscription data
    const user = await User.findOne({ clerkId: userId }); 
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { quizId, score, totalQuestions, quizType } = await request.json();

    // --- Daily Quiz Limit Check ---
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    // Reset count if last quiz was before today
    if (!user.lastQuizDate || new Date(user.lastQuizDate) < today) {
      user.dailyQuizCount = 0;
      user.lastQuizDate = today; 
      // No need to save immediately, will be saved later if quiz is passed
    }
    
    // Determine max quizzes based on subscription
    const isPro = user.subscription?.tier === 'PRO' || user.subscription?.tier === 'ENTERPRISE';
    const maxDailyQuizzes = isPro ? 5 : 1;
    
    // Check limit
    if (user.dailyQuizCount >= maxDailyQuizzes) {
      return NextResponse.json({
        error: `Daily quiz limit of ${maxDailyQuizzes} reached. You can take another quiz tomorrow.`,
        dailyLimitReached: true
      }, { status: 403 });
    }
    // --- End Daily Quiz Limit Check ---
    
    // Calculate if score is passing
    const passingScore = totalQuestions > 0 ? (score / totalQuestions) >= 0.7 : false;
    
    // Initialize reward variables
    let xpGained = 0;
    let gemsGained = 0;
    let levelUp = false;
    let completionPercentage = 0; // This seems unused, consider removing
    let quizCompletedSuccessfully = false;

    if (passingScore) {
      // Increment daily count and update dates
      user.dailyQuizCount += 1;
      user.lastQuizCompletion = new Date(); 
      user.lastQuizDate = today; // Ensure lastQuizDate reflects today
      quizCompletedSuccessfully = true;

      // Calculate XP and gems based on quiz type
      switch (quizType) {
        case 'lesson-quiz':
          xpGained = calculateXP('lesson_quiz_pass', score);
          gemsGained = calculateGems('lesson_quiz_pass', score);
          break;
        case 'chapter-quiz':
          xpGained = calculateXP('chapter_quiz_pass', score);
          gemsGained = calculateGems('chapter_quiz_pass', score);
          break;
        case 'course-exam':
          xpGained = calculateXP('course_exam_pass', score);
          gemsGained = calculateGems('course_exam_pass', score);
          break;
        default:
           xpGained = calculateXP('default_quiz_pass', score); // Fallback
           gemsGained = calculateGems('default_quiz_pass', score); // Fallback
      }
      
      // Update user's XP and gems
      user.xp = (user.xp || 0) + xpGained;
      user.gems = (user.gems || 0) + gemsGained;

      // Check for level up
      const oldLevel = user.level || 1;
      // Ensure user.xp exists before calculating new level
      const currentXP = user.xp || 0;
      const newLevel = Math.floor(Math.sqrt(currentXP / 100)) + 1; 
      levelUp = newLevel > oldLevel;
      if (levelUp) {
        user.level = newLevel;
      }
    }

    // Save user changes ONLY if the quiz was passed
    if (quizCompletedSuccessfully) {
      await user.save();
    }

    // Dispatch event for frontend update
    // Consider adding a check here to only dispatch if quizCompletedSuccessfully is true
    // This would require a different approach as server-side events aren't standard in Next.js API routes.
    // A simpler approach might be to rely on the frontend re-fetching profile data.

    return NextResponse.json({
      success: true,
      xpGained,
      gemsGained,
      levelUp,
      // completionPercentage, // Consider removing if unused
      dailyLimitReached: false, // Limit wasn't reached if we got here
      quizzesTakenToday: user.dailyQuizCount, // Return updated count
      maxQuizzesToday: maxDailyQuizzes // Return max allowed count
    });

  } catch (err) {
    console.error("Error in POST /api/quizzes/complete:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
} 