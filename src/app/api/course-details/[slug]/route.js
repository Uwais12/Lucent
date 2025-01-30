// src/app/api/course-details/[slug]/route.js
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const course = await Course.findOne({ slug: params.slug });

    if (!course) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get user progress if authenticated
    const { userId } = getAuth(req);
    let userProgress = null;

    if (userId) {
      const user = await User.findOne({ clerkId: userId });
      if (user) {
        const courseProgress = user.progress?.courses?.find(
          (c) => c.courseId.toString() === course._id.toString()
        );
        if (courseProgress) {
          userProgress = {
            currentChapter: courseProgress.currentChapter,
            currentLesson: courseProgress.currentLesson,
            completionPercentage: courseProgress.completionPercentage,
            isEnrolled: true,
            chapters: courseProgress.chapters.map(chapter => ({
              chapterId: chapter.chapterId,
              completed: chapter.completed,
              lessons: chapter.lessons.map(lesson => ({
                lessonId: lesson.lessonId,
                completed: lesson.completed
              }))
            }))
          };
        }
      }
    }

    // Add badge information
    const completionBadge = {
      type: "course_completion",
      name: `${course.title} Master`,
      description: `Complete the ${course.title} course to earn this badge`,
      imageUrl: "/badges/course-completion.svg" // You'll need to add this asset
    };

    return new Response(JSON.stringify({ ...course.toObject(), userProgress, completionBadge }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch course" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
