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

    const { courseId, chapterId, lessonId } = await req.json();
    if (!courseId || !chapterId || !lessonId) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the chapter and lesson using IDs
    const chapterIndex = course.chapters.findIndex(ch => ch._id.toString() === chapterId);
    if (chapterIndex === -1) {
      return new Response(JSON.stringify({ error: "Chapter not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const chapter = course.chapters[chapterIndex];
    const lessonIndex = chapter.lessons.findIndex(l => l._id.toString() === lessonId);
    if (lessonIndex === -1) {
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
      c => c.courseId.toString() === courseId
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

    // Initialize variables for tracking progress
    let xpGained = 0;
    let levelUp = false;
    let gemsGained = 0;

    // Only award XP and gems for first-time completion
    if (!lessonProgress.completed) {
      lessonProgress.completed = true;
      lessonProgress.completionDate = new Date();
      
      // Track time spent (assuming average time based on lesson duration)
      const lesson = chapter.lessons[lessonIndex];
      const timeSpent = lesson.duration || 10; // Default to 10 minutes if duration not specified
      user.progress.totalTimeSpent = (user.progress.totalTimeSpent || 0) + timeSpent;
      courseProgress.timeSpent = (courseProgress.timeSpent || 0) + timeSpent;
      
      // Award XP and gems for first-time lesson completion
      const baseXP = 100; // Base XP for completing a lesson
      const baseGems = 5; // Base gems for completing a lesson
      xpGained = baseXP;
      gemsGained = baseGems;
      user.xp += xpGained;
      user.gems += gemsGained;

      // Update completion counts
      user.progress.completedLessons = (user.progress.completedLessons || 0) + 1;

      // Check if chapter is completed for the first time
      const allLessonsCompleted = chapterProgress.lessons.every(l => l.completed);
      if (allLessonsCompleted && !chapterProgress.completed) {
        chapterProgress.completed = true;
        chapterProgress.completionDate = new Date();
        // Award chapter completion XP
        const chapterXP = 250;
        xpGained += chapterXP;
        user.xp += chapterXP;
      }

      // Check if course is completed for the first time
      const allChaptersCompleted = courseProgress.chapters.every(c => c.completed);
      if (allChaptersCompleted && !courseProgress.completed) {
        courseProgress.completed = true;
        courseProgress.completionDate = new Date();
        // Increment completedCourses counter
        user.progress.completedCourses += 1;
        // Award course completion XP
        const courseXP = 1000;
        xpGained += courseXP;
        user.xp += courseXP;
        // Award bonus gems for course completion
        const courseGems = 50;
        gemsGained += courseGems;
        user.gems += courseGems;
      }

      // Calculate and update level (every 1000 XP = 1 level)
      const oldLevel = user.level;
      const newLevel = Math.floor(user.xp / 1000) + 1;
      if (newLevel > oldLevel) {
        user.level = newLevel;
        levelUp = true;
        // Award bonus gems for leveling up
        const levelUpGems = 25;
        gemsGained += levelUpGems;
        user.gems += levelUpGems;
      }
    }

    // Find next lesson for future reference
    let nextLessonSlug = null;
    
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

    // Calculate and update completion percentage (this should happen regardless of completion status)
    const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
    const completedLessons = courseProgress.chapters.reduce((sum, ch) => 
      sum + ch.lessons.filter(l => l.completed).length, 0
    );
    courseProgress.completionPercentage = Math.round((completedLessons / totalLessons) * 100);

    await user.save();

    // Create redirect URL with XP notification parameters
    const redirectUrl = nextLessonSlug ? 
      `/lesson/${nextLessonSlug}?xpGained=${xpGained}&gemsGained=${gemsGained}&levelUp=${levelUp}&completionPercentage=${courseProgress.completionPercentage}&courseId=${course._id}` : 
      `/course-details/${course.slug}?xpGained=${xpGained}&gemsGained=${gemsGained}&levelUp=${levelUp}&completionPercentage=${courseProgress.completionPercentage}&courseId=${course._id}`;

    return new Response(JSON.stringify({
      success: true,
      xp: user.xp,
      xpGained,
      gems: user.gems,
      gemsGained,
      level: user.level,
      levelUp,
      completionPercentage: courseProgress.completionPercentage,
      isCompleted: courseProgress.completed,
      courseId: course._id,
      nextLessonSlug,
      redirectUrl
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error marking lesson as complete:", error);
    return new Response(JSON.stringify({ error: "Failed to mark lesson as complete" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 