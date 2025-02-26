"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  BarChart,
  BookOpen,
  Trophy,
  Code,
  Zap,
  Target,
  Clock,
  ArrowRight,
  PlayCircle,
  CheckCircle,
  Award,
  Star,
} from "lucide-react";

import Navbar from "./components/Navbar";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [userProfile, setUserProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [dbCourses, setDbCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);
  const [showQuizCompletionNotification, setShowQuizCompletionNotification] = useState(false);
  const [quizCompletionData, setQuizCompletionData] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Check for quiz completion parameters
  useEffect(() => {
    if (searchParams.get('quizCompleted') === 'true') {
      const completionData = {
        courseId: searchParams.get('courseId'),
        score: parseInt(searchParams.get('score') || '0'),
        xpGained: parseInt(searchParams.get('xpGained') || '0'),
        levelUp: searchParams.get('levelUp') === 'true',
        completionPercentage: parseInt(searchParams.get('completionPercentage') || '0')
      };
      
      setQuizCompletionData(completionData);
      setShowQuizCompletionNotification(true);
      
      // Clear the URL parameters after a delay
      setTimeout(() => {
        router.replace('/');
      }, 500);
    }
  }, [searchParams, router]);

  // Auto-hide notification after delay
  useEffect(() => {
    if (showQuizCompletionNotification) {
      const timer = setTimeout(() => {
        setShowQuizCompletionNotification(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showQuizCompletionNotification]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setIsLoading(true);

      Promise.all([
        fetch("/api/profile").then((res) => res.json()),
        fetch("/api/courses").then((res) => res.json()),
        fetch("/api/quizzes").then((res) => res.json()),
      ])
        .then(([profileData, coursesData, quizzesData]) => {
          if (profileData.error) {
            throw new Error(profileData.error);
          }

          setUserProfile(profileData);
          setCourses(Array.isArray(coursesData) ? coursesData : []);
          setQuizzes(Array.isArray(quizzesData) ? quizzesData : []);

          return fetch("/api/courses");
        })
        .then((res) => res.json())
        .then((dbCoursesData) => {
          console.log(dbCoursesData);
          setDbCourses(dbCoursesData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Dashboard fetch error:", err);
          setError("Failed to load content");
          setIsLoading(false);
        });
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const seedDatabase = async () => {
      try {
        const response = await fetch("/api/seed", { method: "POST" });
        const data = await response.json();
        console.log(data.message);
        console.log("SEEEEDEDDDD");
      } catch (error) {
        console.error("Error seeding database:", error);
      }
    };

    seedDatabase();
  }, []);

  // Function to handle course enrollment
  const enrollInCourse = async (courseId) => {
    if (enrollingCourseId) return; // Prevent multiple enrollments at once
    
    try {
      setEnrollingCourseId(courseId);
      
      const response = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      });
      
      if (response.ok) {
        // Refresh courses to get updated enrollment data
        const coursesRes = await fetch("/api/courses");
        const coursesData = await coursesRes.json();
        if (!coursesRes.ok) {
          throw new Error(coursesData.error || 'Failed to refresh courses');
        }
        setDbCourses(coursesData);
        
        // Refresh user profile
        const profileRes = await fetch("/api/profile");
        const profileData = await profileRes.json();
        if (!profileRes.ok) {
          throw new Error(profileData.error || 'Failed to refresh profile');
        }
        setUserProfile(profileData);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to enroll in course');
      }
    } catch (err) {
      console.error('Error enrolling in course:', err);
      // Show error to user (could add a toast notification here)
      alert(`Failed to enroll: ${err.message}`);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  // Function to get course status text and color
  const getCourseStatusInfo = (course) => {
    if (!course.isEnrolled) {
      return {
        text: "Enroll Now",
        icon: <PlayCircle className="w-4 h-4" />,
        bgColor: "bg-violet-600 hover:bg-violet-700"
      };
    }
    
    if (course.completed) {
      return {
        text: "Completed",
        icon: <CheckCircle className="w-4 h-4" />,
        bgColor: "bg-emerald-600 hover:bg-emerald-700"
      };
    }
    
    return {
      text: "Continue Learning",
      icon: <PlayCircle className="w-4 h-4" />,
      bgColor: "bg-blue-600 hover:bg-blue-700"
    };
  };

  // Function to handle course action button click
  const handleCourseAction = (course) => {
    if (!course.isEnrolled) {
      enrollInCourse(course._id);
    } else {
      // If enrolled, navigate to the course or lesson
      if (course.completed) {
        router.push(`/course-details/${course.slug}`);
      } else {
        // Find the current chapter and lesson using progress data
        const currentChapterIndex = course.currentChapter || 0;
        const currentLessonIndex = course.currentLesson || 0;
        
        // Check if the chapter and lesson exist
        if (course.chapters && 
            course.chapters[currentChapterIndex] && 
            course.chapters[currentChapterIndex].lessons && 
            course.chapters[currentChapterIndex].lessons[currentLessonIndex]) {
          
          // Get the lesson slug
          const lessonSlug = course.chapters[currentChapterIndex].lessons[currentLessonIndex].slug;
          
          // if (lessonSlug) {
          //   router.push(`/lesson/${lessonSlug}`);
          // } else {
            // Fallback to course page if lesson slug is missing
            router.push(`/course-details/${course.slug}`);
          // }
        } else {
          // Fallback to course page if indices are invalid
          router.push(`/course/${course._id}`);
        }
      }
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">{error}</div>;
  }

  if (!userProfile) {
    return (
      <div className="text-center mt-6">
        No user profile data found. Please refresh or contact support.
      </div>
    );
  }

  const { xp = 0, gems = 0, dailyStreak = 0 } = userProfile;
  const completedLessons = userProfile.progress?.completedLessons || 0;
  const completedCourses = userProfile.progress?.completedCourses || 0;
  const totalTimeSpent = userProfile.progress?.totalTimeSpent || 0;
  
  // Convert minutes to hours and minutes for display
  const timeSpentHours = Math.floor(totalTimeSpent / 60);
  const timeSpentMinutes = totalTimeSpent % 60;
  const timeDisplay = timeSpentHours > 0 
    ? `${timeSpentHours}h ${timeSpentMinutes}m` 
    : `${timeSpentMinutes}m`;

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      {/* Quiz Completion Notification */}
      {showQuizCompletionNotification && quizCompletionData && (
        <div className="fixed top-24 right-4 z-50 w-96 bg-white rounded-lg shadow-xl border-l-4 border-green-500 overflow-hidden animate-slide-in">
          <div className="p-5">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">Quiz Completed!</p>
                <p className="mt-1 text-sm text-gray-500">
                  You scored {quizCompletionData.score}% on the quiz.
                </p>
                
                {quizCompletionData.xpGained > 0 && (
                  <div className="mt-2 flex items-center text-sm text-indigo-600">
                    <Zap className="mr-1.5 h-4 w-4" />
                    <span>+{quizCompletionData.xpGained} XP gained</span>
                  </div>
                )}
                
                {quizCompletionData.levelUp && (
                  <div className="mt-2 flex items-center text-sm text-amber-600">
                    <Award className="mr-1.5 h-4 w-4" />
                    <span>Level Up! Congratulations!</span>
                  </div>
                )}
                
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Course Progress</span>
                    <span>{quizCompletionData.completionPercentage}%</span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      style={{ width: `${quizCompletionData.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500"
                  onClick={() => setShowQuizCompletionNotification(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Welcome back, Developer
            </h1>
            <div className="accent-bar"></div>
            <p className="text-xl text-secondary">
              Your journey to mastery continues
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-6 h-6" style={{ color: "#F59E0B" }} />
                <span className="badge badge-primary">Total</span>
              </div>
              <div className="stats-value">{xp}</div>
              <div className="stats-label">XP Earned</div>
            </div>

            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-6 h-6" style={{ color: "#EC4899" }} />
                <span className="badge badge-accent">Streak</span>
              </div>
              <div className="stats-value">{dailyStreak}</div>
              <div className="stats-label">Days</div>
            </div>

            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-6 h-6" style={{ color: "#8B5CF6" }} />
                <span className="badge badge-primary">Completed</span>
              </div>
              <div className="stats-value">{completedLessons}</div>
              <div className="stats-label">Lessons</div>
            </div>

            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-6 h-6" style={{ color: "#06B6D4" }} />
                <span className="badge badge-accent">Time</span>
              </div>
              <div className="stats-value">{timeDisplay}</div>
              <div className="stats-label">Learning Time</div>
            </div>
          </div>

          {/* All Courses from DB */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">All Courses</h2>
            </div>
            <div className="content-grid">
              {dbCourses.map((course) => {
                const statusInfo = getCourseStatusInfo(course);
                
                return (
                  <div
                    key={course._id}
                    className="card hover-lift overflow-hidden group h-full"
                  >
                    <div className="p-4 bg-gradient-to-br from-violet-50 to-fuchsia-50 h-full flex flex-col">
                      <div className="mb-6 flex items-center gap-3 text-sm">
                        <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full">
                          {course.chapters?.length || 0} Chapters
                        </span>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full">
                          {course.difficulty || "Beginner"}
                        </span>
                        {course.completed && (
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center transform -rotate-6 shadow-sm transition-transform group-hover:rotate-0">
                          <BookOpen
                            className="w-7 h-7"
                            style={{ color: "#8B5CF6" }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                      </div>

                      {/* Book Section */}
                      <div className="mt-6 flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-violet-100">
                        <div className="w-10 h-12 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-violet-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-violet-600 mb-0.5">
                            Based on the book
                          </div>
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {course.book?.title || "Course Book Title"}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            by {course.book?.author || "Author Name"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{course.duration || "4 hours"}</span>
                        <span>Certificate</span>
                      </div>
                      <div className="mt-auto pt-6 space-y-4">
                        {course.isEnrolled && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="text-violet-600 font-medium">{course.progress || 0}%</span>
                            </div>
                            <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                                style={{ width: `${course.progress || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/course-details/${course.slug || course._id}`}
                            className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center gap-1"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleCourseAction(course)}
                            disabled={enrollingCourseId === course._id}
                            className={`px-4 py-2 ${statusInfo.bgColor} text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-70`}
                          >
                            {enrollingCourseId === course._id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Enrolling...</span>
                              </>
                            ) : (
                              <>
                                {statusInfo.icon}
                                {statusInfo.text}
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Available Quizzes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">Challenge Yourself</h2>
              <button className="text-violet-600 hover:text-violet-700 flex items-center gap-2 transition-colors">
                All Quizzes <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="content-grid">
              {quizzes.slice(0, 3).map((quiz) => (
                <div
                  key={quiz.id}
                  className="card hover-lift overflow-hidden group h-full"
                >
                  <div className="p-8 bg-gradient-to-br from-fuchsia-50 to-pink-50 h-full flex flex-col">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center transform rotate-6 shadow-sm transition-transform group-hover:rotate-0">
                        <BarChart
                          className="w-7 h-7"
                          style={{ color: "#EC4899" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                          {quiz.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {quiz.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-8 space-y-4">
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Target
                            className="w-4 h-4"
                            style={{ color: "#6B7280" }}
                          />
                          <span>50 XP</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap
                            className="w-4 h-4"
                            style={{ color: "#6B7280" }}
                          />
                          <span>Streak +2</span>
                        </div>
                      </div>

                      <div className="h-px bg-gray-100"></div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          <span className="text-sm text-gray-600">
                            Available Now
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg text-sm font-medium hover:bg-fuchsia-700 transition-colors">
                          Take Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
