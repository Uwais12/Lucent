"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/app/components/Navbar";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";

export default function Course() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const courseId = params.id;
  const [course, setCourse] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      try {
        setLoading(true);
        // Fetch course details
        const courseRes = await fetch(`/api/courses/${courseId}`);
        const courseData = await courseRes.json();
        
        if (!courseRes.ok) {
          throw new Error(courseData.error || 'Failed to load course');
        }
        
        setCourse(courseData);

        // Fetch user progress if logged in
        if (isLoaded && user) {
          const progressRes = await fetch(`/api/courses/${courseId}/progress`);
          const progressData = await progressRes.json();
          
          if (progressRes.ok) {
            setUserProgress(progressData);
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load course data.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseAndProgress();
    }
  }, [courseId, isLoaded, user]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-secondary">Loading course content...</p>
      </div>
    </div>
  );
  
  if (error) return <div className="text-center mt-6 text-red-500">{error}</div>;
  if (!course) return <div className="text-center mt-6">Course not found</div>;

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              {course.title}
            </h1>
            <div className="flex items-center gap-4 text-secondary">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>{userProgress?.completedLessons || 0}/{course.totalLessons} lessons completed</span>
              </div>
              {userProgress?.lastAccessDate && (
                <div>Last accessed {new Date(userProgress.lastAccessDate).toLocaleDateString()}</div>
              )}
            </div>
          </div>

          {/* Course Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-secondary">Overall Progress</span>
              <span className="text-violet-600 font-medium">{userProgress?.progress || 0}%</span>
            </div>
            <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-300"
                style={{ width: `${userProgress?.progress || 0}%` }}
              ></div>
            </div>
          </div>

          {/* Chapters and Lessons */}
          <div className="space-y-8">
            {course && course.chapters ? (
              // If course has chapters property, render them
              course.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className="card">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Chapter {chapterIndex + 1}: {chapter.title}
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                              {userProgress?.completedLessons?.includes(lesson._id) ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <span className="text-violet-600 font-medium">{lessonIndex + 1}</span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                              <p className="text-sm text-gray-500">{lesson.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => router.push(`/lesson/${lesson.slug}`)}
                            className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2"
                          >
                            <PlayCircle className="w-4 h-4" />
                            Start Lesson
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // If course is an array of lessons (from the API), render them directly
              Array.isArray(course) && course.map((lesson, index) => (
                <div 
                  key={index}
                  className="card p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                        <span className="text-violet-600 font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-lg">{lesson.title}</h3>
                        <p className="text-gray-500">{lesson.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/lesson/${lesson.id}`)}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Start Lesson
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
