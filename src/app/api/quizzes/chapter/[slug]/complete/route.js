import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { calculateXP } from "@/lib/rewards";
import { calculateGems } from "@/lib/rewards";
import { badgeDefinitions } from "@/lib/badgeDefinitions.js";

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

    // Find the course and chapter that contains this quiz
    const course = await Course.findOne({
      'chapters.endOfChapterQuiz.slug': params.slug
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Find the chapter that contains this quiz
    const chapterIndex = course.chapters.findIndex(chapter => 
      chapter.endOfChapterQuiz?.slug === params.slug
    );

    if (chapterIndex === -1) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const chapter = course.chapters[chapterIndex];

    // Get user
    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // --- Daily Quiz Limit Check ---
      const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
      
    // Reset count if last quiz was before today
    if (!user.lastQuizDate || new Date(user.lastQuizDate) < today) {
      user.dailyQuizCount = 0;
      user.lastQuizDate = today; 
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

    // Determine if score is passing
    const passingScoreThreshold = chapter.endOfChapterQuiz?.passingScore || 70; // Default to 70 if not defined
    const isPassingScore = score >= passingScoreThreshold;
    let quizCompletedSuccessfully = false;

    // Initialize user progress if it doesn't exist
    if (!user.progress) {
      user.progress = {
        courses: [],
        totalTimeSpent: 0,
        completedCourses: 0,
        completedLessons: 0,
        completedExercises: 0,
        averageScore: 0
      };
    }

    // Find or create course progress
    let courseProgress = user.progress.courses.find(
      c => c.courseId.toString() === course._id.toString()
    );

    if (!courseProgress) {
      courseProgress = {
        courseId: course._id,
        completed: false,
        chapters: course.chapters.map(chapter => ({
          chapterId: chapter._id,
          completed: false,
          lessons: chapter.lessons.map(lesson => ({
            lessonId: lesson._id,
            completed: false,
            completedAt: null
          }))
        }))
      };
      user.progress.courses.push(courseProgress);
    }

    const chapterProgress = courseProgress.chapters[chapterIndex];

    // Initialize quiz progress if it doesn't exist
    if (!chapterProgress.quizProgress) {
      chapterProgress.quizProgress = {
        completed: false,
        score: 0,
        attempts: 0,
        lastAttemptDate: null
      };
    }

    // Update quiz progress regardless of score
    chapterProgress.quizProgress = {
      ...chapterProgress.quizProgress,
      completed: isPassingScore,
      score,
      attempts: (chapterProgress.quizProgress?.attempts || 0) + 1,
      lastAttemptDate: new Date()
    };

    const previousPassed = chapterProgress.quizProgress?.score >= passingScoreThreshold;
    const isFirstPass = isPassingScore && !previousPassed;

    // If passed, mark chapter and all its lessons as complete
    if (isPassingScore) {
      // Increment daily count and update dates ONLY if passing
      user.dailyQuizCount += 1;
      user.lastQuizCompletion = new Date(); 
      user.lastQuizDate = today; // Ensure lastQuizDate reflects today
      quizCompletedSuccessfully = true;
      
      // Try to award the "First Quiz Completed" badge
      const firstQuizBadgeDef = badgeDefinitions.FIRST_QUIZ_COMPLETED;
      if (firstQuizBadgeDef) {
        const wasFirstQuizBadgeAwarded = user.awardBadge({
          badgeId: firstQuizBadgeDef.id,
          name: firstQuizBadgeDef.name,
          description: firstQuizBadgeDef.description,
          iconUrl: firstQuizBadgeDef.iconUrl,
          type: firstQuizBadgeDef.type
        });
        console.log("wasFirstQuizBadgeAwarded", wasFirstQuizBadgeAwarded);

        if (wasFirstQuizBadgeAwarded) {
          newlyAwardedBadges.push(firstQuizBadgeDef);
        }
      }
      
      chapterProgress.completed = true;
      chapterProgress.completedAt = new Date();
      
      // Mark all lessons in this chapter as complete
      chapterProgress.lessons.forEach(lesson => {
        if (!lesson.completed) {
          lesson.completed = true;
          lesson.completedAt = new Date();
          // Increment completed lessons counter
          user.progress.completedLessons = (user.progress.completedLessons || 0) + 1;
        }
      });

      // Check if all chapters are completed
      const allChaptersCompleted = courseProgress.chapters.every(ch => ch.completed);
      if (allChaptersCompleted && !courseProgress.completed) {
        courseProgress.completed = true;
        courseProgress.completedAt = new Date();
        user.progress.completedCourses = (user.progress.completedCourses || 0) + 1;
      }

      // Update current lesson and chapter pointers
      // If there's a next chapter, set to its first lesson
      if (chapterIndex < course.chapters.length - 1) {
        const nextChapter = course.chapters[chapterIndex + 1];
        if (nextChapter.lessons.length > 0) {
          courseProgress.currentChapter = chapterIndex + 1;
          courseProgress.currentLesson = 0;
        }
      }
    }

    // Calculate XP and gems only if this is the first time passing
    let xpEarned = 0;
    let gemsEarned = 0;
    let levelUp = false;
    let newlyAwardedBadges = [];

    if (isFirstPass) {
      xpEarned = calculateXP(score, 'chapter-quiz');
      gemsEarned = calculateGems(score, 'chapter-quiz');

      // Update user's total XP and gems
      user.xp = (user.xp || 0) + xpEarned;
      user.gems = (user.gems || 0) + gemsEarned;

      // Check for level up
      const oldLevel = user.level || 1;
      const newLevel = Math.floor(Math.sqrt(user.xp / 100)) + 1;
      levelUp = newLevel > oldLevel;
      if (levelUp) {
        user.level = newLevel;
      }
    }

    // Calculate completion percentage
    const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
    const completedLessons = courseProgress.chapters.reduce((sum, ch) => 
      sum + ch.lessons.filter(l => l.completed).length, 0
    );
    const completionPercentage = Math.round((completedLessons / totalLessons) * 100);
    courseProgress.completionPercentage = completionPercentage;

    // Save user changes ONLY if the quiz was successfully completed (passed and within limit)
    if (quizCompletedSuccessfully) {
    await user.save();
    }

    return NextResponse.json({
      success: true,
      score,
      passed: isPassingScore,
      xpEarned,
      gemsEarned,
      levelUp,
      completionPercentage,
      dailyLimitReached: false,
      quizzesTakenToday: user.dailyQuizCount,
      maxQuizzesToday: maxDailyQuizzes,
      awardedBadges: newlyAwardedBadges
    });
  } catch (error) {
    console.error("Error completing chapter quiz:", error);
    return NextResponse.json(
      { error: "Failed to complete chapter quiz" },
      { status: 500 }
    );
  }
} 