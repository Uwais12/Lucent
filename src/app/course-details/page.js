"use client";
import { useState } from 'react';
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
  Star
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function CourseDetails() {
  // Hardcoded course data
  const course = {
    title: "Design Patterns",
    description: "Master software design patterns with real-world examples and practical implementations. Learn how to write maintainable, scalable, and robust code using proven object-oriented design principles.",
    book: {
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
      author: "Gang of Four",
      coverUrl: "/book-cover.jpg"
    },
    stats: {
      enrolled: 2453,
      totalLessons: 13,
      rating: 4.8
    },
    prerequisites: [
      "Basic understanding of Object-Oriented Programming",
      "Familiarity with at least one OOP language (Java, C++, Python)",
      "Understanding of basic software development principles"
    ],
    outcomes: [
      "Implement all 23 Gang of Four design patterns",
      "Identify which patterns to use in different scenarios",
      "Apply SOLID principles in pattern implementation",
      "Create maintainable and scalable software architectures"
    ],
    chapters: [
      {
        title: "Creational Patterns",
        lessons: [
          { title: "Singleton Pattern", duration: "45 min", completed: true },
          { title: "Factory Method Pattern", duration: "50 min", completed: true },
          { title: "Abstract Factory Pattern", duration: "55 min", completed: false },
          { type: "game", title: "Pattern Matching Challenge", duration: "15 min", completed: false },
          { title: "Builder Pattern", duration: "45 min", completed: false },
          { title: "Prototype Pattern", duration: "40 min", completed: false },
          { type: "quiz", title: "Creational Patterns Quiz", duration: "30 min", completed: false }
        ]
      },
      {
        title: "Structural Patterns",
        lessons: [
          { title: "Adapter Pattern", duration: "45 min", completed: false },
          { title: "Bridge Pattern", duration: "50 min", completed: false },
          { title: "Composite Pattern", duration: "45 min", completed: false },
          { type: "game", title: "Structure Builder Game", duration: "15 min", completed: false },
          { title: "Decorator Pattern", duration: "55 min", completed: false },
          { type: "quiz", title: "Structural Patterns Quiz", duration: "30 min", completed: false }
        ]
      },
      {
        title: "Behavioral Patterns",
        lessons: [
          { title: "Observer Pattern", duration: "50 min", completed: false },
          { title: "Strategy Pattern", duration: "45 min", completed: false },
          { title: "Command Pattern", duration: "45 min", completed: false },
          { type: "game", title: "Pattern Flow Challenge", duration: "15 min", completed: false },
          { title: "State Pattern", duration: "40 min", completed: false },
          { type: "quiz", title: "Behavioral Patterns Quiz", duration: "30 min", completed: false }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 text-sm text-violet-600 mb-4">
              <span>Courses</span>
              <ChevronRight className="w-4 h-4" />
              <span>Design Patterns</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-lg text-gray-600 max-w-3xl">{course.description}</p>
              </div>
              <div>
                <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-200 flex items-center gap-2 shadow-md shadow-violet-200">
                  <PlayCircle className="w-5 h-5" />
                  Start Learning
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Based on the Book</h3>
                  <div className="flex gap-6">
                    <div className="w-24 h-32 bg-violet-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-violet-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{course.book.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">by {course.book.author}</p>
                      <button className="mt-4 text-sm text-violet-600 hover:text-violet-700 font-medium">
                        View on Amazon
                      </button>
                    </div>
                  </div>
                </div>

                {/* Prerequisites and Learning Outcomes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Prerequisites */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Prerequisites</h3>
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">What You&apos;ll Learn</h3>
                    <ul className="space-y-3">
                      {course.outcomes.map((outcome, index) => (
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                <div className="space-y-6">
                  {course.chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className="card">
                      <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Chapter {chapterIndex + 1}: {chapter.title}
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                              lesson.type === 'game' ? 'bg-amber-50' : 
                              lesson.type === 'quiz' ? 'bg-violet-50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {lesson.type === 'game' ? (
                                <div className="w-5 h-5 text-amber-500">
                                  <Trophy className="w-5 h-5" />
                                </div>
                              ) : lesson.type === 'quiz' ? (
                                <div className="w-5 h-5 text-violet-500">
                                  <GraduationCap className="w-5 h-5" />
                                </div>
                              ) : lesson.completed ? (
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                              ) : (
                                <Lock className="w-5 h-5 text-gray-400" />
                              )}
                              <div>
                                <span className="text-gray-900">{lesson.title}</span>
                                {(lesson.type === 'game' || lesson.type === 'quiz') && (
                                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white">
                                    {lesson.type === 'game' ? 'Mini-Game' : 'Chapter Quiz'}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500">{lesson.duration}</span>
                              <button className={`hover:text-violet-700 ${
                                lesson.type === 'game' ? 'text-amber-500' :
                                lesson.type === 'quiz' ? 'text-violet-500' :
                                'text-violet-600'
                              }`}>
                                <PlayCircle className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Progress */}
            <div className="space-y-6">
              {/* Course Stats */}
              <div className="grid grid-cols-1 gap-4">
                <div className="card p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-gray-900">{course.stats.enrolled.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Students Enrolled</div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-gray-900">{course.stats.totalLessons}</div>
                      <div className="text-sm text-gray-500">Total Lessons</div>
                    </div>
                  </div>
                </div>
                
                <div className="card p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-gray-900">{course.stats.rating}</div>
                      <div className="text-sm text-gray-500">Course Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Course Progress</span>
                    <span className="text-violet-600 font-medium">15%</span>
                  </div>
                  <div className="progress-bar h-3 bg-violet-100 rounded-full">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      style={{ width: '15%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>2/13 Lessons</span>
                    <span>6 hours left</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-violet-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">125 XP</div>
                      <div className="text-gray-500">Earned so far</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">2 Chapters</div>
                      <div className="text-gray-500">Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 