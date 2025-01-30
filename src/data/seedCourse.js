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
          order: 2,
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
                type: "multiple-choice",
                title: "Introduction Quiz",
                description:
                  "Test your understanding of the roles of analytical and operational systems.",
                content: {
                  question:
                    "Which of the following best describes an operational system?",
                  options: [
                    "It scans large datasets to generate reports.",
                    "It handles real-time user interactions and updates data.",
                    "It only stores read-only historical data.",
                  ],
                  correctAnswer:
                    "It handles real-time user interactions and updates data.",
                },
              },
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
                type: "multiple-choice",
                title: "OLTP vs OLAP Scenarios",
                description:
                  "Decide which system type is appropriate for each scenario.",
                content: {
                  questions: [
                    {
                      question:
                        "A customer makes a purchase on an online store. Which type of system processes this transaction?",
                      options: ["Operational system", "Analytical system"],
                      answer: "Operational system",
                    },
                    {
                      question:
                        "A business analyst queries sales data to identify trends over the past year. Which type of system handles this query?",
                      options: ["Operational system", "Analytical system"],
                      answer: "Analytical system",
                    },
                  ],
                },
              },
            },
            {
              title: "Data Warehousing",
              content: `
                **Data warehouses** are designed to handle analytical queries efficiently. They often store data that has been extracted from operational systems and transformed to be more suitable for analysis.
        
                Key features of data warehouses:
                - They store large volumes of historical data.
                - They support complex queries that aggregate or summarize data.
                - They often use columnar storage formats to optimize query performance.
        
                Examples of data warehousing technologies include Amazon Redshift, Google BigQuery, and Snowflake.
              `,
              order: 3,
              duration: 20,
              exercise: {
                type: "multiple-choice",
                title: "Data Warehousing Knowledge Check",
                description: "Fill in the blanks with the correct terms.",
                content: {
                  question:
                    "A data warehouse stores large volumes of ______ data and supports ______ queries.",
                  template:
                    "A data warehouse stores large volumes of ______ data and supports ______ queries.",
                  answers: ["historical", "complex"],
                },
              },
            },
            {
              title: "Systems of Record and Derived Data",
              content: `
                Operational systems often act as **systems of record**, meaning they hold the source of truth for an organization's data. However, this data is frequently transformed to create **derived data** that serves specific analytical purposes.
        
                Derived data may include:
                - Aggregated data, such as monthly sales totals.
                - Materialized views that precompute expensive query results.
                - Machine learning models trained on historical data.
        
                While derived data can improve query performance and support advanced analytics, it comes with trade-offs, such as the need for data synchronization and potential staleness.
              `,
              order: 4,
              duration: 25,
              exercise: {
                type: "multiple-choice",
                title: "Derived Data Understanding",
                description:
                  "Answer questions related to systems of record and derived data.",
                content: {
                  question:
                    "What is one potential downside of using derived data?",
                  options: [
                    "Derived data is always up-to-date.",
                    "Derived data can become stale over time.",
                    "Derived data is slower to query than raw data.",
                  ],
                  correctAnswer: "Derived data can become stale over time.",
                },
              },
            },
          ],
          endOfLessonQuiz: {
            title: "Analytical vs Operational Systems Quiz",
            description:
              "Test your knowledge of analytical and operational systems.",
            duration: 20,
            passingScore: 70,
            questions: [
              {
                type: "multiple-choice",
                question:
                  "Which system is optimized for point queries on individual records?",
                options: ["Operational system", "Analytical system"],
                correctAnswer: "Operational system",
                points: 10,
              },
              {
                type: "short-answer",
                question:
                  "Name two key differences between OLTP and OLAP systems.",
                correctAnswer:
                  "OLTP focuses on point queries and real-time updates, while OLAP performs large-scale scans and aggregates over historical data.",
                points: 15,
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
