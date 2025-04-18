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

    // Check if user has already completed a quiz today
    if (user.lastQuizCompletion) {
      const lastQuizDate = new Date(user.lastQuizCompletion);
      const today = new Date();
      
      // Check if last quiz was completed today
      if (lastQuizDate.toDateString() === today.toDateString()) {
        return NextResponse.json({ 
          error: "Daily quiz limit reached. You can take another quiz tomorrow.",
          dailyLimitReached: true
        }, { status: 403 });
      }
    }

    // Calculate score
    let correctAnswers = 0;
    let totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      if (!userAnswer) return;

      let isCorrect = false;
      switch (question.type) {
        case "true-false":
          isCorrect = userAnswer?.toLowerCase() === question.correctAnswer?.toLowerCase();
          break;
        case "multiple-choice":
          isCorrect = userAnswer === question.correctAnswer;
          break;
        case "fill-blank":
          if (Array.isArray(userAnswer)) {
            isCorrect = question.blanks.every((blank, blankIndex) => {
              const answer = userAnswer[blankIndex]?.toLowerCase().trim();
              return answer === blank.correctAnswer.toLowerCase().trim();
            });
          }
          break;
        case "short-answer":
          isCorrect = userAnswer?.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim();
          break;
        default:
          isCorrect = userAnswer === question.correctAnswer;
      }
      if (isCorrect) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Only update lastQuizCompletion if score is passing (70% or higher)
    const passingScore = score >= 70;
    if (passingScore) {
      user.lastQuizCompletion = new Date();
      await user.save();
    }

    // Calculate rewards based on score brackets
    let xpGained = 0;
    let gemsGained = 0;
    let levelUp = false;

    // Find or create course progress
    let courseProgress = user.progress.courses.find(
      c => c.courseId.toString() === course._id.toString()
    );

    if (!courseProgress) {
      courseProgress = {
        courseId: course._id,
        chapters: course.chapters.map(ch => ({
          chapterId: ch._id,
          completed: false,
          lessons: ch.lessons.map(l => ({
            lessonId: l._id,
            completed: false,
            quizProgress: {
              score: 0,
              attempts: 0
            }
          }))
        }))
      };
      user.progress.courses.push(courseProgress);
    }

    // Find the chapter and lesson progress
    const chapterIndex = course.chapters.findIndex(ch => ch.lessons.some(l => l.slug === slug));
    const lessonIndex = course.chapters[chapterIndex].lessons.findIndex(l => l.slug === slug);
    const lessonProgress = courseProgress.chapters[chapterIndex].lessons[lessonIndex];

    // Only award XP and gems if this is a new high score
    const previousScore = lessonProgress.quizProgress?.score || 0;
    const isNewHighScore = score > previousScore;

    if (isNewHighScore) {
      // Base XP calculation (2 XP per percentage point)
      xpGained = Math.round(score * 2);

      // Gems based on score brackets
      if (score >= 90) {
        gemsGained = 5;
      } else if (score >= 70) {
        gemsGained = 3;
      } else if (score >= 50) {
        gemsGained = 1;
      }

      // Update user's XP and check for level up
      const oldLevel = user.level || 1;
      user.xp = (user.xp || 0) + xpGained;
      const newLevel = Math.floor(user.xp / 1000) + 1;
      
      if (newLevel > oldLevel) {
        user.level = newLevel;
        levelUp = true;
        // Award bonus gems for leveling up
        const levelUpGems = 25;
        gemsGained += levelUpGems;
      }

      // Update user's gems
      user.gems = (user.gems || 0) + gemsGained;

      // Update quiz progress
      lessonProgress.quizProgress = {
        ...(lessonProgress.quizProgress || {}),
        score,
        lastAttemptDate: new Date(),
        attempts: (lessonProgress.quizProgress?.attempts || 0) + 1
      };

      await user.save();
    }

    // Calculate completion percentage for the course
    const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
    const completedLessons = courseProgress.chapters.reduce((sum, ch) => 
      sum + ch.lessons.filter(l => l.completed).length, 0
    );
    const completionPercentage = Math.round((completedLessons / totalLessons) * 100);

    return NextResponse.json({
      score,
      xpGained: isNewHighScore ? xpGained : 0,
      gemsGained: isNewHighScore ? gemsGained : 0,
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