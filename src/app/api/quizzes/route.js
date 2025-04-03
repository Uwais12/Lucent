// /src/app/api/quizzes/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // Fetch all courses
    const courses = await Course.find({});
    
    const allQuizzes = [];

    // Collect all quizzes from courses
    courses.forEach(course => {
      // Add end of course exam
      if (course.endOfCourseExam) {
        allQuizzes.push({
          id: course.endOfCourseExam._id,
          slug: course.endOfCourseExam.slug || `${course.slug}-final-exam`,
          title: course.endOfCourseExam.title,
          description: course.endOfCourseExam.description,
          type: 'course-exam',
          courseName: course.title,
          courseSlug: course.slug,
          questionCount: course.endOfCourseExam.questions.length,
          duration: course.endOfCourseExam.duration,
          passingScore: course.endOfCourseExam.passingScore
        });
      }

      // Add chapter and lesson quizzes
      course.chapters.forEach((chapter, chapterIndex) => {
        // Add end of chapter quiz if it exists
        if (chapter.endOfChapterQuiz) {
          allQuizzes.push({
            id: chapter.endOfChapterQuiz._id,
            slug: chapter.endOfChapterQuiz.slug || `${course.slug}-chapter-${chapter.order}-quiz`,
            title: chapter.endOfChapterQuiz.title,
            description: chapter.endOfChapterQuiz.description,
            type: 'chapter-quiz',
            courseName: course.title,
            courseSlug: course.slug,
            chapterName: chapter.title,
            questionCount: chapter.endOfChapterQuiz.questions.length,
            duration: chapter.endOfChapterQuiz.duration,
            passingScore: chapter.endOfChapterQuiz.passingScore
          });
        }

        // Add lesson quizzes
        chapter.lessons.forEach((lesson, lessonIndex) => {
          if (lesson.endOfLessonQuiz) {
            allQuizzes.push({
              id: lesson.endOfLessonQuiz._id,
              slug: lesson.slug,
              title: lesson.endOfLessonQuiz.title,
              description: lesson.endOfLessonQuiz.description,
              type: 'lesson-quiz',
              courseName: course.title,
              courseSlug: course.slug,
              chapterName: chapter.title,
              lessonName: lesson.title,
              questionCount: lesson.endOfLessonQuiz.questions.length,
              duration: lesson.endOfLessonQuiz.duration,
              passingScore: lesson.endOfLessonQuiz.passingScore
            });
          }
        });
      });
    });

    return new Response(JSON.stringify(allQuizzes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch quizzes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
