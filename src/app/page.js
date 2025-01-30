"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";

import Navbar from "./components/Navbar";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [dbCourses, setDbCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

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
                <span className="badge badge-primary">Today</span>
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
                <Trophy className="w-6 h-6" style={{ color: "#F7B955" }} />
                <span className="badge badge-primary">Completed</span>
              </div>
              <div className="stats-value">12</div>
              <div className="stats-label">Challenges</div>
            </div>

            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-6 h-6" style={{ color: "#06B6D4" }} />
                <span className="badge badge-accent">Time</span>
              </div>
              <div className="stats-value">24h</div>
              <div className="stats-label">Learning Time</div>
            </div>
          </div>

          {/* All Courses from DB */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">All Courses</h2>
            </div>
            <div className="content-grid">
              {dbCourses.map((course) => (
                <div
                  key={course.id}
                  className="card hover-lift overflow-hidden group h-full"
                >
                  <div className="p-4 bg-gradient-to-br from-violet-50 to-fuchsia-50 h-full flex flex-col">
                    <div className="mb-6 flex items-center gap-3 text-sm">
                      <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full">
                        8 Lessons
                      </span>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full">
                        Beginner
                      </span>
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
                      <span>4 hours</span>
                      <span>Certificate</span>
                    </div>
                    <div className="mt-auto pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/course-details/${course.slug}`}
                          className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center gap-1"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() =>
                            router.push(`/course-details/${course.slug}`)
                          }
                          className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
                        >
                          Start Learning
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
