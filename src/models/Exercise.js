import mongoose from 'mongoose';

// Schema for drag-and-drop exercises
const DragAndDropContent = new mongoose.Schema({
  items: [{
    id: { type: Number, required: true },
    text: { type: String, required: true }
  }],
  targets: [{
    id: { type: Number, required: true },
    text: { type: String, required: true }
  }],
  correctPairs: [[Number]] // Array of pairs [sourceId, targetId]
});

// Schema for fill-in-blanks exercises
const FillInBlanksContent = new mongoose.Schema({
  text: { type: String, required: true },
  blanks: [{
    id: { type: String, required: true },
    answer: { type: String, required: true },
    hint: String
  }]
});

// Schema for multiple-choice exercises
const MultipleChoiceContent = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: String
});

// Schema for code-challenge exercises
const CodeChallengeContent = new mongoose.Schema({
  instructions: { type: String, required: true },
  initialCode: { type: String, default: '' },
  testCases: [{
    input: [mongoose.Schema.Types.Mixed],
    expectedOutput: mongoose.Schema.Types.Mixed,
    description: String
  }],
  hints: [String],
  solution: { type: String, required: true }
});

// Full Exercise Schema that includes all types
const ExerciseSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['drag-and-drop', 'fill-in-blanks', 'multiple-choice', 'code-challenge'],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  points: {
    type: Number,
    default: 10,
    min: 1,
    max: 100
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  tags: {
    type: [String],
    validate: {
      validator: function(tags) {
        return tags.every(tag => typeof tag === 'string' && tag.trim().length > 0);
      },
      message: 'Tags must be non-empty strings'
    }
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(content) {
        if (!content) return false;

        switch (this.type) {
          case 'drag-and-drop':
            return (
              Array.isArray(content.items) &&
              Array.isArray(content.targets) &&
              Array.isArray(content.correctPairs) &&
              content.items.length > 0 &&
              content.items.length === content.targets.length &&
              content.correctPairs.every(pair => 
                Array.isArray(pair) && 
                pair.length === 2 &&
                pair.every(num => typeof num === 'number')
              ) &&
              // Validate that all pairs reference valid items and targets
              content.correctPairs.every(([itemId, targetId]) =>
                content.items.some(item => item.id === itemId) &&
                content.targets.some(target => target.id === targetId)
              )
            );
          case 'fill-in-blanks':
            return (
              typeof content.text === 'string' &&
              Array.isArray(content.blanks) &&
              content.blanks.length > 0 &&
              content.blanks.every(blank => 
                blank.id && 
                typeof blank.answer === 'string' &&
                blank.answer.trim().length > 0
              ) &&
              // Validate that all blank IDs are referenced in the text
              content.blanks.every(blank => 
                content.text.includes(`[${blank.id}]`)
              )
            );
          case 'multiple-choice':
            return (
              typeof content.question === 'string' &&
              Array.isArray(content.options) &&
              content.options.length >= 2 &&
              content.options.every(opt => typeof opt === 'string' && opt.trim().length > 0) &&
              typeof content.correctAnswer === 'string' &&
              content.options.includes(content.correctAnswer) &&
              (!content.explanation || typeof content.explanation === 'string')
            );
          case 'code-challenge':
            return (
              typeof content.instructions === 'string' &&
              Array.isArray(content.testCases) &&
              content.testCases.length > 0 &&
              content.testCases.every(testCase => 
                Array.isArray(testCase.input) &&
                testCase.expectedOutput !== undefined &&
                typeof testCase.description === 'string'
              ) &&
              typeof content.solution === 'string' &&
              (!content.hints || Array.isArray(content.hints))
            );
          default:
            return false;
        }
      },
      message: 'Invalid exercise content structure'
    }
  },
  timeLimit: {
    type: Number,
    default: 5,
    min: 1,
    max: 60
  },
  maxAttempts: {
    type: Number,
    default: 3,
    min: 1
  },
  attempts: {
    type: Number,
    default: 0,
    min: 0
  },
  successRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for efficient querying
ExerciseSchema.index({ type: 1, difficulty: 1 });
ExerciseSchema.index({ tags: 1 });
ExerciseSchema.index({ 'content.question': 'text' }, { 
  weights: {
    'content.question': 10,
    title: 5,
    description: 3
  }
});

