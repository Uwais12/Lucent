import mongoose from "mongoose";

// Schema to track quiz progress
const QuizProgressSchema = new mongoose.Schema({
  quizId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  maxScore: { type: Number, default: 0 },
  dateCompleted: { type: Date, default: null },
  attempts: { type: Number, default: 0 },
  lastAttemptDate: { type: Date, default: null },
  answers: [{
    questionId: String,
    answer: mongoose.Schema.Types.Mixed,
    correct: Boolean,
    pointsEarned: Number
  }]
});

// Schema to track exercise progress within lesson parts
const ExerciseProgressSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  pointsEarned: { type: Number, default: 0 },
  maxPoints: { type: Number, default: 0 },
  dateCompleted: { type: Date, default: null },
  attempts: { type: Number, default: 0 },
  lastAttemptDate: { type: Date, default: null },
  submissions: [{
    date: { type: Date, default: Date.now },
    answer: mongoose.Schema.Types.Mixed,
    correct: Boolean,
    pointsEarned: Number,
    timeSpent: Number // in seconds
  }]
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
  timeSpent: { type: Number, default: 0 }, // in minutes
  completionPercentage: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 100
  },
  nextAvailableDate: { type: Date, default: null } // For daily lesson limit
});

// Add method to check if lesson can be accessed
LessonProgressSchema.methods.canAccess = function() {
  if (!this.nextAvailableDate) return true;
  return new Date() >= this.nextAvailableDate;
};

// Schema to track chapter progress, including lessons
const ChapterProgressSchema = new mongoose.Schema({
  chapterId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dateCompleted: { type: Date, default: null },
  lastAccessDate: { type: Date, default: null },
  lessons: [LessonProgressSchema],
  endOfChapterQuiz: QuizProgressSchema,
  timeSpent: { type: Number, default: 0 }, // in minutes
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
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
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  badges: [{
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    dateEarned: { type: Date, default: Date.now },
    courseId: { type: String },
    progress: { type: Number, default: 100 }
  }],
  achievements: [{
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    dateEarned: { type: Date, default: Date.now },
    value: { type: Number }
  }],
  settings: {
    emailNotifications: { type: Boolean, default: true },
    dailyReminders: { type: Boolean, default: true },
    timezone: { type: String, default: "UTC" },
    dailyGoal: { type: Number, default: 1 }, // Number of lessons per day
    studyReminders: [{
      day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
      time: String // HH:mm format
    }]
  }
});

// Add methods for progress calculation
CourseProgressSchema.methods.calculateProgress = function() {
  if (!this.chapters.length) return 0;
  
  const totalLessons = this.chapters.reduce((sum, chapter) => 
    sum + chapter.lessons.length, 0);
  
  const completedLessons = this.chapters.reduce((sum, chapter) => 
    sum + chapter.lessons.filter(lesson => lesson.completed).length, 0);
  
  this.completionPercentage = (completedLessons / totalLessons) * 100;
  return this.completionPercentage;
};

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
    lastQuizCompletion: {
      type: Date,
      default: null
    },
    progress: {
      courses: [CourseProgressSchema],
      totalTimeSpent: { type: Number, default: 0 },
      completedCourses: { type: Number, default: 0 },
      completedLessons: { type: Number, default: 0 },
      completedExercises: { type: Number, default: 0 },
      averageScore: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Middleware to update lastActivity
UserSchema.pre('save', function(next) {
  this.lastActivity = new Date();
  next();
});

// Method to update daily streak with timezone support
UserSchema.methods.updateDailyStreak = function() {
  const now = new Date();
  const userTz = this.settings?.timezone || 'UTC';
  const lastActivity = this.lastDailyActivity ? 
    new Date(this.lastDailyActivity).toLocaleString('en-US', { timeZone: userTz }) :
    null;
  
  if (!lastActivity) {
    this.dailyStreak = 1;
  } else {
    const diffDays = Math.floor((now - new Date(lastActivity)) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      this.dailyStreak += 1;
    } else if (diffDays > 1) {
      this.dailyStreak = 1;
    }
  }
  
  this.lastDailyActivity = now;
};

// Method to award badge with validation
UserSchema.methods.awardBadge = function(badgeData) {
  if (!badgeData.type || !badgeData.name) {
    throw new Error('Badge type and name are required');
  }
  
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

// Method to update XP and level with rewards
UserSchema.methods.addXP = function(amount) {
  if (amount <= 0) return false;
  
  const oldLevel = this.level;
  this.xp += amount;
  
  // Level calculation (example: each level requires 1000 XP)
  const newLevel = Math.floor(this.xp / 1000) + 1;
  if (newLevel > oldLevel) {
    this.level = newLevel;
    // Award level-up bonus
    this.gems += (newLevel - oldLevel) * 50;
    return true;
  }
  return false;
};

// Virtual for calculating overall completion percentage
UserSchema.virtual('completionPercentage').get(function() {
  if (!this.progress.courses.length) return 0;
  
  const totalPercentage = this.progress.courses.reduce(
    (sum, course) => sum + (course.completionPercentage || 0),
    0
  );
  
  return totalPercentage / this.progress.courses.length;
});

// Add method to calculate course completion percentage
UserSchema.methods.calculateCourseCompletion = async function(courseId) {
  const courseProgress = this.progress.courses.find(
    c => c.courseId.toString() === courseId.toString()
  );

  if (!courseProgress) {
    return 0;
  }

  // Calculate total lessons
  const totalLessons = courseProgress.chapters.reduce((sum, ch) => 
    sum + ch.lessons.length, 0
  );

  // Calculate completed lessons
  const completedLessons = courseProgress.chapters.reduce((sum, ch) => 
    sum + ch.lessons.filter(l => l.completed).length, 0
  );

  // Calculate percentage
  return Math.round((completedLessons / totalLessons) * 100);
};

// Indexes for efficient querying
UserSchema.index({ 'progress.courses.courseId': 1 });
UserSchema.index({ lastActivity: -1 });
UserSchema.index({ level: -1 });
UserSchema.index({ dailyStreak: -1 });
UserSchema.index({ 'progress.courses.completed': 1 });

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
