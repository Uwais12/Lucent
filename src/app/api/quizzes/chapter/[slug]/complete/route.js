import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { calculateXP, calculateGems } from "@/lib/rewards";

export async function POST(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { score } = await req.json();
    if (typeof score !== "number" || score < 0 || score > 100) {
      return NextResponse.json(
        { error: "Invalid score provided" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find the course with the chapter quiz
    const course = await Course.findOne({
      chapters: {
        $elemMatch: {
          "endOfChapterQuiz.slug": params.slug
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Find the chapter containing this quiz
    const chapterIndex = course.chapters.findIndex(chapter => 
      chapter.endOfChapterQuiz?.slug === params.slug
    );

    if (chapterIndex === -1) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const chapter = course.chapters[chapterIndex];
    const quiz = chapter.endOfChapterQuiz;

    // Get or create user progress
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId });
    }

    // Initialize course progress if it doesn't exist
    if (!user.courseProgress) {
      user.courseProgress = {};
    }
    if (!user.courseProgress[course._id]) {
      user.courseProgress[course._id] = {
        currentChapter: 0,
        currentLesson: 0,
        completedLessons: [],
        completedChapters: [],
        quizScores: {},
        completionPercentage: 0
      };
    }

    const progress = user.courseProgress[course._id];

    // Check if this is a new high score
    const previousScore = progress.quizScores[quiz._id] || 0;
    const isNewHighScore = score > previousScore;

    // Calculate rewards only if this is a new high score
    let xpEarned = 0;
    let gemsEarned = 0;
    let levelUp = false;

    if (isNewHighScore) {
      // Calculate XP (2 XP per percentage point)
      xpEarned = calculateXP(score);
      
      // Calculate gems based on score
      gemsEarned = calculateGems(score);

      // Update user's XP and gems
      user.totalXP = (user.totalXP || 0) + xpEarned;
      user.gems = (user.gems || 0) + gemsEarned;

      // Check for level up
      const oldLevel = Math.floor((user.totalXP - xpEarned) / 100);
      const newLevel = Math.floor(user.totalXP / 100);
      if (newLevel > oldLevel) {
        levelUp = true;
        // Award bonus gems for leveling up
        user.gems += 25;
        gemsEarned += 25;
      }

      // Update quiz score
      progress.quizScores[quiz._id] = score;
    }

    // Mark chapter as completed if score is 50% or higher
    if (score >= 50 && !progress.completedChapters.includes(chapterIndex)) {
      progress.completedChapters.push(chapterIndex);
      
      // Update current chapter if this was the current one
      if (progress.currentChapter === chapterIndex) {
        progress.currentChapter = chapterIndex + 1;
        progress.currentLesson = 0;
      }
    }

    // Calculate completion percentage
    const totalChapters = course.chapters.length;
    progress.completionPercentage = Math.round(
      (progress.completedChapters.length / totalChapters) * 100
    );

    // Save user progress
    await user.save();

    return NextResponse.json({
      success: true,
      score,
      isNewHighScore,
      xpEarned,
      gemsEarned,
      levelUp,
      newLevel: levelUp ? Math.floor(user.totalXP / 100) : null,
      completionPercentage: progress.completionPercentage,
      message: levelUp
        ? "Level up! You earned bonus gems!"
        : isNewHighScore
        ? "New high score!"
        : "Quiz completed!"
    });
  } catch (error) {
    console.error("Error completing chapter quiz:", error);
    return NextResponse.json(
      { error: "Failed to complete chapter quiz" },
      { status: 500 }
    );
  }
} 