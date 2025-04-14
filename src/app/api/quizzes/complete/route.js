export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { quizId, score, totalQuestions, quizType } = await request.json();

    // Check if user has already completed a quiz today
    if (user.lastQuizCompletion) {
      const lastQuizDate = new Date(user.lastQuizCompletion);
      const today = new Date();
      
      // Check if last quiz was completed today
      if (lastQuizDate.toDateString() === today.toDateString()) {
        return NextResponse.json({ 
          error: "Daily quiz limit reached. You can take another quiz tomorrow.",
          dailyLimitReached: true
        }, { status: 403 });
      }
    }

    // Only update lastQuizCompletion if score is passing (70% or higher)
    const passingScore = (score / totalQuestions) >= 0.7;
    if (passingScore) {
      user.lastQuizCompletion = new Date();
      await user.save();
    }

    // Calculate rewards
    let xpGained = 0;
    let gemsGained = 0;
    let levelUp = false;
    let completionPercentage = 0;

    if (passingScore) {
      // Calculate XP and gems based on quiz type
      switch (quizType) {
        case 'lesson-quiz':
          xpGained = 50;
          gemsGained = 5;
          break;
        case 'chapter-quiz':
          xpGained = 100;
          gemsGained = 10;
          break;
        case 'course-exam':
          xpGained = 200;
          gemsGained = 20;
          break;
      }

      // Add bonus for high scores
      if (score >= 90) {
        xpGained *= 1.5;
        gemsGained *= 1.5;
      }

      // Update user's XP and gems
      user.xp = (user.xp || 0) + xpGained;
      user.gems = (user.gems || 0) + gemsGained;

      // Check for level up
      const oldLevel = user.level || 1;
      const newLevel = Math.floor(Math.sqrt(user.xp / 100)) + 1;
      levelUp = newLevel > oldLevel;
      if (levelUp) {
        user.level = newLevel;
      }

      await user.save();
    }

    return NextResponse.json({
      success: true,
      xpGained,
      gemsGained,
      levelUp,
      completionPercentage,
      dailyLimitReached: false
    });
  } catch (err) {
    console.error("Error in POST /api/quizzes/complete:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
} 