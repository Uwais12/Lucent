import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

// Add Next.js caching
export const revalidate = 900; // 15 minutes

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
    }).lean(); // Use lean() for better performance

    // If user is logged in, get their enrollment status for each course
    if (userId) {
      const user = await User.findOne({ clerkId: userId }, { 
        "progress.courses": 1 // Only request the fields we need
      }).lean();
      
      if (user) {
        const userCourses = user.progress?.courses || [];
        
        // Create a map for faster lookups
        const enrollmentMap = new Map();
        userCourses.forEach(course => {
          enrollmentMap.set(course.courseId.toString(), {
            isEnrolled: true,
            progress: course.completionPercentage || 0,
            completed: course.completed || false,
            currentChapter: course.currentChapter || 0,
            currentLesson: course.currentLesson || 0
          });
        });
        
        // Map courses with enrollment status using the map for O(1) lookups
        const coursesWithEnrollment = courses.map(course => {
          const courseId = course._id.toString();
          const userCourse = enrollmentMap.get(courseId);
          
          if (userCourse) {
            return {
              ...course,
              ...userCourse
            };
          }
          
          return {
            ...course,
            isEnrolled: false,
            progress: 0,
            completed: false
          };
        });
        
        return new Response(JSON.stringify(coursesWithEnrollment), {
          headers: { 
            "Content-Type": "application/json",
            "Cache-Control": "private, max-age=60, stale-while-revalidate=600"
          },
        });
      }
    }

    // If no user or user not found, return courses without enrollment info
    const coursesWithoutEnrollment = courses.map(course => ({
      ...course,
      isEnrolled: false,
      progress: 0,
      completed: false
    }));

    return new Response(JSON.stringify(coursesWithoutEnrollment), {
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600"
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch courses." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
