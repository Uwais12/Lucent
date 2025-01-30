import mongoose from "mongoose";

// Schema to track quiz progress
const QuizProgressSchema = new mongoose.Schema({
  quizId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  maxScore: { type: Number, default: 0 },
  dateCompleted: { type: Date, default: null },
  attempts: { type: Number, default: 0 },
  lastAttemptDate: { type: Date, default: null }
});

// Schema to track exercise progress within lesson parts
const ExerciseProgressSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  pointsEarned: { type: Number, default: 0 },
  maxPoints: { type: Number, default: 0 },
  dateCompleted: { type: Date, default: null },
  attempts: { type: Number, default: 0 },
  lastAttemptDate: { type: Date, default: null }
});

// Schema to track lesson progress, including exercises
const LessonProgressSchema = new mongoose.Schema({
  lessonId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dateCompleted: { type: Date, default: null },
  lastAccessDate: { type: Date, default: null },
  score: { type: Number, default: 0 },
  exercises: [ExerciseProgressSchema],
  quizProgress: QuizProgressSchema,
  timeSpent: { type: Number, default: 0 } // in minutes
});

// Schema to track chapter progress, including lessons
const ChapterProgressSchema = new mongoose.Schema({
  chapterId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dateCompleted: { type: Date, default: null },
  lastAccessDate: { type: Date, default: null },
  lessons: [LessonProgressSchema],
  endOfChapterQuiz: QuizProgressSchema,
  timeSpent: { type: Number, default: 0 } // in minutes
});

// Schema to track overall course progress
const CourseProgressSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  enrolledDate: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  completionDate: { type: Date, default: null },
  lastAccessDate: { type: Date, default: null },
  score: { type: Number, default: 0 },
  chapters: [ChapterProgressSchema],
  endOfCourseExam: QuizProgressSchema,
  timeSpent: { type: Number, default: 0 }, // in minutes
  currentChapter: { type: Number, default: 0 },
  currentLesson: { type: Number, default: 0 },
  lastCompletedDate: { type: Date, default: null }, // For daily lesson tracking
  badges: [{
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    dateEarned: { type: Date, default: Date.now },
    courseId: { type: String }, // Optional, for course-specific badges
    progress: { type: Number, default: 100 } // For badges that track progress
  }],
  achievements: [{
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    dateEarned: { type: Date, default: Date.now },
    value: { type: Number } // For achievements with numerical values
  }],
  settings: {
    emailNotifications: { type: Boolean, default: true },
    dailyReminders: { type: Boolean, default: true },
    timezone: { type: String, default: "UTC" }
  }
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
      required: false,
      unique: true,
      sparse: true,
    },
    gems: {
      type: Number,
      default: 0,
      min: 0
    },
    xp: {
      type: Number,
      default: 0,
      min: 0
    },
    level: {
      type: Number,
      default: 1,
      min: 1
    },
    dailyStreak: {
      type: Number,
      default: 0,
      min: 0
    },
    lastActivity: {
      type: Date,
      default: null
    },
    lastDailyActivity: {
      type: Date,
      default: null
    },
    badges: [{
      type: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String },
      dateEarned: { type: Date, default: Date.now },
      courseId: { type: String }, // Optional, for course-specific badges
      progress: { type: Number, default: 100 } // For badges that track progress
    }],
    achievements: [{
      type: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String },
      dateEarned: { type: Date, default: Date.now },
      value: { type: Number } // For achievements with numerical values
    }],
    settings: {
      emailNotifications: { type: Boolean, default: true },
      dailyReminders: { type: Boolean, default: true },
      timezone: { type: String, default: "UTC" }
    },
    progress: {
      courses: [CourseProgressSchema],
      totalTimeSpent: { type: Number, default: 0 }, // in minutes
      completedCourses: { type: Number, default: 0 },
      completedLessons: { type: Number, default: 0 },
      completedExercises: { type: Number, default: 0 },
      averageScore: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true
  }
);

// Middleware to update lastActivity
UserSchema.pre('save', function(next) {
  this.lastActivity = new Date();
  next();
});

// Method to update daily streak
UserSchema.methods.updateDailyStreak = function() {
  const now = new Date();
  const lastActivity = this.lastDailyActivity;
  
  if (!lastActivity) {
    this.dailyStreak = 1;
  } else {
    const diffDays = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Consecutive day
      this.dailyStreak += 1;
    } else if (diffDays > 1) {
      // Streak broken
      this.dailyStreak = 1;
    }
    // If diffDays === 0, same day, don't update streak
  }
  
  this.lastDailyActivity = now;
};

// Method to award badge
UserSchema.methods.awardBadge = function(badgeData) {
  const existingBadge = this.badges.find(b => b.type === badgeData.type);
  if (!existingBadge) {
    this.badges.push({
      ...badgeData,
      dateEarned: new Date()
    });
    return true;
  }
  return false;
};

// Method to update XP and level
UserSchema.methods.addXP = function(amount) {
  this.xp += amount;
  
  // Level calculation (example: each level requires 1000 XP)
  const newLevel = Math.floor(this.xp / 1000) + 1;
  if (newLevel > this.level) {
    this.level = newLevel;
    return true; // Indicates level up
  }
  return false;
};

// Virtual for calculating completion percentage
UserSchema.virtual('completionPercentage').get(function() {
  if (!this.progress.courses.length) return 0;
  
  const completed = this.progress.courses.filter(c => c.completed).length;
  return (completed / this.progress.courses.length) * 100;
});

// Indexes
UserSchema.index({ clerkId: 1 });
UserSchema.index({ 'progress.courses.courseId': 1 });
UserSchema.index({ lastActivity: -1 });
UserSchema.index({ level: -1 });
UserSchema.index({ dailyStreak: -1 });

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
