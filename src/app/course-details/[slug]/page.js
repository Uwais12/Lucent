"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Trophy,
  Users,
  ChevronRight,
  CheckCircle,
  Lock,
  PlayCircle,
  Code,
  Zap,
  GraduationCap,
  Star,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Dialog from "@/components/Dialog";
import XPNotification from "../../components/XPNotification";
import { toast } from "react-hot-toast";
import { clearGlobalEnrollmentCache } from '@/hooks/useEnrollmentCheck';
import { getDailyQuizLimit, isUnlimitedTier } from "@/lib/constants";

// Separate client component for handling XP notifications
function XPNotificationHandler({ params }) {
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [xpNotificationData, setXPNotificationData] = useState(null);
  const router = useRouter();
  
  // Use URL search params safely for client-side only
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hasXPGain = searchParams.get('xpGained');
    
    if (hasXPGain && !showXPNotification) {
      const notificationData = {
        message: 'Experience Earned!',
        courseId: searchParams.get('courseId'),
        xpGained: parseInt(searchParams.get('xpGained') || '0'),
        gemsGained: parseInt(searchParams.get('gemsGained') || '0'),
        levelUp: searchParams.get('levelUp') === 'true',
        completionPercentage: parseInt(searchParams.get('completionPercentage') || '0')
      };
      
      setXPNotificationData(notificationData);
      setShowXPNotification(true);
      
      // Clear the URL parameters immediately
      router.replace(`/course-details/${params.slug}`, { scroll: false });
    }
  }, [params.slug, router, showXPNotification]);

  const handleClose = () => {
    setShowXPNotification(false);
    setXPNotificationData(null);
    // Clear the URL parameters when notification is closed, if they haven't been cleared yet.
    // This ensures that if the user closes it quickly, the params are still removed.
    if (window.location.search.includes('xpGained')) {
      router.replace(`/course-details/${params.slug}`, { scroll: false });
    }
  };

  return (
    <XPNotification 
      isVisible={showXPNotification}
      onClose={handleClose}
      xpGained={xpNotificationData?.xpGained}
      gemsGained={xpNotificationData?.gemsGained}
      levelUp={xpNotificationData?.levelUp}
      message={xpNotificationData?.message}
      completionPercentage={xpNotificationData?.completionPercentage}
      courseId={xpNotificationData?.courseId}
    />
  );
}

