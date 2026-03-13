"use client";

import { useEffect, useState, Suspense, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  BarChart,
  BookOpen,
  Trophy,
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
  Gem,
  Flame,
  Search,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";

import Navbar from "./components/Navbar";
import XPNotification from "./components/XPNotification";
import { useEnrollmentCheck } from "@/hooks/useEnrollmentCheck";
import BadgeNotification from "./components/BadgeNotification";
import ProfileSetupModal from "@/components/ProfileSetupModal";
import { getDailyQuizLimit } from "@/lib/constants";

// ─── XP Notification Handler (reads URL params) ─────────────────────────────
function XPNotificationHandler() {
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [xpNotificationData, setXPNotificationData] = useState(null);
  const router = useRouter();

  let searchParams;
  try {
    searchParams = new URLSearchParams(window.location.search);
  } catch (e) {
    searchParams = { get: () => null };
  }

  useEffect(() => {
    if (searchParams.get("xpGained")) {
      const notificationData = {
        message: "Experience Earned!",
        courseId: searchParams.get("courseId"),
        xpGained: parseInt(searchParams.get("xpGained") || "0"),
        gemsGained: parseInt(searchParams.get("gemsGained") || "0"),
        levelUp: searchParams.get("levelUp") === "true",
        completionPercentage: parseInt(searchParams.get("completionPercentage") || "0"),
      };

      setXPNotificationData(notificationData);
      setShowXPNotification(true);

      setTimeout(() => {
        router.replace("/");
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

// ─── Loading Skeleton ────────────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0" />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome skeleton */}
          <div className="mb-10">
            <div className="shimmer h-10 w-72 rounded-lg mb-3" />
            <div className="shimmer h-5 w-48 rounded-lg" />
          </div>

          {/* Stat cards skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
                <div className="shimmer h-10 w-10 rounded-lg mb-3" />
                <div className="shimmer h-6 w-16 rounded mb-1.5" />
                <div className="shimmer h-3.5 w-20 rounded" />
              </div>
            ))}
          </div>

          {/* Course cards skeleton */}
          <div className="mb-10">
            <div className="shimmer h-7 w-40 rounded-lg mb-5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
                  <div className="flex gap-4 mb-4">
                    <div className="shimmer h-12 w-12 rounded-xl flex-shrink-0" />
                    <div className="flex-1">
                      <div className="shimmer h-5 w-full rounded mb-2" />
                      <div className="shimmer h-3.5 w-3/4 rounded" />
                    </div>
                  </div>
                  <div className="shimmer h-2 w-full rounded-full mb-4" />
                  <div className="shimmer h-9 w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
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
  const [badgeToNotify, setBadgeToNotify] = useState(null);
  const notifiedBadgeIds = useRef(new Set());
  const [visibleQuizzes, setVisibleQuizzes] = useState(6);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileSetupModalOpen, setIsProfileSetupModalOpen] = useState(false);

  // ─── Memoized Computed Values ────────────────────────────────────────────
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesCourse = selectedCourse === "all" || quiz.courseSlug === selectedCourse;
      const matchesType = selectedType === "all" || quiz.type === selectedType;
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCourse && matchesType && matchesSearch;
    });
  }, [quizzes, selectedCourse, selectedType, searchQuery]);

  const completedLessons = useMemo(
    () => userProfile?.progress?.completedLessons || 0,
    [userProfile]
  );

  const completedCourses = useMemo(
    () => userProfile?.progress?.completedCourses || 0,
    [userProfile]
  );

  const totalTimeSpent = useMemo(
    () => userProfile?.progress?.totalTimeSpent || 0,
    [userProfile]
  );

  const timeDisplay = useMemo(() => {
    const hours = Math.floor(totalTimeSpent / 60);
    const mins = totalTimeSpent % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }, [totalTimeSpent]);

  const enrolledCourses = useMemo(() => {
    if (!userProfile?.progress?.courses || !dbCourses?.length) return [];
    const userEnrolledCourseIds = new Map(
      userProfile.progress.courses.map((p) => [p.courseId.toString(), p])
    );
    return dbCourses
      .filter((course) => userEnrolledCourseIds.has(course._id.toString()))
      .map((course) => {
        const progressDetails = userEnrolledCourseIds.get(course._id.toString());
        return {
          ...course,
          isEnrolled: true,
          progress: progressDetails.completionPercentage || 0,
          completed: progressDetails.completed || false,
        };
      });
  }, [dbCourses, userProfile]);

  const exploreCourses = useMemo(() => {
    if (!userProfile?.progress?.courses || !dbCourses?.length) return dbCourses;
    const enrolledIds = new Set(
      userProfile.progress.courses.map((p) => p.courseId.toString())
    );
    return dbCourses.filter((course) => !enrolledIds.has(course._id.toString()));
  }, [dbCourses, userProfile]);

  const totalBadges = useMemo(() => {
    if (!userProfile) return 0;
    const profileBadges = userProfile.badges?.length || 0;
    const courseBadges =
      userProfile.progress?.courses?.reduce(
        (total, course) => total + (course.badges?.length || 0),
        0
      ) || 0;
    return profileBadges + courseBadges;
  }, [userProfile]);

  // ─── Callbacks ───────────────────────────────────────────────────────────
  const showMoreQuizzes = useCallback(() => {
    setVisibleQuizzes((prev) => prev + 6);
  }, []);

  const enrollInCourse = useCallback(
    async (courseId) => {
      if (enrollingCourseId) return;
      try {
        setEnrollingCourseId(courseId);
        const response = await fetch("/api/courses/enroll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId }),
        });
        if (response.ok) {
          const coursesRes = await fetch("/api/courses");
          const coursesData = await coursesRes.json();
          if (!coursesRes.ok) throw new Error("Failed to refresh courses");
          setDbCourses(coursesData);
          setCourses(coursesData);
          const profileRes = await fetch("/api/profile");
          const profileData = await profileRes.json();
          if (profileRes.ok) setUserProfile(profileData);
          toast.success("Successfully enrolled in course!");
        } else {
          const data = await response.json();
          throw new Error(data.error || "Failed to enroll in course");
        }
      } catch (err) {
        console.error("Error enrolling in course:", err);
        toast.error(`Failed to enroll: ${err.message}`);
      } finally {
        setEnrollingCourseId(null);
      }
    },
    [enrollingCourseId]
  );

  const getCourseStatusInfo = useCallback((course) => {
    if (!course.isEnrolled) {
      return {
        text: "Enroll Now",
        icon: <PlayCircle className="w-4 h-4" />,
        bgColor: "bg-brand-600 hover:bg-brand-700",
      };
    }
    if (course.completed) {
      return {
        text: "Completed",
        icon: <CheckCircle className="w-4 h-4" />,
        bgColor: "bg-emerald-600 hover:bg-emerald-700",
      };
    }
    return {
      text: "Continue",
      icon: <PlayCircle className="w-4 h-4" />,
      bgColor: "bg-brand-600 hover:bg-brand-700",
    };
  }, []);

  const handleCourseAction = useCallback(
    (course) => {
      if (!course.isEnrolled) {
        enrollInCourse(course._id);
      } else {
        router.push(`/course-details/${course.slug || course._id}`);
      }
    },
    [enrollInCourse, router]
  );

  const handleQuizClick = useCallback(
    async (e, quiz) => {
      e.preventDefault();
      if (isChecking) return;
      if (!quiz?.slug) {
        console.error("No quiz slug found");
        return;
      }
      if (!canTakeQuizToday) {
        toast.error("You've already completed a quiz today. Come back tomorrow for more!", {
          duration: 5000,
          position: "top-center",
        });
        return;
      }
      const isEnrolled = await checkEnrollment(quiz.slug, quiz.type);
      if (isEnrolled) {
        router.push(
          quiz.type === "course-exam"
            ? `/quiz/final/${quiz.slug}`
            : quiz.type === "chapter-quiz"
            ? `/quiz/chapter/${quiz.slug}`
            : `/quiz/${quiz.slug}`
        );
      }
    },
    [isChecking, canTakeQuizToday, checkEnrollment, router]
  );

  const handleProfileSetupModalClose = (updatedUserData) => {
    setIsProfileSetupModalOpen(false);
    if (updatedUserData) {
      setUserProfile((prev) => ({
        ...prev,
        ...updatedUserData,
        workplace: updatedUserData.workplace || prev.workplace,
      }));
      toast.success("Profile setup complete!");
    }
  };

  // ─── Effects ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) router.push("/sign-in");
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setIsLoading(true);

      let justEnrolled = false;
      try {
        const searchParams = new URLSearchParams(window.location.search);
        justEnrolled = searchParams.get("enrolled") === "true";
        if (justEnrolled) router.replace("/");
      } catch (e) {
        // Ignore errors with window/searchParams
      }

      const timestamp = justEnrolled ? Date.now() : "";
      const cacheParams = justEnrolled ? `?t=${timestamp}` : "";

      Promise.all([
        fetch(`/api/profile${cacheParams}`).then((res) => res.json()),
        fetch(`/api/courses${cacheParams}`).then((res) => res.json()),
        fetch("/api/quizzes", {
          cache: "no-store",
          next: { revalidate: 3600 },
        }).then((res) => res.json()),
      ])
        .then(([profileData, coursesData, quizzesData]) => {
          if (profileData.error) throw new Error(profileData.error);

          setUserProfile(profileData);
          setCourses(Array.isArray(coursesData) ? coursesData : []);
          setQuizzes(Array.isArray(quizzesData) ? quizzesData : []);
          setDbCourses(Array.isArray(coursesData) ? coursesData : []);

          if (profileData && !profileData.profileSetupComplete) {
            setIsProfileSetupModalOpen(true);
          }

          if (profileData.awardedBadges && profileData.awardedBadges.length > 0) {
            const firstNewBadge = profileData.awardedBadges[0];
            if (!notifiedBadgeIds.current.has(firstNewBadge.id)) {
              setBadgeToNotify(firstNewBadge);
              notifiedBadgeIds.current.add(firstNewBadge.id);
            }
          }

          if (profileData.lastQuizCompletion) {
            const maxDailyQuizzes = getDailyQuizLimit(profileData.subscription?.tier || 'FREE');
            const dailyQuizCount = profileData.dailyQuizCount || 0;
            setCanTakeQuizToday(dailyQuizCount < maxDailyQuizzes);
          } else {
            setCanTakeQuizToday(true);
          }

          if (profileData.streakStatus?.broken) {
            toast.error(
              `Your ${profileData.streakStatus.previousStreak}-day streak was broken! Start a new one today!`,
              { duration: 5000, position: "top-center" }
            );
          }

          if (justEnrolled) {
            toast.success("Course added to your dashboard!");
          }

          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Dashboard fetch error:", err);
          setError("Failed to load content");
          setIsLoading(false);
        });
    }
  }, [isLoaded, isSignedIn, router]);

  // Refresh profile when lastUpdate changes (e.g. after quiz completion)
  useEffect(() => {
    if (isSignedIn && lastUpdate && !isLoading) {
      fetch("/api/profile")
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch profile");
          return response.json();
        })
        .then((data) => {
          setUserProfile(data);

          if (data.awardedBadges && data.awardedBadges.length > 0) {
            const firstNewBadge = data.awardedBadges[0];
            if (!badgeToNotify && !notifiedBadgeIds.current.has(firstNewBadge.id)) {
              setBadgeToNotify(firstNewBadge);
              notifiedBadgeIds.current.add(firstNewBadge.id);
            } else if (
              badgeToNotify &&
              firstNewBadge.id !== badgeToNotify.id &&
              !notifiedBadgeIds.current.has(firstNewBadge.id)
            ) {
              setBadgeToNotify(firstNewBadge);
              notifiedBadgeIds.current.add(firstNewBadge.id);
            }
          }

          const maxDailyQuizzes = getDailyQuizLimit(data.subscription?.tier || 'FREE');
          const dailyQuizCount = data.dailyQuizCount || 0;
          setCanTakeQuizToday(dailyQuizCount < maxDailyQuizzes);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [isSignedIn, lastUpdate, isLoading]);

  // Listen for quiz completion events
  useEffect(() => {
    const handleQuizComplete = () => setLastUpdate(Date.now());
    window.addEventListener("quizCompleted", handleQuizComplete);
    return () => window.removeEventListener("quizCompleted", handleQuizComplete);
  }, []);

  // ─── Conditional Returns ─────────────────────────────────────────────────
  if (!isLoaded || isLoading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-background pattern-bg flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Something went wrong</h2>
          <p className="text-surface-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background pattern-bg flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-brand-500" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">No profile found</h2>
          <p className="text-surface-500">Please refresh the page or contact support.</p>
        </div>
      </div>
    );
  }

  // ─── Derived Values ──────────────────────────────────────────────────────
  const { xp = 0, gems = 0, dailyStreak = 0 } = userProfile || {};
  const isPro =
    userProfile?.subscription?.tier === "PRO" ||
    userProfile?.subscription?.tier === "ENTERPRISE";
  const maxDailyQuizzes = getDailyQuizLimit(userProfile?.subscription?.tier || 'FREE');
  const dailyQuizCount = userProfile?.dailyQuizCount || 0;
  const quizzesRemaining = Math.max(0, maxDailyQuizzes - dailyQuizCount);
  const canTakeAnyQuiz = quizzesRemaining > 0;
  const level = userProfile?.level || 1;

  // ─── Stat Card Config ────────────────────────────────────────────────────
  const statCards = [
    {
      label: "XP",
      value: xp.toLocaleString(),
      icon: Star,
      gradient: "from-brand-500 to-brand-600",
      bg: "bg-brand-50",
      text: "text-brand-600",
    },
    {
      label: "Gems",
      value: gems.toLocaleString(),
      icon: Gem,
      gradient: "from-sky-500 to-cyan-500",
      bg: "bg-sky-50",
      text: "text-sky-600",
    },
    {
      label: "Level",
      value: level,
      icon: Trophy,
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      label: "Streak",
      value: `${dailyStreak}d`,
      icon: Flame,
      gradient: "from-rose-500 to-pink-500",
      bg: "bg-rose-50",
      text: "text-rose-600",
    },
    {
      label: "Badges",
      value: totalBadges,
      icon: Award,
      gradient: "from-accent-500 to-accent-600",
      bg: "bg-accent-50",
      text: "text-accent-600",
    },
    {
      label: "Lessons",
      value: completedLessons,
      icon: CheckCircle,
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
  ];

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0" />

      {/* Profile Setup Modal */}
      {userProfile && (
        <ProfileSetupModal
          isOpen={isProfileSetupModalOpen}
          onClose={handleProfileSetupModalClose}
          currentUsername={userProfile.username || ""}
          currentCompanyName={userProfile.workplace?.company || ""}
          currentOccupation={userProfile.occupation || ""}
        />
      )}

      {/* Badge Notification Modal */}
      <BadgeNotification badge={badgeToNotify} onClose={() => setBadgeToNotify(null)} />

      <Suspense fallback={null}>
        <XPNotificationHandler />
      </Suspense>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* ── Welcome Section ─────────────────────────────────────────── */}
          <div className="mb-8 sm:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  Welcome back,{" "}
                  <span className="text-gradient">
                    {userProfile.username || "Developer"}
                  </span>
                </h1>
                <div className="accent-bar mb-3" />
                <p className="text-surface-500 text-base sm:text-lg">
                  Your journey to mastery continues
                </p>
              </div>

              {/* Daily Quiz Status - compact pill */}
              <div
                className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${
                  canTakeAnyQuiz
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <Target
                  className={`w-4 h-4 flex-shrink-0 ${
                    canTakeAnyQuiz ? "text-emerald-600" : "text-amber-600"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    canTakeAnyQuiz ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {canTakeAnyQuiz
                    ? isPro
                      ? "Unlimited quizzes"
                      : "Daily quiz available"
                    : "Quiz limit reached"}
                </span>
              </div>
            </div>
          </div>

          {/* ── Stat Cards ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="group card-elevated p-4 sm:p-5 relative overflow-hidden"
              >
                {/* Subtle gradient accent top */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${stat.text}`} />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-foreground leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-surface-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ── My Courses ──────────────────────────────────────────────── */}
          <section className="mb-10 sm:mb-14">
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <Bookmark className="w-5 h-5 text-brand-500" />
              <h2 className="section-title">My Courses</h2>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {enrolledCourses.map((course) => {
                  const statusInfo = getCourseStatusInfo(course);
                  return (
                    <div
                      key={course._id}
                      className="card-elevated overflow-hidden group h-full"
                    >
                      {/* Top gradient bar */}
                      <div className="h-1 bg-gradient-to-r from-brand-500 to-accent-500" />

                      <div className="p-5 sm:p-6 flex flex-col h-full">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                          <span className="badge badge-brand">
                            {course.chapters?.length || 0} Chapters
                          </span>
                          <span className="badge badge-success">
                            {course.difficulty || "Beginner"}
                          </span>
                          {course.completed && (
                            <span className="badge bg-emerald-100 text-emerald-700">
                              <CheckCircle className="w-3 h-3" />
                              Completed
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center flex-shrink-0 transform -rotate-3 transition-transform group-hover:rotate-0">
                            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <Link
                              href={`/course-details/${course.slug}`}
                              className="block hover:opacity-80 transition-opacity"
                            >
                              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 truncate">
                                {course.title}
                              </h3>
                              <p className="text-sm text-surface-500 line-clamp-2">
                                {course.description}
                              </p>
                            </Link>
                          </div>
                        </div>

                        {/* Book info */}
                        {course.book?.title && (
                          <div className="flex items-center gap-2.5 p-2.5 bg-brand-50/50 rounded-lg border border-brand-100 mb-4">
                            <div className="w-8 h-10 bg-gradient-to-br from-brand-100 to-accent-100 rounded flex items-center justify-center flex-shrink-0">
                              <BookOpen className="w-4 h-4 text-brand-500" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[11px] font-medium text-brand-600 uppercase tracking-wider">
                                Based on
                              </div>
                              <div className="text-xs sm:text-sm font-medium text-foreground truncate">
                                {course.book.title}
                              </div>
                              {course.book.author && (
                                <div className="text-[11px] text-surface-400">
                                  by {course.book.author}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Progress & Actions */}
                        <div className="mt-auto space-y-3">
                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                              <span className="text-surface-500">Progress</span>
                              <span className="font-semibold text-brand-600">
                                {course.progress || 0}%
                              </span>
                            </div>
                            <div className="progress-bar">
                              <div
                                className="progress-bar-fill"
                                style={{ width: `${course.progress || 0}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <Link
                              href={`/course-details/${course.slug}`}
                              className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center gap-1 transition-colors"
                            >
                              Details
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleCourseAction(course)}
                              className={`px-3.5 py-2 ${statusInfo.bgColor} text-white rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5`}
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
              <div className="card-elevated p-8 sm:p-12 text-center">
                <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-7 h-7 text-brand-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No courses enrolled yet
                </h3>
                <p className="text-surface-500 mb-6 max-w-sm mx-auto">
                  Explore our courses below and enroll to start your learning journey.
                </p>
                <a href="#explore-courses" className="btn-primary">
                  <ArrowRight className="w-4 h-4" />
                  Browse Courses
                </a>
              </div>
            )}
          </section>

          {/* ── Explore Courses ──────────────────────────────────────────── */}
          <section className="mb-10 sm:mb-14" id="explore-courses">
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <Sparkles className="w-5 h-5 text-accent-500" />
              <h2 className="section-title">Explore Courses</h2>
            </div>

            {exploreCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {exploreCourses.map((course) => (
                  <div
                    key={course._id}
                    className="card-elevated overflow-hidden group h-full"
                  >
                    <div className="h-1 bg-gradient-to-r from-accent-400 to-brand-400 opacity-60" />

                    <div className="p-5 sm:p-6 flex flex-col h-full">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                        <span className="badge badge-brand">
                          {course.chapters?.length || 0} Chapters
                        </span>
                        <span className="badge badge-success">
                          {course.difficulty || "Beginner"}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent-100 to-brand-100 flex items-center justify-center flex-shrink-0 transform rotate-3 transition-transform group-hover:rotate-0">
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/course-details/${course.slug}`}
                            className="block hover:opacity-80 transition-opacity"
                          >
                            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 truncate">
                              {course.title}
                            </h3>
                            <p className="text-sm text-surface-500 line-clamp-2">
                              {course.description}
                            </p>
                          </Link>
                        </div>
                      </div>

                      {/* Book info */}
                      {course.book?.title && (
                        <div className="flex items-center gap-2.5 p-2.5 bg-accent-50/50 rounded-lg border border-accent-100 mb-4">
                          <div className="w-8 h-10 bg-gradient-to-br from-accent-100 to-brand-100 rounded flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-4 h-4 text-accent-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-medium text-accent-600 uppercase tracking-wider">
                              Based on
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-foreground truncate">
                              {course.book.title}
                            </div>
                            {course.book.author && (
                              <div className="text-[11px] text-surface-400">
                                by {course.book.author}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Meta & Enroll */}
                      <div className="mt-auto space-y-3">
                        <div className="flex items-center justify-between text-xs text-surface-500">
                          <span>{course.duration || "4 hours"}</span>
                          <span>Certificate</span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <Link
                            href={`/course-details/${course.slug}`}
                            className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center gap-1 transition-colors"
                          >
                            Details
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => enrollInCourse(course._id)}
                            disabled={enrollingCourseId === course._id}
                            className="px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 disabled:opacity-70"
                          >
                            {enrollingCourseId === course._id ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Enrolling...
                              </>
                            ) : (
                              <>
                                <PlayCircle className="w-4 h-4" />
                                Enroll Now
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-elevated p-8 text-center">
                <div className="w-14 h-14 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-accent-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  You are enrolled in all courses
                </h3>
                <p className="text-surface-500 max-w-sm mx-auto">
                  Great job! Keep learning and completing your enrolled courses.
                </p>
              </div>
            )}
          </section>

          {/* ── Quiz Section ─────────────────────────────────────────────── */}
          <section>
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <Target className="w-5 h-5 text-accent-500" />
              <h2 className="section-title">Challenge Yourself</h2>
            </div>

            {/* Filters */}
            <div className="card-elevated p-4 sm:p-5 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-surface-50 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all"
                  />
                </div>

                {/* Course filter */}
                <div className="relative">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full sm:w-48 appearance-none pl-4 pr-9 py-2.5 bg-surface-50 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all"
                  >
                    <option value="all">All Courses</option>
                    {dbCourses.map((course) => (
                      <option key={course.slug} value={course.slug}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
                </div>

                {/* Type filter */}
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full sm:w-44 appearance-none pl-4 pr-9 py-2.5 bg-surface-50 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all"
                  >
                    <option value="all">All Types</option>
                    <option value="course-exam">Final Exam</option>
                    <option value="chapter-quiz">Chapter Quiz</option>
                    <option value="lesson-quiz">Lesson Quiz</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Quiz Grid */}
            {filteredQuizzes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredQuizzes.slice(0, visibleQuizzes).map((quiz) => (
                    <div
                      key={quiz.id}
                      className="card-elevated overflow-hidden group h-full"
                    >
                      <div className="h-1 bg-gradient-to-r from-accent-400 to-pink-400 opacity-60" />

                      <div className="p-5 sm:p-6 flex flex-col h-full">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent-100 to-pink-100 flex items-center justify-center flex-shrink-0 transform rotate-3 transition-transform group-hover:rotate-0">
                            {quiz.type === "course-exam" ? (
                              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                            ) : quiz.type === "chapter-quiz" ? (
                              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                            ) : (
                              <BarChart className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 truncate">
                              {quiz.title}
                            </h3>
                            <p className="text-sm text-surface-500 line-clamp-2">
                              {quiz.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-auto pt-5 space-y-3">
                          <div className="flex items-center gap-4 text-xs sm:text-sm text-surface-500">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {quiz.duration} min
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5" />
                              {quiz.questionCount} Qs
                            </span>
                          </div>

                          <div className="section-divider" />

                          <div className="flex items-center justify-between">
                            <span className="badge badge-info">
                              {quiz.type === "course-exam"
                                ? "Final Exam"
                                : quiz.type === "chapter-quiz"
                                ? "Chapter Quiz"
                                : "Lesson Quiz"}
                            </span>
                            <Link
                              href="#"
                              onClick={(e) => handleQuizClick(e, quiz)}
                              className="px-3.5 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5"
                            >
                              {isChecking ? (
                                <>
                                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Checking...
                                </>
                              ) : (
                                <>
                                  <Zap className="w-3.5 h-3.5" />
                                  Take Quiz
                                </>
                              )}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More */}
                {filteredQuizzes.length > visibleQuizzes && (
                  <div className="mt-8 text-center">
                    <button onClick={showMoreQuizzes} className="btn-secondary">
                      Show More Quizzes
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="card-elevated p-8 sm:p-12 text-center">
                <div className="w-14 h-14 bg-surface-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-surface-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No quizzes found
                </h3>
                <p className="text-surface-500 max-w-sm mx-auto">
                  Try adjusting your filters or search to find what you are looking for.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
