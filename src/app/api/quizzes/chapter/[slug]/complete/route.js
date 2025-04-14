import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { calculateXP } from "@/lib/rewards";
import { calculateGems } from "@/lib/rewards";

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

    // Only update lastQuizCompletion if score is passing
    const passingScore = score >= chapter.endOfChapterQuiz.passingScore;
    if (passingScore) {
      user.lastQuizCompletion = new Date();
      await user.save();
      console.log('User lastQuizCompletion updated to:', user.lastQuizCompletion);
    }

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
      completed: score >= chapter.endOfChapterQuiz.passingScore,
      score,
      attempts: (chapterProgress.quizProgress.attempts || 0) + 1,
      lastAttemptDate: new Date()
    };

    const currentPassed = score >= chapter.endOfChapterQuiz.passingScore;
    const previousPassed = chapterProgress.quizProgress.score >= chapter.endOfChapterQuiz.passingScore;
    const isFirstPass = currentPassed && !previousPassed;

    // If passed, mark chapter and all its lessons as complete
    if (currentPassed) {
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

    await user.save();

    return NextResponse.json({
      success: true,
      score,
      passed: currentPassed,
      xpEarned,
      gemsEarned,
      levelUp,
      completionPercentage
    });
  } catch (error) {
    console.error("Error completing chapter quiz:", error);
    return NextResponse.json(
      { error: "Failed to complete chapter quiz" },
      { status: 500 }
    );
  }
} 