import mongoose from "mongoose";

// Schema for interactive exercises within lesson parts
const ExerciseSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['drag-and-drop', 'fill-in-blanks', 'multiple-choice', 'code-challenge'],
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: {
    type: mongoose.Schema.Types.Mixed,  // Flexible content structure based on exercise type
    required: true
  },
  points: { type: Number, default: 10 }
});

// Schema for individual parts within a lesson
const LessonPartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true },
  duration: { type: Number, required: true }, // in minutes
  exercise: ExerciseSchema
});

// Schema for end-of-lesson quizzes
const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [{
    type: {
      type: String,
      enum: ['multiple-choice', 'true-false', 'short-answer'],
      required: true
    },
    question: { type: String, required: true },
    options: [String],  // For multiple choice
    correctAnswer: { type: String, required: true },
    points: { type: Number, default: 10 }
  }],
  passingScore: { type: Number, default: 70 }, // percentage
  duration: { type: Number, required: true } // in minutes
});

// Schema for individual lessons
const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
  duration: { type: Number, required: true }, // Total duration in minutes
  parts: [LessonPartSchema],
  endOfLessonQuiz: QuizSchema,
  prerequisites: [{ type: String }], // IDs of prerequisite lessons
  learningObjectives: [{ type: String }]
});

// Schema for chapters within a course
const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
  lessons: [LessonSchema],
  endOfChapterQuiz: QuizSchema
});

// Main Course Schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  tags: [{ type: String }],
  
  // Book reference
  book: {
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverUrl: { type: String },
    amazonUrl: { type: String }
  },
  
  // Course structure
  chapters: [ChapterSchema],
  endOfCourseExam: {
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true }, // in minutes
    passingScore: { type: Number, default: 80 }, // percentage
    questions: [{
      type: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'short-answer', 'coding-challenge'],
        required: true
      },
      question: { type: String, required: true },
      options: [String],
      correctAnswer: { type: String, required: true },
      points: { type: Number, required: true }
    }]
  },

  // Course metadata
  prerequisites: [{ type: String }],
  learningOutcomes: [{ type: String }],
  estimatedDuration: { type: Number, required: true }, // Total minutes
  
  // Stats and tracking
  enrolledCount: { type: Number, default: 0 },
  completionRate: { type: Number, default: 0 },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes
CourseSchema.index({ slug: 1 });
CourseSchema.index({ tags: 1 });
CourseSchema.index({ level: 1 });
CourseSchema.index({ "rating.average": -1 });
CourseSchema.index({ enrolledCount: -1 });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema); 