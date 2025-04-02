import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";

export async function POST(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { answers } = await req.json();

    // Validate answers array
    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Answers must be an array" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Await params before using
    const { slug } = await params;

    // Find the course that contains this quiz
    const course = await Course.findOne({
      "chapters.lessons.slug": slug
    }).populate({
      path: "chapters.lessons",
      select: "title description slug endOfLessonQuiz"
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Find the chapter and lesson containing this quiz
    const chapter = course.chapters.find(chapter =>
      chapter.lessons.some(lesson => lesson.slug === slug)
    );

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const lesson = chapter.lessons.find(lesson => lesson.slug === slug);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Get the quiz data
    const quiz = lesson.endOfLessonQuiz;

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Validate quiz questions
    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
      return NextResponse.json(
        { error: "Invalid quiz format" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      if (!userAnswer) return;

      switch (question.type) {
        case "true-false":
          if (userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()) {
            correctAnswers++;
          }
          break;
        case "multiple-choice":
          if (userAnswer === question.correctAnswer) {
            correctAnswers++;
          }
          break;
        case "fill-blank":
          // For fill-blank questions, userAnswer is an array of answers
          if (Array.isArray(userAnswer)) {
            const allBlanksCorrect = question.blanks.every((blank, blankIndex) => {
              const answer = userAnswer[blankIndex]?.toLowerCase().trim();
              return answer === blank.correctAnswer.toLowerCase().trim();
            });
            if (allBlanksCorrect) {
              correctAnswers++;
            }
          }
          break;
      }
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    // Calculate rewards
    const xpGained = Math.round(score * 10); // 10 XP per percentage point
    const gemsGained = score >= 80 ? 5 : score >= 60 ? 3 : 1;

    // Update user's progress
    const levelUp = await user.addXP(xpGained);
    user.gems += gemsGained;
    await user.save();

    // Calculate completion percentage for the course
    const completionPercentage = await user.calculateCourseCompletion(course._id);

    return NextResponse.json({
      score,
      xpGained,
      gemsGained,
      levelUp,
      completionPercentage,
    });
  } catch (error) {
    console.error("Error completing quiz:", error);
    return NextResponse.json(
      { error: "Failed to complete quiz" },
      { status: 500 }
    );
  }
} 