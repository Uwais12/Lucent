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

    // Find the course that contains this quiz with a more efficient query
    const course = await Course.findOne({
      "chapters.lessons.slug": params.slug
    }, {
      "chapters.lessons.$": 1,
      "title": 1,
      "slug": 1
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Find the lesson containing this quiz
    const lesson = course.chapters[0].lessons[0]; // Since we used $ operator, we know it's the first match

    if (!lesson || !lesson.endOfLessonQuiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Return the quiz data with course information
    return NextResponse.json({
      ...lesson.endOfLessonQuiz.toObject(),
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