// Virtual for calculating success rate
ExerciseSchema.virtual('calculatedSuccessRate').get(function() {
  return this.attempts > 0 ? (this.successRate / this.attempts) * 100 : 0;
});

// Method to check if exercise can be attempted
ExerciseSchema.methods.canAttempt = async function(userId) {
  if (this.attempts >= this.maxAttempts) return false;
  
  // Check prerequisites if any
  if (this.prerequisites && this.prerequisites.length > 0) {
    const User = mongoose.model('User');
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) return false;
    
    // Check if all prerequisites are completed
    const prereqCompleted = await Promise.all(
      this.prerequisites.map(async (exerciseId) => {
        const exercise = await this.model('Exercise').findById(exerciseId);
        if (!exercise) return false;
        
        const exerciseProgress = user.progress.courses
          .flatMap(c => c.chapters)
          .flatMap(ch => ch.lessons)
          .flatMap(l => l.exercises)
          .find(e => e.exerciseId.toString() === exerciseId.toString());
        
        return exerciseProgress?.completed;
      })
    );
    
    return prereqCompleted.every(Boolean);
  }
  
  return true;
};

// Example exercises for each type
const examples = {
  dragAndDrop: {
    type: 'drag-and-drop',
    title: 'Match Database Concepts',
    description: 'Match each database concept with its correct definition',
    points: 10,
    content: {
      items: [
        { id: 1, text: 'Primary Key' },
        { id: 2, text: 'Foreign Key' },
        { id: 3, text: 'Index' },
        { id: 4, text: 'Transaction' }
      ],
      targets: [
        { id: 1, text: 'Unique identifier for a record in a table' },
        { id: 2, text: 'References a primary key in another table' },
        { id: 3, text: 'Data structure to speed up data retrieval' },
        { id: 4, text: 'A sequence of operations treated as a single unit' }
      ],
      correctPairs: [[1, 1], [2, 2], [3, 3], [4, 4]]
    }
  },
  fillInBlanks: {
    type: 'fill-in-blanks',
    title: 'Complete the SQL Query',
    description: 'Fill in the blanks to complete the SQL query',
    points: 15,
    content: {
      text: 'SELECT * FROM users WHERE [1] = "active" AND [2] > 18;',
      blanks: [
        { id: '1', answer: 'status', hint: 'User state' },
        { id: '2', answer: 'age', hint: 'User age field' }
      ]
    }
  },
  multipleChoice: {
    type: 'multiple-choice',
    title: 'Database Indexing',
    description: 'Choose the correct statement about database indexing',
    points: 10,
    content: {
      question: 'What is the primary purpose of an index in a database?',
      options: [
        'To speed up data retrieval operations',
        'To store backup data',
        'To encrypt sensitive data',
        'To compress the database'
      ],
      correctAnswer: 'To speed up data retrieval operations',
      explanation: 'Indexes are data structures that improve the speed of data retrieval operations by providing quick access to rows in a database table.'
    }
  },
  codeChallenge: {
    type: 'code-challenge',
    title: 'Implement a Query Builder',
    description: 'Create a function that builds a SQL SELECT query',
    points: 20,
    content: {
      instructions: 'Write a function that takes a table name and conditions object and returns a SQL SELECT query string.',
      initialCode: 'function buildQuery(table, conditions) {\n  // Your code here\n}',
      testCases: [
        {
          input: ['users', { age: 25, status: 'active' }],
          expectedOutput: 'SELECT * FROM users WHERE age = 25 AND status = "active"',
          description: 'Basic query with multiple conditions'
        }
      ],
      hints: [
        'Remember to handle string values with quotes',
        'Use Object.entries() to iterate over conditions'
      ],
      solution: `function buildQuery(table, conditions) {
  const where = Object.entries(conditions)
    .map(([key, value]) => \`\${key} = \${typeof value === 'string' ? \`"\${value}"\` : value}\`)
    .join(' AND ');
  return \`SELECT * FROM \${table} WHERE \${where}\`;
}`
    }
  }
};

export default mongoose.models.Exercise || mongoose.model('Exercise', ExerciseSchema); 