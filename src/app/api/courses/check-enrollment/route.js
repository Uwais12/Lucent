import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { contentSlug, contentType } = await req.json();
    if (!contentSlug) {
      return NextResponse.json({ error: "Content slug is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Find the course that contains this content
    const query = {
      $or: [
        { "chapters.lessons.slug": contentSlug },
        { "chapters.endOfChapterQuiz.slug": contentSlug },
        { "endOfCourseExam.slug": contentSlug }
      ]
    };

    const course = await Course.findOne(query);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if user is enrolled in the course
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isEnrolled = user.progress?.courses?.some(progress => 
      progress.courseId.toString() === course._id.toString()
    );

    return NextResponse.json({
      isEnrolled,
      courseTitle: course.title,
      courseSlug: course.slug,
      contentType: contentType || 'lesson' // Default to lesson if not specified
    });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return NextResponse.json(
      { error: "Failed to check enrollment" },
      { status: 500 }
    );
  }
} 