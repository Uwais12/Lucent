export const ddiaCourse = {
  title: "Data Models and Query Languages",
  slug: "data-models-query-languages",
  description: "Master the fundamentals of data models and query languages based on Chapter 2 of 'Designing Data-Intensive Applications'. Learn about different data models, their trade-offs, and how to choose the right one for your applications.",
  level: "intermediate",
  tags: ["databases", "system design", "data modeling", "query languages"],
  
  book: {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    coverUrl: "/books/ddia-cover.jpg",
    amazonUrl: "https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321"
  },
  
  chapters: [
    {
      title: "Introduction to Data-Intensive Applications",
      description: "Foundation concepts of data-intensive applications",
      order: 1,
      lessons: [
        {
          title: "What Makes an Application Data-Intensive?",
          description: "Placeholder for Chapter 1 content",
          order: 1,
          duration: 30,
          parts: [],
          endOfLessonQuiz: {
            title: "Chapter 1 Quiz",
            description: "Test your understanding of data-intensive applications",
            duration: 15,
            passingScore: 70,
            questions: [
              {
                type: "multiple-choice",
                question: "What is a data-intensive application?",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correctAnswer: "Option 1",
                points: 10
              }
            ]
          }
        }
      ],
      endOfChapterQuiz: {
        title: "Chapter 1 Final Quiz",
        description: "Comprehensive test of Chapter 1",
        duration: 30,
        passingScore: 75,
        questions: [
          {
            type: "multiple-choice",
            question: "Sample question for Chapter 1",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: "Option 1",
            points: 10
          }
        ]
      }
    },
    {
      title: "Data Models and Query Languages",
      description: "Deep dive into different data models and their query languages",
      order: 2,
      lessons: [
        {
          title: "Relational vs Document Models",
          description: "Understanding the fundamental differences between relational and document databases, their historical context, and use cases",
          order: 1,
          duration: 45,
          parts: [
            {
              title: "The Birth of NoSQL",
              content: `
                The NoSQL movement emerged in the late 2000s with several driving forces:
                
                1. Need for greater scalability than relational databases can achieve
                2. Preference for free and open source software over commercial database products
                3. Specialized query operations not well supported by SQL
                4. Frustration with restrictiveness of relational schemas
                
                However, the name "NoSQL" is misleading as it's not about rejecting SQL entirely. Today, it's better understood as "Not Only SQL."
                
                Key differences we'll explore:
                - Data model flexibility
                - Scalability approaches
                - Query capabilities
                - Schema enforcement
              `,
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "NoSQL Understanding",
                description: "Test your understanding of NoSQL fundamentals",
                content: {
                  question: "What does NoSQL commonly mean today?",
                  options: [
                    "No SQL Allowed",
                    "Not Only SQL",
                    "New SQL",
                    "No Scalability Quotient Limits"
                  ],
                  correctAnswer: 1
                }
              }
            },
            {
              title: "The Object-Relational Mismatch",
              content: `
                Most application development today is done in object-oriented programming languages, which leads to a mismatch when working with relational databases. This mismatch has several aspects:

                1. **Impedance Mismatch**
                - Objects in code need to be translated to database tables
                - Complex object structures must be mapped to a flat table structure
                - Inheritance is particularly challenging to represent in relational models

                2. **Common Solutions**
                - Object-Relational Mapping (ORM) frameworks
                - JSON/XML columns in relational databases
                - Document databases

                3. **Trade-offs to Consider**
                - Schema flexibility vs. enforcement
                - Query capabilities
                - Data locality
                - Join support

                Example of the mismatch:
                \`\`\`javascript
                // Object-oriented representation
                class User {
                  id: number;
                  name: string;
                  addresses: Address[];
                }

                // Relational representation needs two tables:
                // users (id, name)
                // addresses (id, user_id, street, city, country)
                \`\`\`
              `,
              order: 2,
              duration: 15,
              exercise: {
                type: "drag-and-drop",
                title: "Map Objects to Relations",
                description: "Match object-oriented concepts with their relational database implementations",
                content: {
                  items: [
                    { id: 1, text: "Object References" },
                    { id: 2, text: "Arrays/Lists" },
                    { id: 3, text: "Inheritance" },
                    { id: 4, text: "Object Properties" }
                  ],
                  targets: [
                    { id: 1, text: "Foreign Keys" },
                    { id: 2, text: "Join Tables" },
                    { id: 3, text: "Table per Class/Single Table" },
                    { id: 4, text: "Table Columns" }
                  ],
                  correctPairs: [[1,1], [2,2], [3,3], [4,4]]
                }
              }
            },
            {
              title: "Many-to-One and Many-to-Many Relationships",
              content: `
                Understanding relationship patterns in data modeling is crucial for building efficient databases.

                1. **Many-to-One Relationships**
                - Example: Many users living in one region
                - Benefits of normalization:
                  * Consistent styling and spelling
                  * Easier updates
                  * Localization support
                  * Better search
                - Implementation approaches:
                  * Foreign keys in relational databases
                  * Document references in document databases
                  * Embedded documents (denormalization)

                2. **Many-to-Many Relationships**
                - Example: Users belonging to multiple organizations
                - Implementation patterns:
                  * Join tables in relational databases
                  * Array of references in document databases
                  * Embedded arrays (with consideration for array size limits)

                3. **Data Locality**
                - Document databases excel at providing locality for one-to-many relationships
                - Relational databases typically need joins across tables
                - Trade-off between:
                  * Query performance
                  * Data duplication
                  * Update complexity
              `,
              order: 3,
              duration: 20,
              exercise: {
                type: "code-challenge",
                title: "Model a Social Network",
                description: "Design a data model for users and their relationships",
                content: {
                  initialCode: `// Design a data model for:
// - Users with profiles
// - Users can be friends with many other users
// - Users can join multiple groups
// - Groups can have multiple posts
// - Posts can have multiple comments

const userSchema = {
  // Add your schema here
};`,
                  solution: `const userSchema = {
  id: "uuid",
  profile: {
    name: "string",
    email: "string",
    avatar: "string"
  },
  friendIds: ["uuid"],  // Many-to-many
  groupIds: ["uuid"],   // Many-to-many
};

const groupSchema = {
  id: "uuid",
  name: "string",
  description: "string",
  memberIds: ["uuid"],
  posts: [{
    id: "uuid",
    content: "string",
    authorId: "uuid",  // Many-to-one
    comments: [{
      id: "uuid",
      content: "string",
      authorId: "uuid"  // Many-to-one
    }]
  }]
};`
                }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Relational vs Document Models Quiz",
            description: "Test your understanding of different data models",
            questions: [
              {
                type: "multiple-choice",
                question: "What is the main advantage of using normalized data with many-to-one relationships?",
                options: [
                  "It saves storage space",
                  "It ensures consistency when updating values",
                  "It makes queries faster",
                  "It simplifies the database schema"
                ],
                correctAnswer: "It ensures consistency when updating values",
                points: 10
              },
              {
                type: "true-false",
                question: "Document databases are always better than relational databases for one-to-many relationships.",
                correctAnswer: "false",
                points: 10
              },
              {
                type: "short-answer",
                question: "Explain the concept of impedance mismatch in the context of relational databases.",
                correctAnswer: "Impedance mismatch refers to the disconnect between object-oriented programming models and relational database models, where objects need to be transformed between these two representations.",
                points: 20
              }
            ],
            duration: 15,
            passingScore: 70
          },
          learningObjectives: [
            "Understand the historical context and motivation behind NoSQL databases",
            "Identify and explain the object-relational impedance mismatch",
            "Compare and contrast different approaches to handling relationships in relational and document databases",
            "Make informed decisions about data modeling based on access patterns"
          ]
        },
        {
          title: "Query Languages for Data",
          description: "Understanding different query languages and their use cases",
          order: 2,
          duration: 45,
          parts: [
            {
              title: "Declarative vs Imperative Query Languages",
              content: "Placeholder content for query languages comparison",
              order: 1,
              duration: 15,
              exercise: {
                type: "multiple-choice",
                title: "Query Languages Quiz",
                description: "Test your understanding of query languages",
                content: {
                  question: "What is the main advantage of declarative query languages?",
                  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                  correctAnswer: 1
                }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Query Languages Quiz",
            description: "Test your understanding of query languages",
            duration: 15,
            passingScore: 70,
            questions: [
              {
                type: "multiple-choice",
                question: "Sample question about query languages",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correctAnswer: "Option 1",
                points: 10
              }
            ]
          }
        },
        {
          title: "Graph-Like Data Models",
          description: "Understanding graph databases and their query languages",
          order: 3,
          duration: 45,
          parts: [
            {
              title: "Property Graphs",
              content: "Placeholder content for property graphs",
              order: 1,
              duration: 15,
              exercise: {
                type: "multiple-choice",
                title: "Graph Databases Quiz",
                description: "Test your understanding of graph databases",
                content: {
                  question: "What is a property graph?",
                  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                  correctAnswer: 1
                }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Graph Databases Quiz",
            description: "Test your understanding of graph databases",
            duration: 15,
            passingScore: 70,
            questions: [
              {
                type: "multiple-choice",
                question: "Sample question about graph databases",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                correctAnswer: "Option 1",
                points: 10
              }
            ]
          }
        }
      ],
      endOfChapterQuiz: {
        title: "Data Models and Query Languages Chapter Quiz",
        description: "Comprehensive assessment of data modeling concepts",
        duration: 30,
        passingScore: 75,
        questions: [
          {
            type: "multiple-choice",
            question: "Which factor was NOT a major driver of the NoSQL movement?",
            options: [
              "Need for greater scalability",
              "Preference for proprietary software",
              "Specialized query operations",
              "Frustration with relational schemas"
            ],
            correctAnswer: "Preference for proprietary software",
            points: 15
          }
        ]
      }
    }
  ],
  prerequisites: [
    "Basic understanding of databases",
    "Familiarity with SQL",
    "Experience with any programming language"
  ],
  learningOutcomes: [
    "Understand different data models and their trade-offs",
    "Make informed decisions about database selection",
    "Model relationships effectively in different database types",
    "Implement efficient data access patterns"
  ],
  estimatedDuration: 720, // 12 hours total
  enrolledCount: 0,
  completionRate: 0,
  rating: {
    average: 0,
    count: 0
  },
  endOfCourseExam: {
    title: "Data Models and Query Languages Final Exam",
    description: "Comprehensive final exam covering all chapters",
    duration: 60, // 1 hour
    passingScore: 80,
    questions: [
      {
        type: "multiple-choice",
        question: "What is the primary advantage of document databases over relational databases?",
        options: [
          "Better schema flexibility",
          "Stronger consistency guarantees",
          "More efficient joins",
          "Lower storage requirements"
        ],
        correctAnswer: "Better schema flexibility",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Which type of database would be best suited for handling complex many-to-many relationships?",
        options: [
          "Document database",
          "Key-value store",
          "Graph database",
          "Column-family store"
        ],
        correctAnswer: "Graph database",
        points: 20
      }
    ]
  }
}; 