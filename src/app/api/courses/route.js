// /src/app/api/courses/route.js

export async function GET() {
  // Expanded list of courses
  const courses = [
    {
      id: "design-patterns",
      title: "Design Patterns",
      description: "Learn software design patterns with real-world examples.",
    },
    {
      id: "system-design",
      title: "System Design",
      description: "Master large-scale system architectures.",
    },
    {
      id: "advanced-oop-clean-code",
      title: "Advanced OOP & Clean Code",
      description: "Refine OOP skills and write maintainable code.",
    },
    {
      id: "multi-threading",
      title: "Multi-threading",
      description: "Handle concurrency, parallelism, and thread safety.",
    },
    {
      id: "functional-programming",
      title: "Functional Programming",
      description: "Leverage immutability and higher-order functions.",
    },
    {
      id: "cloud-computing-devops",
      title: "Cloud Computing & DevOps",
      description:
        "Build, deploy, and manage scalable applications in the cloud.",
    },
    {
      id: "database-design-management",
      title: "Database Design & Management",
      description: "Model, design, and optimize relational/non-relational DBs.",
    },
    {
      id: "gen-ai",
      title: "Generative AI Fundamentals",
      description: "Explore the basics of LLMs and generative models.",
    },
    {
      id: "blockchain",
      title: "Blockchain Basics",
      description: "Understand decentralized ledgers and smart contracts.",
    },
  ];

  return new Response(JSON.stringify(courses), {
    headers: { "Content-Type": "application/json" },
  });
}
