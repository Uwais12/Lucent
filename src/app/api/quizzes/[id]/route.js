// /src/app/api/quizzes/[id]/route.js

export async function GET(req, { params }) {
  // Define quiz details for the Singleton quiz.
  // You can add more quizzes for other patterns if you like.
  const quizDetails = {
    singleton: {
      id: "singleton",
      title: "Singleton Pattern - Comprehensive Quiz",
      description: "Test your knowledge of the Singleton design pattern.",
      questions: [
        // 1) Multiple Choice
        {
          id: "q1",
          type: "multiple-choice",
          question:
            "Which of the following best describes the main benefit of the Singleton pattern?",
          options: [
            "Ensures only one instance of a class and provides a global access point.",
            "Improves performance by caching all instances of a class.",
            "Facilitates communication between multiple unrelated classes.",
            "Enables objects to inherit behavior from multiple superclasses.",
          ],
          answer:
            "Ensures only one instance of a class and provides a global access point.",
        },
        // 2) Scenario (also multiple choice)
        {
          id: "q2",
          type: "scenario-quiz",
          question:
            "You have a naive (non-synchronized) Singleton in a multithreaded environment. Two threads call getInstance() at the same time. What is the biggest risk?",
          options: [
            "A memory leak occurs immediately.",
            "You end up creating more than one instance.",
            "The application locks up and never recovers.",
            "It has no effect—Singleton is always safe by default.",
          ],
          answer: "You end up creating more than one instance.",
        },
        // 3) Fill-in-the-blanks
        {
          id: "q3",
          type: "fill-in-the-blanks",
          question:
            "The typical name of the method that returns the Singleton instance is ________.",
          template:
            "The typical name of the method that returns the Singleton instance is ________.",
          answers: ["getInstance"],
        },
        // 4) Multiple Choice
        {
          id: "q4",
          type: "multiple-choice",
          question:
            "Which approach is typically chosen for a high-traffic environment needing lazy initialization and good performance?",
          options: [
            "Eager Initialization",
            "Synchronized getInstance()",
            "Double-Checked Locking",
            "Prototype Pattern",
          ],
          answer: "Double-Checked Locking",
        },
        // 5) True/False
        {
          id: "q5",
          type: "true-false",
          question:
            "Using a Singleton for database connections can help reduce the overhead of opening multiple connections.",
          answer: "True",
        },
      ],
    },

    // Other quizzes with placeholder or minimal data:
    factory: {
      id: "factory",
      title: "Factory Pattern Quiz",
      description: "Basic quiz on the Factory design pattern. (TBD)",
      questions: [], // Will fill later
    },
    "oop-intro-quiz": {
      id: "oop-intro-quiz",
      title: "Advanced OOP Intro Quiz",
      description: "Check your advanced OOP basics. (TBD)",
      questions: [], // placeholder
    },
    "clean-code-quiz": {
      id: "clean-code-quiz",
      title: "Clean Code Quiz",
      description: "Quick check on best practices. (TBD)",
      questions: [],
    },
    "multi-threading-quiz": {
      id: "multi-threading-quiz",
      title: "Multi-threading Quiz",
      description: "Threads, locks, concurrency scenarios. (TBD)",
      questions: [],
    },
    "functional-programming-quiz": {
      id: "functional-programming-quiz",
      title: "Functional Programming Quiz",
      description: "Test your FP concepts. (TBD)",
      questions: [],
    },
    "cloud-devops-quiz": {
      id: "cloud-devops-quiz",
      title: "Cloud & DevOps Quiz",
      description: "AWS, Docker, CI/CD. (TBD)",
      questions: [],
    },
    "db-design-quiz": {
      id: "db-design-quiz",
      title: "DB Design & Management Quiz",
      description: "Relational, NoSQL, optimization. (TBD)",
      questions: [],
    },
    "gen-ai-quiz": {
      id: "gen-ai-quiz",
      title: "Generative AI Fundamentals Quiz",
      description: "Intro to LLMs and generative models. (TBD)",
      questions: [],
    },
    "blockchain-quiz": {
      id: "blockchain-quiz",
      title: "Blockchain Basics Quiz",
      description: "Blocks, consensus, and smart contracts. (TBD)",
      questions: [],
    },
  };

  return new Response(
    JSON.stringify(quizDetails[params.id] || { error: "Quiz not found" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
