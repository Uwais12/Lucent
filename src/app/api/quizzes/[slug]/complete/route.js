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

    const { score } = await req.json();

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

    // Find user
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Initialize variables for tracking progress
    let xpGained = 0;
    let levelUp = false;
    let gemsGained = 0;

    // Award XP based on quiz score
    const baseXP = Math.round(score); // 1 XP per percentage point
    xpGained = baseXP;
    user.xp += xpGained;

    // Award gems based on score tiers
    if (score >= 90) {
      gemsGained = 10;
    } else if (score >= 80) {
      gemsGained = 7;
    } else if (score >= 70) {
      gemsGained = 5;
    }
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

    // Update quiz completion in lesson progress
    const chapterProgress = courseProgress.chapters[chapterIndex];
    const lessonProgress = chapterProgress.lessons[lessonIndex];
    
    if (!lessonProgress.quizCompleted) {
      lessonProgress.quizCompleted = true;
      lessonProgress.quizScore = score;
      lessonProgress.quizCompletionDate = new Date();
    }

    // Calculate completion percentage
    const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
    const completedLessons = courseProgress.chapters.reduce((sum, ch) => 
      sum + ch.lessons.filter(l => l.completed).length, 0
    );
    courseProgress.completionPercentage = Math.round((completedLessons / totalLessons) * 100);

    await user.save();

    return new Response(JSON.stringify({ 
      success: true,
      xpGained,
      gemsGained,
      levelUp,
      completionPercentage: courseProgress.completionPercentage
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