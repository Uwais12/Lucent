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

    const { lessonSlug, score, passed, answers, courseId, chapterId, lessonId } = await req.json();
    if (!lessonSlug || typeof score !== 'number' || typeof passed !== 'boolean') {
      return new Response(JSON.stringify({ error: "Invalid quiz data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // Find the course and lesson
    const course = await Course.findById(courseId);

    if (!course) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the chapter and lesson using IDs
    const chapterIndex = course.chapters.findIndex(ch => ch._id.toString() === chapterId);
    const chapter = course.chapters[chapterIndex];
    const lessonIndex = chapter.lessons.findIndex(l => l._id.toString() === lessonId);
    const lesson = chapter.lessons[lessonIndex];

    if (!lesson || lesson.slug !== lessonSlug) {
      return new Response(JSON.stringify({ error: "Lesson not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

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
    const chapterProgress = courseProgress.chapters[chapterIndex];
    const lessonProgress = chapterProgress.lessons[lessonIndex];

    // Update quiz progress regardless of score
    lessonProgress.quizProgress = {
      ...lessonProgress.quizProgress,
      completed: passed,
      score,
      attempts: (lessonProgress.quizProgress.attempts || 0) + 1,
      lastAttemptDate: new Date()
    };

    // Initialize variables for tracking progress
    let nextLessonSlug = null;
    let xpGained = 0;
    let levelUp = false;

    // Only mark lesson as complete and award XP if score is >= 70%
    if (score >= 70) {
      if (!lessonProgress.completed) {
        lessonProgress.completed = true;
        lessonProgress.completionDate = new Date();
        
        // Award XP for completing the lesson (base XP + quiz score bonus)
        const baseXP = 100; // Base XP for completing a lesson
        const bonusXP = Math.round((score / 100) * 50); // Up to 50 bonus XP based on quiz score
        xpGained = baseXP + bonusXP;
        user.xp += xpGained;

        // Calculate and update level (every 1000 XP = 1 level)
        const oldLevel = user.level;
        const newLevel = Math.floor(user.xp / 1000) + 1;
        if (newLevel > oldLevel) {
          user.level = newLevel;
          levelUp = true;
        }

        // Update completion counts
        user.progress.completedLessons += 1;

        // Check if chapter is completed
        const allLessonsCompleted = chapterProgress.lessons.every(l => l.completed);
        if (allLessonsCompleted && !chapterProgress.completed) {
          chapterProgress.completed = true;
          chapterProgress.completionDate = new Date();
          // Award chapter completion XP
          const chapterXP = 250;
          xpGained += chapterXP;
          user.xp += chapterXP;
        }

        // Check if course is completed
        const allChaptersCompleted = courseProgress.chapters.every(c => c.completed);
        if (allChaptersCompleted && !courseProgress.completed) {
          courseProgress.completed = true;
          courseProgress.completionDate = new Date();
          // Award course completion XP
          const courseXP = 1000;
          xpGained += courseXP;
          user.xp += courseXP;
        }

        // Find next lesson
        // First, check next lesson in current chapter
        if (lessonIndex < chapter.lessons.length - 1) {
          nextLessonSlug = chapter.lessons[lessonIndex + 1].slug;
        } 
        // Then, check first lesson of next chapter
        else if (chapterIndex < course.chapters.length - 1) {
          const nextChapter = course.chapters[chapterIndex + 1];
          if (nextChapter.lessons.length > 0) {
            nextLessonSlug = nextChapter.lessons[0].slug;
          }
        }

        // Update current lesson/chapter pointers
        if (nextLessonSlug) {
          const nextChapterIndex = course.chapters.findIndex(chapter =>
            chapter.lessons.some(lesson => lesson.slug === nextLessonSlug)
          );
          const nextLessonIndex = course.chapters[nextChapterIndex].lessons
            .findIndex(lesson => lesson.slug === nextLessonSlug);

          courseProgress.currentChapter = nextChapterIndex;
          courseProgress.currentLesson = nextLessonIndex;
        }
      }
    }

    // Calculate and update completion percentage
    const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
    const completedLessons = courseProgress.chapters.reduce((sum, ch) => 
      sum + ch.lessons.filter(l => l.completed).length, 0
    );
    courseProgress.completionPercentage = Math.round((completedLessons / totalLessons) * 100);

    await user.save();

    return new Response(JSON.stringify({
      success: true,
      passed,
      score,
      xp: user.xp,
      xpGained,
      level: user.level,
      levelUp,
      nextLessonSlug: passed ? nextLessonSlug : null,
      completionPercentage: courseProgress.completionPercentage,
      isCompleted: courseProgress.completed,
      courseId: course._id
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