export default function CourseDetails() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [canTakeQuizToday, setCanTakeQuizToday] = useState(true);
  const [userIsPro, setUserIsPro] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState(new Set());
  const [maxQuizzes, setMaxQuizzes] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/course-details/${params.slug}`);
        const data = await response.json();

        if (response.ok) {
          // Add a direct check for course completion
          if (data.userProgress && typeof data.userProgress.completionPercentage === 'number') {
            data.userProgress.completed = data.userProgress.completionPercentage >= 100;
          }
          setCourse(data);
          // Check if user is enrolled
          if (isLoaded && user) {
            const userResponse = await fetch("/api/profile");
            const userData = await userResponse.json();
            const enrolledCourse = userData.progress?.courses?.find(
              (c) => c.courseId === data._id
            );
            
            setIsEnrolled(!!enrolledCourse);
            
            // --- Daily Quiz Limit Check ---
            const tier = userData.subscription?.tier || 'FREE';
            const unlimited = isUnlimitedTier(tier);
            setUserIsPro(unlimited);
            if (unlimited) {
              setCanTakeQuizToday(true);
              setMaxQuizzes(null);
            } else {
              const maxDailyQuizzes = getDailyQuizLimit(tier);
              const dailyQuizCount = userData.dailyQuizCount || 0;
              setCanTakeQuizToday(dailyQuizCount < maxDailyQuizzes);
              setMaxQuizzes(maxDailyQuizzes);
            }
            // --- End Daily Quiz Limit Check ---
            
            // If we have enrollment data but the course data doesn't have user progress
            if (enrolledCourse) {
              // Update the course data with completion status from user profile
              setCourse(prev => ({
                ...prev,
                userProgress: {
                  ...prev.userProgress,
                  completed: enrolledCourse.completed || enrolledCourse.completionPercentage >= 100,
                  completionPercentage: enrolledCourse.completionPercentage || prev.userProgress?.completionPercentage || 0
                }
              }));
            }
          }
        } else {
          setError(data.error || "Failed to load course");
        }
      } catch (err) {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchCourse();
    }
  }, [params.slug, isLoaded, user]);

  const handleEnrollClick = () => {
    if (!isLoaded || !user) {
      router.push("/sign-in");
      return;
    }
    setIsEnrollDialogOpen(true);
  };

  const handleEnrollConfirm = async () => {
    try {
      setEnrolling(true);
      const response = await fetch(`/api/courses/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ courseId: course._id }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsEnrolled(true);
        // Update enrolled count in UI
        setCourse((prev) => ({
          ...prev,
          enrolledCount: prev.enrolledCount + 1,
        }));
        
        // Clear the enrollment cache
        clearGlobalEnrollmentCache();
        
        // Show success message
        toast.success("Successfully enrolled in course! Redirecting to dashboard...");
        
        // Wait a moment then redirect to dashboard
        setTimeout(() => {
          router.push("/?enrolled=true");
        }, 1500);
      } else {
        setError(data.error || "Failed to enroll in course");
      }
    } catch (err) {
      setError("Failed to enroll in course");
    } finally {
      setEnrolling(false);
      setIsEnrollDialogOpen(false);
    }
  };

  const checkEnrollment = async (quizSlug, quizType) => {
    try {
      const response = await fetch('/api/courses/check-enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contentSlug: quizSlug, contentType: quizType })
      });
      if (!response.ok) {
        throw new Error('Failed to check enrollment');
      }
      const data = await response.json();
      return data.isEnrolled;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pattern-bg">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4">
              <div className="w-full h-full border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
            </div>
            <p className="text-gray-500 font-medium">Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pattern-bg">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pattern-bg">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-violet-100 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-violet-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Course not found</h2>
            <p className="text-gray-600">This course may have been removed or the link is invalid.</p>
          </div>
        </div>
      </div>
    );
  }

  const { title, description, chapters, difficulty, duration, book, endOfCourseExam, prerequisites, learningOutcomes, completionBadge, slug: courseSlug, enrolledUsersCount } = course;
  
  // Default to empty array if prerequisites or learningOutcomes are undefined
  const safePrerequisites = prerequisites || [];
  const safelearningOutcomes = learningOutcomes || [];

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const handleQuizNavigation = async (quizSlug, quizType, courseIdForQuiz) => {
    if (isChecking) return;
    setIsChecking(true);

    if (!canTakeQuizToday) {
      toast.error(`You have reached your daily quiz limit of ${maxQuizzes}. Please try again tomorrow.`, {
        duration: 5000,
        position: 'top-center'
      });
      setIsChecking(false);
      return;
    }
    
    // Check enrollment specifically for the quiz's content (lesson, chapter, or course exam)
    const isContentEnrolled = await checkEnrollment(quizSlug, quizType);

    if (isContentEnrolled) {
      let quizPath = '';
      if (quizType === 'lesson-quiz') {
        quizPath = `/quiz/${quizSlug}?courseId=${courseIdForQuiz}`;
      } else if (quizType === 'chapter-quiz') {
        quizPath = `/quiz/chapter/${quizSlug}?courseId=${courseIdForQuiz}`;
      } else if (quizType === 'course-exam') {
        quizPath = `/quiz/final/${quizSlug}`;
      }

      if (quizPath) {
        router.push(quizPath);
      } else {
        toast.error("Could not determine the quiz path.");
      }
    } else {
      // This case should ideally not be hit if buttons are disabled correctly
      // but as a fallback:
      toast.error("You are not enrolled in the required content to take this quiz.");
    }
    setIsChecking(false);
  };

  // Determine if the main course is completed
  const isCourseCompleted = course.userProgress?.completionPercentage >= 100;

  // Find the current lesson to resume, if any
  // Note: currentChapter and currentLesson are numeric indices (0, 1, 2...), NOT ObjectIds
  let resumeLessonSlug = null;
  let resumeChapterSlug = null;
  if (course.userProgress && course.userProgress.isEnrolled) {
    const chapterIdx = course.userProgress.currentChapter || 0;
    const lessonIdx = course.userProgress.currentLesson || 0;
    const currentChapterData = chapters[chapterIdx];
    if (currentChapterData) {
      const currentLessonData = currentChapterData.lessons?.[lessonIdx];
      if (currentLessonData) {
        // Check completion from userProgress
        const lessonProgress = course.userProgress?.chapters
          ?.find(chProg => chProg.chapterId.toString() === currentChapterData._id.toString())
          ?.lessons?.find(lProg => lProg.lessonId.toString() === currentLessonData._id.toString());
        if (!lessonProgress?.completed) {
          resumeLessonSlug = currentLessonData.slug;
          resumeChapterSlug = currentChapterData.slug;
        }
      }
    }
  }
  
  // If no specific lesson to resume, but course started, find the first uncompleted lesson
  if (!resumeLessonSlug && course.userProgress && course.userProgress.isEnrolled) {
    for (const chapter of chapters) {
      const firstUncompletedLesson = chapter.lessons.find(lesson => {
        const lessonProgress = course.userProgress?.chapters
          ?.find(chProg => chProg.chapterId.toString() === chapter._id.toString())
          ?.lessons?.find(lProg => lProg.lessonId.toString() === lesson._id.toString());
        return !lessonProgress?.completed;
      });
      if (firstUncompletedLesson) {
        resumeLessonSlug = firstUncompletedLesson.slug;
        resumeChapterSlug = chapter.slug;
        break;
      }
    }
  }

  const startOrContinueText = isCourseCompleted
    ? "Review Course"
    : course.userProgress?.isEnrolled
    ? "Continue Learning"
    : "Start Learning";

  const startOrContinuePath = isCourseCompleted
    ? `/course-details/${courseSlug}`
    : resumeLessonSlug
    ? `/lesson/${resumeLessonSlug}`
    : (chapters && chapters.length > 0 && chapters[0].lessons && chapters[0].lessons.length > 0)
    ? `/lesson/${chapters[0].lessons[0].slug}`
    : `/course-details/${courseSlug}`;

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      {/* XP Notification with Confetti */}
      <Suspense fallback={null}>
        <XPNotificationHandler params={params} />
      </Suspense>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 text-sm text-violet-600 mb-4">
              <span>Courses</span>
              <ChevronRight className="w-4 h-4" />
              <span>{course.title}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl">
                  {course.description}
                </p>
              </div>
              <div>
                <Link
                  href={startOrContinuePath}
                  className={`px-6 py-3 bg-gradient-to-r ${
                    !isEnrolled
                      ? "from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
                      : (course.userProgress?.completed || course.userProgress?.completionPercentage >= 100)
                      ? "from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
                      : "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  } text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-md shadow-violet-200`}
                  disabled={enrolling}
                >
                  {enrolling ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white" />
                  ) : (
                    <>
                      {!isEnrolled ? (
                        <PlayCircle className="w-5 h-5" />
                      ) : (course.userProgress?.completed || course.userProgress?.completionPercentage >= 100) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <PlayCircle className="w-5 h-5" />
                      )}
                      {!isEnrolled 
                        ? "Start Learning" 
                        : (course.userProgress?.completed || course.userProgress?.completionPercentage >= 100)
                        ? "Completed" 
                        : "Continue Learning"}
                    </>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Section */}
              <div className="space-y-8">
                {/* Book Reference */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Based on the Book
                  </h3>
                  <div className="flex gap-6">
                    <div className="w-24 h-32 bg-violet-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-violet-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {course.book.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        by {course.book.author}
                      </p>
                      {course.book.amazonUrl && (
                        <a
                          href={course.book.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 text-sm text-violet-600 hover:text-violet-700 font-medium inline-block"
                        >
                          View on Amazon
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Prerequisites and Learning Outcomes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Prerequisites */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Prerequisites
                    </h3>
                    <ul className="space-y-3">
                      {safePrerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-4 h-4 text-violet-600" />
                          </div>
                          <span className="text-gray-600">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learning Outcomes */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      What You&apos;ll Learn
                    </h3>
                    <ul className="space-y-3">
                      {safelearningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Zap className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="text-gray-600">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Curriculum Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Course Curriculum
                </h2>
                <div className="space-y-4">
                  {chapters.map((chapter, chapterIndex) => {
                    const chapterProgress = course.userProgress?.chapters?.[chapterIndex];
                    const totalLessons = chapter.lessons.length;
                    const completedLessons = chapter.lessons.filter((_, lessonIndex) => 
                      chapterProgress?.lessons?.[lessonIndex]?.completed
                    ).length;
                    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
                    
                    return (
                      <div key={chapter._id} className="card overflow-hidden">
                        <button 
                          onClick={() => {
                            const newExpandedChapters = new Set(expandedChapters);
                            if (newExpandedChapters.has(chapterIndex)) {
                              newExpandedChapters.delete(chapterIndex);
                            } else {
                              newExpandedChapters.add(chapterIndex);
                            }
                            setExpandedChapters(newExpandedChapters);
                          }}
                          className="w-full"
                        >
                          <div className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  chapterProgress?.completed ? "bg-emerald-100" : "bg-violet-100"
                                }`}>
                                  {chapterProgress?.completed ? (
                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                  ) : (
                                    <span className="font-medium text-violet-600">{chapterIndex + 1}</span>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {chapter.title}
                                </h3>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-sm text-gray-500">
                                  {completedLessons}/{totalLessons} lessons
                                </div>
                                <ChevronRight 
                                  className={`w-5 h-5 text-gray-400 transition-transform ${
                                    expandedChapters.has(chapterIndex) ? 'rotate-90' : ''
                                  }`} 
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-500 transition-all duration-300"
                                  style={{ width: `${progressPercentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-600">
                                {Math.round(progressPercentage)}%
                              </span>
                            </div>
                          </div>
                        </button>

                        {/* Collapsible Lessons Section */}
                        <div className={`transition-all duration-300 ease-in-out ${
                          expandedChapters.has(chapterIndex) 
                            ? 'max-h-[2000px] opacity-100' 
                            : 'max-h-0 opacity-0 overflow-hidden'
                        }`}>
                          <div className="border-t border-gray-100">
                            <div className="space-y-1 p-4">
                              {chapter.lessons.map((lesson, lessonIndex) => {
                                const lessonProgress = chapterProgress?.lessons?.[lessonIndex];
                                const isCurrentLesson = 
                                  course.userProgress?.currentChapter === chapterIndex &&
                                  course.userProgress?.currentLesson === lessonIndex;
                                const isCourseCompleted = course.userProgress?.completed || 
                                                        course.userProgress?.completionPercentage >= 100;
                                
                                return (
                                  <Link
                                    key={lesson._id}
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (!userIsPro && !canTakeQuizToday) {
                                        toast.error(`You have reached your daily limit of ${maxQuizzes} ${maxQuizzes === 1 ? 'quiz' : 'quizzes'}. Come back tomorrow!`);
                                        return;
                                      }
                                      router.push(`/lesson/${lesson.slug}`);
                                    }}
                                    className="block"
                                  >
                                    <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                                      isCurrentLesson && !isCourseCompleted
                                        ? "bg-violet-50 border-violet-100"
                                        : "hover:bg-gray-50"
                                      } ${lessonProgress?.completed ? "border-emerald-100" : "border-gray-100"} border`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                          lessonProgress?.completed
                                            ? "bg-emerald-100"
                                            : isCurrentLesson && !isCourseCompleted
                                            ? "bg-violet-100"
                                            : "bg-gray-100"
                                        }`}>
                                          {lessonProgress?.completed ? (
                                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                                          ) : isCurrentLesson && !isCourseCompleted ? (
                                            <PlayCircle className="w-4 h-4 text-violet-600" />
                                          ) : (
                                            <Lock className="w-4 h-4 text-gray-400" />
                                          )}
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-gray-900">
                                            {lesson.title}
                                          </h4>
                                          <div className="flex items-center gap-4 mt-1">
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                              <Clock className="w-4 h-4" />
                                              {lesson.duration} min
                                            </span>
                                            {lesson.parts.some(part => part.exercise) && (
                                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                                <Code className="w-4 h-4" />
                                                Practice
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      {isCurrentLesson && !isCourseCompleted && (
                                        <span className="text-sm font-medium text-violet-600">
                                          Current Lesson
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Chapter Quiz Section */}
                            {chapter.endOfChapterQuiz && (
                              <div className="p-6 border-t border-gray-100">
                                <div 
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    if (!canTakeQuizToday) {
                                      toast.error(`You have reached your daily limit of ${maxQuizzes} ${maxQuizzes === 1 ? 'quiz' : 'quizzes'}. Come back tomorrow!`);
                                      return;
                                    }
                                    setIsChecking(true);
                                    try {
                                      const isEnrolled = await checkEnrollment(chapter.endOfChapterQuiz.slug, 'chapter-quiz');
                                      if (isEnrolled) {
                                        router.push(`/quiz/chapter/${chapter.endOfChapterQuiz.slug}`);
                                      }
                                    } catch (error) {
                                      console.error('Error checking enrollment:', error);
                                      toast.error('Failed to check enrollment status');
                                    } finally {
                                      setIsChecking(false);
                                    }
                                  }}
                                  className="cursor-pointer hover:bg-gray-50 transition-colors rounded-lg"
                                >
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-semibold text-gray-900">
                                      Chapter Quiz
                                    </h4>
                                    {chapterProgress?.endOfChapterQuiz?.completed && (
                                      <div className="flex items-center gap-2 text-emerald-600">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm font-medium">Completed</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{chapter.endOfChapterQuiz.duration} minutes</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4" />
                                        <span>Passing Score: {chapter.endOfChapterQuiz.passingScore}%</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4" />
                                        <span>{chapter.endOfChapterQuiz.questions.length} Questions</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* End of Course Quiz Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Final Assessment
                </h2>
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {course.endOfCourseExam.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {course.endOfCourseExam.description}
                      </p>
                    </div>
                    {course.userProgress?.completed ? (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.endOfCourseExam.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>Passing Score: {course.endOfCourseExam.passingScore}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>{course.endOfCourseExam.questions.length} Questions</span>
                      </div>
                    </div>
                    {course.userProgress?.completionPercentage < 100 && (
                      <p className="text-sm text-amber-600 bg-amber-50 p-4 rounded-lg">
                        Note: It&apos;s recommended to complete all lessons and chapter quizzes before taking the final exam.
                        Current progress: {course.userProgress?.completionPercentage || 0}%
                      </p>
                    )}
                    <button
                      onClick={async () => {
                        if (!course.endOfCourseExam.slug) {
                          console.error('No exam slug found');
                          return;
                        }

                        // Check if user can take a quiz today
                        if (!course.userProgress?.completed && !canTakeQuizToday) {
                          toast.error(`You have reached your daily limit of ${maxQuizzes} ${maxQuizzes === 1 ? 'quiz' : 'quizzes'}. Come back tomorrow!`);
                          return;
                        }

                        setIsChecking(true);
                        try {
                          const isEnrolled = await checkEnrollment(course.endOfCourseExam.slug, 'course-exam');
                          if (isEnrolled) {
                            router.push(`/quiz/final/${course.endOfCourseExam.slug}`);
                          } else {
                            toast.error('You must be enrolled in this course to take the exam');
                          }
                        } catch (error) {
                          console.error('Error checking enrollment:', error);
                          toast.error('Failed to check enrollment status');
                        } finally {
                          setIsChecking(false);
                        }
                      }}
                      className={`w-full px-4 py-3 ${
                        course.userProgress?.completed
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700'
                      } text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] ${
                        (!course.userProgress?.completed && !canTakeQuizToday) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isChecking || (!course.userProgress?.completed && !canTakeQuizToday)}
                    >
                      <GraduationCap className="w-5 h-5" />
                      {isChecking ? 'Checking...' : course.userProgress?.completed 
                        ? 'Review Final Assessment'
                        : course.userProgress?.completionPercentage >= 100 
                          ? 'Start Final Assessment'
                          : 'Take Final Assessment Early'}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Course Info */}
            <div className="space-y-6">
              {/* Course Stats */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Course Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen className="w-4 h-4 text-violet-500" />
                      <span className="text-sm">Chapters</span>
                    </div>
                    <span className="font-bold text-gray-900">{chapters?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <PlayCircle className="w-4 h-4 text-violet-500" />
                      <span className="text-sm">Lessons</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {chapters?.reduce((acc, chapter) => acc + (chapter.lessons?.length || 0), 0) || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Trophy className="w-4 h-4 text-violet-500" />
                      <span className="text-sm">Quizzes</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {chapters?.reduce((acc, chapter) => acc + (chapter.quizzes?.length || 0), 0) + (endOfCourseExam ? 1 : 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-violet-500" />
                      <span className="text-sm">Enrolled</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {course.enrolledUsersCount || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Progress */}
              {course.userProgress?.isEnrolled && (
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Progress
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Course Completion</span>
                        <span className="text-violet-600 font-medium">
                          {course.userProgress.completionPercentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-300"
                          style={{
                            width: `${course.userProgress.completionPercentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Completion Badge */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Completion Badge
                </h3>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl transform rotate-6"></div>
                    <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center">
                      <Trophy className="w-12 h-12 text-violet-500" />
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {course.completionBadge.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {course.completionBadge.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enrollment Dialog */}
      <Dialog
        isOpen={isEnrollDialogOpen}
        onClose={() => setIsEnrollDialogOpen(false)}
        title="Confirm Enrollment"
        description={`Are you sure you want to enroll in "${course?.title}"?`}
      >
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setIsEnrollDialogOpen(false)}
            className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleEnrollConfirm}
            disabled={enrolling}
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-fuchsia-700 disabled:opacity-70 transition-all flex items-center gap-2"
          >
            {enrolling ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Enrolling...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Confirm Enrollment
              </>
            )}
          </button>
        </div>
      </Dialog>
    </div>
  );
}
