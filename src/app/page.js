"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
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
  Bookmark,
  GraduationCap,
} from "lucide-react";
import { toast } from "react-hot-toast";

import Navbar from "./components/Navbar";
import XPNotification from "./components/XPNotification";
import { useEnrollmentCheck } from '@/hooks/useEnrollmentCheck';

// Separate client component to handle search params
function XPNotificationHandler() {
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
        router.replace('/');
      }, 500);
    }
  }, [searchParams, router]);

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

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { checkEnrollment, isChecking } = useEnrollmentCheck();

  const [userProfile, setUserProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [dbCourses, setDbCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);
  const [canTakeQuizToday, setCanTakeQuizToday] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  // Add new state variables for pagination and filtering
  const [visibleQuizzes, setVisibleQuizzes] = useState(6);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add function to filter quizzes
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesCourse = selectedCourse === 'all' || quiz.courseSlug === selectedCourse;
    const matchesType = selectedType === 'all' || quiz.type === selectedType;
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesType && matchesSearch;
  });

  // Add function to handle showing more quizzes
  const showMoreQuizzes = () => {
    setVisibleQuizzes(prev => prev + 6);
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setIsLoading(true);

      Promise.all([
        fetch("/api/profile").then((res) => res.json()),
        fetch("/api/courses").then((res) => res.json()),
        fetch("/api/quizzes", { cache: 'no-store' }).then((res) => res.json()),
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

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setUserProfile(data);
      console.log('Last quiz completion: ', data);
      // Check if user can take a quiz today
      if (data.lastQuizCompletion) {
        const lastQuizDate = new Date(data.lastQuizCompletion);
        const today = new Date();
        const isSameDay = lastQuizDate.toDateString() === today.toDateString();
        setCanTakeQuizToday(!isSameDay);
      } else {
        setCanTakeQuizToday(true);
      }
      
      // Show streak broken notification if applicable
      if (data.streakStatus?.broken) {
        toast.error(`Your ${data.streakStatus.previousStreak}-day streak was broken! Start a new one today!`, {
          duration: 5000,
          position: 'top-center'
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Initial fetch when signed in
  useEffect(() => {
    if (isSignedIn) {
      fetchUserProfile();
    }
  }, [isSignedIn]);

  // Refresh profile when lastUpdate changes
  useEffect(() => {
    if (isSignedIn) {
      fetchUserProfile();
    }
  }, [lastUpdate]);

  // Listen for quiz completion events
  useEffect(() => {
    const handleQuizComplete = () => {
      setLastUpdate(Date.now());
    };

    window.addEventListener('quizCompleted', handleQuizComplete);

    return () => {
      window.removeEventListener('quizCompleted', handleQuizComplete);
    };
  }, []);

  useEffect(() => {
    // const seedDatabase = async () => {
    //   try {
    //     // First, clean up existing courses
    //     const cleanupResponse = await fetch("/api/cleanup", { 
    //       method: "POST",
    //       cache: 'no-store'
    //     });
    //     const cleanupData = await cleanupResponse.json();
    //     console.log("Cleanup response:", cleanupData);

    //     // Then seed the courses
    //     const response = await fetch("/api/seed", { 
    //       method: "POST",
    //       cache: 'no-store'
    //     });
    //     const data = await response.json();
    //     console.log("Seeding response:", data);
        
    //     // Refresh courses after seeding
    //     const coursesRes = await fetch("/api/courses", { cache: 'no-store' });
    //     const coursesData = await coursesRes.json();
    //     setDbCourses(coursesData);
    //   } catch (error) {
    //     console.error("Error seeding database:", error);
    //   }
    // };

    // if (isLoaded && isSignedIn) {
    //   seedDatabase();
    // }
  }, [isLoaded, isSignedIn]);

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
          router.push(`/course-details/${course.slug || course._id}`);
        }
      }
    }
  };

  const handleQuizClick = async (e, quiz) => {
    e.preventDefault();
    
    if (isChecking) return;

    if (!quiz?.slug) {
      console.error("No quiz slug found");
      return;
    }

    if (!canTakeQuizToday) {
      toast.error("You've already completed a quiz today. Come back tomorrow for more!", {
        duration: 5000,
        position: 'top-center'
      });
      return;
    }

    console.log('Checking enrollment for quiz + slug: ', quiz.slug, 'and type: ', quiz.type);
    const isEnrolled = await checkEnrollment(quiz.slug, quiz.type);
    if (isEnrolled) {
      router.push(
        quiz.type === 'course-exam' 
          ? `/quiz/final/${quiz.slug}`
          : quiz.type === 'chapter-quiz'
          ? `/quiz/chapter/${quiz.slug}`
          : `/quiz/${quiz.slug}`
      );
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

  // Filter enrolled courses
  const enrolledCourses = dbCourses.filter(course => course.isEnrolled);

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      <Suspense fallback={null}>
        <XPNotificationHandler />
      </Suspense>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">
              Welcome back, Developer
            </h1>
            <div className="accent-bar"></div>
            <p className="text-lg sm:text-xl text-secondary">
              Your journey to mastery continues
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-violet-100 text-violet-600 rounded-lg">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {userProfile?.progress?.courses.reduce((total, course) => total + (course.badges?.length || 0), 0) || 0}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">Badges Earned</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-amber-100 text-amber-600 rounded-lg">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {userProfile?.dailyStreak || 0}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">Day Streak</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {userProfile?.progress?.completedLessons || 0}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">Lessons Completed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Quiz Status */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 ${canTakeQuizToday ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'} rounded-lg`}>
                  <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {canTakeQuizToday ? "Daily Quiz Available!" : "Daily Quiz Completed"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {canTakeQuizToday 
                      ? "Take a quiz to earn rewards!" 
                      : "Come back tomorrow for more quizzes!"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* My Courses Section */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-violet-600" />
                  <span>My Courses</span>
                </div>
              </h2>
            </div>
            
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {enrolledCourses.map((course) => {
                  const statusInfo = getCourseStatusInfo(course);
                  
                  return (
                    <div
                      key={course._id}
                      className="card hover-lift overflow-hidden group h-full border-l-4 border-violet-500"
                    >
                      <div className="p-4 sm:p-6 bg-gradient-to-br from-violet-50 to-fuchsia-50 h-full flex flex-col">
                        <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                          <span className="px-2 sm:px-3 py-1 bg-violet-100 text-violet-600 rounded-full">
                            {course.chapters?.length || 0} Chapters
                          </span>
                          <span className="px-2 sm:px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full">
                            {course.difficulty || "Beginner"}
                          </span>
                          {course.completed && (
                            <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-600 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                        <div className="flex items-start gap-3 sm:gap-5">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center transform -rotate-6 shadow-sm transition-transform group-hover:rotate-0">
                            <BookOpen
                              className="w-6 h-6 sm:w-7 sm:h-7"
                              style={{ color: "#8B5CF6" }}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 truncate">
                              {course.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {course.description}
                            </p>
                          </div>
                        </div>

                        {/* Book Section */}
                        <div className="mt-4 sm:mt-6 flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white/60 rounded-lg border border-violet-100">
                          <div className="w-8 h-10 sm:w-10 sm:h-12 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded flex items-center justify-center">
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-violet-500"
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
                            <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              {course.book?.title || "Course Book Title"}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              by {course.book?.author || "Author Name"}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex-1 flex flex-col justify-end space-y-3">
                          <div className="space-y-1 sm:space-y-2">
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="text-violet-600 font-medium">{course.progress || 0}%</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-violet-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                                style={{ width: `${course.progress || 0}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Link
                              href={`/course-details/${course.slug}`}
                              className="text-violet-600 hover:text-violet-700 text-xs sm:text-sm font-medium flex items-center gap-1"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => handleCourseAction(course)}
                              className={`px-3 sm:px-4 py-1.5 sm:py-2 ${statusInfo.bgColor} text-white rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 sm:gap-2`}
                            >
                              {statusInfo.icon}
                              {statusInfo.text}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="card p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-6 h-6 sm:w-8 sm:h-8 text-violet-500" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No courses enrolled yet</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Explore our courses below and enroll to start your learning journey</p>
                <div className="flex justify-center">
                  <a href="#all-courses" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-violet-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors hover:bg-violet-700 flex items-center gap-1 sm:gap-2">
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    Browse Courses
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* All Courses Section */}
          <div className="mb-8 sm:mb-12" id="all-courses">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">All Courses</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {dbCourses.map((course) => {
                const statusInfo = getCourseStatusInfo(course);
                
                return (
                  <div
                    key={course._id}
                    className="card hover-lift overflow-hidden group h-full"
                  >
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-violet-50 to-fuchsia-50 h-full flex flex-col">
                      <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                        <span className="px-2 sm:px-3 py-1 bg-violet-100 text-violet-600 rounded-full">
                          {course.chapters?.length || 0} Chapters
                        </span>
                        <span className="px-2 sm:px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full">
                          {course.difficulty || "Beginner"}
                        </span>
                        {course.completed && (
                          <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-600 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="flex items-start gap-3 sm:gap-5">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center transform -rotate-6 shadow-sm transition-transform group-hover:rotate-0">
                          <BookOpen
                            className="w-6 h-6 sm:w-7 sm:h-7"
                            style={{ color: "#8B5CF6" }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 truncate">
                            {course.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                      </div>

                      {/* Book Section */}
                      <div className="mt-4 sm:mt-6 flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white/60 rounded-lg border border-violet-100">
                        <div className="w-8 h-10 sm:w-10 sm:h-12 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded flex items-center justify-center">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-violet-500"
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
                          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {course.book?.title || "Course Book Title"}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            by {course.book?.author || "Author Name"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mt-4">
                        <span>{course.duration || "4 hours"}</span>
                        <span>Certificate</span>
                      </div>
                      <div className="mt-auto pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                        {course.isEnrolled && (
                          <div className="space-y-1 sm:space-y-2">
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="text-violet-600 font-medium">{course.progress || 0}%</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-violet-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                                style={{ width: `${course.progress || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/course-details/${course.slug}`}
                            className="text-violet-600 hover:text-violet-700 text-xs sm:text-sm font-medium flex items-center gap-1"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleCourseAction(course)}
                            disabled={enrollingCourseId === course._id}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 ${statusInfo.bgColor} text-white rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 sm:gap-2 disabled:opacity-70`}
                          >
                            {enrollingCourseId === course._id ? (
                              <>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Challenge Yourself</h2>
            </div>

            {/* Filters */}
            <div className="mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search quizzes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative">
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="appearance-none px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50 pr-8"
                      >
                        <option value="all">All Courses</option>
                        {dbCourses.map(course => (
                          <option key={course.slug} value={course.slug}>{course.title}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="appearance-none px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50 pr-8"
                      >
                        <option value="all">All Types</option>
                        <option value="course-exam">Final Exam</option>
                        <option value="chapter-quiz">Chapter Quiz</option>
                        <option value="lesson-quiz">Lesson Quiz</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredQuizzes.slice(0, visibleQuizzes).map((quiz) => (
                <div
                  key={quiz.id}
                  className="card hover-lift overflow-hidden group h-full"
                >
                  <div className="p-6 sm:p-8 bg-gradient-to-br from-fuchsia-50 to-pink-50 h-full flex flex-col">
                    <div className="flex items-start gap-3 sm:gap-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center transform rotate-6 shadow-sm transition-transform group-hover:rotate-0">
                        {quiz.type === 'course-exam' ? (
                          <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-fuchsia-600" />
                        ) : quiz.type === 'chapter-quiz' ? (
                          <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-fuchsia-600" />
                        ) : (
                          <BarChart className="w-6 h-6 sm:w-7 sm:h-7 text-fuchsia-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 truncate">
                          {quiz.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                          {quiz.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 sm:pt-8 space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{quiz.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{quiz.questionCount} Questions</span>
                        </div>
                      </div>

                      <div className="h-px bg-gray-100"></div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400"></div>
                          <span className="text-xs sm:text-sm text-gray-600">
                            {quiz.type === 'course-exam' ? 'Final Exam' : quiz.type === 'chapter-quiz' ? 'Chapter Quiz' : 'Lesson Quiz'}
                          </span>
                        </div>
                        <Link 
                          href="#"
                          onClick={(e) => handleQuizClick(e, quiz)}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-fuchsia-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-fuchsia-700 transition-colors"
                        >
                          {isChecking ? 'Checking...' : 'Take Quiz'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredQuizzes.length > visibleQuizzes && (
              <div className="mt-8 text-center">
                <button
                  onClick={showMoreQuizzes}
                  className="px-6 py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  Show More Quizzes
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {filteredQuizzes.length === 0 && (
              <div className="text-center py-8 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600">No quizzes found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
