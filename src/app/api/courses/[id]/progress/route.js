import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  try {
    const { userId } = getAuth(req);
    
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Await params before accessing its properties
    const { id: courseId } = params;
    
    // Validate MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
      return Response.json({ error: "Invalid course ID format" }, { status: 400 });
    }

    await connectToDatabase();

    // Find the user and their progress for this course
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Find the course progress in the user's courses array
    const courseProgress = user.progress?.courses?.find(
      course => course.courseId.toString() === courseId
    );

    if (!courseProgress) {
      // If no progress exists yet, return default values
      return Response.json({
        enrolled: false,
        completionPercentage: 0,
        currentChapter: 0,
        currentLesson: 0,
        completedLessons: [],
        completedChapters: [],
        lastAccessDate: null
      });
    }

    // Return the progress data
    return Response.json({
      enrolled: true,
      completionPercentage: courseProgress.completionPercentage || 0,
      currentChapter: courseProgress.currentChapter || 0,
      currentLesson: courseProgress.currentLesson || 0,
      completedLessons: courseProgress.chapters?.flatMap(chapter => 
        chapter.lessons
          .filter(lesson => lesson.completed)
          .map(lesson => lesson.lessonId)
      ) || [],
      completedChapters: courseProgress.chapters
        ?.filter(chapter => chapter.completed)
        .map(chapter => chapter.chapterId) || [],
      lastAccessDate: courseProgress.lastAccessDate || null
    });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    return Response.json({ error: "Failed to fetch course progress" }, { status: 500 });
  }
} 