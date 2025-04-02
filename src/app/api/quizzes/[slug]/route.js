import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Await params before using
    const { slug } = await params;

    // Find the course that contains this quiz
    const course = await Course.findOne({
      "chapters.lessons.slug": slug
    }).populate({
      path: "chapters.lessons",
      select: "title description slug endOfLessonQuiz"
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Find the chapter and lesson containing this quiz
    const chapter = course.chapters.find(chapter =>
      chapter.lessons.some(lesson => lesson.slug === slug)
    );

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const lesson = chapter.lessons.find(lesson => lesson.slug === slug);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Get the quiz data
    const quiz = lesson.endOfLessonQuiz;

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Return the quiz data with course information
    return NextResponse.json({
      ...quiz.toObject(),
      course: {
        _id: course._id,
        slug: course.slug,
        title: course.title
      }
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
} 