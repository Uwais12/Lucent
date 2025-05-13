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
  courseTitle: { type: String },
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

// New schema for storing awarded global/milestone badges on the User model
const BadgeEntrySchema = new mongoose.Schema({
  badgeId: { type: String, required: true }, // Unique ID from badgeDefinitions.js
  name: { type: String, required: true },
  description: { type: String },
  iconUrl: { type: String },
  type: { type: String, required: true },    // e.g., MILESTONE_QUIZ, MILESTONE_STREAK
  dateEarned: { type: Date, default: Date.now }
}, { _id: false });

// Main user schema with detailed progress tracking
const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: { // Clerk now manages primary email, this is for local reference/search
      type: String,
      required: false, // Not strictly required as Clerk is the source of truth
      unique: true,
      sparse: true, // Allows multiple nulls if not set
    },
    username: { // User-chosen display name, required after initial setup
      type: String,
      trim: true,
      unique: true,
      sparse: true, // Allows nulls to not conflict with unique index before setup
      default: null,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    // Subscription information
    subscription: {
      tier: { 
        type: String, 
        enum: ["FREE", "PRO", "ENTERPRISE"], 
        default: "FREE" 
      },
      status: { 
        type: String, 
        enum: ["ACTIVE", "INACTIVE", "TRIALING", "PAST_DUE", "CANCELED"], 
        default: "ACTIVE" 
      },
      customerId: { 
        type: String, 
        default: null 
      },
      subscriptionId: { 
        type: String, 
        default: null 
      },
      priceId: { 
        type: String, 
        default: null 
      },
      currentPeriodEnd: { 
        type: Date, 
        default: null 
      },
      createdAt: { 
        type: Date, 
        default: null 
      },
      updatedAt: { 
        type: Date, 
        default: null 
      },
      cancelAtPeriodEnd: { 
        type: Boolean, 
        default: false 
      }
    },
    workplace: {
      company: { type: String, default: null },
      position: { type: String, default: null }, // For specific job title
      industry: { type: String, default: null },
      yearsOfExperience: { type: Number, default: null }
    },
    occupation: { // Broader field for user's occupation
      type: String,
      trim: true,
      default: null,
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
    dailyQuizCount: {
      type: Number,
      default: 0,
      min: 0
    },
    lastQuizDate: {
      type: Date,
      default: null
    },
    badges: { // Added top-level badges array for global/milestone badges
      type: [BadgeEntrySchema],
      default: []
    },
    progress: {
      courses: [CourseProgressSchema],
      totalTimeSpent: { type: Number, default: 0 },
      completedCourses: { type: Number, default: 0 },
      completedLessons: { type: Number, default: 0 },
      completedExercises: { type: Number, default: 0 },
      averageScore: { type: Number, default: 0 }
    },
    profileSetupComplete: {
      type: Boolean,
      default: false,
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
  if (!badgeData.badgeId || !badgeData.name || !badgeData.type) {
    console.error('Badge badgeId, name, and type are required to award a badge.', badgeData);
    // Consider not throwing here to prevent request failure, but log and return false.
    // Or ensure calling functions handle this error gracefully.
    // For now, keeping throw to align with original intent if type/name were critical.
    throw new Error('Badge badgeId, name, and type are required');
  }

  // Initialize this.badges if it's undefined (e.g. for existing user documents before this field was added)
  if (!Array.isArray(this.badges)) {
    this.badges = [];
  }
  
  const existingBadge = this.badges.find(b => b.badgeId === badgeData.badgeId); // Check by badgeId
  if (!existingBadge) {
    this.badges.push({
      badgeId: badgeData.badgeId,
      name: badgeData.name,
      description: badgeData.description,
      iconUrl: badgeData.iconUrl, // Make sure to save iconUrl
      type: badgeData.type,       // And type
      dateEarned: new Date()
    });
    return true; // Badge was awarded
  }
  return false; // Badge already exists or was not awarded
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
  if (!this.progress?.courses?.length) return 0;
  
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
