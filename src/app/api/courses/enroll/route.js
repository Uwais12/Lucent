import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";

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

    // Get the course
    const course = await Course.findById(courseId);
    if (!course) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get or create the user
    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      user = new User({
        clerkId: userId,
        role: "USER",
      });
    }

    // Check if user is already enrolled
    const existingEnrollment = user.progress.courses.find(
      (c) => c.courseId.toString() === courseId
    );
    if (existingEnrollment) {
      return new Response(
        JSON.stringify({ error: "Already enrolled in this course" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create course progress structure
    const courseProgress = {
      courseId,
      enrolledDate: new Date(),
      completed: false,
      score: 0,
      chapters: course.chapters.map((chapter) => ({
        chapterId: chapter._id,
        completed: false,
        lessons: chapter.lessons.map((lesson) => ({
          lessonId: lesson._id,
          completed: false,
          exercises: lesson.parts
            .filter((part) => part.exercise)
            .map((part) => ({
              exerciseId: new mongoose.Types.ObjectId().toString(),
              completed: false,
              pointsEarned: 0,
              maxPoints: part.exercise.points || 10,
            })),
          quizProgress: {
            quizId: new mongoose.Types.ObjectId().toString(),
            completed: false,
            score: 0,
            maxScore: lesson.endOfLessonQuiz.questions.reduce(
              (total, q) => total + (q.points || 10),
              0
            ),
          },
        })),
        endOfChapterQuiz: {
          quizId: new mongoose.Types.ObjectId().toString(),
          completed: false,
          score: 0,
          maxScore: chapter.endOfChapterQuiz.questions.reduce(
            (total, q) => total + (q.points || 10),
            0
          ),
        },
      })),
      endOfCourseExam: {
        quizId: new mongoose.Types.ObjectId().toString(),
        completed: false,
        score: 0,
        maxScore: course.endOfCourseExam.questions.reduce(
          (total, q) => total + (q.points || 10),
          0
        ),
      },
    };

    // Update user with new course progress
    user.progress.courses.push(courseProgress);
    await user.save();

    // Increment course enrolled count
    course.enrolledCount += 1;
    await course.save();

    return new Response(
      JSON.stringify({
        message: "Successfully enrolled in course",
        courseProgress,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return new Response(JSON.stringify({ error: "Failed to enroll in course" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 