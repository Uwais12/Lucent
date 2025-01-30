import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectToDatabase();

    const courses = await Course.find(
      {},
      { title: 1, description: 1, slug: 1 }
    );

    return new Response(JSON.stringify(courses), {
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
