export const designPatternsCourse = {
  title: "Design Patterns",
  slug: "design-patterns",
  description: "Master software design patterns with real-world examples and practical implementations. Learn how to write maintainable, scalable, and robust code using proven object-oriented design principles.",
  level: "intermediate",
  tags: ["software design", "object-oriented programming", "design patterns", "architecture"],
  book: {
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Gang of Four",
    coverUrl: "/book-cover.jpg",
    amazonUrl: "https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612"
  },
  chapters: [
    {
      title: "Creational Patterns",
      description: "Learn about patterns that deal with object creation mechanisms",
      order: 1,
      lessons: [
        {
          title: "Singleton Pattern",
          slug: "singleton-pattern",
          description: "Master the Singleton pattern, ensuring a class has only one instance and providing a global point of access to it.",
          order: 1,
          duration: 45,
          parts: [
            {
              title: "Introduction to Singleton",
              content: `
                The Singleton pattern is one of the simplest design patterns. It ensures that a class has only one instance and provides a global point of access to that instance.

                Key characteristics:
                - Private constructor
                - Static instance variable
                - Static getInstance method
                - Thread safety considerations

                Use cases:
                - Database connections
                - Configuration managers
                - Logging systems
                - Caching systems
              `,
              order: 1,
              duration: 15,
              exercise: {
                type: "code-challenge",
                title: "Implement Singleton",
                description: "Create a thread-safe Singleton class",
                points: 10,
                difficulty: "beginner",
                content: {
                  instructions: "Implement a thread-safe Singleton class in your preferred language",
                  testCases: [
                    {
                      input: "getInstance()",
                      expected: "Same instance returned on multiple calls"
                    }
                  ]
                }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Singleton Pattern Quiz",
            description: "Test your understanding of the Singleton pattern",
            duration: 15,
            passingScore: 70,
            questions: [
              {
                type: "multiple-choice",
                question: "What is the main purpose of the Singleton pattern?",
                options: [
                  "To create multiple instances of a class",
                  "To ensure a class has only one instance",
                  "To provide a way to clone objects",
                  "To create objects without specifying their exact class"
                ],
                correctAnswer: "To ensure a class has only one instance",
                points: 20
              }
            ]
          }
        },
        {
          title: "Factory Method Pattern",
          slug: "factory-method-pattern",
          description: "Learn how to create objects without specifying their exact classes",
          order: 2,
          duration: 50,
          parts: [
            {
              title: "Understanding Factory Method",
              content: 
                "The Factory Method pattern defines an interface for creating objects but lets subclasses decide which class to instantiate.\n\n" +
                "Key components:\n" +
                "- Creator (abstract class/interface)\n" +
                "- Concrete Creator\n" +
                "- Product (interface)\n" +
                "- Concrete Product\n\n" +
                "Benefits:\n" +
                "- Encapsulates object creation\n" +
                "- Promotes loose coupling\n" +
                "- Supports the Open/Closed Principle",
              order: 1,
              duration: 20,
              exercise: {
                type: "code-challenge",
                title: "Implement Factory Method",
                description: "Create a document editor using the Factory Method pattern",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Implement a document editor that can create different types of documents",
                  testCases: [
                    {
                      input: "createDocument('pdf')",
                      expected: "Returns PDF document instance"
                    }
                  ]
                }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Factory Method Quiz",
            description: "Test your understanding of the Factory Method pattern",
            duration: 15,
            passingScore: 70,
            questions: [
              {
                type: "multiple-choice",
                question: "What is the main advantage of using the Factory Method pattern?",
                options: [
                  "It allows for multiple instances of a class",
                  "It encapsulates object creation",
                  "It provides a way to clone objects",
                  "It ensures a class has only one instance"
                ],
                correctAnswer: "It encapsulates object creation",
                points: 20
              }
            ]
          }
        }
      ],
      endOfChapterQuiz: {
        title: "Creational Patterns Quiz",
        description: "Test your understanding of creational design patterns",
        duration: 30,
        passingScore: 75,
        slug: "design-patterns-chapter-1-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "Which pattern ensures a class has only one instance?",
            options: [
              "Factory Method",
              "Singleton",
              "Builder",
              "Prototype"
            ],
            correctAnswer: "Singleton",
            points: 20
          }
        ]
      }
    },
    {
      title: "Structural Patterns",
      description: "Learn about patterns that deal with object composition",
      order: 2,
      lessons: [
        {
          title: "Adapter Pattern",
          slug: "adapter-pattern",
          description: "Learn how to make incompatible interfaces work together",
          order: 1,
          duration: 45,
          parts: [
            {
              title: "Understanding Adapter",
              content: `
                The Adapter pattern converts the interface of a class into another interface that clients expect.

                Key components:
                - Target (interface clients expect)
                - Adaptee (existing interface)
                - Adapter (converts Adaptee to Target)

                Use cases:
                - Legacy code integration
                - Third-party library adaptation
                - Interface standardization
              `,
              order: 1,
              duration: 20,
              exercise: {
                type: "code-challenge",
                title: "Implement Adapter",
                description: "Create an adapter for a legacy payment system",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Implement an adapter to make a legacy payment system work with a new interface",
                  testCases: [
                    {
                      input: "processPayment(newPayment)",
                      expected: "Legacy payment processed successfully"
                    }
                  ]
                }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Adapter Pattern Quiz",
            description: "Test your understanding of the Adapter pattern",
            duration: 15,
            passingScore: 70,
            questions: [
              {
                type: "multiple-choice",
                question: "What is the main purpose of the Adapter pattern?",
                options: [
                  "To create new objects",
                  "To make incompatible interfaces work together",
                  "To ensure a class has only one instance",
                  "To provide a way to clone objects"
                ],
                correctAnswer: "To make incompatible interfaces work together",
                points: 20
              }
            ]
          }
        }
      ],
      endOfChapterQuiz: {
        title: "Structural Patterns Quiz",
        description: "Test your understanding of structural design patterns",
        duration: 30,
        passingScore: 75,
        slug: "design-patterns-chapter-2-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "Which pattern is used to make incompatible interfaces work together?",
            options: [
              "Adapter",
              "Bridge",
              "Composite",
              "Decorator"
            ],
            correctAnswer: "Adapter",
            points: 20
          }
        ]
      }
    },
    {
      title: "Behavioral Patterns",
      description: "Learn about patterns that deal with object interaction",
      order: 3,
      lessons: [
        {
          title: "Observer Pattern",
          slug: "observer-pattern",
          description: "Learn how to implement a publish-subscribe mechanism",
          order: 1,
          duration: 50,
          parts: [
            {
              title: "Understanding Observer",
              content: `
                The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.

                Key components:
                - Subject (publisher)
                - Observer (subscriber)
                - Concrete Subject
                - Concrete Observer

                Use cases:
                - Event handling systems
                - Model-View-Controller (MVC)
                - Real-time data updates
              `,
              order: 1,
              duration: 20,
              exercise: {
                type: "code-challenge",
                title: "Implement Observer",
                description: "Create a weather station using the Observer pattern",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Implement a weather station that notifies multiple displays when weather data changes",
                  testCases: [
                    {
                      input: "setMeasurements(75, 65, 30.4)",
                      expected: "All displays updated with new measurements"
                    }
                  ]
                }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Observer Pattern Quiz",
            description: "Test your understanding of the Observer pattern",
            duration: 15,
            passingScore: 70,
            questions: [
              {
                type: "multiple-choice",
                question: "What is the main purpose of the Observer pattern?",
                options: [
                  "To create new objects",
                  "To make incompatible interfaces work together",
                  "To define a one-to-many dependency between objects",
                  "To ensure a class has only one instance"
                ],
                correctAnswer: "To define a one-to-many dependency between objects",
                points: 20
              }
            ]
          }
        }
      ],
      endOfChapterQuiz: {
        title: "Behavioral Patterns Quiz",
        description: "Test your understanding of behavioral design patterns",
        duration: 30,
        passingScore: 75,
        slug: "design-patterns-chapter-3-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "Which pattern is used to implement a publish-subscribe mechanism?",
            options: [
              "Observer",
              "Strategy",
              "Command",
              "State"
            ],
            correctAnswer: "Observer",
            points: 20
          }
        ]
      }
    }
  ],
  endOfCourseExam: {
    title: "Design Patterns Final Exam",
    description: "Comprehensive test of all design patterns covered in the course",
    duration: 60,
    passingScore: 80,
    questions: [
      {
        type: "multiple-choice",
        question: "Which pattern ensures a class has only one instance?",
        options: [
          "Factory Method",
          "Singleton",
          "Builder",
          "Prototype"
        ],
        correctAnswer: "Singleton",
        points: 20
      }
    ]
  },
  prerequisites: [
    "Basic understanding of Object-Oriented Programming",
    "Familiarity with at least one OOP language (Java, C++, Python)",
    "Understanding of basic software development principles"
  ],
  learningOutcomes: [
    "Implement all 23 Gang of Four design patterns",
    "Identify which patterns to use in different scenarios",
    "Apply SOLID principles in pattern implementation",
    "Create maintainable and scalable software architectures"
  ],
  estimatedDuration: 780, // 13 hours
  enrolledCount: 2453,
  completionRate: 0,
  rating: {
    average: 4.8,
    count: 0
  }
}; 