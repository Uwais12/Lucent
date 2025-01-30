import mongoose from "mongoose";
import Exercise from "./Exercise";

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

// Schema for lesson parts
const LessonPartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true },
  duration: { type: Number, required: true }, // in minutes
  exercise: { type: mongoose.Schema.Types.Mixed }, // Using the Exercise schema structure
  completed: { type: Boolean, default: false },
  lastAttempt: { type: Date },
  attempts: { type: Number, default: 0 }
});

// Add validation for exercise structure
LessonPartSchema.path('exercise').validate(function(exercise) {
  if (!exercise) return true; // Exercise is optional

  const requiredFields = ['type', 'title', 'description', 'content'];
  const validTypes = ['drag-and-drop', 'fill-in-blanks', 'multiple-choice', 'code-challenge'];
  
  // Check required fields
  if (!requiredFields.every(field => exercise[field])) return false;
  
  // Check valid type
  if (!validTypes.includes(exercise.type)) return false;
  
  // Validate content structure based on type
  switch (exercise.type) {
    case 'drag-and-drop':
      return (
        Array.isArray(exercise.content.items) &&
        Array.isArray(exercise.content.targets) &&
        Array.isArray(exercise.content.correctPairs)
      );
    case 'fill-in-blanks':
      return (
        typeof exercise.content.text === 'string' &&
        Array.isArray(exercise.content.blanks)
      );
    case 'multiple-choice':
      return (
        typeof exercise.content.question === 'string' &&
        Array.isArray(exercise.content.options) &&
        typeof exercise.content.correctAnswer === 'string'
      );
    case 'code-challenge':
      return (
        typeof exercise.content.instructions === 'string' &&
        Array.isArray(exercise.content.testCases)
      );
    default:
      return false;
  }
}, 'Invalid exercise structure');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
  duration: { type: Number, required: true },
  parts: { type: [LessonPartSchema], default: [] },
  endOfLessonQuiz: { type: QuizSchema, required: true },
  progress: {
    completed: { type: Boolean, default: false },
    lastAccessed: { type: Date },
    score: { type: Number, default: 0 },
    exercisesCompleted: [Number] // Array of completed exercise indices
  }
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
  progress: {
    completed: { type: Boolean, default: false },
    lastAccessed: { type: Date },
    score: { type: Number, default: 0 }
  }
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
    progress: {
      completed: { type: Boolean, default: false },
      lastAccessed: { type: Date },
      score: { type: Number, default: 0 },
      chaptersCompleted: [Number]
    }
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
