// /app/src/api/lessons/[id]/route.js

export async function GET(req, { params }) {
  const lessonDetails = {
    singleton: {
      id: "singleton",
      title: "Singleton Pattern - Extended",
      // NEW FIELD:
      quizReference: "singleton", // <-- Points to your quiz ID "singleton"

      sections: [
        {
          id: "intro",
          title: "What is the Singleton Pattern?",
          content: `
            In software engineering, the Singleton Pattern ensures that a class 
            has only one instance throughout the application lifecycle, and 
            provides a global point of access to that instance.

            It’s often used for managing resources that should be unique within 
            an application: for example, a single database connection or a 
            centralized logger. The key property is that all parts of the code 
            interact with the same instance, preventing inconsistencies and 
            resource duplication.

            While Singletons can be beneficial when used correctly, they must 
            be applied judiciously. Overusing them can lead to tight coupling 
            and hidden dependencies in your codebase.
          `,
          interaction: {
            type: "drag-and-drop",
            question: "Match these key terms with their definitions:",
            options: [
              {
                term: "Singleton",
                definition:
                  "A design pattern ensuring a class has only one instance.",
              },
              {
                term: "Global Access",
                definition:
                  "Allows all parts of the application to share the same instance.",
              },
              {
                term: "Private Constructor",
                definition:
                  "Prevents direct instantiation from outside the class.",
              },
              {
                term: "Static Method",
                definition:
                  "Often used to retrieve the sole instance of the class.",
              },
            ],
          },
        },
        {
          id: "benefits",
          title: "Benefits & Common Use Cases",
          content: `
            Singletons provide a straightforward mechanism for managing 
            shared resources. Because there's only one instance, you can 
            centralize state or functionality without constantly passing 
            around objects. Some common use cases include:

            - **Database connections**: Ensuring only one connection is open 
              at a time, which can improve efficiency and resource handling.
            - **Logging services**: Having a single, shared logger makes it 
              easy to funnel all log messages into one place.
            - **Configuration settings**: Ensuring the application reads from 
              and writes to only one config object, so changes appear 
              everywhere consistently.
          `,
          examples: [
            "Database connections (avoiding multiple open connections).",
            "Logging services (one centralized logger).",
            "Shared configuration settings (avoid reloading config).",
          ],
          interaction: {
            type: "scenario-quiz",
            questions: [
              {
                question: "Would you use a Singleton for a logging service?",
                answer: "Yes",
              },
              {
                question: "Would you use a Singleton for user sessions?",
                answer: "No",
              },
            ],
          },
        },
        {
          id: "implementation",
          title: "Basic Singleton Implementation in Java",
          codeExample: `public class Singleton {
            private static Singleton instance;
            
            private Singleton() {
                // private constructor ensures no direct instantiation
            }
        
            public static Singleton getInstance() {
                if (instance == null) {
                    instance = new Singleton();
                }
                return instance;
            }
        }`,

          content: `
            The simplest form of a Singleton in Java uses a private static 
            instance and a public static method (commonly called getInstance()). 
            
            **Key Parts Explained**:
            1. **private static Singleton instance**: 
               A single, class-level variable that holds the only instance 
               of the Singleton. Declaring it 'static' means it's accessible 
               via the class itself rather than an object instance.

            2. **private Singleton()** (Constructor): 
               Making the constructor private prevents other classes from 
               creating new objects of this type. This is essential in 
               forcing the pattern—no one can instantiate the class except 
               our own code within getInstance().

            3. **public static Singleton getInstance()**: 
               Provides a global access point for retrieving the single 
               instance. If 'instance' is null, it creates a new Singleton. 
               Otherwise, it returns the existing one.

            This approach is easy to understand and implement, but can be 
            problematic in certain environments (especially with multiple 
            threads). We'll discuss that next.
          `,
          interaction: {
            type: "fill-in-the-blanks",
            question:
              "Fill in the missing parts of the Singleton implementation:",
            template: `public class Singleton {
    private static Singleton ________;

    private Singleton() {}

    public static Singleton getInstance() {
        if (________ == null) {
            ________ = new Singleton();
        }
        return ________;
    }
}`,
            answers: ["instance", "instance", "instance"],
          },
        },
        {
          id: "thread-safety",
          title: "Thread Safety & Race Conditions",
          content: `
            The basic implementation checks 'if (instance == null)' before 
            creating the new Singleton object. This works fine in a single-threaded 
            environment. 

            However, imagine two threads calling getInstance() at the same time. 
            Both see that 'instance' is null, and each thread proceeds to create 
            a new Singleton. This results in two different instances being 
            created—exactly what the Singleton pattern is supposed to prevent.

            This race condition can lead to subtle bugs, where different parts 
            of the program might be referencing different Singleton instances. 
            The following sections detail various strategies to make a 
            Singleton thread-safe.
          `,
          interaction: {
            type: "true-false",
            question:
              "The basic Singleton implementation above is thread-safe.",
            answer: "False",
          },
        },
        {
          id: "advanced-implementation",
          title: "Thread-Safe Approaches",
          content: `
            To avoid race conditions, various thread-safe Singleton approaches 
            exist. Each approach balances simplicity, performance, and memory 
            usage differently:
          `,
          subsections: [
            {
              id: "synchronized",
              title: "Synchronized Method",
              content: `
                By marking the getInstance() method with the 'synchronized' 
                keyword, you ensure that only one thread at a time can enter 
                that method. That way, if two threads call getInstance() 
                simultaneously, one must wait for the other to finish before 
                checking and potentially creating the instance.
                
                While this approach solves the concurrency issue, it's not 
                very efficient in high-traffic scenarios: every call to 
                getInstance() is effectively locked, even after the instance 
                has been created.
              `,
              codeExample: `public static synchronized Singleton getInstance() {
    if (instance == null) {
        instance = new Singleton();
    }
    return instance;
}`,
              downside:
                "In a high-traffic scenario, all threads must wait for synchronization, causing potential bottlenecks.",
            },
            {
              id: "eager-initialization",
              title: "Eager Initialization",
              content: `
                In eager initialization, the Singleton instance is created 
                as soon as the class is loaded. This completely sidesteps 
                the need for synchronization since the instance is already 
                in place before any thread can ask for it.

                The downside is that you're creating the instance whether 
                or not it's needed. If the Singleton is large and unused, 
                you're wasting resources. But for small, frequently used 
                objects, it's often the simplest solution and avoids most 
                concurrency issues altogether.
              `,
              codeExample: `public class Singleton {
    private static final Singleton instance = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return instance;
    }
}`,
              downside:
                "Memory is allocated regardless of whether the instance is needed, which can be wasteful if it's never used.",
            },
            {
              id: "double-checked-locking",
              title: "Double-Checked Locking",
              content: `
                This approach tries to combine the benefits of lazy 
                initialization (only create when needed) with minimal 
                synchronization overhead. It does this by checking 'instance == null' 
                twice: once outside the synchronized block and once inside it.

                1. The first check outside the 'synchronized' block prevents 
                   unnecessary locking once the instance is already created.
                2. The second check inside ensures that if two threads happen 
                   to pass the outer check at the same time, only one proceeds 
                   to initialize the instance.

                While more complex, this typically provides a good balance of 
                performance and safety, making it a popular choice for 
                Singleton in multithreaded systems.
              `,
              codeExample: `public static Singleton getInstance() {
    if (instance == null) {
        synchronized (Singleton.class) {
            if (instance == null) {
                instance = new Singleton();
            }
        }
    }
    return instance;
}`,
              downside:
                "Double-checked locking can be tricky to implement correctly and is more complex to read/maintain, but it's efficient once set up properly.",
            },
          ],
          interaction: {
            type: "scenario-quiz",
            questions: [
              {
                question:
                  "Which Singleton method is guaranteed to create the instance at class load time?",
                answer: "Eager Initialization",
              },
              {
                question:
                  "Which approach is typically considered the best balance for performance and thread safety?",
                answer: "Double-Checked Locking",
              },
            ],
          },
        },
        {
          id: "downsides",
          title: "Criticisms & Pitfalls",
          content: `
            While useful, Singletons can be overused. Common criticisms include:
            
            - **Poor Design Hiding**: A global instance can turn into a 
              'god object' that does too many things, or implies hidden 
              dependencies across modules.
            - **Testing Difficulties**: Since the same instance is used 
              globally, mocking or substituting it in tests can be awkward.
            - **Hidden Dependencies**: Code that depends on the Singleton might 
              not be obvious, increasing coupling and making refactoring more 
              difficult.

            Always consider whether a Singleton is genuinely necessary or if a 
            more flexible solution (like Dependency Injection) might be better.
          `,
          interaction: null,
        },
        {
          id: "alternatives",
          title: "Alternatives to Singletons",
          content: `
            Depending on the scenario, other solutions might be more flexible:

            1. **Dependency Injection (DI)** frameworks: 
               Let a DI container manage the lifecycle of shared objects. 
               This removes the global state problem, making testing and 
               substitution easier.

            2. **Service Locators / Context Objects**: 
               Provide a centralized way to look up shared resources. 
               Although similar to Singletons in some ways, they can allow 
               more configurable or multiple instances when needed.

            3. **Module-level singletons** (especially in languages like Python): 
               The module itself can act as a natural singleton, because 
               imports only happen once. This is simpler, but you still need 
               to be mindful of threading or other concurrency issues.
          `,
          interaction: null,
        },
      ],
    },

    factory: {
      id: "factory",
      title: "Factory Pattern",
      sections: [
        // Minimal or empty details
        {
          id: "placeholder",
          title: "Factory Intro",
          content: "Placeholder content about the Factory pattern.",
        },
      ],
    },

    // Now add placeholders for the new lessons:
    "oop-intro": {
      id: "oop-intro",
      title: "Intro to Advanced OOP",
      sections: [
        {
          id: "placeholder-1",
          title: "Placeholder Section 1",
          content: "High-level OOP principles. (TBD)",
        },
        {
          id: "placeholder-2",
          title: "Placeholder Section 2",
          content: "SOLID principles introduction. (TBD)",
        },
      ],
    },
    "clean-code-best-practices": {
      id: "clean-code-best-practices",
      title: "Clean Code Best Practices",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Meaningful names, small functions, etc. (TBD)",
        },
      ],
    },
    "refactoring-techniques": {
      id: "refactoring-techniques",
      title: "Refactoring Techniques",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Refactoring steps & strategies. (TBD)",
        },
      ],
    },

    "thread-basics": {
      id: "thread-basics",
      title: "Thread Basics",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Processes vs. threads, concurrency. (TBD)",
        },
      ],
    },
    "sync-primitives": {
      id: "sync-primitives",
      title: "Synchronization Primitives",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Locks, semaphores, concurrency pitfalls. (TBD)",
        },
      ],
    },
    "thread-pools": {
      id: "thread-pools",
      title: "Thread Pools & Executors",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Managing multiple tasks & resource usage. (TBD)",
        },
      ],
    },

    "fp-intro": {
      id: "fp-intro",
      title: "Functional Programming Intro",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Declarative vs. imperative, immutability. (TBD)",
        },
      ],
    },
    "higher-order-functions": {
      id: "higher-order-functions",
      title: "Higher-Order Functions",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Map, filter, reduce. (TBD)",
        },
      ],
    },
    "monads-functors": {
      id: "monads-functors",
      title: "Monads & Functors",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Maybe monad, functor patterns. (TBD)",
        },
      ],
    },

    "aws-basics": {
      id: "aws-basics",
      title: "AWS Basics",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Intro to EC2, S3, RDS, etc. (TBD)",
        },
      ],
    },
    "docker-kubernetes": {
      id: "docker-kubernetes",
      title: "Docker & Kubernetes",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Containerization fundamentals. (TBD)",
        },
      ],
    },
    "cicd-pipelines": {
      id: "cicd-pipelines",
      title: "CI/CD Pipelines",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Automated builds, tests, deployments. (TBD)",
        },
      ],
    },

    "relational-design": {
      id: "relational-design",
      title: "Relational Database Design",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Normalization, keys, modeling. (TBD)",
        },
      ],
    },
    "no-sql-overview": {
      id: "no-sql-overview",
      title: "NoSQL Overview",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Document DBs, key-value stores, etc. (TBD)",
        },
      ],
    },
    "query-optimization": {
      id: "query-optimization",
      title: "Query Optimization",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Indexes, execution plans, etc. (TBD)",
        },
      ],
    },

    "llm-fundamentals": {
      id: "llm-fundamentals",
      title: "LLM Fundamentals",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Tokens, prompts, base architectures. (TBD)",
        },
      ],
    },
    "gen-models-overview": {
      id: "gen-models-overview",
      title: "Generative Models Overview",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "GANs, VAEs, diffusion models. (TBD)",
        },
      ],
    },

    "blockchain-intro": {
      id: "blockchain-intro",
      title: "Blockchain Introduction",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Blocks, chains, consensus. (TBD)",
        },
      ],
    },
    "smart-contracts": {
      id: "smart-contracts",
      title: "Smart Contracts",
      sections: [
        {
          id: "placeholder",
          title: "Placeholder Section",
          content: "Solidity basics, contract lifecycle. (TBD)",
        },
      ],
    },
  };

  // Return the lesson details or a 404-like response if not found
  return new Response(
    JSON.stringify(lessonDetails[params.id] || { error: "Lesson not found" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
