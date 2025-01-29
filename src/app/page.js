"use client";
import { useEffect, useState } from "react";
import { BarChart, BookOpen, Trophy, Code } from "lucide-react";
import Navbar from "./components/Navbar";

export default function Home() {
  // State for courses
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState(null);

  // State for quizzes
  const [quizzes, setQuizzes] = useState([]);
  const [quizzesLoading, setQuizzesLoading] = useState(true);
  const [quizzesError, setQuizzesError] = useState(null);

  // Collapsible toggles
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showAllQuizzes, setShowAllQuizzes] = useState(false);

  // Fetch courses
  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setCourses([]);
          console.error("Unexpected API response:", data);
        }
        setCoursesLoading(false);
      })
      .catch((err) => {
        setCoursesError("Failed to load courses.");
        setCoursesLoading(false);
      });
  }, []);

  // Fetch quizzes
  useEffect(() => {
    fetch("/api/quizzes")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setQuizzes(data);
        } else {
          setQuizzes([]);
          console.error("Unexpected Quiz API response:", data);
        }
        setQuizzesLoading(false);
      })
      .catch((err) => {
        setQuizzesError("Failed to load quizzes.");
        setQuizzesLoading(false);
      });
  }, []);

  // Handle loading states & errors
  if (coursesLoading && quizzesLoading) {
    return <p className="text-center mt-6">Loading content...</p>;
  }
  if (coursesError) {
    return <p className="text-center mt-6 text-red-500">{coursesError}</p>;
  }
  if (quizzesError) {
    return <p className="text-center mt-6 text-red-500">{quizzesError}</p>;
  }

  // Decide how many items to show if not expanded
  const visibleCourses = showAllCourses ? courses : courses.slice(0, 3);
  const visibleQuizzes = showAllQuizzes ? quizzes : quizzes.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header / Welcome */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Welcome back, Developer
            </h1>
            <div className="accent-bar"></div>
            <p className="text-xl text-secondary">
              Your journey to mastery continues
            </p>
          </div>

          {/* Optionally show a Resume card if user has progress */}
          {/*
          <div className="mb-8">
            <div className="card p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Resume Your Last Lesson
                </h2>
                <p className="text-sm text-secondary mt-1">
                  Continue where you left off in "Singleton Pattern"
                </p>
              </div>
              <a
                href="/lesson/singleton"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Resume
              </a>
            </div>
          </div>
          */}

          {/* Progress & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Progress Card */}
            <div className="card p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
                <Trophy className="mr-2 text-yellow-500" />
                Your Progress
              </h2>
              <div className="space-y-6">
                {/* Example: Design Patterns progress */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-secondary">
                      Design Patterns
                    </span>
                    <span className="text-sm font-medium text-primary">
                      25%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)",
                        width: "25%",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Example: System Design progress */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-secondary">
                      System Design
                    </span>
                    <span className="text-sm font-medium text-primary">
                      40%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--accent) 0%, var(--info) 100%)",
                        width: "40%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="card p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
                <BarChart className="mr-2 text-purple-500" />
                Your Stats
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-card-background colorful-border text-center">
                  <p className="text-3xl font-bold text-primary">6</p>
                  <p className="text-sm text-secondary mt-1">
                    Lessons Completed
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card-background colorful-border text-center">
                  <p className="text-3xl font-bold text-accent">2</p>
                  <p className="text-sm text-secondary mt-1">
                    Quizzes Completed
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card-background colorful-border text-center">
                  <p className="text-3xl font-bold text-info">3</p>
                  <p className="text-sm text-secondary mt-1">Day Streak</p>
                </div>
                <div className="p-4 rounded-lg bg-card-background colorful-border text-center">
                  <p className="text-3xl font-bold text-gradient">90%</p>
                  <p className="text-sm text-secondary mt-1">Accuracy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
            <BookOpen className="mr-2 text-blue-500" />
            Continue Learning
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {visibleCourses.length > 0 ? (
              visibleCourses.map((course) => (
                <li
                  key={course.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm list-none bg-white"
                >
                  <a
                    href={`/course/${course.id}`}
                    className="text-blue-600 text-lg font-semibold hover:underline"
                  >
                    {course.title}
                  </a>
                  <p className="text-gray-700 mt-1">{course.description}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No courses available.</p>
            )}
          </div>
          {courses.length > 3 && (
            <div className="mb-12">
              <button
                onClick={() => setShowAllCourses(!showAllCourses)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {showAllCourses ? "Show Less" : "Show All Courses"}
              </button>
            </div>
          )}

          {/* Quizzes Section */}
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
            <Code className="mr-2 text-green-500" />
            Test Your Knowledge
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {visibleQuizzes.length > 0 ? (
              visibleQuizzes.map((quiz) => (
                <li
                  key={quiz.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm list-none bg-white"
                >
                  <a
                    href={`/quiz/${quiz.id}`}
                    className="text-blue-600 text-lg font-semibold hover:underline"
                  >
                    {quiz.title}
                  </a>
                  <p className="text-gray-700 mt-1">{quiz.description}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No quizzes available.</p>
            )}
          </div>
          {quizzes.length > 3 && (
            <div className="mb-12">
              <button
                onClick={() => setShowAllQuizzes(!showAllQuizzes)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {showAllQuizzes ? "Show Less" : "Show All Quizzes"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
