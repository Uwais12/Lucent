// /src/app/api/courses/[id]/route.js

export async function GET(req, { params }) {
  // Extract the id from params
  const { id } = params;
  
  const courseLessons = {
    // Existing:
    "design-patterns": [
      {
        id: "singleton",
        title: "Singleton Pattern",
        description: "Ensures a class has only one instance.",
      },
      {
        id: "factory",
        title: "Factory Pattern",
        description: "Creates objects without specifying their exact class.",
      },
    ],
    "system-design": [
      {
        id: "data-warehouse",
        title: "Data Warehousing",
        description: "How to store and analyze big data efficiently.",
      },
      {
        id: "load-balancing",
        title: "Load Balancing",
        description: "Distribute traffic across multiple servers.",
      },
    ],

    // New:
    "advanced-oop-clean-code": [
      {
        id: "oop-intro",
        title: "Intro to Advanced OOP",
        description: "Key OOP concepts, solid principles, and more.",
      },
      {
        id: "clean-code-best-practices",
        title: "Clean Code Best Practices",
        description: "Write readable, maintainable, and testable code.",
      },
      {
        id: "refactoring-techniques",
        title: "Refactoring Techniques",
        description: "Improve existing code without changing behavior.",
      },
    ],
    "multi-threading": [
      {
        id: "thread-basics",
        title: "Thread Basics",
        description: "Understand threads, processes, concurrency.",
      },
      {
        id: "sync-primitives",
        title: "Synchronization Primitives",
        description: "Locks, semaphores, and avoiding race conditions.",
      },
      {
        id: "thread-pools",
        title: "Thread Pools & Executors",
        description: "Manage multiple tasks efficiently.",
      },
    ],
    "functional-programming": [
      {
        id: "fp-intro",
        title: "Functional Programming Intro",
        description: "Key concepts: immutability, pure functions, etc.",
      },
      {
        id: "higher-order-functions",
        title: "Higher-Order Functions",
        description: "Map, filter, reduce, and function composition.",
      },
      {
        id: "monads-functors",
        title: "Monads & Functors",
        description: "Deeper FP patterns (placeholder).",
      },
    ],
    "cloud-computing-devops": [
      {
        id: "aws-basics",
        title: "AWS Basics",
        description: "Intro to popular AWS services (EC2, S3, etc.).",
      },
      {
        id: "docker-kubernetes",
        title: "Docker & Kubernetes",
        description: "Containerization & orchestration fundamentals.",
      },
      {
        id: "cicd-pipelines",
        title: "CI/CD Pipelines",
        description: "Automate build, test, and deployment processes.",
      },
    ],
    "database-design-management": [
      {
        id: "relational-design",
        title: "Relational Database Design",
        description: "Normalization, ER modeling, and SQL basics.",
      },
      {
        id: "no-sql-overview",
        title: "NoSQL Overview",
        description: "Key-Value, Document, Column, and Graph stores.",
      },
      {
        id: "query-optimization",
        title: "Query Optimization",
        description: "Indexes, execution plans, and performance tuning.",
      },
    ],
    "gen-ai": [
      {
        id: "llm-fundamentals",
        title: "LLM Fundamentals",
        description: "Basics of large language models, prompts, tokens.",
      },
      {
        id: "gen-models-overview",
        title: "Generative Models Overview",
        description: "VAEs, GANs, diffusion models, etc.",
      },
    ],
    blockchain: [
      {
        id: "blockchain-intro",
        title: "Blockchain Introduction",
        description: "Core concepts: blocks, distributed ledger, consensus.",
      },
      {
        id: "smart-contracts",
        title: "Smart Contracts",
        description: "Basics of writing and deploying contracts.",
      },
    ],
  };

  return new Response(
    JSON.stringify(courseLessons[id] || []), // Always return an array
    { headers: { "Content-Type": "application/json" } }
  );
}
