"use client";
import { useEffect, useState } from "react";
import { BarChart, BookOpen, Trophy, Code, Zap, Target, Clock, ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar";

export default function Home() {
  // State management
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    Promise.all([
      fetch("/api/courses").then(res => res.json()),
      fetch("/api/quizzes").then(res => res.json())
    ])
      .then(([coursesData, quizzesData]) => {
        setCourses(Array.isArray(coursesData) ? coursesData : []);
        setQuizzes(Array.isArray(quizzesData) ? quizzesData : []);
        setIsLoading(false);
      })
      .catch(err => {
        setError("Failed to load content");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-secondary">Loading your dashboard...</p>
    </div>
  </div>;

  if (error) return <div className="text-center mt-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
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
                <Zap className="w-6 h-6 text-primary" />
                <span className="badge badge-primary">Today</span>
              </div>
              <div className="stats-value">2,450</div>
              <div className="stats-label">XP Earned</div>
            </div>
            
            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-6 h-6 text-accent" />
                <span className="badge badge-accent">Streak</span>
              </div>
              <div className="stats-value">7</div>
              <div className="stats-label">Days</div>
            </div>
            
            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-6 h-6 text-primary" />
                <span className="badge badge-primary">Completed</span>
              </div>
              <div className="stats-value">12</div>
              <div className="stats-label">Challenges</div>
            </div>
            
            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-6 h-6 text-accent" />
                <span className="badge badge-accent">Time</span>
              </div>
              <div className="stats-value">24h</div>
              <div className="stats-label">Learning Time</div>
            </div>
          </div>

          {/* Continue Learning Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">Continue Learning</h2>
              <button className="text-primary hover:text-primary-dark flex items-center gap-2 transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="card p-6 hover-lift">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-2">Design Patterns</h3>
                  <p className="text-secondary mb-4">Continue with Singleton Pattern implementation</p>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-secondary">45% Complete</span>
                    <span className="text-sm text-primary">25min left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">Featured Courses</h2>
              <button className="text-primary hover:text-primary-dark flex items-center gap-2 transition-colors">
                Browse Library <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="content-grid">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="card p-6 hover-lift">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-secondary">{course.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-secondary">8 Lessons</span>
                    <button className="text-primary hover:text-primary-dark text-sm font-medium">
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Quizzes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">Challenge Yourself</h2>
              <button className="text-primary hover:text-primary-dark flex items-center gap-2 transition-colors">
                All Quizzes <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="content-grid">
              {quizzes.slice(0, 3).map((quiz) => (
                <div key={quiz.id} className="card p-6 hover-lift">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{quiz.title}</h3>
                      <p className="text-sm text-secondary">{quiz.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-secondary">10 Questions</span>
                    <button className="text-primary hover:text-primary-dark text-sm font-medium">
                      Take Quiz
                    </button>
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
