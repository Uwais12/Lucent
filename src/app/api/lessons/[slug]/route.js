// src/app/api/lessons/[slug]/route.js
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    // Find the course and lesson by slug
    const course = await Course.findOne({
      "chapters.lessons.slug": params.slug
    });

    if (!course) {
      return new Response(JSON.stringify({ error: "Lesson not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the specific chapter and lesson
    const chapter = course.chapters.find(chapter =>
      chapter.lessons.some(lesson => lesson.slug === params.slug)
    );
    const lesson = chapter.lessons.find(lesson => lesson.slug === params.slug);

    // Format the response
    const formattedLesson = {
      id: lesson._id,
      title: lesson.title,
      slug: lesson.slug,
      description: lesson.description,
      duration: lesson.duration,
      chapterTitle: chapter.title,
      courseTitle: course.title,
      parts: lesson.parts.map(part => ({
        title: part.title,
        content: part.content,
        order: part.order,
        duration: part.duration,
        exercise: part.exercise ? {
          type: part.exercise.type,
          title: part.exercise.title,
          description: part.exercise.description,
          content: part.exercise.content,
          points: part.exercise.points,
        } : null,
      })),
      endOfLessonQuiz: lesson.endOfLessonQuiz,
    };

    return new Response(JSON.stringify(formattedLesson), {
      status: 200,
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
