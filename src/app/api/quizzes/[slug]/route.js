import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    // Find the course and lesson containing the quiz
    const course = await Course.findOne({
      "chapters.lessons.slug": params.slug
    });

    if (!course) {
      return new Response(JSON.stringify({ error: "Quiz not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the specific chapter and lesson
    const chapter = course.chapters.find(chapter =>
      chapter.lessons.some(lesson => lesson.slug === params.slug)
    );
    const lesson = chapter.lessons.find(lesson => lesson.slug === params.slug);

    // Get the quiz data
    const quiz = lesson.endOfLessonQuiz;
    if (!quiz) {
      return new Response(JSON.stringify({ error: "Quiz not found for this lesson" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return formatted quiz data
    return new Response(JSON.stringify({
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions,
      duration: quiz.duration,
      passingScore: quiz.passingScore,
      courseId: course._id,
      chapterId: chapter._id,
      lessonId: lesson._id
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error fetching quiz:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch quiz" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 