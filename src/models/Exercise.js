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
              )
            );
          case 'fill-in-blanks':
            return (
              typeof content.text === 'string' &&
              Array.isArray(content.blanks) &&
              content.blanks.length > 0 &&
              content.blanks.every(blank => 
                blank.id && 
                typeof blank.answer === 'string'
              )
            );
          case 'multiple-choice':
            return (
              typeof content.question === 'string' &&
              Array.isArray(content.options) &&
              content.options.length >= 2 &&
              content.options.every(opt => typeof opt === 'string') &&
              content.options.includes(content.correctAnswer)
            );
          case 'code-challenge':
            return (
              typeof content.instructions === 'string' &&
              Array.isArray(content.testCases) &&
              content.testCases.length > 0 &&
              typeof content.solution === 'string' &&
              content.testCases.every(test => 
                Array.isArray(test.input) &&
                test.expectedOutput !== undefined &&
                typeof test.description === 'string'
              )
            );
          default:
            return false;
        }
      },
      message: props => `Invalid content structure for exercise type: ${props.value.type}`
    }
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function(tags) {
        return tags.every(tag => typeof tag === 'string' && tag.length > 0);
      },
      message: 'Tags must be non-empty strings'
    }
  },
  timeLimit: {
    type: Number,
    default: 5,
    min: 1,
    max: 60
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
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add index for type and difficulty
ExerciseSchema.index({ type: 1, difficulty: 1 });
ExerciseSchema.index({ tags: 1 });

// Virtual for calculating success rate
ExerciseSchema.virtual('calculatedSuccessRate').get(function() {
  return this.attempts > 0 ? (this.successRate / this.attempts) * 100 : 0;
});

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