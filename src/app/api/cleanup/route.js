import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function POST() {
  try {
    await connectToDatabase();
    
    // Delete all courses
    const result = await Course.deleteMany({});
    
    return Response.json({ 
      message: "Successfully cleaned up courses",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Error cleaning up database:", error);
    return Response.json({ error: "Failed to clean up database" }, { status: 500 });
  }
} 