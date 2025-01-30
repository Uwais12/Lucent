"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Plus,
  Edit,
  Trash,
  BookOpen,
  ChevronRight,
  Save,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Initial empty course template
  const emptyCourse = {
    title: "",
    slug: "",
    description: "",
    level: "beginner",
    tags: [],
    book: {
      title: "",
      author: "",
      coverUrl: "",
      amazonUrl: "",
    },
    chapters: [
      {
        title: "",
        description: "",
        order: 1,
        lessons: [
          {
            title: "",
            slug: "",
            description: "",
            order: 1,
            duration: 30,
            parts: [
              {
                title: "Introduction Part",
                content: "This is the introductory content.",
                order: 1,
                duration: 5,
              },
            ],
            endOfLessonQuiz: {
              title: "Lesson Quiz",
              description: "",
              duration: 15,
              passingScore: 70,
              questions: [],
            },
          },
        ],
        endOfChapterQuiz: {
          title: "Chapter Quiz",
          description: "",
          duration: 30,
          passingScore: 75,
          questions: [],
        },
      },
    ],
    prerequisites: [],
    learningOutcomes: [],
    estimatedDuration: 0,
    enrolledCount: 0,
    rating: {
      average: 0,
      count: 0,
    },
    endOfCourseExam: {
      title: "Final Course Exam",
      description: "",
      duration: 60,
      passingScore: 80,
      questions: [],
    },
  };
  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isLoaded && user?.id) {
        try {
          const response = await fetch("/api/profile");
          const data = await response.json();

          if (data.role !== "ADMIN") {
            router.push("/");
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          router.push("/");
        }
      } else if (isLoaded) {
        router.push("/");
      }
    };

    checkAdminStatus();
  }, [isLoaded, user, router]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/admin/courses");
        const data = await response.json();

        if (response.ok) {
          setCourses(data);
        } else {
          setError(data.error || "Failed to load courses");
        }
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user?.id) {
      fetchCourses();
    }
  }, [isLoaded, user]);

  const handleCreateCourse = () => {
    setEditingCourse(emptyCourse);
    setIsEditing(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsEditing(true);
  };

  const handleSaveCourse = async () => {
    try {
      const updatedCourse = { ...editingCourse };
      updatedCourse.slug = generateSlug(updatedCourse.title);

      updatedCourse.chapters = updatedCourse.chapters.map((chapter) => ({
        ...chapter,
        lessons: chapter.lessons.map((lesson) => ({
          ...lesson,
          slug: lesson.slug || generateSlug(lesson.title),
          endOfLessonQuiz: {
            ...lesson.endOfLessonQuiz,
            title: lesson.endOfLessonQuiz.title || `${lesson.title} Quiz`, // Add default title
          },
        })),
        endOfChapterQuiz: {
          ...chapter.endOfChapterQuiz,
          title:
            chapter.endOfChapterQuiz.title || `${chapter.title} Final Quiz`, // Add default title
        },
      }));

      updatedCourse.endOfCourseExam = {
        ...updatedCourse.endOfCourseExam,
        title: updatedCourse.endOfCourseExam.title || "Final Course Exam", // Add default title
      };

      const response = await fetch("/api/admin/courses", {
        method: editingCourse._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
      });

      const data = await response.json();

      if (response.ok) {
        setCourses((prevCourses) =>
          editingCourse._id
            ? prevCourses.map((c) => (c._id === editingCourse._id ? data : c))
            : [...prevCourses, data]
        );
        setIsEditing(false);
        setEditingCourse(null);
      } else {
        setError(data.error || "Failed to save course");
      }
    } catch (err) {
      setError("Failed to save course");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCourses((prevCourses) =>
          prevCourses.filter((c) => c._id !== courseId)
        );
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete course");
      }
    } catch (err) {
      setError("Failed to delete course");
    }
  };

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[\s]+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Admin Panel
                </h1>
                <div className="accent-bar"></div>
              </div>
              <button
                onClick={handleCreateCourse}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg flex items-center gap-2 hover:bg-violet-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Course
              </button>
            </div>
          </div>

          {/* Course List */}
          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course._id} className="card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {course.title}
                      </h3>
                      <p className="text-gray-500">{course.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingCourse._id ? "Edit Course" : "Create Course"}
                  </h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Course Form */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={editingCourse.title}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        value={editingCourse.slug}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            slug: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={editingCourse.description}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Level and Tags */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level *
                      </label>
                      <select
                        value={editingCourse.level}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            level: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        required
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={editingCourse.tags.join(", ")}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            tags: e.target.value
                              .split(",")
                              .map((tag) => tag.trim()),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="e.g., javascript, react, web"
                      />
                    </div>
                  </div>

                  {/* Book Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Book Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Book Title *
                        </label>
                        <input
                          type="text"
                          value={editingCourse.book.title}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              book: {
                                ...editingCourse.book,
                                title: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Author *
                        </label>
                        <input
                          type="text"
                          value={editingCourse.book.author}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              book: {
                                ...editingCourse.book,
                                author: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cover URL
                        </label>
                        <input
                          type="text"
                          value={editingCourse.book.coverUrl}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              book: {
                                ...editingCourse.book,
                                coverUrl: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amazon URL
                        </label>
                        <input
                          type="text"
                          value={editingCourse.book.amazonUrl}
                          onChange={(e) =>
                            setEditingCourse({
                              ...editingCourse,
                              book: {
                                ...editingCourse.book,
                                amazonUrl: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Prerequisites and Learning Outcomes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prerequisites (one per line)
                      </label>
                      <textarea
                        value={editingCourse.prerequisites.join("\n")}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            prerequisites: e.target.value
                              .split("\n")
                              .filter((p) => p.trim()),
                          })
                        }
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="Basic JavaScript knowledge&#10;Understanding of HTML/CSS&#10;Familiarity with React"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Learning Outcomes (one per line)
                      </label>
                      <textarea
                        value={editingCourse.learningOutcomes.join("\n")}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            learningOutcomes: e.target.value
                              .split("\n")
                              .filter((o) => o.trim()),
                          })
                        }
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="Build full-stack applications&#10;Implement authentication&#10;Deploy to production"
                      />
                    </div>
                  </div>

                  {/* Chapters */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Chapters
                      </h3>
                      <button
                        onClick={() =>
                          setEditingCourse({
                            ...editingCourse,
                            chapters: [
                              ...editingCourse.chapters,
                              {
                                title: "",
                                description: "",
                                order: editingCourse.chapters.length + 1,
                                lessons: [],
                                endOfChapterQuiz: {
                                  title: "",
                                  description: "",
                                  duration: 30,
                                  passingScore: 75,
                                  questions: [],
                                },
                              },
                            ],
                          })
                        }
                        className="px-3 py-1 bg-violet-100 text-violet-600 rounded-lg text-sm font-medium hover:bg-violet-200 transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add Chapter
                      </button>
                    </div>

                    {editingCourse.chapters.map((chapter, chapterIndex) => (
                      <div
                        key={chapterIndex}
                        className="border border-gray-200 rounded-lg p-4 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">
                            Chapter {chapterIndex + 1}
                          </h4>
                          <button
                            onClick={() => {
                              const newChapters = [...editingCourse.chapters];
                              newChapters.splice(chapterIndex, 1);
                              setEditingCourse({
                                ...editingCourse,
                                chapters: newChapters,
                              });
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Chapter Title *
                            </label>
                            <input
                              type="text"
                              value={chapter.title}
                              onChange={(e) => {
                                const newChapters = [...editingCourse.chapters];
                                newChapters[chapterIndex] = {
                                  ...chapter,
                                  title: e.target.value,
                                };
                                setEditingCourse({
                                  ...editingCourse,
                                  chapters: newChapters,
                                });
                              }}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Chapter Description *
                            </label>
                            <textarea
                              value={chapter.description}
                              onChange={(e) => {
                                const newChapters = [...editingCourse.chapters];
                                newChapters[chapterIndex] = {
                                  ...chapter,
                                  description: e.target.value,
                                };
                                setEditingCourse({
                                  ...editingCourse,
                                  chapters: newChapters,
                                });
                              }}
                              rows={2}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                              required
                            />
                          </div>

                          {/* Lessons */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-sm font-medium text-gray-700">
                                Lessons
                              </label>
                              <button
                                onClick={() => {
                                  const newChapters = [
                                    ...editingCourse.chapters,
                                  ];
                                  newChapters[chapterIndex] = {
                                    ...chapter,
                                    lessons: [
                                      ...chapter.lessons,
                                      {
                                        title: "",
                                        description: "",
                                        order: chapter.lessons.length + 1,
                                        duration: 30,
                                        parts: [],
                                        endOfLessonQuiz: {
                                          title: "",
                                          description: "",
                                          duration: 15,
                                          passingScore: 70,
                                          questions: [],
                                        },
                                      },
                                    ],
                                  };
                                  setEditingCourse({
                                    ...editingCourse,
                                    chapters: newChapters,
                                  });
                                }}
                                className="px-2 py-1 bg-violet-100 text-violet-600 rounded text-sm font-medium hover:bg-violet-200 transition-colors flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                Add Lesson
                              </button>
                            </div>

                            {chapter.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="border border-gray-200 rounded p-3 space-y-3"
                              >
                                <div className="flex items-center justify-between">
                                  <h5 className="text-sm font-medium text-gray-900">
                                    Lesson {lessonIndex + 1}
                                  </h5>
                                  <button
                                    onClick={() => {
                                      const newChapters = [
                                        ...editingCourse.chapters,
                                      ];
                                      newChapters[chapterIndex].lessons.splice(
                                        lessonIndex,
                                        1
                                      );
                                      setEditingCourse({
                                        ...editingCourse,
                                        chapters: newChapters,
                                      });
                                    }}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                  >
                                    <Trash className="w-3 h-3" />
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                  <input
                                    type="text"
                                    value={lesson.title}
                                    onChange={(e) => {
                                      const newChapters = [
                                        ...editingCourse.chapters,
                                      ];
                                      newChapters[chapterIndex].lessons[
                                        lessonIndex
                                      ] = {
                                        ...lesson,
                                        title: e.target.value,
                                      };
                                      setEditingCourse({
                                        ...editingCourse,
                                        chapters: newChapters,
                                      });
                                    }}
                                    placeholder="Lesson Title"
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    required
                                  />
                                  <textarea
                                    value={lesson.description}
                                    onChange={(e) => {
                                      const newChapters = [
                                        ...editingCourse.chapters,
                                      ];
                                      newChapters[chapterIndex].lessons[
                                        lessonIndex
                                      ] = {
                                        ...lesson,
                                        description: e.target.value,
                                      };
                                      setEditingCourse({
                                        ...editingCourse,
                                        chapters: newChapters,
                                      });
                                    }}
                                    placeholder="Lesson Description"
                                    rows={2}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    required
                                  />
                                  <div className="flex gap-3">
                                    <input
                                      type="number"
                                      value={lesson.duration}
                                      onChange={(e) => {
                                        const newChapters = [
                                          ...editingCourse.chapters,
                                        ];
                                        newChapters[chapterIndex].lessons[
                                          lessonIndex
                                        ] = {
                                          ...lesson,
                                          duration: parseInt(e.target.value),
                                        };
                                        setEditingCourse({
                                          ...editingCourse,
                                          chapters: newChapters,
                                        });
                                      }}
                                      placeholder="Duration (minutes)"
                                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Course Duration and Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Duration (minutes) *
                      </label>
                      <input
                        type="number"
                        value={editingCourse.estimatedDuration}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            estimatedDuration: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enrolled Count
                      </label>
                      <input
                        type="number"
                        value={editingCourse.enrolledCount}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            enrolledCount: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={editingCourse.rating.average}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            rating: {
                              ...editingCourse.rating,
                              average: parseFloat(e.target.value),
                            },
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveCourse}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save Course
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
