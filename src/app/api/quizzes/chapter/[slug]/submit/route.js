import { connectToDatabase } from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { answers, timeLeft } = await req.json();
    await connectToDatabase();

    // Find the course that contains this chapter quiz
    const course = await Course.findOne({
      'chapters.endOfChapterQuiz.slug': params.slug
    });

    if (!course) {
      return new Response(JSON.stringify({ error: 'Course not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Find the specific chapter and quiz
    const chapter = course.chapters.find(
      chapter => chapter.endOfChapterQuiz?.slug === params.slug
    );

    if (!chapter || !chapter.endOfChapterQuiz) {
      return new Response(JSON.stringify({ error: 'Chapter quiz not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const quiz = chapter.endOfChapterQuiz;
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize user progress arrays if they don't exist
    if (!user.completedQuizzes) {
      user.completedQuizzes = [];
    }
    if (!user.courseProgress) {
      user.courseProgress = [];
    }

    // Initialize course progress if it doesn't exist
    let courseProgress = user.courseProgress.find(p => p.courseId === course._id.toString());
    if (!courseProgress) {
      courseProgress = {
        courseId: course._id.toString(),
        chapters: course.chapters.map(chapter => ({
          chapterId: chapter._id.toString(),
          completed: false,
          completedAt: null
        }))
      };
      user.courseProgress.push(courseProgress);
    }

    // Calculate score
    const correctAnswers = quiz.questions.map((q, i) => 
      q.correctAnswer.toLowerCase() === answers[i]?.toLowerCase()
    );
    const score = (correctAnswers.filter(Boolean).length / quiz.questions.length) * 100;

    // Check if user has already completed this quiz
    const existingCompletion = user.completedQuizzes.find(
      q => q.quizId === quiz._id.toString()
    );

    let xpEarned = 0;
    let gemsEarned = 0;
    let levelUp = false;

    if (!existingCompletion) {
      // Calculate rewards based on score
      if (score >= quiz.passingScore) {
        xpEarned = 50; // Base XP for passing
        gemsEarned = 5; // Base gems for passing
        
        // Bonus for time remaining
        const timeBonus = Math.floor(timeLeft / 60); // 1 XP per minute remaining
        xpEarned += timeBonus;
        
        // Add to completed quizzes
        user.completedQuizzes.push({
          quizId: quiz._id.toString(),
          score,
          completedAt: new Date(),
          type: 'chapter'
        });

        // Update chapter progress
        const chapterProgress = courseProgress.chapters.find(
          c => c.chapterId === chapter._id.toString()
        );

        if (chapterProgress) {
          chapterProgress.completed = true;
          chapterProgress.completedAt = new Date();
        }

        // Save user progress
        await user.save();

        // Check for level up
        const newLevel = Math.floor(Math.sqrt(user.xp / 100));
        if (newLevel > user.level) {
          levelUp = true;
          user.level = newLevel;
          await user.save();
        }
      }
    }

    // Ensure we have the course slug
    if (!course.slug) {
      console.error('Course slug is missing:', course);
      return new Response(JSON.stringify({ 
        error: 'Course slug is missing',
        message: 'Failed to redirect after quiz completion' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      score,
      passed: score >= quiz.passingScore,
      xpEarned,
      gemsEarned,
      levelUp,
      courseId: course._id,
      courseSlug: course.slug,
      completionPercentage: calculateCourseCompletion(user, course)
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error submitting chapter quiz:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to submit quiz',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function calculateCourseCompletion(user, course) {
  const courseProgress = user.courseProgress.find(p => p.courseId === course._id.toString());
  if (!courseProgress) return 0;

  const completedChapters = courseProgress.chapters.filter(c => c.completed).length;
  return Math.round((completedChapters / course.chapters.length) * 100);
} 