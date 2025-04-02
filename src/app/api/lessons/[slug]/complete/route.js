import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // Find the course and lesson
    const course = await Course.findOne({
      "chapters.lessons.slug": params.slug
    });

    if (!course) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the chapter and lesson
    const chapterIndex = course.chapters.findIndex(chapter =>
      chapter.lessons.some(lesson => lesson.slug === params.slug)
    );
    const chapter = course.chapters[chapterIndex];
    const lessonIndex = chapter.lessons.findIndex(lesson => lesson.slug === params.slug);
    const lesson = chapter.lessons[lessonIndex];

    // Find user and update progress
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find or create course progress
    let courseProgress = user.progress.courses.find(
      c => c.courseId.toString() === course._id.toString()
    );

    if (!courseProgress) {
      courseProgress = {
        courseId: course._id,
        chapters: course.chapters.map(ch => ({
          chapterId: ch._id,
          completed: false,
          lessons: ch.lessons.map(l => ({
            lessonId: l._id,
            completed: false
          }))
        }))
      };
      user.progress.courses.push(courseProgress);
    }

    // Initialize variables for tracking progress
    let xpGained = 0;
    let levelUp = false;
    let gemsGained = 0;

    // Update lesson completion
    const chapterProgress = courseProgress.chapters[chapterIndex];
    const lessonProgress = chapterProgress.lessons[lessonIndex];
    
    // Check if lesson is already completed
    const isFirstCompletion = !lessonProgress.completed;
    
    // Track completion and attempts
    lessonProgress.completed = true;
    lessonProgress.completionDate = new Date();
    lessonProgress.attempts = (lessonProgress.attempts || 0) + 1;
    
    // Track time spent (assuming average time based on lesson duration)
    const timeSpent = lesson.duration || 10; // Default to 10 minutes if duration not specified
    user.progress.totalTimeSpent = (user.progress.totalTimeSpent || 0) + timeSpent;
    courseProgress.timeSpent = (courseProgress.timeSpent || 0) + timeSpent;
    
    // Only award XP and gems for first completion
    if (isFirstCompletion) {
      // Increment completed lessons counter
      user.progress.completedLessons = (user.progress.completedLessons || 0) + 1;

      // Award XP for completing the lesson
      const baseXP = 100; // Base XP for completing a lesson
      xpGained = baseXP;
      user.xp += xpGained;

      // Award gems for completing the lesson
      const baseGems = 5; // Base gems for completing a lesson
      gemsGained = baseGems;
      user.gems += gemsGained;

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

      // Check if chapter is completed
      const allLessonsInChapterCompleted = chapterProgress.lessons.every(l => l.completed);
      if (allLessonsInChapterCompleted && !chapterProgress.completed) {
        chapterProgress.completed = true;
        chapterProgress.completionDate = new Date();
        
        // Award chapter completion XP
        const chapterXP = 250;
        xpGained += chapterXP;
        user.xp += chapterXP;
      }
    } else {
      // Reset XP and gems gained if not first completion
      xpGained = 0;
      gemsGained = 0;
      levelUp = false;
    }

    // Find next lesson
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

    // Update course completion status
    const allChaptersCompleted = courseProgress.chapters.every(ch => ch.completed);
    if (allChaptersCompleted && !courseProgress.completed) {
      courseProgress.completed = true;
      courseProgress.completionDate = new Date();
      
      // Only award course completion rewards on first completion
      if (isFirstCompletion) {
        // Increment completedCourses counter
        user.progress.completedCourses = (user.progress.completedCourses || 0) + 1;
        
        // Award course completion bonus
        const courseXP = 1000;
        xpGained += courseXP;
        user.xp += courseXP;

        // Award course completion badge
        if (!user.progress.badges) {
          user.progress.badges = [];
        }
        
        // Check if badge already exists
        const badgeExists = user.progress.badges.some(badge => 
          badge.type === 'course_completion' && badge.courseId.toString() === course._id.toString()
        );

        if (!badgeExists) {
          user.progress.badges.push({
            type: 'course_completion',
            courseId: course._id,
            courseTitle: course.title,
            dateEarned: new Date()
          });
        }
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

    // Calculate and update completion percentage
    const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
    const completedLessons = courseProgress.chapters.reduce((sum, ch) => 
      sum + ch.lessons.filter(l => l.completed).length, 0
    );
    courseProgress.completionPercentage = Math.round((completedLessons / totalLessons) * 100);

    await user.save();

    // Create redirect URL with XP notification parameters
    const redirectUrl = nextLessonSlug ? 
      `/lesson/${nextLessonSlug}?xpGained=${xpGained}&gemsGained=${gemsGained}&levelUp=${levelUp}&completionPercentage=${courseProgress.completionPercentage}&courseId=${course._id}` : 
      `/course-details/${course.slug || course._id}?xpGained=${xpGained}&gemsGained=${gemsGained}&levelUp=${levelUp}&completionPercentage=${courseProgress.completionPercentage}&courseId=${course._id}`;

    return new Response(JSON.stringify({ 
      success: true,
      nextLessonSlug,
      completionPercentage: courseProgress.completionPercentage,
      isCompleted: courseProgress.completed,
      xpGained,
      gemsGained,
      levelUp,
      redirectUrl
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error completing lesson:", error);
    return new Response(JSON.stringify({ error: "Failed to complete lesson" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 