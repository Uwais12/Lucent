// src/app/api/course-details/[slug]/route.js
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const course = await Course.findOne({ slug: params.slug });

    if (!course) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(course), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch course" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
