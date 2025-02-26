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

    const { courseId } = await req.json();
    if (!courseId) {
      return new Response(JSON.stringify({ error: "Course ID is required" }), {
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

    // Find user
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if already enrolled
    const isEnrolled = user.progress.courses.some(
      c => c.courseId.toString() === courseId
    );

    if (isEnrolled) {
      return new Response(JSON.stringify({ error: "Already enrolled in this course" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create course progress structure
    const courseProgress = {
      courseId: course._id,
      enrolled: true,
      enrollmentDate: new Date(),
      completionPercentage: 0,
      completed: false,
      currentChapter: 0,
      currentLesson: 0,
      lastAccessDate: new Date(),
      chapters: course.chapters.map(chapter => ({
        chapterId: chapter._id,
        completed: false,
        lessons: chapter.lessons.map(lesson => ({
          lessonId: lesson._id,
          completed: false,
          quizProgress: {
            quizId: lesson.endOfLessonQuiz?._id?.toString() || `${lesson._id}_quiz`,
            completed: false,
            score: 0,
            attempts: 0
          }
        })),
        endOfChapterQuiz: {
          quizId: chapter.endOfChapterQuiz?._id?.toString() || `${chapter._id}_chapter_quiz`,
          completed: false,
          score: 0,
          attempts: 0
        }
      })),
      endOfCourseExam: {
        quizId: course.endOfCourseExam?._id?.toString() || `${course._id}_course_exam`,
        completed: false,
        score: 0,
        attempts: 0
      }
    };

    // Add to user's enrolled courses
    user.progress.courses.push(courseProgress);
    await user.save();

    return new Response(JSON.stringify({
      success: true,
      message: "Successfully enrolled in course",
      courseProgress
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error enrolling in course:", error);
    return new Response(JSON.stringify({ error: "Failed to enroll in course" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 