import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";

export async function POST(req) {
  const session = await mongoose.startSession();
  session.startTransaction();

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

    // Get the course and user within the transaction
    const course = await Course.findById(courseId).session(session);
    let user = await User.findOne({ clerkId: userId }).session(session);

    if (!course) {
      await session.abortTransaction();
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!user) {
      // Create new user if doesn't exist
      const newUser = new User({
        clerkId: userId,
        role: "USER",
      });
      await newUser.save({ session });
      user = newUser;
    }

    // Check if user is already enrolled - using atomic operation
    const existingEnrollment = await User.findOne({
      clerkId: userId,
      'progress.courses.courseId': courseId
    }).session(session);

    if (existingEnrollment) {
      await session.abortTransaction();
      return new Response(
        JSON.stringify({ error: "Already enrolled in this course" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create course progress structure with proper validation
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
              attempts: 0,
              maxAttempts: part.exercise.maxAttempts || 3
            })),
          quizProgress: {
            quizId: new mongoose.Types.ObjectId().toString(),
            completed: false,
            score: 0,
            maxScore: lesson.endOfLessonQuiz.questions.reduce(
              (total, q) => total + (q.points || 10),
              0
            ),
            attempts: 0,
            maxAttempts: lesson.endOfLessonQuiz.maxAttempts || 3
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
          attempts: 0,
          maxAttempts: chapter.endOfChapterQuiz.maxAttempts || 2
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
        attempts: 0,
        maxAttempts: course.endOfCourseExam.maxAttempts || 1
      },
      settings: {
        emailNotifications: true,
        dailyReminders: true,
        timezone: "UTC"
      }
    };

    // Update user and course atomically
    await Promise.all([
      User.findOneAndUpdate(
        { clerkId: userId },
        { $push: { 'progress.courses': courseProgress } },
        { session }
      ),
      Course.findByIdAndUpdate(
        courseId,
        { $inc: { enrolledCount: 1 } },
        { session }
      )
    ]);

    // Commit the transaction
    await session.commitTransaction();

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
    await session.abortTransaction();
    console.error("Error enrolling in course:", error);
    return new Response(JSON.stringify({ error: "Failed to enroll in course" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    session.endSession();
  }
} 