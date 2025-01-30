// src/models/User.js
import mongoose from "mongoose";

const CourseProgressSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  // Which lessons (by ID) the user has completed
  completedLessons: [{ type: String }],
  // If you have separate mini quizzes or a final quiz for each course
  completedMiniQuizzes: [{ type: String }],
  finalQuizCompleted: { type: Boolean, default: false },
  // Possibly store the user's final quiz score, completion date, etc.
  finalQuizScore: { type: Number, default: 0 },
});

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
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
  // Instead of simple numeric counts, store a nested array of progress
  progress: {
    courses: [CourseProgressSchema],
  },
  badges: [{ type: String }],
}, {
  timestamps: true
});

// Check if the model exists before creating a new one
const User = mongoose.models?.User || mongoose.model('User', UserSchema);

export default User;
