import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET(req) {
  try {
    await connectToDatabase();

    // Extract the slug from the request URL
    const url = new URL(req.url);
    const slug = url.pathname.split("/").pop(); // Get the slug from the URL path

    // Find the lesson by slug within any course
    const course = await Course.findOne({
      "chapters.lessons.slug": slug,
    });

    if (!course) {
      return new Response(JSON.stringify({ error: "Lesson not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the specific lesson in the course using the slug
    const lesson = course.chapters
      .flatMap((chapter) => chapter.lessons)
      .find((lesson) => lesson.slug === slug);

    if (!lesson) {
      return new Response(JSON.stringify({ error: "Lesson not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(lesson), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch lesson" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
