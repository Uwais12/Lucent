import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { badgeDefinitions } from "@/lib/badgeDefinitions.js";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get the course slug from query params
    const url = new URL(req.url);
    const courseSlug = url.searchParams.get("courseSlug");
    
    if (!courseSlug) {
      return new Response(JSON.stringify({ error: "Course slug is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // Find the course
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find user 
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if user is enrolled in this course
    const courseProgress = user.progress.courses.find(
      c => c.courseId.toString() === course._id.toString()
    );

    if (!courseProgress) {
      return new Response(JSON.stringify({ error: "Not enrolled in this course" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if user has completed enough of the course to take the final exam (at least 90%)
    if (courseProgress.completionPercentage < 90) {
      return new Response(JSON.stringify({ 
        error: "Complete at least 90% of the course to access the final exam"
      }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the end of course exam
    if (!course.endOfCourseExam) {
      return new Response(JSON.stringify({ error: "Final exam not found for this course" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Format quiz data with course info
    const quizData = {
      ...course.endOfCourseExam.toObject(),
      courseId: course._id,
      courseTitle: course.title,
      courseSlug: course.slug,
      type: 'final-exam',
      // Add attempts info from user progress
      attempts: courseProgress.endOfCourseExam?.attempts || 0,
      completed: courseProgress.endOfCourseExam?.completed || false,
      lastAttemptScore: courseProgress.endOfCourseExam?.score || 0
    };

    return new Response(JSON.stringify(quizData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching final exam:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch final exam" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { courseSlug, score, passed, answers } = await req.json();
    if (!courseSlug || typeof score !== 'number' || typeof passed !== 'boolean') {
      return new Response(JSON.stringify({ error: "Invalid exam data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // Find the course
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find user
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find course progress
    const courseProgressIndex = user.progress.courses.findIndex(
      c => c.courseId.toString() === course._id.toString()
    );

    if (courseProgressIndex === -1) {
      return new Response(JSON.stringify({ error: "Not enrolled in this course" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const courseProgress = user.progress.courses[courseProgressIndex];

    // --- Daily Quiz Limit Check ---
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!user.lastQuizDate || new Date(user.lastQuizDate) < today) {
      user.dailyQuizCount = 0;
      // user.lastQuizDate = today; // Will be set if quiz is passed
    }

    const isPro = user.subscription?.tier === 'PRO' || user.subscription?.tier === 'ENTERPRISE';
    const maxDailyQuizzes = isPro ? 5 : 1;

    if (user.dailyQuizCount >= maxDailyQuizzes) {
      return new Response(JSON.stringify({
        error: `Daily quiz limit of ${maxDailyQuizzes} reached. You can take another quiz tomorrow.`,
        dailyLimitReached: true,
        quizzesTakenToday: user.dailyQuizCount,
        maxQuizzesToday: maxDailyQuizzes
      }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }
    // --- End Daily Quiz Limit Check ---

    // Update exam progress
    courseProgress.endOfCourseExam = {
      ...courseProgress.endOfCourseExam,
      quizId: course.endOfCourseExam._id.toString(),
      completed: passed,
      score,
      attempts: (courseProgress.endOfCourseExam?.attempts || 0) + 1,
      lastAttemptDate: new Date()
    };

    // Initialize variables for tracking rewards
    let xpGained = 0;
    let levelUp = false;
    let gemsGained = 0;
    let newlyAwardedBadges = [];

    // Award rewards if the user passed
    if (passed) {
      // Update daily quiz count and last completion date as this quiz counts
      user.dailyQuizCount = (user.dailyQuizCount || 0) + 1;
      user.lastQuizCompletion = new Date();
      user.lastQuizDate = today;

      // Try to award the "First Quiz Completed" badge
      const firstQuizBadgeDef = badgeDefinitions.FIRST_QUIZ_COMPLETED;
      if (firstQuizBadgeDef) {
        const wasFirstQuizBadgeAwarded = user.awardBadge({
          badgeId: firstQuizBadgeDef.id,
          name: firstQuizBadgeDef.name,
          description: firstQuizBadgeDef.description,
          iconUrl: firstQuizBadgeDef.iconUrl, // For consistency with User model, though client uses .icon
          type: firstQuizBadgeDef.type
        });
        console.log("wasFirstQuizBadgeAwarded", wasFirstQuizBadgeAwarded);
        if (wasFirstQuizBadgeAwarded) {
          newlyAwardedBadges.push(firstQuizBadgeDef); // Push the definition which has .icon
        }
      }

      // Original logic for XP, Gems, Level up, Course Completion Badge if exam was passed AND it's the first time completing THIS EXAM
      if (!courseProgress.endOfCourseExam?.completed) { 
        // Award XP based on score
        const baseXP = 500; // Large base XP for completing final exam
        const bonusXP = Math.round((score / 100) * 250); // Up to 250 bonus XP based on score
        xpGained = baseXP + bonusXP;
        user.xp += xpGained;

        // Award gems based on score
        const baseGems = 50; // Base gems for passing final exam
        const bonusGems = Math.floor(score / 5); // Up to 20 bonus gems
        gemsGained = baseGems + bonusGems;
        user.gems += gemsGained;

        // Calculate level up
        const oldLevel = user.level;
        const newLevel = Math.floor(user.xp / 1000) + 1;
        if (newLevel > oldLevel) {
          user.level = newLevel;
          levelUp = true;
          // Extra gems for leveling up
          const levelUpGems = 50;
          gemsGained += levelUpGems;
          user.gems += levelUpGems;
        }

        // Mark course as completed if it wasn't already
        if (!courseProgress.completed) {
          courseProgress.completed = true;
          courseProgress.completionDate = new Date();
          user.progress.completedCourses = (user.progress.completedCourses || 0) + 1;
        }

        // Award a badge for passing the final exam
        let courseCompletionBadgeData = null;
        if (course.badge) {
          // Create badge data using the course badge info
          courseCompletionBadgeData = {
            id: `COURSE_COMPLETE_${course.slug.toUpperCase()}`,
            badgeId: `COURSE_COMPLETE_${course.slug.toUpperCase()}`, // Ensure a unique ID
            type: 'course-completion',
            name: course.badge.name || `${course.title} Master`,
            description: course.badge.description || `Mastered the ${course.title} course by passing the final exam with ${score}% score`,
            dateEarned: new Date(),
            iconUrl: course.badge.iconUrl || '@/components/icons/placeholderCourseBadge.svg', // Add a placeholder if none
            courseId: course._id.toString()
          };
        } else {
          // If course doesn't have a custom badge, create a default one
          courseCompletionBadgeData = {
            id: `COURSE_COMPLETE_${course.slug.toUpperCase()}`,
            badgeId: `COURSE_COMPLETE_${course.slug.toUpperCase()}`, // Ensure a unique ID
            type: 'course-completion',
            name: `${course.title} Master`,
            description: `Mastered the ${course.title} course by passing the final exam with ${score}% score`,
            dateEarned: new Date(),
            iconUrl: '@/components/icons/placeholderCourseBadge.svg', // Add a placeholder
            courseId: course._id.toString()
          };
        }

        // Check if badge already exists in user's main badge list (using badgeId for uniqueness)
        // The user.awardBadge method should handle this, but we form the object here for newlyAwardedBadges array.
        // We will let user.awardBadge handle the actual DB update based on its internal logic.
        // For now, we'll assume if course wasn't completed, badge wasn't awarded yet by this specific logic block.
        // The actual awarding to user.badges happens via courseProgress.badges.push below for this type
        
        // Initialize courseProgress.badges array if it doesn't exist
        if (!courseProgress.badges) {
          courseProgress.badges = [];
        }

        // Check if this specific course completion badge is already in courseProgress.badges
        const existingCourseBadgeIndex = courseProgress.badges?.findIndex(
            b => b.type === 'course-completion' && b.courseId === course._id.toString()
        );

        if (existingCourseBadgeIndex === -1) {
            courseProgress.badges.push(courseCompletionBadgeData); 
            // Also add to newlyAwardedBadges for the immediate response
            // This might be a different object structure than FIRST_QUIZ_COMPLETED, ensure client handles it
            newlyAwardedBadges.push(courseCompletionBadgeData);
        }
      }
       // Mark exam as completed (moved from inside the !courseProgress.endOfCourseExam?.completed block)
      courseProgress.endOfCourseExam.completed = true; // Exam is completed if passed
    }

    user.progress.courses.set(courseProgressIndex, courseProgress);
    await user.save();

    // Build the redirect URL for the frontend
    const redirectUrl = `/course-details/${courseSlug}?examCompleted=true&score=${score}&xpGained=${xpGained}&gemsGained=${gemsGained}&levelUp=${levelUp}${newlyAwardedBadges.length > 0 ? '&badgeAwarded=true' : ''}`;

    return new Response(JSON.stringify({
      success: true,
      score,
      passed,
      xpGained,
      gemsGained,
      levelUp,
      newlyAwardedBadges, // Return all newly awarded badges
      dailyLimitReached: false,
      quizzesTakenToday: user.dailyQuizCount,
      maxQuizzesToday: maxDailyQuizzes,
      completionPercentage: courseProgress.completionPercentage,
      courseId: course._id,
      redirectUrl
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error completing final exam:", error);
    return new Response(JSON.stringify({ error: "Failed to complete final exam" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 