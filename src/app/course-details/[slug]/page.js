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

// Separate client component for handling XP notifications
function XPNotificationHandler({ params }) {
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [xpNotificationData, setXPNotificationData] = useState(null);
  const router = useRouter();
  
  // Use URL search params safely for client-side only
  let searchParams;
  try {
    searchParams = new URLSearchParams(window.location.search);
  } catch (e) {
    // Handle case where window is not available during SSR
    searchParams = { get: () => null };
  }
  
  // Check for XP gain parameters in URL
  useEffect(() => {
    if (searchParams.get('xpGained')) {
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
      
      // Clear the URL parameters after a delay
      setTimeout(() => {
        router.replace(`/course-details/${params.slug}`);
      }, 500);
    }
  }, [searchParams, router, params.slug]);

  return (
    <XPNotification 
      isVisible={showXPNotification}
      onClose={() => setShowXPNotification(false)}
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
      const response = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">{error}</div>;
  }

  if (!course) {
    return <div className="text-center mt-6">Course not found</div>;
  }

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
                <button
                  onClick={isEnrolled ? () => {
                    // Determine if course is completed
                    const isCompleted = course.userProgress?.completed || 
                                       (course.userProgress?.completionPercentage >= 100);
                                       
                    // If course is completed, just go to course overview or certificate
                    if (isCompleted) {
                      router.push(`/course/${course._id}`);
                      return;
                    }
                    
                    // Find the current lesson using the progress indices
                    const currentChapter = course.chapters[course.userProgress?.currentChapter];
                    const currentLesson = currentChapter?.lessons[course.userProgress?.currentLesson];
                    if (currentLesson) {
                      router.push(`/lesson/${currentLesson.slug}`);
                    }
                  } : handleEnrollClick}
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
                </button>
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
                      {course.prerequisites.map((prereq, index) => (
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
                      {course.learningOutcomes.map((outcome, index) => (
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
                  {course.chapters.map((chapter, chapterIndex) => {
                    const chapterProgress = course.userProgress?.chapters?.[chapterIndex];
                    return (
                      <div key={chapter._id} className="card">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Chapter {chapterIndex + 1}: {chapter.title}
                            </h3>
                            {chapterProgress?.completed && (
                              <div className="flex items-center gap-2 text-emerald-600">
                                <CheckCircle className="w-5 h-5" />
                                <span className="text-sm font-medium">Completed</span>
                              </div>
                            )}
                          </div>
                          <div className="space-y-3">
                            {chapter.lessons.map((lesson, lessonIndex) => {
                              const lessonProgress = chapterProgress?.lessons?.[lessonIndex];
                              const isCurrentLesson = 
                                course.userProgress?.currentChapter === chapterIndex &&
                                course.userProgress?.currentLesson === lessonIndex;
                              
                              // Check if course is completed
                              const isCourseCompleted = course.userProgress?.completed || 
                                                       course.userProgress?.completionPercentage >= 100;
                              
                              return (
                                <Link
                                  key={lesson._id}
                                  href={`/lesson/${lesson.slug}`}
                                  className={`block cursor-pointer`}
                                >
                                  <div
                                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                                      isCurrentLesson && !isCourseCompleted
                                        ? "bg-violet-50 border-violet-100"
                                        : "hover:bg-gray-50"
                                    } ${lessonProgress?.completed ? "border-emerald-100" : "border-gray-100"
                                    } border`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                          lessonProgress?.completed
                                            ? "bg-emerald-100"
                                            : isCurrentLesson && !isCourseCompleted
                                            ? "bg-violet-100"
                                            : "bg-gray-100"
                                        }`}
                                      >
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
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Course Info */}
            <div className="space-y-6">
              {/* Course Stats */}
              <div className="card p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-violet-50 rounded-lg">
                    <Clock className="w-6 h-6 text-violet-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold text-gray-900">
                      {course.chapters.reduce(
                        (total, chapter) =>
                          total +
                          chapter.lessons.reduce((sum, lesson) => sum + lesson.duration, 0),
                        0
                      )}{" "}
                      mins
                    </div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Enrolled</div>
                    <div className="font-semibold text-gray-900">
                      {course.enrolledCount || 0}
                    </div>
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
        title="Enroll in Course"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ready to start learning?
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>You&apos;re about to enroll in <strong>{course?.title}</strong>.</p>
            <p>Here&apos;s what you need to know:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You can only complete one lesson per day</li>
              <li>Each lesson includes interactive exercises and a mini quiz</li>
              <li>There will be a comprehensive course quiz at the end</li>
              <li>Upon completion, you&apos;ll earn:
                <ul className="list-disc pl-5 mt-2">
                  <li>XP points for your progress</li>
                  <li>Gems for completing exercises and quizzes</li>
                  <li>A &quot;{course?.title}&quot; badge for your profile</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsEnrollDialogOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleEnrollConfirm}
              disabled={enrolling}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50"
            >
              {enrolling ? "Enrolling..." : "Confirm Enrollment"}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
