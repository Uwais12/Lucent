import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const quizSlug = searchParams.get('slug');
    const quizType = searchParams.get('type');

    if (!quizSlug) {
      return NextResponse.json({ error: "Quiz slug is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Find the course that contains this quiz
    const course = await Course.findOne({
      $or: [
        { "chapters.lessons.quiz.slug": quizSlug },
        { "chapters.endOfChapterQuiz.slug": quizSlug },
        { "endOfCourseExam.slug": quizSlug }
      ]
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if user is enrolled in the course
    const user = await User.findOne({ userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log('User courseProgress:', user.courseProgress);
    console.log('User progress.courses:', user.progress?.courses);
    console.log('Course ID:', course._id.toString());

    const isEnrolled = user.courseProgress?.some(progress => {
      console.log('Checking courseProgress:', progress.courseId.toString());
      return progress.courseId.toString() === course._id.toString();
    }) || user.progress?.courses?.some(courseProgress => {
      console.log('Checking progress.courses:', courseProgress.courseId.toString());
      return courseProgress.courseId.toString() === course._id.toString();
    });

    console.log('Is enrolled:', isEnrolled);

    return NextResponse.json({
      isEnrolled,
      courseTitle: course.title,
      courseSlug: course.slug,
      quizType: quizType || 'lesson-quiz' // Default to lesson quiz if not specified
    });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return NextResponse.json(
      { error: "Failed to check enrollment" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quizSlug, quizType } = await req.json();
    if (!quizSlug) {
      return NextResponse.json({ error: "Quiz slug is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Find the course that contains this quiz
    const course = await Course.findOne({
      $or: [
        { "chapters.lessons.quiz.slug": quizSlug },
        { "chapters.endOfChapterQuiz.slug": quizSlug },
        { "endOfCourseExam.slug": quizSlug }
      ]
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if user is enrolled in the course
    const user = await User.findOne({ userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log('User courseProgress:', user.courseProgress);
    console.log('User progress.courses:', user.progress?.courses);
    console.log('Course ID:', course._id.toString());

    const isEnrolled = user.courseProgress?.some(progress => {
      console.log('Checking courseProgress:', progress.courseId.toString());
      return progress.courseId.toString() === course._id.toString();
    }) || user.progress?.courses?.some(courseProgress => {
      console.log('Checking progress.courses:', courseProgress.courseId.toString());
      return courseProgress.courseId.toString() === course._id.toString();
    });

    console.log('Is enrolled:', isEnrolled);

    return NextResponse.json({
      isEnrolled,
      courseTitle: course.title,
      courseSlug: course.slug,
      quizType: quizType || 'lesson-quiz' // Default to lesson quiz if not specified
    });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return NextResponse.json(
      { error: "Failed to check enrollment" },
      { status: 500 }
    );
  }
} 