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
          title: "Analytical vs Operational Systems",
          slug: "analytical-vs-operational-systems",
          description:
            "Explore the differences between analytical and operational systems, including their data models, workloads, and query patterns. Learn how these systems are used in modern enterprises to support both transactional and analytical operations.",
          order: 1,
          duration: 90,
          parts: [
            {
              title: "Introduction to Analytical and Operational Systems",
              content: `
                In a data-intensive application, systems can be categorized as either **operational** or **analytical**. These two system types have distinct roles:
        
                - **Operational systems** handle real-time business operations, such as processing transactions, updating records, and supporting user-facing applications.
                - **Analytical systems** focus on extracting insights from data, often through complex queries that aggregate large amounts of historical data.
        
                Examples:
                - An e-commerce website's backend service that manages user orders is an operational system.
                - A business intelligence dashboard that generates sales performance reports is an analytical system.
              `,
              order: 1,
              duration: 10,
              exercise: {
                type: "drag-and-drop",
                title: "Match System Characteristics",
                description: "Match each system type with its characteristics",
                points: 10,
                difficulty: "beginner",
                content: {
                  items: [
                    { id: 1, text: "Real-time Processing" },
                    { id: 2, text: "Historical Analysis" },
                    { id: 3, text: "Point Queries" },
                    { id: 4, text: "Bulk Data Processing" }
                  ],
                  targets: [
                    { id: 1, text: "Operational System" },
                    { id: 2, text: "Analytical System" },
                    { id: 3, text: "OLTP" },
                    { id: 4, text: "OLAP" }
                  ],
                  correctPairs: [[1, 1], [2, 2], [3, 3], [4, 4]]
                }
              }
            },
            {
              title: "Characterizing Transaction Processing and Analytics",
              content: `
                Transaction processing and analytics have very different access patterns:
        
                - **Transaction processing** (often referred to as Online Transaction Processing or OLTP) involves fast, low-latency operations on small amounts of data. Examples include retrieving or updating a user's account balance.
                - **Analytical processing** (or Online Analytical Processing, OLAP) involves querying large datasets to produce summary statistics or reports. This includes queries like "What was the total revenue last month?"
        
                The following table summarizes key differences:
        
                | Property            | Operational (OLTP)         | Analytical (OLAP)              |
                |---------------------|-----------------------------|----------------------------------|
                | Read pattern        | Point queries (by key)       | Scans over large data sets       |
                | Write pattern       | Individual updates           | Bulk imports or event streams    |
                | Human user example  | End-user application         | Business analyst dashboard       |
                | Data type           | Current state                | Historical events                |
                | Dataset size        | Gigabytes to terabytes       | Terabytes to petabytes           |
              `,
              order: 2,
              duration: 20,
              exercise: {
                type: "fill-in-blanks",
                title: "Complete the System Characteristics",
                description: "Fill in the blanks to complete the statements about OLTP and OLAP systems",
                points: 15,
                difficulty: "intermediate",
                content: {
                  text: "In [1] systems, data is typically accessed through [2] queries, while [3] systems process [4] amounts of data through aggregation.",
                  blanks: [
                    { id: "1", answer: "OLTP", hint: "Type of system for transactional processing" },
                    { id: "2", answer: "point", hint: "Type of query that accesses specific records" },
                    { id: "3", answer: "OLAP", hint: "Type of system for analytical processing" },
                    { id: "4", answer: "large", hint: "Volume of data processed in analytical systems" }
                  ]
                }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Transaction Processing and Analytics Quiz",
            description: "Test your understanding of OLTP and OLAP systems",
            duration: 15,
            passingScore: 70,
            questions: [
              {
                type: "multiple-choice",
                question: "Which type of system is optimized for processing large datasets and generating reports?",
                options: [
                  "OLTP (Online Transaction Processing)",
                  "OLAP (Online Analytical Processing)",
                  "Both OLTP and OLAP",
                  "Neither OLTP nor OLAP"
                ],
                correctAnswer: "OLAP (Online Analytical Processing)",
                points: 20,
                explanation: "OLAP systems are specifically designed to handle large datasets and complex queries for reporting and analysis purposes."
              },
              {
                type: "true-false",
                question: "OLTP systems typically handle larger datasets than OLAP systems.",
                correctAnswer: "false",
                points: 20,
                explanation: "OLAP systems typically handle much larger datasets (terabytes to petabytes) compared to OLTP systems (gigabytes to terabytes)."
              },
              {
                type: "multiple-choice",
                question: "What is the primary read pattern in OLTP systems?",
                options: [
                  "Bulk data scans",
                  "Point queries by key",
                  "Complex aggregations",
                  "Random access patterns"
                ],
                correctAnswer: "Point queries by key",
                points: 20,
                explanation: "OLTP systems are optimized for point queries that retrieve specific records by their key, supporting fast transaction processing."
              },
              {
                type: "multiple-choice",
                question: "Which system would be most appropriate for a business analyst creating monthly sales reports?",
                options: [
                  "OLTP system",
                  "OLAP system",
                  "Message queue system",
                  "Cache system"
                ],
                correctAnswer: "OLAP system",
                points: 20,
                explanation: "OLAP systems are designed for complex queries and analysis of historical data, making them ideal for generating business reports."
              },
              {
                type: "true-false",
                question: "Write operations in OLTP systems typically involve bulk updates of multiple records.",
                correctAnswer: "false",
                points: 20,
                explanation: "OLTP systems typically handle individual updates to records, while bulk updates are more common in OLAP systems."
              }
            ]
          }
        }
      ],
      endOfChapterQuiz: {
        title: "Chapter 1 Final Quiz",
        description: "Comprehensive test of data-intensive applications concepts",
        duration: 30,
        passingScore: 75,
        questions: [
          {
            type: "multiple-choice",
            question: "What is the primary characteristic of an operational system?",
            options: [
              "Real-time transaction processing",
              "Complex analytical queries",
              "Historical data analysis",
              "Batch processing"
            ],
            correctAnswer: "Real-time transaction processing",
            points: 10,
            explanation: "Operational systems are designed for real-time transaction processing with low latency."
          }
        ]
      }
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
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What does NoSQL commonly mean today?",
                  options: [
                    "No SQL Allowed",
                    "Not Only SQL",
                    "New SQL",
                    "No Scalability Quotient Limits"
                  ],
                  correctAnswer: "Not Only SQL",
                  explanation: "NoSQL stands for 'Not Only SQL', indicating that these databases can work alongside traditional SQL databases."
                }
              }
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
                description: "Match object-oriented concepts with their relational database implementations",
                points: 15,
                difficulty: "intermediate",
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
                  correctPairs: [[1, 1], [2, 2], [3, 3], [4, 4]]
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
                  "It makes queries faster"
                ],
                correctAnswer: "It ensures consistency when updating values",
                points: 10,
                explanation: "Normalized data ensures that when a value needs to be updated, it only needs to be changed in one place."
              }
            ],
            duration: 15,
            passingScore: 70
          }
        },
        {
          title: "Query Languages for Data",
          slug: "query-languages-for-data",
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
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "What is the main advantage of declarative query languages?",
                  options: [
                    "They specify what data you want, not how to get it",
                    "They are faster to execute",
                    "They use less memory",
                    "They are easier to debug"
                  ],
                  correctAnswer: "They specify what data you want, not how to get it",
                  explanation: "Declarative languages allow you to specify the result you want, leaving the database system to determine the best way to execute the query."
                }
              }
            }
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
                explanation: "SQL is indeed a declarative language as it describes what data you want rather than how to get it."
              }
            ]
          }
        }
      ],
      endOfChapterQuiz: {
        title: "Chapter 2 Final Quiz",
        description: "Comprehensive test of Chapter 2",
        duration: 30,
        passingScore: 75,
        questions: [
          {
            type: "multiple-choice",
            question: "Which data model is most suitable for highly interconnected data?",
            options: ["Relational", "Graph", "Document"],
            correctAnswer: "Graph",
            points: 10,
            explanation: "Graph databases are specifically designed to handle highly interconnected data with complex relationships."
          }
        ]
      }
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
        question: "What is the primary advantage of document databases over relational databases?",
        options: [
          "Better schema flexibility",
          "Stronger consistency guarantees",
          "More efficient joins",
          "Lower storage requirements"
        ],
        correctAnswer: "Better schema flexibility",
        points: 20,
        explanation: "Document databases offer better schema flexibility as they don't require a predefined schema structure."
      }
    ]
  },
};
