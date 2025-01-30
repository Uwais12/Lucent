import mongoose from "mongoose";

// Schema to track quiz progress
const QuizProgressSchema = new mongoose.Schema({
  quizId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  maxScore: { type: Number, default: 0 },
  dateCompleted: { type: Date, default: null },
});

// Schema to track exercise progress within lesson parts
const ExerciseProgressSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  pointsEarned: { type: Number, default: 0 },
  maxPoints: { type: Number, default: 0 },
  dateCompleted: { type: Date, default: null },
});

// Schema to track lesson progress, including exercises
const LessonProgressSchema = new mongoose.Schema({
  lessonId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dateCompleted: { type: Date, default: null },
  score: { type: Number, default: 0 }, // Aggregate score for exercises and quizzes within the lesson
  exercises: [ExerciseProgressSchema],
  quizProgress: QuizProgressSchema, // Progress for end-of-lesson quiz
});

// Schema to track chapter progress, including lessons
const ChapterProgressSchema = new mongoose.Schema({
  chapterId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dateCompleted: { type: Date, default: null },
  lessons: [LessonProgressSchema], // Lessons within the chapter
  endOfChapterQuiz: QuizProgressSchema, // Progress for end-of-chapter quiz
});

// Schema to track overall course progress
const CourseProgressSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  enrolledDate: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  completionDate: { type: Date, default: null },
  score: { type: Number, default: 0 }, // Aggregate score for course completion
  chapters: [ChapterProgressSchema], // Chapters within the course
  endOfCourseExam: QuizProgressSchema, // Progress for the end-of-course exam
});

// Main user schema with detailed progress tracking
const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gems: {
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      default: 0,
    },
    dailyStreak: {
      type: Number,
      default: 0,
    },
    lastActivity: {
      type: Date,
      default: null,
    },
    badges: [{ type: String }], // Achievements or badges earned

    // Course progress tracking
    progress: {
      courses: [CourseProgressSchema],
    },

    // Timestamps for user creation and updates
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model exists before creating a new one
const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
