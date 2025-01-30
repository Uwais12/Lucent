// /src/app/api/quizzes/[slug]/route.js

export async function GET(req, { params }) {
  const { slug } = params;
  
  // Return the quiz data from the lesson endpoint
  const lessonResponse = await fetch(`${req.headers.get('origin')}/api/lessons/${slug}`);
  const lessonData = await lessonResponse.json();
  
  if (!lessonResponse.ok) {
    return new Response(JSON.stringify({ error: "Quiz not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const quiz = lessonData.endOfLessonQuiz;
  if (!quiz) {
    return new Response(JSON.stringify({ error: "Quiz not found for this lesson" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify(quiz),
    { headers: { "Content-Type": "application/json" } }
  );
}
