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
  Users,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function AdminPanel() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [migrationStatus, setMigrationStatus] = useState(null);
  const [migrationLoading, setMigrationLoading] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showEnrolledModal, setShowEnrolledModal] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

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

  // Function to test migration (dry run)
  const handleTestMigration = async () => {
    setMigrationLoading(true);
    try {
      const response = await fetch('/api/admin/migrate-to-subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dryRun: true })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMigrationStatus({
          success: true,
          message: data.message,
          count: data.userCount
        });
      } else {
        setMigrationStatus({
          success: false,
          message: data.error || 'Failed to run migration test'
        });
      }
    } catch (error) {
      console.error('Error running migration test:', error);
      setMigrationStatus({
        success: false,
        message: error.message || 'An error occurred during the migration test'
      });
    } finally {
      setMigrationLoading(false);
    }
  };
  
  // Function to run actual migration
  const handleRunMigration = async () => {
    if (!confirm('Are you sure you want to migrate all users to the FREE tier? This cannot be undone.')) {
      return;
    }
    
    setMigrationLoading(true);
    try {
      const response = await fetch('/api/admin/migrate-to-subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dryRun: false })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMigrationStatus({
          success: true,
          message: data.message,
          count: data.affectedUsers
        });
      } else {
        setMigrationStatus({
          success: false,
          message: data.error || 'Failed to run migration'
        });
      }
    } catch (error) {
      console.error('Error running migration:', error);
      setMigrationStatus({
        success: false,
        message: error.message || 'An error occurred during the migration'
      });
    } finally {
      setMigrationLoading(false);
    }
  };

  // Function to run dev migration
  const handleDevMigration = async (dryRun = true) => {
    if (!dryRun && !confirm('Are you sure you want to migrate all users to the FREE tier? This cannot be undone.')) {
      return;
    }
    
    setMigrationLoading(true);
    try {
      const response = await fetch('/api/admin/dev-migrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dryRun })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMigrationStatus({
          success: true,
          message: data.message,
          count: dryRun ? data.userCount : data.affectedUsers
        });
      } else {
        setMigrationStatus({
          success: false,
          message: data.error || `Failed to run ${dryRun ? 'test' : ''} migration`
        });
      }
    } catch (error) {
      console.error('Error running migration:', error);
      setMigrationStatus({
        success: false,
        message: error.message || 'An error occurred during the migration'
      });
    } finally {
      setMigrationLoading(false);
    }
  };

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

      // Ensure all chapter quizzes have proper slugs
      updatedCourse.chapters = updatedCourse.chapters.map((chapter) => {
        const chapterWithSlug = {
          ...chapter,
          lessons: chapter.lessons.map((lesson) => ({
            ...lesson,
            slug: lesson.slug || generateSlug(lesson.title),
            endOfLessonQuiz: {
              ...lesson.endOfLessonQuiz,
              title: lesson.endOfLessonQuiz.title || `${lesson.title} Quiz`,
            },
          })),
        };

        // Always generate a new slug for chapter quiz to ensure consistency
        chapterWithSlug.endOfChapterQuiz = {
          ...chapter.endOfChapterQuiz,
          title: chapter.endOfChapterQuiz.title || `${chapter.title} Final Quiz`,
          slug: `${updatedCourse.slug}-chapter-${chapter.order}-quiz`,
        };

        return chapterWithSlug;
      });

      updatedCourse.endOfCourseExam = {
        ...updatedCourse.endOfCourseExam,
        title: updatedCourse.endOfCourseExam.title || "Final Course Exam",
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

  const fetchEnrolledStudents = async (course) => {
    try {
      setLoadingStudents(true);
      setSelectedCourse(course);
      
      const response = await fetch(`/api/admin/courses/${course._id}/enrolled`);
      
      if (response.ok) {
        const data = await response.json();
        setEnrolledStudents(data);
        setShowEnrolledModal(true);
      } else {
        const error = await response.json();
        setError(error.message || 'Failed to fetch enrolled students');
      }
    } catch (err) {
      setError('Failed to fetch enrolled students');
    } finally {
      setLoadingStudents(false);
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

          {/* Admin Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link
              href="/admin/users"
              className="card p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    User Management
                  </h3>
                  <p className="text-gray-500">Manage users and permissions</p>
                </div>
              </div>
            </Link>

            <div className="card p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Course Management
                  </h3>
                  <p className="text-gray-500">Create and edit courses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Management Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Subscription Management</h2>
                    </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Migrate Users to Free Tier</h3>
              <p className="text-gray-600 mb-4">
                This action will set all users without subscription data to the FREE tier.
                Run a dry run first to see how many users will be affected.
              </p>
              
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => handleDevMigration(true)}
                  disabled={migrationLoading}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                  {migrationLoading ? 'Processing...' : 'Test Migration (Dry Run)'}
                </button>
                
                <button
                  onClick={() => handleDevMigration(false)}
                  disabled={migrationLoading}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                  {migrationLoading ? 'Processing...' : 'Run Migration'}
                </button>
                    </div>
              
              {migrationStatus && (
                <div className={`p-4 rounded-md ${migrationStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <p className="font-medium">{migrationStatus.message}</p>
                  {migrationStatus.count !== undefined && (
                    <p className="mt-1">Affected users: {migrationStatus.count}</p>
                  )}
                  </div>
              )}
            </div>
          </div>

          {/* Course Management Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Course Management</h2>
            </div>
            
                    <button
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-6"
              onClick={handleCreateCourse}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </button>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Level</th>
                    <th className="py-3 px-4 text-left">Enrolled</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td className="py-3 px-4">
                        <Link 
                          href={`/course/${course.slug}`} 
                          className="text-blue-600 hover:underline"
                        >
                          {course.title}
                        </Link>
                      </td>
                      <td className="py-3 px-4 capitalize">{course.level}</td>
                      <td className="py-3 px-4">{course.enrolledCount || 0}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            className="flex items-center text-blue-600 hover:text-blue-800"
                            onClick={() => handleEditCourse(course)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            className="flex items-center text-red-600 hover:text-red-800 ml-4"
                            onClick={() => handleDeleteCourse(course._id)}
                          >
                            <Trash className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                          <button
                            className="flex items-center text-green-600 hover:text-green-800 ml-4"
                            onClick={() => fetchEnrolledStudents(course)}
                          >
                            <Users className="w-4 h-4 mr-1" />
                            Students
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                        No courses found. Create your first course!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
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

          {/* Enrolled Students Modal */}
          {showEnrolledModal && selectedCourse && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Students Enrolled in {selectedCourse.title}
                  </h2>
                  <button
                    onClick={() => setShowEnrolledModal(false)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {loadingStudents ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-secondary">Loading enrolled students...</p>
                  </div>
                ) : (
                  <>
                    {enrolledStudents.length === 0 ? (
                      <p className="text-center py-8 text-gray-500">No students enrolled in this course yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 text-left">Email</th>
                              <th className="py-3 px-4 text-left">Enrolled Date</th>
                              <th className="py-3 px-4 text-left">Progress</th>
                              <th className="py-3 px-4 text-left">Last Access</th>
                              <th className="py-3 px-4 text-left">Workplace</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {enrolledStudents.map((student) => (
                              <tr key={student.userId}>
                                <td className="py-3 px-4">{student.email}</td>
                                <td className="py-3 px-4">
                                  {new Date(student.progress.enrollmentDate).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                      <div 
                                        className="bg-blue-600 h-2.5 rounded-full" 
                                        style={{ width: `${student.progress.completionPercentage}%` }}
                                      ></div>
                                    </div>
                                    <span className="ml-2">{student.progress.completionPercentage}%</span>
                                  </div>
                                  {student.progress.completed && (
                                    <span className="inline-flex items-center text-xs text-green-600 mt-1">
                                      <CheckCircle className="w-3 h-3 mr-1" /> Completed
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-4">
                                  {student.progress.lastAccessDate 
                                    ? new Date(student.progress.lastAccessDate).toLocaleDateString()
                                    : 'Never'}
                                </td>
                                <td className="py-3 px-4">
                                  {student.workplace?.company || 'N/A'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
