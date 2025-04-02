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
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 1000
  },
  questions: [{
    type: {
      type: String,
      enum: ["multiple-choice", "true-false", "short-answer"],
      required: true,
    },
    question: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 1000
    },
    options: {
      type: [String],
      validate: {
        validator: function(options) {
          // Only validate options for multiple-choice questions
          if (this.type === 'multiple-choice') {
            return options && options.length >= 2 && options.every(opt => typeof opt === 'string' && opt.trim().length > 0);
          }
          return true;
        },
        message: 'Multiple choice questions must have at least 2 valid options'
      }
    },
    correctAnswer: { 
      type: String, 
      required: true,
      validate: {
        validator: function(answer) {
          if (this.type === 'multiple-choice') {
            return this.options.includes(answer);
          }
          if (this.type === 'true-false') {
            return ['true', 'false'].includes(answer.toLowerCase());
          }
          return typeof answer === 'string' && answer.trim().length > 0;
        },
        message: 'Invalid correct answer for question type'
      }
    },
    points: { 
      type: Number, 
      default: 10,
      min: 1,
      max: 100
    },
    explanation: {
      type: String,
      trim: true,
      maxlength: 1000
    }
  }],
  passingScore: { 
    type: Number, 
    default: 70,
    min: 0,
    max: 100
  },
  duration: { 
    type: Number, 
    required: true,
    min: 1,
    max: 180
  },
  attempts: {
    type: Number,
    default: 0,
    min: 0
  },
  averageScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
});

// Add validation for minimum number of questions
QuizSchema.path('questions').validate(function(questions) {
  return questions && questions.length > 0;
}, 'Quiz must have at least one question');

// Virtual for total points
QuizSchema.virtual('totalPoints').get(function() {
  return this.questions.reduce((sum, q) => sum + (q.points || 10), 0);
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
    exercisesCompleted: [Number], // Array of completed exercise indices
    maxAttempts: { type: Number, default: 3 }, // Maximum number of attempts for quizzes
    currentAttempt: { type: Number, default: 0 }, // Current attempt number
    isLocked: { type: Boolean, default: false }, // Whether the lesson is locked
    prerequisiteLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }] // Required lessons to unlock this one
  }
});

// Add validation for lesson order
LessonSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[\s]/g, "-")
      .replace(/[^\w-]/g, "");
  }
  
  // Ensure exercises and quizzes have proper attempt limits
  if (this.parts) {
    this.parts.forEach(part => {
      if (part.exercise && !part.exercise.maxAttempts) {
        part.exercise.maxAttempts = 3;
      }
    });
  }
  
  next();
});

// Add method to check if lesson can be accessed
LessonSchema.methods.canAccess = async function(userId) {
  // If it's the first lesson, always allow access
  if (this.order === 1) return true;
  
  // Check if prerequisites are completed
  if (this.progress.prerequisiteLessons && this.progress.prerequisiteLessons.length > 0) {
    const User = mongoose.model('User');
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) return false;
    
    // Check if all prerequisite lessons are completed
    const prereqCompleted = this.progress.prerequisiteLessons.every(lessonId => {
      const lessonProgress = user.progress.courses
        .find(c => c.courseId.toString() === this.courseId.toString())
        ?.chapters
        .flatMap(ch => ch.lessons)
        .find(l => l.lessonId.toString() === lessonId.toString());
      
      return lessonProgress?.completed;
    });
    
    return prereqCompleted;
  }
  
  return true;
};

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
CourseSchema.index({ tags: 1 });
CourseSchema.index({ level: 1 });
CourseSchema.index({ "rating.average": -1 });
CourseSchema.index({ enrolledCount: -1 });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
