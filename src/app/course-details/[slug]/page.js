"use client";

import { useState, useEffect } from "react";
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

export default function CourseDetails() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
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
          setCourse(data);
          // Check if user is enrolled
          if (isLoaded && user) {
            const userResponse = await fetch("/api/profile");
            const userData = await userResponse.json();
            const enrolled = userData.progress?.courses?.some(
              (c) => c.courseId === data._id
            );
            setIsEnrolled(enrolled);
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
                  onClick={handleEnrollClick}
                  className={`px-6 py-3 bg-gradient-to-r ${
                    isEnrolled
                      ? "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      : "from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
                  } text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-md shadow-violet-200`}
                  disabled={enrolling}
                >
                  {enrolling ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white" />
                  ) : (
                    <>
                      {isEnrolled ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <PlayCircle className="w-5 h-5" />
                      )}
                      {isEnrolled ? "Enrolled" : "Start Learning"}
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
                          <Link
                            key={lessonIndex}
                            href={`/lesson/${lesson.slug}`}
                            className="block"
                          >
                            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                              <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-gray-400" />
                                <div>
                                  <span className="text-gray-900">
                                    {lesson.title}
                                  </span>
                                  <div className="text-sm text-gray-500">
                                    {lesson.description}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500">
                                  {lesson.duration} min
                                </span>
                                <PlayCircle className="w-5 h-5 text-violet-600" />
                              </div>
                            </div>
                          </Link>
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
                      <div className="text-2xl font-semibold text-gray-900">
                        {course.enrolledCount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Students Enrolled
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-gray-900">
                        {course.chapters.reduce(
                          (total, chapter) => total + chapter.lessons.length,
                          0
                        )}
                      </div>
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
                      <div className="text-2xl font-semibold text-gray-900">
                        {course.rating.average}
                      </div>
                      <div className="text-sm text-gray-500">Course Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Course Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-violet-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {course.estimatedDuration} minutes
                      </div>
                      <div className="text-gray-500">Total Duration</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {course.chapters.length} Chapters
                      </div>
                      <div className="text-gray-500">Course Structure</div>
                    </div>
                  </div>
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
