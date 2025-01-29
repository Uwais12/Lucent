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
                <Zap className="w-6 h-6" style={{ color: '#F59E0B' }} />
                <span className="badge badge-primary">Today</span>
              </div>
              <div className="stats-value">2,450</div>
              <div className="stats-label">XP Earned</div>
            </div>
            
            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-6 h-6" style={{ color: '#EC4899' }} />
                <span className="badge badge-accent">Streak</span>
              </div>
              <div className="stats-value">7</div>
              <div className="stats-label">Days</div>
            </div>
            
            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-6 h-6" style={{ color: '#F7B955' }} />
                <span className="badge badge-primary">Completed</span>
              </div>
              <div className="stats-value">12</div>
              <div className="stats-label">Challenges</div>
            </div>
            
            <div className="stats-card hover-lift">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-6 h-6" style={{ color: '#06B6D4' }} />
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
            <div className="card p-8 hover-lift bg-gradient-to-br from-white to-slate-50">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Column - Course Info */}
                <div className="flex-shrink-0 lg:w-1/3 w-full space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center transform rotate-3">
                      <Code className="w-6 h-6" style={{ color: '#8B5CF6' }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-violet-600">Currently Learning</div>
                      <h3 className="text-xl font-bold text-gray-900">Design Patterns</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" style={{ color: '#059669' }} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Current Chapter</div>
                        <div className="text-sm text-gray-600">Singleton Pattern Implementation</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Clock className="w-4 h-4" style={{ color: '#D97706' }} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Time Remaining</div>
                        <div className="text-sm text-gray-600">25 minutes</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Progress */}
                <div className="lg:w-2/3 w-full">
                  <div className="space-y-2 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Course Progress</span>
                      <span className="text-sm font-semibold text-violet-600">45%</span>
                    </div>
                    <div className="progress-bar h-4 bg-violet-100 rounded-full">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>4/9 Chapters</span>
                      <span>6 hours total</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-violet-200">
                      Continue Learning
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2.5 border border-violet-200 text-violet-600 rounded-xl font-medium hover:bg-violet-50 transition-all duration-200 flex items-center justify-center gap-2">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">Featured Courses</h2>
              <button className="text-violet-600 hover:text-violet-700 flex items-center gap-2 transition-colors">
                Browse Library <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="content-grid">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="card hover-lift overflow-hidden group h-full">
                  <div className="p-8 bg-gradient-to-br from-violet-50 to-fuchsia-50 h-full flex flex-col">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center transform -rotate-6 shadow-sm transition-transform group-hover:rotate-0">
                        <BookOpen className="w-7 h-7" style={{ color: '#8B5CF6' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-xs font-medium">
                            8 Lessons
                          </span>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-medium">
                            Beginner
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{course.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-8 space-y-4">
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" style={{ color: '#6B7280' }} />
                          <span>4 hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" style={{ color: '#6B7280' }} />
                          <span>Certificate</span>
                        </div>
                      </div>
                      
                      <div className="h-px bg-gray-100"></div>
                      
                      <div className="flex items-center justify-between">
                        <button className="text-violet-600 hover:text-violet-700 text-sm font-medium flex items-center gap-1">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">
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
                <div key={quiz.id} className="card hover-lift overflow-hidden group h-full">
                  <div className="p-8 bg-gradient-to-br from-fuchsia-50 to-pink-50 h-full flex flex-col">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center transform rotate-6 shadow-sm transition-transform group-hover:rotate-0">
                        <BarChart className="w-7 h-7" style={{ color: '#EC4899' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-600 rounded-full text-xs font-medium">
                            10 Questions
                          </span>
                          <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-xs font-medium">
                            15 mins
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{quiz.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{quiz.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-8 space-y-4">
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" style={{ color: '#6B7280' }} />
                          <span>50 XP</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" style={{ color: '#6B7280' }} />
                          <span>Streak +2</span>
                        </div>
                      </div>
                      
                      <div className="h-px bg-gray-100"></div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          <span className="text-sm text-gray-600">Available Now</span>
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
