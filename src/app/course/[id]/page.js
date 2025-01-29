"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function Course() {
  const params = useParams();
  const courseId = params.id;
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLessons(data);
        } else {
          setLessons([]);
          console.error("Unexpected API response:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load lessons.");
        setLoading(false);
      });
  }, [courseId]);

  if (loading) return <p className="text-center mt-6">Loading lessons...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  // Format the course title from the ID (e.g., "system-design" => "system design")
  const formattedCourseTitle = courseId.replace("-", " ");

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 text-foreground capitalize">
              {formattedCourseTitle}
            </h1>
            <div className="accent-bar"></div>
            <p className="text-xl text-secondary">
              Select a lesson to start learning
            </p>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm list-none bg-white"
                >
                  <a
                    href={`/lesson/${lesson.id}`}
                    className="text-blue-600 text-lg font-semibold hover:underline"
                  >
                    {lesson.title}
                  </a>
                  <p className="text-gray-700 mt-1">{lesson.description}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No lessons found for this course.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
