import mongoose from "mongoose";

// Schema for interactive exercises within lesson parts
const ExerciseSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "drag-and-drop",
      "fill-in-blanks",
      "multiple-choice",
      "code-challenge",
    ],
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: {
    type: mongoose.Schema.Types.Mixed, // Flexible content structure based on exercise type
    required: true,
  },
  points: { type: Number, default: 10 },
});

// Schema for end-of-lesson quizzes
const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      type: {
        type: String,
        enum: ["multiple-choice", "true-false", "short-answer"],
        required: true,
      },
      question: { type: String, required: true },
      options: [String], // For multiple choice
      correctAnswer: { type: String, required: true },
      points: { type: Number, default: 10 },
    },
  ],
  passingScore: { type: Number, default: 70 }, // percentage
  duration: { type: Number, required: true }, // in minutes
});

// Add default empty array to ensure parts are not missing
const LessonPartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true },
  duration: { type: Number, required: true }, // in minutes
  exercise: { type: ExerciseSchema, default: null },
});

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // Slug is required
  description: { type: String, required: true },
  order: { type: Number, required: true },
  duration: { type: Number, required: true }, // Total duration in minutes
  parts: { type: [LessonPartSchema], default: [] },
  endOfLessonQuiz: { type: QuizSchema, required: true },
});

// Pre-save hook to generate slug from title if it's missing
LessonSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[\s]/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]/g, ""); // Remove non-alphanumeric characters
  }
  next();
});

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
  lessons: { type: [LessonSchema], default: [] },
  endOfChapterQuiz: { type: QuizSchema, required: true },
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
    },
    tags: { type: [String], default: [] },
    book: {
      title: { type: String, required: true },
      author: { type: String, required: true },
      coverUrl: { type: String, default: "" },
      amazonUrl: { type: String, default: "" },
    },
    chapters: { type: [ChapterSchema], default: [] },
    endOfCourseExam: { type: QuizSchema, required: true },
    prerequisites: { type: [String], default: [] },
    learningOutcomes: { type: [String], default: [] },
    estimatedDuration: { type: Number, required: true },
    enrolledCount: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);
// Indexes
CourseSchema.index({ slug: 1 });
CourseSchema.index({ tags: 1 });
CourseSchema.index({ level: 1 });
CourseSchema.index({ "rating.average": -1 });
CourseSchema.index({ enrolledCount: -1 });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
