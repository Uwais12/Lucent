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
            {course.chapters.map((chapter, chapterIndex) => (
              <div key={chapterIndex} className="card">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Chapter {chapterIndex + 1}: {chapter.title}
                    </h2>
                    <div className="text-sm text-secondary">
                      {chapter.completedLessons || 0}/{chapter.lessons.length} completed
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {chapter.lessons.map((lesson, lessonIndex) => {
                    const isLocked = !userProgress?.unlockedLessons?.includes(lesson._id);
                    const isCompleted = userProgress?.completedLessons?.includes(lesson._id);
                    const isCurrent = userProgress?.currentLesson === lesson._id;

                    return (
                      <div
                        key={lessonIndex}
                        className={`flex items-center justify-between p-4 ${
                          isLocked ? 'bg-gray-50' : 'hover:bg-gray-50 cursor-pointer'
                        } transition-colors`}
                        onClick={() => !isLocked && router.push(`/lesson/${lesson.slug}`)}
                      >
                        <div className="flex items-center gap-3">
                          {isLocked ? (
                            <Lock className="w-5 h-5 text-gray-400" />
                          ) : isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <PlayCircle className="w-5 h-5 text-violet-600" />
                          )}
                          <div>
                            <div className="text-gray-900 flex items-center gap-2">
                              {lesson.title}
                              {isCurrent && (
                                <span className="px-2 py-0.5 text-xs bg-violet-100 text-violet-600 rounded-full">
                                  Current Lesson
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {lesson.duration} min
                              {lesson.type === 'quiz' && ' • Quiz'}
                              {lesson.type === 'exercise' && ' • Exercise'}
                            </div>
                          </div>
                        </div>
                        {!isLocked && (
                          <div className="flex items-center gap-4">
                            {isCompleted ? (
                              <span className="text-sm text-emerald-600">Completed</span>
                            ) : isCurrent ? (
                              <span className="text-sm text-violet-600">Continue</span>
                            ) : (
                              <span className="text-sm text-gray-500">Start</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
