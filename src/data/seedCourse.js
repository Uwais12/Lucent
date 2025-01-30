export const ddiaCourse = {
  title: "Data Models and Query Languages",
  slug: "data-models-query-languages",
  description:
    "Master the fundamentals of data models and query languages based on Chapter 2 of 'Designing Data-Intensive Applications'. Learn about different data models, their trade-offs, and how to choose the right one for your applications.",
  level: "intermediate",
  tags: ["databases", "system design", "data modeling", "query languages"],
  book: {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    coverUrl: "/books/ddia-cover.jpg",
    amazonUrl:
      "https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321",
  },
  chapters: [
    {
      title: "Introduction to Data-Intensive Applications",
      description: "Foundation concepts of data-intensive applications",
      order: 1,
      lessons: [
        {
          title: "What Makes an Application Data-Intensive?",
          slug: "what-makes-an-application-data-intensive",
          description: "Placeholder for Chapter 1 content",
          order: 1,
          duration: 30,
          parts: [],
          endOfLessonQuiz: {
            title: "Chapter 1 Quiz",
            description:
              "Test your understanding of data-intensive applications",
            duration: 15,
            passingScore: 70,
            questions: [
              {
                type: "multiple-choice",
                question: "What is a data-intensive application?",
                options: ["Processes a lot of data", "Option 2", "Option 3"],
                correctAnswer: "Processes a lot of data",
                points: 10,
              },
            ],
          },
        },
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
            options: ["Option 1", "Option 2", "Option 3"],
            correctAnswer: "Option 1",
            points: 10,
          },
        ],
      },
    },
    {
      title: "Data Models and Query Languages",
      description:
        "Deep dive into different data models and their query languages",
      order: 2,
      lessons: [
        {
          title: "Relational vs Document Models",
          slug: "relational-vs-document-models",
          description:
            "Understanding the fundamental differences between relational and document databases, their historical context, and use cases",
          order: 1,
          duration: 45,
          parts: [
            {
              title: "The Birth of NoSQL",
              content: `
                The NoSQL movement emerged in the late 2000s with several driving forces...
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
                    "No Scalability Quotient Limits",
                  ],
                  correctAnswer: "Not Only SQL",
                },
              },
            },
            {
              title: "The Object-Relational Mismatch",
              content: `
                Most application development today is done in object-oriented programming languages...
              `,
              order: 2,
              duration: 15,
              exercise: {
                type: "drag-and-drop",
                title: "Map Objects to Relations",
                description:
                  "Match object-oriented concepts with their relational database implementations",
                content: {
                  items: [
                    { id: 1, text: "Object References" },
                    { id: 2, text: "Arrays/Lists" },
                    { id: 3, text: "Inheritance" },
                    { id: 4, text: "Object Properties" },
                  ],
                  targets: [
                    { id: 1, text: "Foreign Keys" },
                    { id: 2, text: "Join Tables" },
                    { id: 3, text: "Table per Class/Single Table" },
                    { id: 4, text: "Table Columns" },
                  ],
                  correctPairs: [
                    [1, 1],
                    [2, 2],
                    [3, 3],
                    [4, 4],
                  ],
                },
              },
            },
          ],
          endOfLessonQuiz: {
            title: "Relational vs Document Models Quiz",
            description: "Test your understanding of different data models",
            questions: [
              {
                type: "multiple-choice",
                question:
                  "What is the main advantage of using normalized data with many-to-one relationships?",
                options: [
                  "It saves storage space",
                  "It ensures consistency when updating values",
                  "It makes queries faster",
                ],
                correctAnswer: "It ensures consistency when updating values",
                points: 10,
              },
            ],
            duration: 15,
            passingScore: 70,
          },
        },
        {
          title: "Query Languages for Data",
          slug: "query-languages-for-data",
          description:
            "Understanding different query languages and their use cases",
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
                  question:
                    "What is the main advantage of declarative query languages?",
                  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                  correctAnswer: 1,
                },
              },
            },
          ],
          endOfLessonQuiz: {
            title: "Query Languages Quiz",
            description: "Test your understanding of query languages",
            duration: 20,
            passingScore: 70,
            questions: [
              {
                type: "true-false",
                question: "SQL is a declarative query language.",
                correctAnswer: "true",
                points: 10,
              },
            ],
          },
        },
      ],
      endOfChapterQuiz: {
        title: "Chapter 2 Final Quiz",
        description: "Comprehensive test of Chapter 2",
        duration: 30,
        passingScore: 75,
        questions: [
          {
            type: "multiple-choice",
            question:
              "Which data model is most suitable for highly interconnected data?",
            options: ["Relational", "Graph", "Document"],
            correctAnswer: "Graph",
            points: 10,
          },
        ],
      },
    },
  ],
  prerequisites: [
    "Basic understanding of databases",
    "Familiarity with SQL",
    "Experience with any programming language",
  ],
  learningOutcomes: [
    "Understand different data models and their trade-offs",
    "Make informed decisions about database selection",
    "Model relationships effectively in different database types",
    "Implement efficient data access patterns",
  ],
  estimatedDuration: 720,
  enrolledCount: 0,
  completionRate: 0,
  rating: {
    average: 0,
    count: 0,
  },
  endOfCourseExam: {
    title: "Data Models and Query Languages Final Exam",
    description: "Comprehensive final exam covering all chapters",
    duration: 60,
    passingScore: 80,
    questions: [
      {
        type: "multiple-choice",
        question:
          "What is the primary advantage of document databases over relational databases?",
        options: [
          "Better schema flexibility",
          "Stronger consistency guarantees",
          "More efficient joins",
        ],
        correctAnswer: "Better schema flexibility",
        points: 20,
      },
    ],
  },
};
