import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { lessonSlug, score, passed, answers } = await req.json();
    if (!lessonSlug || typeof score !== 'number' || typeof passed !== 'boolean') {
      return new Response(JSON.stringify({ error: "Invalid quiz data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // Find the course and lesson
    const course = await Course.findOne({
      "chapters.lessons.slug": lessonSlug
    });

    if (!course) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the chapter and lesson
    const chapter = course.chapters.find(chapter =>
      chapter.lessons.some(lesson => lesson.slug === lessonSlug)
    );
    const lesson = chapter.lessons.find(lesson => lesson.slug === lessonSlug);

    // Find user and update progress
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the user's course progress
    const courseProgress = user.progress.courses.find(
      c => c.courseId.toString() === course._id.toString()
    );

    if (!courseProgress) {
      return new Response(JSON.stringify({ error: "Not enrolled in course" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the chapter and lesson progress
    const chapterProgress = courseProgress.chapters.find(
      c => c.chapterId.toString() === chapter._id.toString()
    );
    const lessonProgress = chapterProgress.lessons.find(
      l => l.lessonId.toString() === lesson._id.toString()
    );

    // Update quiz progress
    lessonProgress.quizProgress = {
      ...lessonProgress.quizProgress,
      completed: passed,
      score,
      attempts: (lessonProgress.quizProgress.attempts || 0) + 1,
      lastAttemptDate: new Date()
    };

    // If passed, mark lesson as completed and award XP
    if (passed && !lessonProgress.completed) {
      lessonProgress.completed = true;
      
      // Award XP for completing the lesson (base XP + quiz score bonus)
      const baseXP = 100; // Base XP for completing a lesson
      const bonusXP = Math.round((score / 100) * 50); // Up to 50 bonus XP based on quiz score
      const totalXP = baseXP + bonusXP;

      user.xp += totalXP;

      // Calculate and update level (every 1000 XP = 1 level)
      const newLevel = Math.floor(user.xp / 1000) + 1;
      if (newLevel > user.level) {
        user.level = newLevel;
      }

      // Update completion counts
      user.progress.completedLessons += 1;

      // Check if chapter is completed
      const allLessonsCompleted = chapterProgress.lessons.every(l => l.completed);
      if (allLessonsCompleted && !chapterProgress.completed) {
        chapterProgress.completed = true;
        // Award chapter completion XP
        user.xp += 250;
      }

      // Check if course is completed
      const allChaptersCompleted = courseProgress.chapters.every(c => c.completed);
      if (allChaptersCompleted && !courseProgress.completed) {
        courseProgress.completed = true;
        courseProgress.completionDate = new Date();
        // Award course completion XP
        user.xp += 1000;
      }
    }

    await user.save();

    return new Response(JSON.stringify({
      success: true,
      passed,
      score,
      xp: user.xp,
      level: user.level
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error completing quiz:", error);
    return new Response(JSON.stringify({ error: "Failed to complete quiz" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 