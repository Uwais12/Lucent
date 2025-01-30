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

    // Update lesson completion
    const chapterProgress = courseProgress.chapters[chapterIndex];
    const lessonProgress = chapterProgress.lessons[lessonIndex];
    lessonProgress.completed = true;
    lessonProgress.completionDate = new Date();

    // Check if chapter is completed
    const allLessonsInChapterCompleted = chapterProgress.lessons.every(l => l.completed);
    if (allLessonsInChapterCompleted) {
      chapterProgress.completed = true;
      chapterProgress.completionDate = new Date();
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
    if (allChaptersCompleted) {
      courseProgress.completed = true;
      courseProgress.completionDate = new Date();
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

    return new Response(JSON.stringify({ 
      success: true,
      nextLessonSlug,
      completionPercentage: courseProgress.completionPercentage,
      isCompleted: courseProgress.completed
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