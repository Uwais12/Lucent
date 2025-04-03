import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Find the course with the final exam slug
    const course = await Course.findOne({
      "endOfCourseExam.slug": params.slug
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Get the final exam data
    const finalExam = course.endOfCourseExam;

    if (!finalExam) {
      return NextResponse.json({ error: "Final exam not found" }, { status: 404 });
    }

    // Return the quiz data with course information
    return NextResponse.json({
      ...finalExam.toObject(),
      course: {
        _id: course._id,
        slug: course.slug,
        title: course.title
      }
    });
  } catch (error) {
    console.error("Error fetching final exam:", error);
    return NextResponse.json(
      { error: "Failed to fetch final exam" },
      { status: 500 }
    );
  }
}

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

    // Find the course with the final exam slug
    const course = await Course.findOne({
      "endOfCourseExam.slug": params.slug
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const finalExam = course.endOfCourseExam;

    if (!finalExam) {
      return NextResponse.json({ error: "Final exam not found" }, { status: 404 });
    }

    // Find the user
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate score
    let correctAnswers = 0;
    finalExam.questions.forEach((question, index) => {
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

    const score = Math.round((correctAnswers / finalExam.questions.length) * 100);

    // Find or create course progress
    let courseProgress = user.progress.courses.find(
      c => c.courseId.toString() === course._id.toString()
    );

    if (!courseProgress) {
      return NextResponse.json({ error: "Not enrolled in course" }, { status: 400 });
    }

    // Update final exam progress
    const previousScore = courseProgress.endOfCourseExam?.score || 0;
    const isNewHighScore = score > previousScore;

    let xpGained = 0;
    let gemsGained = 0;
    let levelUp = false;

    if (isNewHighScore) {
      // Base XP calculation (3 XP per percentage point for final exam)
      xpGained = Math.round(score * 3);

      // Gems based on score brackets (higher rewards for final exam)
      if (score >= 90) {
        gemsGained = 10;
      } else if (score >= 70) {
        gemsGained = 6;
      } else if (score >= 50) {
        gemsGained = 3;
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

      // Update final exam progress
      courseProgress.endOfCourseExam = {
        completed: score >= finalExam.passingScore,
        score,
        lastAttemptDate: new Date(),
        attempts: (courseProgress.endOfCourseExam?.attempts || 0) + 1
      };

      // If passed, mark course as completed
      if (score >= finalExam.passingScore) {
        courseProgress.completed = true;
      }

      await user.save();
    }

    return NextResponse.json({
      score,
      xpGained: isNewHighScore ? xpGained : 0,
      gemsGained: isNewHighScore ? gemsGained : 0,
      levelUp,
      completionPercentage: courseProgress.completionPercentage,
      passed: score >= finalExam.passingScore
    });
  } catch (error) {
    console.error("Error completing final exam:", error);
    return NextResponse.json(
      { error: "Failed to complete final exam" },
      { status: 500 }
    );
  }
} 