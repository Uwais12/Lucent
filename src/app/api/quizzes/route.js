// /src/app/api/quizzes/route.js

export async function GET() {
  const quizzes = [
    {
      id: "singleton",
      title: "Singleton Pattern - Comprehensive Quiz",
      description: "Test your knowledge of the Singleton design pattern.",
    },
    {
      id: "factory",
      title: "Factory Pattern Quiz",
      description: "Basic quiz on the Factory design pattern. (TBD)",
    },
    {
      id: "oop-intro-quiz",
      title: "Advanced OOP Intro Quiz",
      description: "Check your advanced OOP basics. (TBD)",
    },
    {
      id: "clean-code-quiz",
      title: "Clean Code Quiz",
      description: "Quick check on best practices. (TBD)",
    },
    {
      id: "multi-threading-quiz",
      title: "Multi-threading Quiz",
      description: "Threads, locks, concurrency scenarios. (TBD)",
    },
    {
      id: "functional-programming-quiz",
      title: "Functional Programming Quiz",
      description: "Test your FP concepts and HOF knowledge. (TBD)",
    },
    {
      id: "cloud-devops-quiz",
      title: "Cloud & DevOps Quiz",
      description: "Covers AWS, Docker, CI/CD pipelines. (TBD)",
    },
    {
      id: "db-design-quiz",
      title: "DB Design & Management Quiz",
      description: "Relational design, NoSQL, optimization. (TBD)",
    },
    {
      id: "gen-ai-quiz",
      title: "Generative AI Fundamentals Quiz",
      description: "Intro to LLMs and generative models. (TBD)",
    },
    {
      id: "blockchain-quiz",
      title: "Blockchain Basics Quiz",
      description: "Blocks, consensus, and smart contracts. (TBD)",
    },
  ];

  return new Response(JSON.stringify(quizzes), {
    headers: { "Content-Type": "application/json" },
  });
}
