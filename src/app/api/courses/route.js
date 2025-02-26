import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    await connectToDatabase();

    // Get all courses with more details
    const courses = await Course.find({}, {
      title: 1,
      description: 1,
      slug: 1,
      difficulty: 1,
      duration: 1,
      chapters: 1,
      book: 1,
      imageUrl: 1
    });

    // If user is logged in, get their enrollment status for each course
    if (userId) {
      const user = await User.findOne({ clerkId: userId });
      
      if (user) {
        const userCourses = user.progress?.courses || [];
        
        // Map courses with enrollment status
        const coursesWithEnrollment = courses.map(course => {
          const userCourse = userCourses.find(
            uc => uc.courseId.toString() === course._id.toString()
          );
          
          if (userCourse) {
            return {
              ...course.toObject(),
              isEnrolled: true,
              progress: userCourse.completionPercentage || 0,
              completed: userCourse.completed || false,
              currentChapter: userCourse.currentChapter || 0,
              currentLesson: userCourse.currentLesson || 0
            };
          }
          
          return {
            ...course.toObject(),
            isEnrolled: false,
            progress: 0,
            completed: false
          };
        });
        
        return new Response(JSON.stringify(coursesWithEnrollment), {
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // If no user or user not found, return courses without enrollment info
    const coursesWithoutEnrollment = courses.map(course => ({
      ...course.toObject(),
      isEnrolled: false,
      progress: 0,
      completed: false
    }));

    return new Response(JSON.stringify(coursesWithoutEnrollment), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch courses." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
