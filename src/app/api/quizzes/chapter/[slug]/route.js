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

    // Find the course with the chapter quiz slug
    const course = await Course.findOne({
      chapters: {
        $elemMatch: {
          "endOfChapterQuiz.slug": params.slug
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Find the chapter containing this quiz
    const chapter = course.chapters.find(chapter => 
      chapter.endOfChapterQuiz?.slug === params.slug
    );

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // Get the quiz data
    const quiz = chapter.endOfChapterQuiz;

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Return the quiz data with course information
    return NextResponse.json({
      ...quiz.toObject(),
      courseId: course._id,
      courseSlug: course.slug,
      courseTitle: course.title
    });
  } catch (error) {
    console.error("Error fetching chapter quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch chapter quiz" },
      { status: 500 }
    );
  }
} 