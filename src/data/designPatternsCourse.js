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
    // CHAPTER 1 ENHANCED
    {
      title: "Introduction to Design Patterns & Strategy", // Updated Title
      description: "Setting the stage for design patterns. Understanding basic OO principles, why patterns are useful, and exploring the Strategy Pattern.", // Updated Description
      order: 1,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "Welcome to Design Patterns",
          slug: "welcome-to-design-patterns",
          description: "Understand what design patterns are, the problems they solve, and review the core Object-Oriented principles they build upon.",
          order: 1,
          duration: 50,

          parts: [
            {
              title: "What Are Design Patterns?",
              content:
                "Design Patterns are general, reusable solutions to commonly occurring problems within a given context in software design. They are not specific algorithms or code snippets, but rather descriptions or templates for how to solve a problem that can be used in many different situations.\n\nThink of them like blueprints: proven object-oriented solutions refined over time by experienced developers. They address recurring challenges in areas like object creation, structuring classes, and object interaction.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Pattern Essence",
                description: "Select the best description of a design pattern's core nature.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "A Design Pattern represents:",
                  options: [
                    "A) A finished piece of code you can copy and paste.",
                    "B) A formal specification for a specific algorithm.",
                    "C) A well-documented, general solution template for a recurring design problem.",
                    "D) A new programming language feature."
                  ],
                  correctAnswer: "C) A well-documented, general solution template for a recurring design problem.",
                  explanation: "Patterns offer a conceptual solution and vocabulary, not concrete code."
                }
              }
            },
            {
              title: "Why Use Design Patterns?",
              content:
                "Learning and using design patterns offers significant advantages:\n\n* **Proven Solutions:** Patterns capture wisdom and experience, saving you from reinventing solutions to known problems.\n* **Shared Vocabulary:** Designers and developers can communicate more effectively using pattern names (e.g., 'We need a Factory here,' 'The View should be an Observer of the Model').\n* **Improved Code Quality:** Using patterns often leads to more flexible, reusable, maintainable, and understandable object-oriented designs.\n* **Design Skill Enhancement:** Studying patterns exposes you to powerful OO techniques and principles, making you a better designer.",
              order: 2,
              duration: 10,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Communication Benefit",
                 description: "How do patterns aid team communication?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "How do design patterns primarily improve communication among developers?",
                   options: [
                     "A) By enforcing a specific coding style.",
                     "B) By reducing the amount of code written.",
                     "C) By providing a shared vocabulary and understanding of common design solutions.",
                     "D) By automatically generating documentation."
                   ],
                   correctAnswer: "C) By providing a shared vocabulary and understanding of common design solutions.",
                   explanation: "Using pattern names allows developers to convey complex design ideas concisely and accurately."
                 }
              }
            },
            {
              title: "OO Basics Review",
              content:
                "Design patterns leverage fundamental object-oriented principles:\n\n* **Abstraction:** Hiding complex implementation details behind simpler interfaces.\n* **Encapsulation:** Bundling data (attributes) and methods that operate on the data within a single unit (class), and restricting access to internal details.\n* **Inheritance:** Creating new classes (subclasses) that derive properties and behaviors from existing classes (superclasses), allowing for code reuse and specialization (use with caution!).\n* **Polymorphism:** Allowing objects of different classes to respond to the same message (method call) in different ways, often achieved through inheritance and interfaces/abstract classes.",
              order: 3,
              duration: 15,
              exercise: {
                type: "drag-and-drop",
                title: "Mini Exercise: OO Principles Match",
                description: "Match the OO principle to its definition.",
                points: 10,
                difficulty: "beginner",
                content: {
                  items: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"],
                  targets: [
                      "[Hiding implementation details]",
                      "[Bundling data and methods, controlling access]",
                      "[Deriving properties/behavior from a parent class]",
                      "[Objects of different types responding to the same message]"
                      ],
                  correctPairs: [
                    ["Abstraction", "[Hiding implementation details]"],
                    ["Encapsulation", "[Bundling data and methods, controlling access]"],
                    ["Inheritance", "[Deriving properties/behavior from a parent class]"],
                    ["Polymorphism", "[Objects of different types responding to the same message]"]
                  ]
                }
              }
            },
             {
              title: "How to Use This Course (Head First Style)",
              content:
                "This course follows the Head First approach:\n\n* Engaging examples and stories (like the Duck simulator!).\n* Focus on understanding *why* patterns work and *when* to apply them.\n* Emphasis on core design principles.\n* Active learning through exercises, puzzles, and code challenges.\n\nDon't just passively read; engage with the material, try the code, and think through the design choices!",
              order: 4,
              duration: 5,
              // No exercise for this meta-part
            }
          ],
          endOfLessonQuiz: {
            title: "Welcome to Design Patterns Quiz",
            description: "Test your understanding of what patterns are, why they're useful, and the core OO principles.",
            duration: 10, // Adjusted
            passingScore: 75, // Adjusted
            questions: [
              {
                type: "multiple-choice",
                question: "Design patterns primarily provide:",
                options: [
                  "A) Ready-to-use algorithms for specific tasks.",
                  "B) General, reusable solutions to common object-oriented design problems.",
                  "C) A replacement for understanding OO principles.",
                  "D) Language-specific code libraries."
                ],
                correctAnswer: "B) General, reusable solutions to common object-oriented design problems.",
                points: 10
              },
              {
                type: "true-false",
                question: "Using design patterns eliminates the need to understand core OO principles like Encapsulation and Polymorphism.",
                options: ["true", "false"],
                correctAnswer: "false",
                points: 10,
                explanation: "Design patterns heavily rely on and exemplify core OO principles."
              },
              {
                type: "short-answer",
                question: "What OO principle involves hiding implementation details behind a simpler interface?",
                correctAnswer: "Abstraction", // Case-insensitive
                points: 10
              },
              {
                type: "multiple-choice",
                question: "A key benefit of using design patterns in a team environment is:",
                options: [
                    "A) Reducing the need for code reviews.",
                    "B) Providing a shared vocabulary for discussing design.",
                    "C) Ensuring all code looks identical.",
                    "D) Making code run faster."
                ],
                correctAnswer: "B) Providing a shared vocabulary for discussing design.",
                points: 10
              }
            ]
          }
        },
        // ---------------------------
        // LESSON 2 - ENHANCED
        // ---------------------------
        {
          title: "Essential Design Principles",
          slug: "essential-design-principles",
          description: "Learn fundamental design principles that underpin many patterns, such as encapsulating change, programming to interfaces, and favoring composition.",
          order: 2,
          duration: 55, // Adjusted

          parts: [
            {
              title: "Principle 1: Identify What Varies",
              content:
                "**Design Principle:** Identify the aspects of your application that vary and separate them from what stays the same.\n\nThis is a cornerstone of good design. If you have behavior that changes frequently or differs among subtypes (like the flying behavior of different ducks), encapsulate that behavior into its own set of classes rather than putting conditional logic or varying implementations directly into the main class or its superclass.\n\nBy separating what changes, you make your system easier to extend and modify later without breaking existing code that relies on the stable parts.",
              order: 1,
              duration: 15,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Encapsulating Change",
                description: "Identify the core idea behind separating varying aspects.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What is the primary goal of separating the parts of your code that vary?",
                  options: [
                    "A) To make the code shorter.",
                    "B) To make the system more adaptable to future changes without modifying stable code.",
                    "C) To ensure compatibility with older hardware.",
                    "D) To improve single-method performance."
                    ],
                  correctAnswer: "B) To make the system more adaptable to future changes without modifying stable code.",
                  explanation: "Encapsulating what varies minimizes the impact of changes on the rest of the system."
                }
              }
            },
            {
              title: "Principle 2: Program to an Interface, Not an Implementation",
              content:
                "**Design Principle:** Program to an interface (or abstract superclass), not an implementation (concrete class).\n\nThis means depending on abstract types rather than concrete ones when possible, especially for parts of the system that vary.\n\n* **Example:** Instead of `Duck d = new MallardDuck();`, use `Duck d = new MallardDuck();` where `Duck` is an interface or abstract class. Better yet, when associating behaviors: instead of `MallardDuck md = new MallardDuck(); md.flyBehavior = new FlyWithWings();`, use `FlyBehavior fb = new FlyWithWings(); duck.setFlyBehavior(fb);`. The `duck` variable holds a `Duck` type, and interacts with a `FlyBehavior` type, not concrete implementations.\n\n* **Benefit:** Promotes loose coupling. Your code interacts with the *contract* defined by the interface, allowing different concrete implementations to be swapped in without changing the client code.",
              order: 2,
              duration: 15,
              exercise: {
                type: "fill-in-blanks",
                title: "Mini Exercise: Interface Programming",
                description: "Complete the principle statement.",
                points: 10,
                difficulty: "beginner",
                content: {
                  // Properly escaped newlines for JS string
                  text: "The principle 'Program to an [1], not an [2]' promotes loose coupling by making code depend on abstract contracts rather than concrete details.",
                  blanks: [
                    { id: "1", answer: "interface" }, // or abstraction
                    { id: "2", answer: "implementation" } // or concrete class
                  ]
                }
              }
            },
            {
              title: "Principle 3: Favor Composition over Inheritance",
              content:
                "**Design Principle:** Favor composition over inheritance.\n\nWhile inheritance is a powerful OO tool (`IS-A` relationship), relying heavily on it can lead to rigid hierarchies and unintended side effects when superclasses change.\n\n**Composition** (`HAS-A` relationship) involves building complex objects by combining simpler ones. Instead of inheriting behavior, an object holds references to other objects that implement specific behaviors (like the Duck holding references to `FlyBehavior` and `QuackBehavior` objects).\n\n* **Benefits:**\n    * More flexible - behaviors can be changed at runtime.\n    * Avoids problems of deep or inappropriate inheritance hierarchies.\n    * Encapsulates families of algorithms (Strategy pattern!).",
              order: 3,
              duration: 15,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Composition Advantage",
                description: "Identify a key benefit of composition.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "Favoring composition over inheritance often leads to systems that are:",
                  options: [
                      "A) Faster at runtime.",
                      "B) Easier to understand for beginners.",
                      "C) More flexible and allow changing behavior at runtime.",
                      "D) Tightly coupled."
                      ],
                  correctAnswer: "C) More flexible and allow changing behavior at runtime.",
                  explanation: "Composition allows plugging in different behavior objects, even dynamically."
                }
              }
            },
             {
              title: "Other Key Principles (Briefly)",
              content:
                "These principles work together and are reinforced by patterns:\n\n* **Strive for Loosely Coupled Designs:** Minimize dependencies between objects. Changes in one part should have minimal impact elsewhere.\n* **Open/Closed Principle:** Classes should be open for extension, but closed for modification. Allow new behavior via composition or subclassing without altering existing code.\n* **Dependency Inversion Principle:** Depend on abstractions, not concretions. High-level modules should not depend on low-level modules; both should depend on abstractions. (Related to Factory patterns).\n\nWe'll see these principles applied throughout the course.",
              order: 4,
              duration: 10,
              // No exercise for this overview part
            }
          ],
          endOfLessonQuiz: {
            title: "Design Principles Quiz",
            description: "Test your understanding of key OO design principles like encapsulation of change, interface programming, and composition.",
            duration: 15, // Adjusted
            passingScore: 75,
            questions: [
              {
                type: "multiple-choice",
                question: "The principle 'Identify the aspects of your application that vary and separate them from what stays the same' primarily aims to:",
                options: [
                  "A) Increase code duplication.",
                  "B) Make the system easier to maintain and extend by isolating changes.",
                  "C) Ensure all classes have public methods.",
                  "D) Reduce the number of classes needed."
                  ],
                correctAnswer: "B) Make the system easier to maintain and extend by isolating changes.",
                points: 10
              },
              {
                type: "multiple-choice",
                question: "Programming to an interface (instead of an implementation) primarily promotes:",
                options: ["A) Tighter coupling", "B) Faster execution", "C) Loose coupling", "D) Concrete dependencies"],
                correctAnswer: "C) Loose coupling",
                points: 10,
                explanation: "Depending on abstractions makes your code less dependent on specific concrete classes."
              },
              {
                type: "true-false",
                question: "Favoring composition over inheritance means you should never use inheritance.",
                options: ["true", "false"],
                correctAnswer: "false",
                points: 10,
                explanation: "Inheritance still has its place, but composition often provides more flexibility for adding or changing behavior."
              },
              {
                 type: "short-answer",
                 question: "Which principle states that classes should be open for extension but closed for modification?",
                 correctAnswer: "Open/Closed Principle", // Case-insensitive
                 points: 10
               }
            ]
          }
        },
        // ---------------------------
        // LESSON 3 - ENHANCED
        // ---------------------------
        {
          title: "The Strategy Pattern",
          slug: "strategy-pattern",
          description: "Implement the Strategy pattern to encapsulate algorithms and make them interchangeable, applying key design principles.",
          order: 3,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Problem: Changing Duck Behaviors",
              content:
                "Consider a Duck simulation app. Initially, all ducks might share `fly()` and `quack()` methods in a `Duck` superclass. But what happens when requirements change?\n\n* Some ducks shouldn't fly (Rubber ducks).\n* Some quack differently (Squeak, Mute).\n* We might want to add new behaviors later (Rocket-powered flying!).\n\nPutting all behavior variations directly in the `Duck` superclass or using inheritance for *every* variation leads to problems: code duplication, rigidity, and unintended side effects when changing superclass methods.",
              order: 1,
              duration: 10,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Inheritance Issue",
                 description: "Why is inheriting fly() problematic for a RubberDuck?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "If a `RubberDuck` class inherits from a `Duck` superclass that has a `fly()` method implementing wing-flapping, what is the main problem?",
                   options: [
                       "A) The `fly()` method is too slow.",
                       "B) The `RubberDuck` incorrectly gains the ability to fly.",
                       "C) The `Duck` superclass becomes too large.",
                       "D) Inheritance cannot be used for ducks."
                       ],
                   correctAnswer: "B) The `RubberDuck` incorrectly gains the ability to fly.",
                   explanation: "Inheritance forces subclasses to take on potentially inappropriate superclass behaviors."
                 }
              }
            },
            {
              title: "Solution: Encapsulating Algorithms (Strategy)",
              content:
                "Applying our design principles:\n\n1.  **Identify what varies:** Flying behavior and quacking behavior vary among ducks.\n2.  **Separate (Encapsulate) it:** Create separate families of algorithms (classes) for flying and quacking.\n    * Define a `FlyBehavior` interface with a `fly()` method.\n    * Create concrete classes like `FlyWithWings`, `FlyNoWay`.\n    * Define a `QuackBehavior` interface with a `quack()` method.\n    * Create concrete classes like `Quack`, `Squeak`, `MuteQuack`.\n3.  **Program to an Interface:** The `Duck` class will hold *references* to `FlyBehavior` and `QuackBehavior` objects (instance variables).\n4.  **Favor Composition:** Instead of inheriting behavior, the `Duck` class *delegates* flying and quacking to its behavior objects.\n\n```java\n// Example structure (pseudo-code)\ninterface FlyBehavior { void fly(); }\nclass FlyWithWings implements FlyBehavior { ... }\nclass FlyNoWay implements FlyBehavior { ... }\n\ninterface QuackBehavior { void quack(); }\nclass Quack implements QuackBehavior { ... }\nclass Squeak implements QuackBehavior { ... }\n\nabstract class Duck {\n  FlyBehavior flyBehavior;\n  QuackBehavior quackBehavior;\n\n  void performFly() { flyBehavior.fly(); }\n  void performQuack() { quackBehavior.quack(); }\n\n  // Allow changing behavior dynamically\n  void setFlyBehavior(FlyBehavior fb) { this.flyBehavior = fb; }\n  void setQuackBehavior(QuackBehavior qb) { this.quackBehavior = qb; }\n}\n\nclass MallardDuck extends Duck {\n  MallardDuck() {\n    flyBehavior = new FlyWithWings();\n    quackBehavior = new Quack();\n  }\n}\n```",
              order: 2,
              duration: 25, // Increased
               exercise: {
                 type: "code-challenge",
                 title: "Implement Strategy (Conceptual)",
                 description: "Refactor a simple Duck class to use Strategy for flying.",
                 points: 15,
                 difficulty: "intermediate",
                 content: {
                   instructions: "Given a basic `Duck` class with a `fly()` method, refactor it using the Strategy pattern principles: Define a `FlyBehavior` interface, create `FlyWithWings` and `FlyNoWay` implementations, modify `Duck` to hold a `FlyBehavior` reference and delegate `performFly()` to it. Show the structure in pseudocode or your preferred language.",
                   // No automated test cases possible without actual code execution environment
                   testCases: [ { input: "Conceptual Implementation", expected: "Duck class delegates flying to a separate FlyBehavior object."}]
                 }
               }
            },
            {
              title: "The Strategy Pattern Defined",
              content:
                "**Strategy Pattern:** Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.\n\n* **Benefits:**\n    * Provides an alternative to subclassing for varying behavior.\n    * Keeps algorithm logic separate from the context class (`Duck`).\n    * Allows changing algorithms dynamically at runtime.\n    * Promotes Open/Closed Principle (add new behaviors without modifying `Duck`).\n\nThis pattern is fundamental for creating flexible and maintainable systems where parts of an algorithm need to vary.",
              order: 3,
              duration: 15,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Strategy Goal",
                 description: "What is the core intent of the Strategy pattern?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "The Strategy pattern primarily allows you to:",
                   options: [
                     "A) Ensure only one instance of a class exists.",
                     "B) Adapt an existing interface to a new one.",
                     "C) Define a family of algorithms and make them interchangeable at runtime.",
                     "D) Simplify a complex subsystem with a single interface."
                     ],
                   correctAnswer: "C) Define a family of algorithms and make them interchangeable at runtime.",
                   explanation: "It encapsulates varying algorithms (strategies) and lets the client choose or change them."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Strategy Pattern Quiz",
            description: "Test your understanding of the Strategy pattern's intent, structure, and benefits, using the Duck example.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                type: "multiple-choice",
                question: "In the Duck example, `FlyBehavior` and `QuackBehavior` represent the application of which design principle?",
                options: [
                    "A) Favor inheritance over composition",
                    "B) Program to an implementation, not an interface",
                    "C) Identify aspects that vary and separate them",
                    "D) Strive for tightly coupled designs"
                ],
                correctAnswer: "C) Identify aspects that vary and separate them",
                points: 10,
                explanation: "Flying and quacking were identified as the behaviors that varied among ducks and were encapsulated."
              },
              {
                type: "multiple-choice",
                question: "How does the `Duck` class use its `FlyBehavior` object?",
                options: [
                    "A) It inherits the `fly()` method directly.",
                    "B) It checks the type of the behavior object and calls a specific method.",
                    "C) It delegates the `performFly()` call to the `fly()` method of its `flyBehavior` object.",
                    "D) It creates a new `FlyBehavior` object every time it needs to fly."
                ],
                correctAnswer: "C) It delegates the `performFly()` call to the `fly()` method of its `flyBehavior` object.",
                points: 10,
                explanation: "This delegation through composition is central to the Strategy pattern."
              },
              {
                type: "true-false",
                question: "The Strategy pattern allows an object's behavior (like how a Duck flies) to be changed at runtime.",
                options: ["true", "false"],
                correctAnswer: "true",
                points: 10,
                explanation: "By changing the behavior object the Duck holds (e.g., via `setFlyBehavior`), its behavior can be altered dynamically."
              }
              //  {
              //    type: "short-answer",
              //    question: "What is the general intent of the Strategy pattern?",
              //    correctAnswer: "Define a family of algorithms, encapsulate each one, and make them interchangeable.", // Variations acceptable
              //    points: 10
              //  }
            ]
          }
        }
      ], // end lessons in Chapter 1
      endOfChapterQuiz: {
        title: "Chapter 1 Quiz: Introduction & Strategy",
        description: "Test your understanding of patterns, OO principles, and the Strategy pattern.",
        duration: 20, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-1-quiz",
        questions: [
          { // Existing Q1, slightly rephrased
            type: "multiple-choice",
            question: "Which design principle suggests encapsulating aspects that change frequently?",
            options: [
              "A) Program to an interface, not an implementation",
              "B) Favor composition over inheritance",
              "C) Identify what varies and separate it",
              "D) Strive for loosely coupled designs"
            ],
            correctAnswer: "C) Identify what varies and separate it",
            points: 10
          },
          { // New
            type: "multiple-choice",
            question: "The Strategy pattern primarily uses which OO relationship to achieve its flexibility?",
            options: [
              "A) Inheritance (`IS-A`)",
              "B) Composition (`HAS-A`)",
              "C) Aggregation",
              "D) Association"
            ],
            correctAnswer: "B) Composition (`HAS-A`)",
            points: 10,
            explanation: "The context object (Duck) HAS-A behavior object (Strategy) and delegates to it."
          },
          { // New
             type: "true-false",
             question: "Design patterns are concrete code libraries that can be directly imported and used.",
             options: ["true", "false"],
             correctAnswer: "false",
             points: 10,
             explanation: "Patterns are conceptual templates or solutions, not specific code implementations."
           },
           { // New
             type: "short-answer",
             question: "What OO principle allows objects of different types (like `MallardDuck` and `RubberDuck`) to be treated uniformly through a common supertype (`Duck`)?",
             correctAnswer: "Polymorphism", // Case-insensitive
             points: 10
           }
        ]
      }
    },

    // ---------------------------
    {
      title: "The Observer Pattern", // Chapter dedicated to Observer
      description: "Learn how objects can notify dependents automatically when their state changes, promoting loose coupling with the Observer pattern.",
      order: 2,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "Keeping Objects Informed: The Observer Pattern",
          slug: "observer-pattern",
          description: "Implement a publish-subscribe mechanism where objects (Observers) are notified automatically by another object (Subject) when its state changes.",
          order: 1,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Problem: The Weather Station",
              content:
                "Imagine a `WeatherData` object that gets updated sensor readings (temperature, humidity, pressure). Multiple display elements (Current Conditions, Statistics, Forecast) need to be updated whenever the `WeatherData` changes.\n\nA naive approach might have the `WeatherData` object directly call update methods on each display object. \n\n* **Problems:**\n    * Tight coupling: `WeatherData` needs to know about specific display classes.\n    * Violates Open/Closed Principle: Adding a new display requires modifying `WeatherData`.\n    * Difficult to manage dependencies.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Tight Coupling Issue",
                description: "Why is it bad if WeatherData knows about specific display types?",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What is the main disadvantage if the `WeatherData` object directly calls methods on concrete display classes like `CurrentConditionsDisplay`?",
                  options: [
                    "A) It improves performance.",
                    "B) It creates tight coupling, making it hard to add new display types without changing `WeatherData`.",
                    "C) It simplifies the design.",
                    "D) It ensures data consistency."
                  ],
                  correctAnswer: "B) It creates tight coupling, making it hard to add new display types without changing `WeatherData`.",
                  explanation: "Direct dependencies make the system rigid and hard to extend."
                }
              }
            },
            {
              title: "Solution: The Observer Pattern Structure",
              content:
                "The Observer pattern introduces loose coupling:\n\n1.  **Subject Interface:** Defines methods for registering (`registerObserver`), removing (`removeObserver`), and notifying observers (`notifyObservers`).\n2.  **Observer Interface:** Defines the update method (`update`) that observers must implement, which the Subject calls during notification.\n3.  **Concrete Subject (`WeatherData`):** Implements the Subject interface. Holds a list of registered Observers. When its state changes (e.g., `setMeasurements`), it calls `notifyObservers`.\n4.  **Concrete Observers (Displays):** Implement the Observer interface. Register themselves with the Subject. Their `update` method pulls the data they need from the Subject when notified.\n\n```java\n// Example structure (pseudo-code)\ninterface Subject { registerObserver(o); removeObserver(o); notifyObservers(); }\ninterface Observer { update(subjectState); }\n\nclass WeatherData implements Subject {\n  List<Observer> observers;\n  float temp, humidity, pressure;\n\n  registerObserver(o) { observers.add(o); }\n  removeObserver(o) { observers.remove(o); }\n  notifyObservers() {\n    for (o in observers) { o.update(this.getState()); }\n  }\n\n  setMeasurements(t, h, p) {\n    this.temp = t; this.humidity = h; this.pressure = p;\n    measurementsChanged();\n  }\n  measurementsChanged() { notifyObservers(); }\n  // getState() method to provide state to observers\n}\n\nclass CurrentConditionsDisplay implements Observer {\n  Subject weatherData;\n  CurrentConditionsDisplay(s) { this.weatherData = s; s.registerObserver(this); }\n  update(state) { /* Get temp/humidity from state and display */ }\n}\n```\nThis decouples the Subject from Concrete Observers.",
              order: 2,
              duration: 25, // Increased
              exercise: {
                type: "code-challenge",
                title: "Implement Observer (Conceptual)",
                description: "Outline the Weather Station Observer pattern implementation.",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Define the `Subject` and `Observer` interfaces. Show the structure of the `WeatherData` (ConcreteSubject) including registration/notification methods, and a `CurrentConditionsDisplay` (ConcreteObserver) including its `update` method. Use pseudocode or your preferred language.",
                  // No automated test cases possible without actual code execution environment
                  testCases: [{ input: "Conceptual Implementation", expected: "Subject notifies Observers via update method without knowing concrete Observer types."}]
                }
              }
            },
            {
              title: "The Observer Pattern Defined",
              content:
                "**Observer Pattern:** Defines a one-to-many dependency between objects so that when one object (the **Subject** or Publisher) changes state, all its dependents (**Observers** or Subscribers) are notified and updated automatically.\n\n* **Benefits:**\n    * Loose Coupling: Subject knows observers only via the Observer interface.\n    * Broadcast Communication: Simplifies sending updates to multiple interested parties.\n    * Extensibility: Easily add new Observers without modifying the Subject.\n* **Variations:** Push vs. Pull model for data updates (Subject pushes data vs. Observer pulls data in `update`).\n* **Java Support:** `java.util.Observer` and `Observable` are deprecated; modern Java often uses `PropertyChangeEvent` / `PropertyChangeListener` or event bus libraries.",
              order: 3,
              duration: 15,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Observer Benefit",
                 description: "Identify a key advantage of the Observer pattern.",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "A major benefit of the Observer pattern is that it promotes:",
                   options: [
                       "A) Tight coupling between subject and observers.",
                       "B) Faster performance for state updates.",
                       "C) Loose coupling, allowing subjects and observers to vary independently.",
                       "D) A reduction in the number of objects needed."
                       ],
                   correctAnswer: "C) Loose coupling, allowing subjects and observers to vary independently.",
                   explanation: "The subject doesn't need to know the concrete classes of its observers, only that they implement the Observer interface."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Observer Pattern Quiz",
            description: "Test your understanding of the Observer pattern's structure, participants (Subject, Observer), and benefits like loose coupling.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                type: "multiple-choice",
                question: "In the Observer pattern, who initiates the notification process?",
                options: [
                  "A) The Observer",
                  "B) The Subject",
                  "C) An external coordinator",
                  "D) The client code"
                  ],
                correctAnswer: "B) The Subject",
                points: 10,
                explanation: "The Subject notifies its registered Observers when its state changes."
              },
              {
                type: "multiple-choice",
                question: "What method must all Concrete Observers implement according to the Observer interface?",
                options: ["A) register()", "B) notify()", "C) update()", "D) getState()"],
                correctAnswer: "C) update()",
                points: 10,
                explanation: "The `update()` method is the standard way for the Subject to inform the Observer of a change."
              },
              {
                type: "true-false",
                question: "The Observer pattern requires the Subject to know the concrete classes of all its Observers.",
                options: ["true", "false"],
                correctAnswer: "false",
                points: 10,
                explanation: "The Subject only needs to know that observers implement the Observer interface, promoting loose coupling."
              },
               {
                 type: "short-answer",
                 question: "The Observer pattern defines a ______-to-______ dependency between objects.",
                 correctAnswer: "one, many", // Case-insensitive, allow variations
                 points: 10,
                 explanation: "One Subject can have multiple Observers dependent on its state."
               }
            ]
          }
        }
      ], // end lessons in Chapter 2
      endOfChapterQuiz: { // Chapter quiz now only covers Observer
        title: "Chapter 2 Quiz: Observer Pattern",
        description: "Test your understanding of the Observer (Publish-Subscribe) pattern.",
        duration: 15, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-2-quiz", // Keep slug or update if needed
        questions: [
           { // Existing Q1, adapted
             type: "multiple-choice",
             question: "Which pattern defines a one-to-many dependency where state changes in one object trigger updates in many others?",
             options: ["Strategy", "Observer", "Decorator", "Facade"],
             correctAnswer: "Observer",
             points: 10
           },
           { // New
             type: "multiple-choice",
             question: "In the Weather Station example, the `WeatherData` object plays the role of the:",
             options: ["A) Concrete Observer", "B) Concrete Subject", "C) Client", "D) Decorator"],
             correctAnswer: "B) Concrete Subject",
             points: 10,
             explanation: "It's the object whose state changes and notifies observers."
           },
            { // New
             type: "multiple-choice",
             question: "What is a primary advantage of the loose coupling provided by the Observer pattern?",
             options: [
               "A) Improved performance",
               "B) Reduced memory usage",
               "C) Ability to add new observers without changing the subject",
               "D) Stronger type checking"
               ],
             correctAnswer: "C) Ability to add new observers without changing the subject",
             points: 10,
             explanation: "This enhances maintainability and extensibility."
           }
        ]
      }
    },
    // ========================================
    // CHAPTER 3 - ENHANCED (Decorator Pattern)
    // ========================================
    {
      title: "The Decorator Pattern",
      description: "Learn how to add responsibilities to objects dynamically and transparently, without resorting to subclassing for every variation.",
      order: 3,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "Decorating Objects",
          slug: "decorator-pattern",
          description: "Explore the Decorator pattern using the classic coffee shop example. Understand how wrappers add behavior while conforming to the same interface.",
          order: 1,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Problem: Exploding Class Hierarchies (Coffee Shop)",
              content:
                "Imagine a coffee shop system. You start with beverage classes like `HouseBlend`, `DarkRoast`, `Espresso`, `Decaf`. Now, you need to add condiments like steamed milk, soy, mocha, whipped cream. \n\nIf you use inheritance, you might create subclasses like `HouseBlendWithSteamedMilk`, `HouseBlendWithMocha`, `HouseBlendWithSteamedMilkAndMocha`, etc. This leads to a **class explosion**! The number of classes grows rapidly with each new beverage or condiment, becoming unmanageable.\n\nFurthermore, calculating the cost becomes complex, potentially requiring changes in the base `Beverage` class whenever a new condiment is added, violating the Open/Closed Principle.",
              order: 1,
              duration: 15,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Subclassing Problem",
                description: "Identify the main issue with using inheritance for condiments.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What is the main problem with creating subclasses for every possible beverage and condiment combination?",
                  options: [
                    "A) It improves performance.",
                    "B) It leads to a massive explosion of classes that is hard to manage.",
                    "C) It simplifies the calculation of costs.",
                    "D) It makes the system more loosely coupled."
                    ],
                  correctAnswer: "B) It leads to a massive explosion of classes that is hard to manage.",
                  explanation: "The combinatorial possibilities make a pure inheritance approach impractical and inflexible."
                }
              }
            },
            {
              title: "Solution: The Decorator Pattern Structure",
              content:
                "The Decorator pattern offers a flexible alternative to subclassing for extending functionality.\n\n1.  Start with your base component interface/abstract class (e.g., `Beverage` with `getDescription()` and `cost()` methods).\n2.  Create concrete component classes (e.g., `HouseBlend`, `Espresso`).\n3.  Create an abstract **Decorator** class that also implements the `Beverage` interface. It HAS-A reference (composition) to a `Beverage` object (the object being decorated).\n4.  Create concrete **Decorator** classes (e.g., `Milk`, `Mocha`, `Whip`) that extend the abstract Decorator.\n    * Each concrete decorator wraps another `Beverage` (which could be a concrete beverage or another decorator).\n    * They override methods like `getDescription()` and `cost()`, first delegating the call to the wrapped object, then adding their own description or cost.\n\n```java\n// Example structure (pseudo-code)\nabstract class Beverage {\n  String description = \"Unknown Beverage\";\n  abstract double cost();\n  String getDescription() { return description; }\n}\n\nclass HouseBlend extends Beverage {\n  HouseBlend() { description = \"House Blend Coffee\"; }\n  cost() { return .89; }\n}\n\nabstract class CondimentDecorator extends Beverage {\n  Beverage beverage; // HAS-A Beverage\n  // Must re-implement getDescription() (often abstract here)\n}\n\nclass Mocha extends CondimentDecorator {\n  Mocha(Beverage beverage) { this.beverage = beverage; }\n  getDescription() { return beverage.getDescription() + \", Mocha\"; }\n  cost() { return beverage.cost() + .20; }\n}\n\n// Usage:\nBeverage beverage = new Espresso();\nbeverage = new Mocha(beverage); // Wrap Espresso with Mocha\nbeverage = new Whip(beverage);  // Wrap Mocha with Whip\n// Now beverage.cost() and beverage.getDescription() work correctly.\n```\nThis allows mixing and matching condiments dynamically.",
              order: 2,
              duration: 25, // Increased
              exercise: {
                type: "code-challenge",
                title: "Implement Decorator (Conceptual)",
                description: "Outline the classes needed for a 'DarkRoast with Soy and Whip' using the Decorator pattern.",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Define the abstract `Beverage` and `CondimentDecorator` classes/interfaces. Show concrete classes `DarkRoast`, `Soy`, and `Whip`, demonstrating how they extend/implement the abstracts and how `Soy` and `Whip` wrap a Beverage. Finally, show how you'd instantiate the final decorated object. Use pseudocode or your preferred language.",
                  testCases: [{ input: "Conceptual Implementation", expected: "Demonstrates wrapping a DarkRoast with Soy, then Whip, and calling cost()/getDescription()."}]
                }
              }
            },
            {
              title: "The Decorator Pattern Defined",
              content:
                "**Decorator Pattern:** Attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.\n\n* **Key Idea:** Decorators have the same supertype as the objects they decorate (allowing them to be used interchangeably) and wrap the object they decorate (composition).\n* **Benefits:**\n    * Flexibility: Add/remove responsibilities at runtime.\n    * Avoids feature-laden superclasses or class explosion.\n    * Follows Open/Closed Principle: Extend behavior without modifying existing component code.\n* **Drawbacks:** Can lead to many small objects, potentially complex to configure.\n* **Real-world Example:** Java I/O classes (`FileInputStream` decorated by `BufferedInputStream`, then maybe `DataInputStream`).",
              order: 3,
              duration: 15,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Decorator Goal",
                 description: "What is the primary intent of the Decorator pattern?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "The Decorator pattern's main goal is to:",
                   options: [
                     "A) Simplify the interface of a complex system.",
                     "B) Ensure only one instance of a class is created.",
                     "C) Define a skeleton of an algorithm.",
                     "D) Add responsibilities to objects dynamically without subclassing."
                     ],
                   correctAnswer: "D) Add responsibilities to objects dynamically without subclassing.",
                   explanation: "It uses composition and interface conformance to 'wrap' objects with new behavior."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Decorator Pattern Quiz",
            description: "Test your understanding of the Decorator pattern's structure, intent, benefits (like OCP), and drawbacks.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                type: "multiple-choice",
                question: "How does the Decorator pattern relate to the Open/Closed Principle?",
                options: [
                  "A) It violates the principle.",
                  "B) It helps adhere to the principle by allowing extension without modifying existing code.",
                  "C) It has no relation to the principle.",
                  "D) It requires modifying base classes to add new decorators."
                  ],
                correctAnswer: "B) It helps adhere to the principle by allowing extension without modifying existing code.",
                points: 10,
                explanation: "New decorators (functionality) can be added without changing the core component classes."
              },
              {
                type: "multiple-choice",
                question: "In the Decorator pattern, both the Concrete Components (e.g., `Espresso`) and Concrete Decorators (e.g., `Mocha`) share a common:",
                options: ["A) Superclass or Interface", "B) Static instance variable", "C) Private constructor", "D) Set of utility methods"],
                correctAnswer: "A) Superclass or Interface",
                points: 10,
                explanation: "This common type (e.g., `Beverage`) allows decorators to wrap components and other decorators interchangeably."
              },
              {
                type: "true-false",
                question: "The Decorator pattern primarily uses inheritance to add responsibilities to objects.",
                options: ["true", "false"],
                correctAnswer: "false",
                points: 10,
                explanation: "Decorator relies on composition (wrapping) and interface implementation, not implementation inheritance, to add behavior."
              },
               {
                 type: "short-answer",
                 question: "In the Java I/O library, `BufferedInputStream` wrapping a `FileInputStream` is an example of which design pattern?",
                 correctAnswer: "Decorator Pattern",
                 points: 10
               }
            ]
          }
        }
      ], // end lessons in Chapter 3
      endOfChapterQuiz: {
        title: "Chapter 3 Quiz: Decorator Pattern",
        description: "Test your understanding of attaching responsibilities dynamically with Decorators.",
        duration: 15, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-3-quiz", // You might want unique slugs
        questions: [
          {
            type: "multiple-choice",
            question: "Which pattern allows adding behavior to objects dynamically by wrapping them?",
            options: ["Strategy", "Observer", "Decorator", "Singleton"],
            correctAnswer: "Decorator",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "A potential drawback of the Decorator pattern is:",
            options: [
              "A) It tightly couples decorators to components.",
              "B) It can result in a large number of small objects.",
              "C) It prevents adding new behaviors later.",
              "D) It only works for visual components."
              ],
            correctAnswer: "B) It can result in a large number of small objects.",
            points: 10,
            explanation: "A heavily decorated object can consist of many nested wrapper objects."
          },
           {
             type: "true-false",
             question: "Decorators must change the interface of the object they decorate.",
             options: ["true", "false"],
             correctAnswer: "false",
             points: 10,
             explanation: "A key aspect is that decorators conform to the *same* interface as the component they wrap, allowing transparency."
           }
        ]
      }
    },
    // ========================================
    // CHAPTER 4 - ENHANCED (Factory Patterns)
    // ========================================
    {
      title: "Factory Patterns",
      description: "Learn patterns that encapsulate object creation, promoting loose coupling and allowing systems to be programmed to interfaces, not implementations.",
      order: 4,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "Simple Factory (Idiom)",
          slug: "simple-factory-idiom",
          description: "Understand the Simple Factory idiom for centralizing object creation logic, even though it's not a formal GoF pattern.",
          order: 1,
          duration: 35, // Adjusted

          parts: [
            {
              title: "Problem: Concrete Instantiation in Client Code",
              content:
                "Imagine a Pizza place where the `OrderPizza` code directly instantiates concrete pizza types like `new CheesePizza()`, `new PepperoniPizza()`.\n\n* **Problem:** If the pizza types change (e.g., add `VeggiePizza`, remove `PepperoniPizza`), the `OrderPizza` code needs to be modified. This violates the Open/Closed principle and creates dependencies on concrete classes.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Direct Instantiation Issue",
                description: "Why is `new ConcretePizza()` often problematic?",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "Directly using `new ConcretePizzaType()` inside client code like `OrderPizza` leads to:",
                  options: [
                    "A) Better performance.",
                    "B) Tighter coupling between the client and concrete pizza classes.",
                    "C) Easier addition of new pizza types.",
                    "D) Reduced memory usage."
                    ],
                  correctAnswer: "B) Tighter coupling between the client and concrete pizza classes.",
                  explanation: "The client code becomes dependent on specific implementations, making changes harder."
                }
              }
            },
            {
              title: "Solution: Simple Factory",
              content:
                "A **Simple Factory** is simply a class that encapsulates the object creation logic in one place.\n\n* **How it works:** Instead of the client doing `new CheesePizza()`, it calls a method on the factory, like `pizza = factory.createPizza(\"cheese\")`.\n* **The Factory Class:** Contains the `createPizza` method which typically has a `switch` or `if/else` block to instantiate the correct concrete `Pizza` subclass based on the input type.\n* **Benefit:** Centralizes creation logic. Clients depend only on the factory and the abstract `Pizza` type, not concrete pizzas. However, the factory itself still needs modification if new pizza types are added.\n\n**Note:** Simple Factory is a common programming idiom, *not* one of the official Gang of Four design patterns.",
              order: 2,
              duration: 20, // Adjusted
              exercise: {
                type: "code-challenge",
                title: "Implement Simple Factory (Conceptual)",
                description: "Outline a SimplePizzaFactory.",
                points: 10,
                difficulty: "beginner",
                content: {
                  instructions: "Define a `SimplePizzaFactory` class with a `createPizza(type)` method. Inside the method, show how it would conditionally instantiate different `Pizza` subtypes (e.g., `CheesePizza`, `PepperoniPizza`) based on the `type` string. Use pseudocode or your preferred language.",
                  testCases: [{ input: "Conceptual Implementation", expected: "Factory class contains logic to return different concrete Pizza objects based on type."}]
                }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Simple Factory Quiz",
            description: "Test understanding of the Simple Factory idiom.",
            duration: 10,
            passingScore: 75,
            questions: [
               {
                 type: "multiple-choice",
                 question: "What is the primary goal of the Simple Factory idiom?",
                 options: [
                     "A) To ensure only one instance of a factory exists.",
                     "B) To allow subclasses to decide which class to instantiate.",
                     "C) To encapsulate and centralize object creation logic in one place.",
                     "D) To create families of related objects."
                     ],
                 correctAnswer: "C) To encapsulate and centralize object creation logic in one place.",
                 points: 10,
                 explanation: "It moves the `new ConcreteProduct()` calls out of the client code into the factory."
               },
                {
                 type: "true-false",
                 question: "The Simple Factory is one of the original 23 Gang of Four design patterns.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "It's a common idiom or technique, but not one of the formal GoF patterns like Factory Method or Abstract Factory."
               }
            ]
          }
        },
        // ---------------------------
        // LESSON 2 - ENHANCED
        // ---------------------------
        {
          title: "Factory Method Pattern",
          slug: "factory-method-pattern",
          description: "Define an interface for creating objects, but let subclasses decide which class to instantiate. Decouple client code from concrete product classes.",
          order: 2,
          duration: 60, // Adjusted

          parts: [
            { // Original L2 P1 adapted
              title: "Problem: Varying Product Creation in Subclasses",
              content:
                "Consider different regional PizzaStores (NYStylePizzaStore, ChicagoStylePizzaStore). They all follow the same process for ordering pizza (`orderPizza`), but the *kind* of pizza they create differs (NYStyleCheesePizza vs. ChicagoStyleCheesePizza).\n\nWe want the `orderPizza` method (defined in a base `PizzaStore` class) to be reusable, but it needs to create different pizza types depending on the store style. Putting `if/else` logic for store styles inside `orderPizza` would violate the Open/Closed principle.",
              order: 1,
              duration: 15,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Pizza Store Problem",
                 description: "Why can't a base PizzaStore create specific styles?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "If a base `PizzaStore` class has an `orderPizza` method, what problem arises when different store styles (NY, Chicago) need to create different concrete `Pizza` objects?",
                   options: [
                     "A) The `orderPizza` method becomes too slow.",
                     "B) The base class doesn't know which specific subclass of `Pizza` to instantiate for each style.",
                     "C) Customers cannot order different pizza types.",
                     "D) The base class cannot access ingredient factories."
                     ],
                   correctAnswer: "B) The base class doesn't know which specific subclass of `Pizza` to instantiate for each style.",
                   explanation: "The decision of which concrete product to create depends on the specific subclass (store style)."
                 }
              }
            },
            {
              title: "Solution: Factory Method Pattern",
              content:
                "**Factory Method Pattern:** Defines an interface (or abstract method) for creating an object, but lets subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.\n\n1.  Define an abstract `PizzaStore` class with an abstract `createPizza(type)` method (the Factory Method).\n2.  The `orderPizza` method in `PizzaStore` calls `createPizza(type)` to get a pizza object, without knowing the concrete type.\n3.  Concrete subclasses (`NYStylePizzaStore`, `ChicagoStylePizzaStore`) implement `createPizza(type)`, returning their specific style of pizza (e.g., `NYStyleCheesePizza`).\n\n```java\n// Example structure (pseudo-code)\nabstract class PizzaStore {\n  // The factory method\n  abstract Pizza createPizza(String type);\n\n  Pizza orderPizza(String type) {\n    Pizza pizza = createPizza(type); // Use the factory method!\n    pizza.prepare();\n    pizza.bake();\n    pizza.cut();\n    pizza.box();\n    return pizza;\n  }\n}\n\nclass NYStylePizzaStore extends PizzaStore {\n  Pizza createPizza(String type) {\n    if (type.equals(\"cheese\")) {\n      return new NYStyleCheesePizza();\n    } else if ...\n  }\n}\n\nclass ChicagoStylePizzaStore extends PizzaStore { ... }\n```\nNow, `orderPizza` works for all stores, while the creation logic is localized in subclasses.",
              order: 2,
              duration: 25, // Increased
              exercise: { // Original L2 E1 Code Challenge adapted
                type: "code-challenge",
                title: "Implement Factory Method (Conceptual)",
                description: "Outline the PizzaStore Factory Method structure.",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Define an abstract `PizzaStore` with an abstract `createPizza` method and a concrete `orderPizza` method that uses `createPizza`. Show how a `NYStylePizzaStore` subclass implements `createPizza` to return `NYStyle...` pizzas. Use pseudocode or your preferred language.",
                  testCases: [{ input: "Conceptual Implementation", expected: "Abstract store defines method, concrete store implements it to create specific products."}]
                }
              }
            },
             {
              title: "Factory Method Defined & Dependency Inversion",
              content:
                "**Factory Method Pattern:** Defines an interface for creating an object, but lets subclasses override that method to change the class of object that will be created.\n\n* **Participants:**\n    * Product (e.g., `Pizza`)\n    * ConcreteProduct (e.g., `NYStyleCheesePizza`)\n    * Creator (e.g., `PizzaStore` - declares factory method `createPizza`)\n    * ConcreteCreator (e.g., `NYStylePizzaStore` - implements `createPizza`)\n* **Benefits:** Decouples client code (`orderPizza`) from concrete product classes. Promotes programming to interfaces. Supports Open/Closed principle.\n* **Dependency Inversion Principle:** This pattern exemplifies depending on abstractions (`PizzaStore` depends on abstract `Pizza` via the factory method), not concretions.",
              order: 3,
              duration: 15,
              exercise: { // New exercise on DIP
                type: "multiple-choice",
                title: "Mini Exercise: Dependency Inversion",
                description: "How does Factory Method relate to Dependency Inversion?",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "How does the Factory Method pattern align with the Dependency Inversion Principle?",
                  options: [
                    "A) It forces high-level modules to depend on low-level modules.",
                    "B) It makes both high-level (Creator) and low-level (ConcreteProduct) modules depend on abstractions (Product interface, factory method signature).",
                    "C) It inverts the order of method calls.",
                    "D) It has no relation to Dependency Inversion."
                    ],
                  correctAnswer: "B) It makes both high-level (Creator) and low-level (ConcreteProduct) modules depend on abstractions (Product interface, factory method signature).",
                  explanation: "The Creator works with the abstract Product and relies on subclasses (via the factory method) to provide concrete implementations, adhering to DIP."
                }
              }
            }
          ],
          endOfLessonQuiz: { // Original L2 Quiz adapted
            title: "Factory Method Pattern Quiz",
            description: "Test your understanding of the Factory Method pattern's structure, intent, and benefits.",
            duration: 15,
            passingScore: 75,
            questions: [
              { // Original L2 Q1 rephrased
                type: "multiple-choice",
                question: "In the Factory Method pattern, which component decides which concrete product class to instantiate?",
                options: ["A) The abstract Product", "B) The abstract Creator", "C) The Concrete Creator (subclass)", "D) The Client"],
                correctAnswer: "C) The Concrete Creator (subclass)",
                points: 10,
                explanation: "Subclasses override the factory method to provide specific product implementations."
              },
              { // New
                 type: "multiple-choice",
                 question: "The Factory Method pattern primarily achieves flexibility by:",
                 options: [
                   "A) Using static methods for creation.",
                   "B) Deferring the instantiation logic to subclasses.",
                   "C) Creating only one instance of each product.",
                   "D) Combining multiple objects into one."
                   ],
                 correctAnswer: "B) Deferring the instantiation logic to subclasses.",
                 points: 10,
                 explanation: "The core idea is letting subclasses decide the 'what' to create, while the superclass defines 'when'/'how' it's used."
               },
               { // New
                 type: "true-false",
                 question: "The `orderPizza` method in the abstract `PizzaStore` class needs to know about concrete pizza types like `NYStyleCheesePizza`.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "It only knows about the abstract `Pizza` type returned by the `createPizza` factory method."
               }
            ]
          }
        },
        // ---------------------------
        // LESSON 3 - ENHANCED
        // ---------------------------
        {
          title: "Abstract Factory Pattern",
          slug: "abstract-factory-pattern",
          description: "Provide an interface for creating families of related or dependent objects without specifying their concrete classes.",
          order: 3,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Problem: Families of Related Products",
              content:
                "Building on the PizzaStore example, now consider ingredients. Different regions use different types of Dough, Sauce, Cheese, Veggies etc. A NY pizza needs NY-style ingredients (Thin Crust Dough, Marinara Sauce), while a Chicago pizza needs Chicago-style ingredients (Deep Dish Dough, Plum Tomato Sauce).\n\nWe need a way to ensure that a specific store (`NYStylePizzaStore`) consistently uses the correct *family* of ingredients (NY-style) for all its pizzas, without the `Pizza` classes themselves knowing about specific ingredient factories.",
              order: 1,
              duration: 15,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Ingredient Consistency",
                 description: "Why is creating consistent ingredient families hard?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "What is the main challenge when different `PizzaStore` styles need to use distinct but related families of ingredients (dough, sauce, cheese)?",
                   options: [
                     "A) Ingredients are too expensive.",
                     "B) Ensuring a specific store style consistently uses the correct corresponding ingredient set.",
                     "C) Ingredients take too long to prepare.",
                     "D) There are too many types of cheese."
                     ],
                   correctAnswer: "B) Ensuring a specific store style consistently uses the correct corresponding ingredient set.",
                   explanation: "We need a mechanism to group and provide the correct family of ingredients for each pizza style."
                 }
              }
            },
            {
              title: "Solution: Abstract Factory Pattern",
              content:
                "**Abstract Factory Pattern:** Provides an interface for creating families of related or dependent objects without specifying their concrete classes.\n\n1.  Define an abstract `PizzaIngredientFactory` interface with methods to create each type of ingredient (`createDough()`, `createSauce()`, `createCheese()`, etc.).\n2.  Create concrete factory classes implementing this interface for each region (`NYPizzaIngredientFactory`, `ChicagoPizzaIngredientFactory`). Each concrete factory produces ingredients specific to its region.\n3.  The `PizzaStore` subclasses get an instance of the appropriate ingredient factory.\n4.  The `Pizza` classes (now often abstract, with concrete subclasses like `CheesePizza`) request ingredients from the factory passed to them during preparation (`ingredientFactory.createDough()`), without knowing the concrete factory type.\n\n```java\n// Example structure (pseudo-code)\ninterface PizzaIngredientFactory {\n  Dough createDough(); Sauce createSauce(); Cheese createCheese();\n}\n\nclass NYPizzaIngredientFactory implements PizzaIngredientFactory { /* Creates NY style ingredients */ }\nclass ChicagoPizzaIngredientFactory implements PizzaIngredientFactory { /* Creates Chicago style ingredients */ }\n\nabstract class Pizza {\n  PizzaIngredientFactory ingredientFactory;\n  // Uses factory to get ingredients in prepare()\n}\n\nabstract class PizzaStore {\n  abstract Pizza createPizza(String type); // Factory Method still used\n  // ... orderPizza ...\n}\n\nclass NYStylePizzaStore extends PizzaStore {\n  Pizza createPizza(String type) {\n    Pizza pizza = null;\n    PizzaIngredientFactory factory = new NYPizzaIngredientFactory(); // Get NY factory\n    if (type.equals(\"cheese\")) { pizza = new CheesePizza(factory); pizza.setName(\"NY Style Cheese Pizza\"); } \n    // ... else if ...\n    return pizza;\n  }\n}\n```\nThe `Pizza` classes are now decoupled from specific ingredient creation.",
              order: 2,
              duration: 25, // Increased
              exercise: {
                type: "code-challenge",
                title: "Implement Abstract Factory (Conceptual)",
                description: "Outline the Pizza Ingredient Abstract Factory structure.",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Define the `PizzaIngredientFactory` interface with methods like `createDough`, `createSauce`. Show concrete factories `NYPizzaIngredientFactory` and `ChicagoPizzaIngredientFactory`. Show how an abstract `Pizza` class takes a factory and uses it in `prepare()`. Show how `NYStylePizzaStore` provides the correct factory when creating a `CheesePizza`. Use pseudocode or your preferred language.",
                  testCases: [{ input: "Conceptual Implementation", expected: "Abstract factory interface, concrete factories for families, Pizza uses injected factory."}]
                }
              }
            },
             {
              title: "Abstract Factory Defined",
              content:
                "**Abstract Factory Pattern:** Provides an interface for creating families of related or dependent objects without specifying their concrete classes.\n\n* **Intent:** Encapsulate a group of individual factories that have a common theme (a family of products) without specifying their concrete classes.\n* **Participants:**\n    * AbstractFactory (e.g., `PizzaIngredientFactory`)\n    * ConcreteFactory (e.g., `NYPizzaIngredientFactory`)\n    * AbstractProduct (e.g., `Dough`, `Sauce`)\n    * ConcreteProduct (e.g., `ThinCrustDough`, `MarinaraSauce`)\n    * Client (e.g., `Pizza` classes, which use the AbstractFactory)\n* **Benefits:** Isolates concrete classes, makes exchanging product families easy, promotes consistency among products within a family.",
              order: 3,
              duration: 15,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Abstract Factory vs Factory Method",
                 description: "Distinguish the primary purpose of Abstract Factory.",
                 points: 10,
                 difficulty: "intermediate",
                 content: {
                   question: "While Factory Method defers creation of a *single* object to subclasses, Abstract Factory primarily deals with creating:",
                   options: [
                     "A) Only one type of object.",
                     "B) Objects that have no relationship to each other.",
                     "C) Families of related or dependent objects.",
                     "D) Singleton objects."
                     ],
                   correctAnswer: "C) Families of related or dependent objects.",
                   explanation: "Abstract Factory provides methods to create a whole set of related products (e.g., all ingredients for a specific pizza style)."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Abstract Factory Pattern Quiz",
            description: "Test your understanding of the Abstract Factory pattern for creating families of related objects.",
            duration: 15,
            passingScore: 75,
            questions: [
               {
                 type: "multiple-choice",
                 question: "The Abstract Factory pattern is most useful when:",
                 options: [
                   "A) You need to ensure only one instance of a factory exists.",
                   "B) You need to create families of related objects without specifying concrete classes.",
                   "C) You need to add responsibilities to objects dynamically.",
                   "D) You need to adapt one interface to another."
                   ],
                 correctAnswer: "B) You need to create families of related objects without specifying concrete classes.",
                 points: 10
               },
               {
                 type: "multiple-choice",
                 question: "In the Pizza Ingredient example, `NYPizzaIngredientFactory` is a:",
                 options: ["A) Abstract Factory", "B) Concrete Factory", "C) Abstract Product", "D) Concrete Product"],
                 correctAnswer: "B) Concrete Factory",
                 points: 10,
                 explanation: "It implements the AbstractFactory interface to create a specific family (NY style) of concrete products (ingredients)."
               },
               {
                 type: "true-false",
                 question: "Client code (like the `Pizza` classes) using an Abstract Factory typically needs to know which Concrete Factory instance it is using.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "Clients interact with the Abstract Factory interface, decoupling them from concrete factory implementations."
               }
            ]
          }
        }
      ], // end lessons in Chapter 4
      endOfChapterQuiz: {
        title: "Chapter 4 Quiz: Factory Patterns",
        description: "Test your understanding of Simple Factory, Factory Method, and Abstract Factory patterns.",
        duration: 20, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-4-quiz",
        questions: [
          { // Adapted from original Ch1 quiz
            type: "multiple-choice",
            question: "Which pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate?",
            options: ["Simple Factory", "Factory Method", "Abstract Factory", "Singleton"],
            correctAnswer: "Factory Method",
            points: 10
          },
          { // New
            type: "multiple-choice",
            question: "Which pattern provides an interface for creating *families* of related objects?",
            options: ["Simple Factory", "Factory Method", "Abstract Factory", "Decorator"],
            correctAnswer: "Abstract Factory",
            points: 10
          },
          { // New
            type: "true-false",
            question: "Simple Factory is a formal Gang of Four design pattern.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "It's a common idiom but lacks the inheritance structure of Factory Method or Abstract Factory."
          },
          { // New
            type: "multiple-choice",
            question: "Factory patterns primarily help achieve which design principle?",
            options: ["Favor Composition over Inheritance", "Program to an Interface, Not an Implementation", "Strive for Loosely Coupled Designs", "All of the above"],
            correctAnswer: "All of the above", // Factories encapsulate implementation details, promoting interface use and loose coupling. Factory Method uses inheritance, but Abstract Factory uses composition. Overall they strongly support B and C.
            points: 10,
            explanation: "Factories encapsulate object creation (implementation details), allowing clients to program to product interfaces, thus promoting loose coupling."
          }
        ]
      }
    },
    // ========================================
    // CHAPTER 5 - ENHANCED (Singleton Pattern)
    // ========================================
    {
      title: "The Singleton Pattern",
      description: "Ensure a class has only one instance and provide a global point of access to it, while considering thread safety and other implementation details.",
      order: 5,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        { // Was L1 in original template's Ch1
          title: "One of a Kind Objects: The Singleton Pattern",
          slug: "singleton-pattern", // Keep slug consistent
          description: "Master the Singleton pattern, ensuring a class has only one instance and providing a global point of access to it. Explore implementation techniques and thread safety.",
          order: 1,
          duration: 55, // Adjusted

          parts: [
            { // Adapted from original L1 P1
              title: "Intent: Ensuring a Unique Instance",
              content:
                "The **Singleton Pattern** ensures a class has only **one instance**, and provides a **global point of access** to it.\n\n* **Why?** Sometimes you need exactly one instance of a class to coordinate actions across the system (e.g., a logger, a configuration manager, a connection pool, a thread pool).\n* **Problem:** How do you prevent clients from creating multiple instances using the standard constructor (`new MyClass()`)?\n* **Solution Core:**\n    1. Make the constructor `private`.\n    2. Provide a `static` method (`getInstance()`) that returns the sole instance.\n    3. Manage the creation and storage of that single instance within the class itself (usually a `static` variable).",
              order: 1,
              duration: 15,
              exercise: { // Original Ch1/L1/E1 adapted
                type: "multiple-choice",
                title: "Mini Exercise: Singleton Goal",
                description: "What two things does the Singleton pattern guarantee?",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "The Singleton pattern is designed to guarantee which two key properties?",
                  options: [
                      "A) High performance and low memory usage.",
                      "B) That a class has only one instance and provides global access to it.",
                      "C) Easy subclassing and dynamic behavior changes.",
                      "D) Compatibility with multiple programming languages."
                      ],
                  correctAnswer: "B) That a class has only one instance and provides global access to it.",
                  explanation: "Controlling instantiation to ensure uniqueness and providing a well-known access point are the core goals."
                }
              }
            },
            {
              title: "Implementation Techniques",
              content:
                "Several ways to implement the static instance and getInstance method:\n\n1.  **Eager Initialization:** Create the instance when the class is loaded.\n   ```java\n   // Eager Initialization\n   public class Singleton {\n     private static Singleton uniqueInstance = new Singleton();\n     private Singleton() {}\n     public static Singleton getInstance() {\n       return uniqueInstance;\n     }\n   }\n   ```\n   *Pros:* Simple, inherently thread-safe. *Cons:* Instance created even if never used.\n\n2.  **Lazy Initialization (Basic):** Create instance only when `getInstance()` is first called.\n   ```java\n   // Basic Lazy Initialization (NOT thread-safe)\n   public class Singleton {\n     private static Singleton uniqueInstance;\n     private Singleton() {}\n     public static Singleton getInstance() {\n       if (uniqueInstance == null) {\n         uniqueInstance = new Singleton();\n       }\n       return uniqueInstance;\n     }\n   }\n   ```\n   *Pros:* Delays creation until needed. *Cons:* **Not thread-safe!** Multiple threads could enter the `if` block concurrently and create multiple instances.",
              order: 2,
              duration: 15,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Eager vs. Lazy",
                description: "Distinguish eager and basic lazy initialization.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What is the main difference between eager and basic lazy initialization for Singletons?",
                  options: [
                    "A) Eager is thread-safe, basic lazy is not.",
                    "B) Eager creates the instance at startup, basic lazy creates it on first request.",
                    "C) Eager uses less memory.",
                    "D) Both A and B."
                    ],
                  correctAnswer: "D) Both A and B.",
                  explanation: "Eager creates upfront and is thread-safe due to class loading mechanics. Basic lazy delays creation but suffers from race conditions in multithreaded environments."
                }
              }
            },
            {
              title: "Thread-Safe Singleton Implementations",
              content:
                "To make lazy initialization thread-safe:\n\n1.  **Synchronized `getInstance()`:** Add `synchronized` keyword to the `getInstance()` method.\n   ```java\n   // Synchronized Method (Thread-safe but potentially slow)\n   public static synchronized Singleton getInstance() { ... }\n   ```\n   *Pros:* Simple to implement, guarantees thread safety. *Cons:* Synchronization adds overhead to *every* call, even after the instance is created, which can be a performance bottleneck.\n\n2.  **Double-Checked Locking (DCL):** Check for null instance, synchronize only the creation block, then check again inside the block. *Caution: Can be broken by compiler/memory model optimizations in some older Java versions, use `volatile` keyword for the instance variable in modern Java.*\n   ```java\n   // Double-Checked Locking (Requires volatile in Java 5+)\n   private volatile static Singleton uniqueInstance;\n   public static Singleton getInstance() {\n     if (uniqueInstance == null) {\n       synchronized (Singleton.class) {\n         if (uniqueInstance == null) { // Check again inside lock\n           uniqueInstance = new Singleton();\n         }\n       }\n     }\n     return uniqueInstance;\n   }\n   ```\n   *Pros:* Reduces synchronization overhead after first initialization. *Cons:* Complex, subtle potential issues if not implemented carefully (use `volatile`).\n\n**Note:** Often, eager initialization is the simplest and safest approach if the creation cost isn't prohibitive or the instance is always needed.",
              order: 3,
              duration: 20, // Increased
               exercise: { // Original Ch1/L1/E1 Code Challenge adapted
                 type: "code-challenge",
                 title: "Implement Thread-Safe Singleton",
                 description: "Implement Singleton using Double-Checked Locking.",
                 points: 15, // Increased difficulty
                 difficulty: "intermediate",
                 content: {
                   instructions: "Implement a Singleton class using the Double-Checked Locking pattern in Java or a similar language. Ensure you handle the `volatile` keyword correctly if applicable to your language's memory model.",
                   testCases: [
                     { input: "Multiple threads calling getInstance() concurrently", expected: "All threads receive the exact same single instance." }
                   ]
                 }
               }
            },
            {
              title: "Singleton Use Cases & Concerns",
              content:
                "While simple, the Singleton pattern is sometimes considered an anti-pattern if overused.\n\n* **Valid Use Cases:** Logging frameworks, configuration managers, thread pools, hardware interface access where only one instance makes sense.\n* **Concerns:**\n    * **Global State:** Introduces global state, making code harder to test and reason about.\n    * **Tight Coupling:** Clients become directly coupled to the concrete Singleton class.\n    * **Violates Single Responsibility Principle?** The class manages its own lifecycle *and* does its main job.\n    * **Testing:** Difficult to mock or replace the Singleton instance in unit tests.\n\nConsider alternatives like **Dependency Injection** before resorting to Singleton.",
              order: 4,
              duration: 5,
               // No exercise for this discussion part
             }
          ],
          endOfLessonQuiz: { // Original Ch1/L1 Quiz adapted and expanded
            title: "Singleton Pattern Quiz",
            description: "Test your understanding of the Singleton pattern's implementation, thread safety, and potential drawbacks.",
            duration: 15,
            passingScore: 75,
            questions: [
              { // Original Q1
                type: "multiple-choice",
                question: "What is the primary intent of the Singleton pattern?",
                options: [
                  "To create objects based on a prototype.",
                  "To ensure a class has only one instance and provide a global point of access.",
                  "To allow subclasses to redefine how an object is created.",
                  "To dynamically add responsibilities to objects."
                ],
                correctAnswer: "To ensure a class has only one instance and provide a global point of access.",
                points: 10
              },
              { // New
                 type: "multiple-choice",
                 question: "Why is the basic lazy initialization of a Singleton (without synchronization) not thread-safe?",
                 options: [
                   "A) It creates the instance too early.",
                   "B) Multiple threads might simultaneously find the instance null and create multiple instances.",
                   "C) It uses too much memory.",
                   "D) The `getInstance` method returns different types."
                   ],
                 correctAnswer: "B) Multiple threads might simultaneously find the instance null and create multiple instances.",
                 points: 10,
                 explanation: "A race condition exists in the `if (instance == null)` check."
               },
               { // New
                 type: "multiple-choice",
                 question: "Which Singleton implementation technique is generally considered the simplest and inherently thread-safe (though less flexible)?",
                 options: ["A) Double-Checked Locking", "B) Synchronized getInstance() method", "C) Eager Initialization", "D) Using a Factory Method"],
                 correctAnswer: "C) Eager Initialization",
                 points: 10,
                 explanation: "Creating the instance as a static initializer handles thread safety via class loading mechanisms but creates the instance immediately."
               },
                { // New
                 type: "true-false",
                 question: "Overuse of the Singleton pattern can lead to tightly coupled code and make unit testing more difficult.",
                 options: ["true", "false"],
                 correctAnswer: "true",
                 points: 10,
                 explanation: "Global state and direct coupling to concrete classes are common criticisms of the Singleton pattern."
               }
            ]
          }
        }
      ], // end lessons in Chapter 5
      endOfChapterQuiz: { // Original Ch1 Quiz adapted to Singleton
        title: "Chapter 5 Quiz: Singleton Pattern",
        description: "Test your understanding of the Singleton pattern.",
        duration: 15, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-5-quiz", // Updated slug
        questions: [
          { // Original Q1
            type: "multiple-choice",
            question: "Which creational pattern ensures a class has only one instance?",
            options: ["Factory Method", "Singleton", "Abstract Factory", "Decorator"], // Decorator isn't creational
            correctAnswer: "Singleton",
            points: 10
          },
           { // New
             type: "multiple-choice",
             question: "To prevent clients from directly instantiating a Singleton class, its constructor should typically be:",
             options: ["A) Public", "B) Protected", "C) Package-private", "D) Private"],
             correctAnswer: "D) Private",
             points: 10,
             explanation: "A private constructor prevents instantiation from outside the class itself."
           },
            { // New
             type: "short-answer",
             question: "What keyword in Java is often recommended for the static instance variable when using Double-Checked Locking to prevent certain memory model issues?",
             correctAnswer: "volatile",
             points: 10,
             explanation: "Volatile ensures visibility of writes across threads and prevents certain harmful compiler reorderings with DCL."
           }
        ]
      }
    },
    // ========================================
    // END OF CHAPTER 5
    // ========================================

    // ========================================
    // CHAPTER 6 - ENHANCED (Command Pattern)
    // ========================================
    {
      title: "The Command Pattern",
      description: "Learn how to encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.",
      order: 6,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "Encapsulating Invocation",
          slug: "command-pattern",
          description: "Understand how the Command pattern decouples the object making a request (Invoker) from the object that knows how to perform it (Receiver) by introducing a Command object.",
          order: 1,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Problem: A Remote Control with Tight Coupling",
              content:
                "Imagine designing a programmable remote control for various home automation devices (lights, fans, stereos, garage doors). A naive approach might have the remote control class directly contain methods like `onLightButtonClick()`, `onFanButtonClick()`.\n\n* **Problem:** The remote becomes tightly coupled to specific device classes (`Light`, `Fan`). Adding a new device requires modifying the remote control class. Button actions are hardcoded.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Remote Control Problem",
                description: "Why is hardcoding device actions bad?",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What is the main issue if a `RemoteControl` class has methods like `turnOnLight()`, `turnOffStereo()`?",
                  options: [
                    "A) It uses too much memory.",
                    "B) It requires complex inheritance.",
                    "C) The `RemoteControl` is tightly coupled to specific device classes and difficult to extend.",
                    "D) The performance is significantly reduced."
                    ],
                  correctAnswer: "C) The `RemoteControl` is tightly coupled to specific device classes and difficult to extend.",
                  explanation: "Adding new devices or changing button assignments requires modifying the RemoteControl code."
                }
              }
            },
            {
              title: "Solution: The Command Pattern Structure",
              content:
                "The Command pattern decouples the invoker from the receiver:\n\n1.  **Command Interface:** Declares an interface for executing an operation (e.g., `execute()`). Often includes an `undo()` method too.\n2.  **Concrete Commands:** Implement the Command interface. Each command holds a reference to a **Receiver** object (the object that performs the actual work, e.g., `Light`, `Stereo`). The `execute()` method calls the appropriate action on the receiver (e.g., `light.on()`).\n3.  **Receiver:** The object that performs the actual work (e.g., `Light`, `Fan`).\n4.  **Invoker:** Holds a reference to a Command object (e.g., a `RemoteControl` slot holds a `Command`). When triggered (e.g., button pressed), the Invoker calls `command.execute()`.\n5.  **Client:** Creates Concrete Command objects, sets their Receiver, and configures the Invoker with these Commands.\n\n```java\n// Example structure (pseudo-code)\ninterface Command { execute(); undo(); }\n\nclass Light { on(); off(); }\n\nclass LightOnCommand implements Command {\n  Light light;\n  LightOnCommand(Light l) { this.light = l; }\n  execute() { light.on(); }\n  undo() { light.off(); }\n}\n\nclass RemoteControlSlot // Invoker\n{\n  Command command;\n  setCommand(Command c) { this.command = c; }\n  buttonPressed() { command.execute(); }\n  undoButtonPressed() { command.undo(); }\n}\n\n// Client setup\nLight livingRoomLight = new Light();\nCommand lightOn = new LightOnCommand(livingRoomLight);\nRemoteControlSlot slot1 = new RemoteControlSlot();\nslot1.setCommand(lightOn);\n// Later...\nslot1.buttonPressed(); // Executes light.on()\nslot1.undoButtonPressed(); // Executes light.off()\n```\nThe RemoteControlSlot doesn't know anything about Lights, only about the Command interface.",
              order: 2,
              duration: 25, // Increased
               exercise: {
                 type: "code-challenge",
                 title: "Implement Command Pattern (Conceptual)",
                 description: "Outline the classes for turning a Stereo on using the Command pattern.",
                 points: 15,
                 difficulty: "intermediate",
                 content: {
                   instructions: "Define the `Command` interface (with `execute` and `undo`). Create a `Stereo` class (Receiver) with `on()` and `off()` methods. Create a `StereoOnCommand` (ConcreteCommand) that holds a `Stereo` reference and calls `stereo.on()` in `execute()`. Show how a client would create these objects and associate the command with an invoker slot. Use pseudocode or your preferred language.",
                   testCases: [{ input: "Conceptual Implementation", expected: "Shows Command interface, Stereo receiver, StereoOnCommand, and client setup linking them."}]
                 }
               }
            },
            {
              title: "The Command Pattern Defined",
              content:
                "**Command Pattern:** Encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.\n\n* **Intent:** Decouple the sender/invoker of a request from the receiver of the request.\n* **Benefits:**\n    * Decouples invoker from receiver.\n    * Commands are first-class objects (can be stored, passed around, queued).\n    * Easy to add new commands without changing invoker.\n    * Supports undo/redo functionality.\n    * Can assemble composite commands (macros).\n* **Uses:** GUI button actions, undo/redo, transaction logging, queuing work, macro recording.",
              order: 3,
              duration: 15,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Command Object Role",
                 description: "What does the Command object itself do?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "In the Command pattern, the primary role of the Concrete Command object is to:",
                   options: [
                     "A) Perform the actual work of the operation.",
                     "B) Hold references to all possible receivers.",
                     "C) Encapsulate a request by binding together an action on a specific receiver.",
                     "D) Decide which command to execute next."
                     ],
                   correctAnswer: "C) Encapsulate a request by binding together an action on a specific receiver.",
                   explanation: "The Command object holds the receiver and knows which method to call on it when execute() is invoked."
                 }
              }
            },
             {
               title: "Null Object and Macro Commands",
               content:
                 "Handling empty slots or complex sequences:\n\n* **Null Object Pattern:** Create a `NoCommand` object that implements the `Command` interface but its `execute()` method does nothing. Assign this to empty remote slots to avoid null checks in the invoker.\n* **Macro Commands:** A command that holds a list of other commands. Its `execute()` method iterates through the list and calls `execute()` on each sub-command. Useful for executing sequences of actions.",
               order: 4,
               duration: 5,
                // No exercise for this brief part
              }
          ],
          endOfLessonQuiz: {
            title: "Command Pattern Quiz",
            description: "Test your understanding of encapsulating requests, decoupling invokers/receivers, and supporting undo.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                type: "multiple-choice",
                question: "The Command pattern primarily achieves decoupling between which two participants?",
                options: [
                    "A) Client and Receiver",
                    "B) Invoker and Receiver",
                    "C) Command and Client",
                    "D) Invoker and Client"
                    ],
                correctAnswer: "B) Invoker and Receiver",
                points: 10,
                explanation: "The Invoker interacts with the Command interface, unaware of the specific Receiver performing the action."
              },
              {
                type: "multiple-choice",
                question: "Which feature is easily supported by adding an `undo()` method to the Command interface?",
                options: ["A) Queuing requests", "B) Logging requests", "C) Undo/Redo functionality", "D) Asynchronous execution"],
                correctAnswer: "C) Undo/Redo functionality",
                points: 10,
                explanation: "Storing executed commands allows reversing their effects by calling their `undo()` methods."
              },
              {
                type: "true-false",
                question: "In the Command pattern, the Invoker object typically contains the actual logic to perform the requested action.",
                options: ["true", "false"],
                correctAnswer: "false",
                points: 10,
                explanation: "The Invoker merely triggers `command.execute()`; the actual work is done by the Receiver, called by the Concrete Command."
              }
              // {
              //   type: "short-answer",
              //   question: "Besides decoupling, name one other common use case or benefit of the Command pattern.",
              //   correctAnswer: "Undo/Redo, Queuing requests, Logging requests, Macro commands", // Accept any one
              //   points: 10
              // }
            ]
          }
        }
      ], // end lessons in Chapter 6
      endOfChapterQuiz: {
        title: "Chapter 6 Quiz: Command Pattern",
        description: "Test your knowledge of encapsulating requests as objects using the Command pattern.",
        duration: 15, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-6-quiz",
        questions: [
          {
             type: "multiple-choice",
             question: "Which pattern encapsulates a request as an object?",
             options: ["Observer", "Decorator", "Command", "Adapter"],
             correctAnswer: "Command",
             points: 10
           },
          {
             type: "multiple-choice",
             question: "In the Command pattern's remote control example, the `RemoteControl` object acts as the:",
             options: ["A) Client", "B) Invoker", "C) Receiver", "D) Concrete Command"],
             correctAnswer: "B) Invoker",
             points: 10,
             explanation: "The remote control invokes the `execute()` method on the command object held in its slots."
           },
           {
             type: "true-false",
             question: "The Command pattern makes it difficult to add new types of commands to a system.",
             options: ["true", "false"],
             correctAnswer: "false",
             points: 10,
             explanation: "Adding new commands is easy: simply create a new class implementing the Command interface without changing the Invoker."
           }
        ]
      }
    },
    // ========================================
    // CHAPTER 7 - ENHANCED (Adapter & Facade)
    // ========================================
    {
      title: "Adapter and Facade Patterns",
      description: "Learn how to integrate incompatible interfaces using the Adapter pattern and how to simplify complex subsystems with the Facade pattern.",
      order: 7,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        { // Original L1
          title: "The Adapter Pattern: Making Things Fit",
          slug: "adapter-pattern", // Keep slug
          description: "Convert the interface of a class into another interface clients expect, allowing classes with incompatible interfaces to work together.",
          order: 1,
          duration: 50, // Adjusted

          parts: [
            {
              title: "Problem: Incompatible Interfaces (Ducks & Turkeys)",
              content:
                "Imagine you have an existing system that works with `Duck` objects, which have `quack()` and `fly()` methods. Now, you need to integrate `Turkey` objects, but they have different methods (`gobble()` and `fly()` - but turkeys fly short distances).\n\nHow can you make a `Turkey` usable where a `Duck` is expected without modifying the existing client code or the `Turkey` class itself?",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Interface Mismatch",
                description: "Why can't you just use a Turkey where a Duck is needed?",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "Why can't client code expecting a `Duck` object directly use a `Turkey` object?",
                  options: [
                    "A) Turkeys are slower than Ducks.",
                    "B) The `Turkey` class does not have the same methods (`quack()`, `fly()` with same meaning) as the `Duck` interface.",
                    "C) Turkeys cannot be instantiated.",
                    "D) Ducks and Turkeys cannot exist in the same program."
                    ],
                  correctAnswer: "B) The `Turkey` class does not have the same methods (`quack()`, `fly()` with same meaning) as the `Duck` interface.",
                  explanation: "The mismatch in interfaces prevents direct substitution."
                }
              }
            },
            { // Original L1 P1 adapted
              title: "Solution: The Adapter Pattern",
              content:
                "The **Adapter Pattern** converts the interface of a class (**Adaptee**) into another interface (**Target**) clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.\n\n1.  **Target Interface:** The interface the client code expects (e.g., `Duck`).\n2.  **Adaptee:** The existing class with the incompatible interface that needs adapting (e.g., `Turkey`).\n3.  **Adapter:** A class that implements the Target interface and holds a reference to an Adaptee instance. The Adapter translates calls on the Target interface methods into calls on the Adaptee's methods.\n\n```java\n// Example structure (pseudo-code)\ninterface Duck { quack(); fly(); }\ninterface Turkey { gobble(); fly(); /* Short distance */ }\n\nclass WildTurkey implements Turkey { ... }\n\n// Adapter implements Target interface, holds Adaptee reference\nclass TurkeyAdapter implements Duck {\n  Turkey turkey;\n\n  TurkeyAdapter(Turkey t) { this.turkey = t; }\n\n  quack() { turkey.gobble(); } // Translate quack -> gobble\n  fly() { \n    // Turkeys fly short distances, maybe fly 5 times\n    for(int i=0; i < 5; i++) { turkey.fly(); }\n  }\n}\n\n// Client code\nDuck duckAdapter = new TurkeyAdapter(new WildTurkey());\nduckAdapter.quack(); // Calls turkey.gobble() internally\nduckAdapter.fly();   // Calls turkey.fly() 5 times\n```\nThe client interacts with the `TurkeyAdapter` as if it were a `Duck`.",
              order: 2,
              duration: 20, // Increased
              exercise: { // Original L1 E1 adapted
                type: "code-challenge",
                title: "Implement Adapter (Conceptual)",
                description: "Outline the TurkeyAdapter class.",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Define the `Duck` and `Turkey` interfaces (with their different methods). Create a `TurkeyAdapter` class that implements `Duck`. The adapter should hold a reference to a `Turkey` object in its constructor. Implement the `quack()` and `fly()` methods in the adapter to call the corresponding `gobble()` and `fly()` methods on the wrapped `Turkey`. Use pseudocode or your preferred language.",
                  testCases: [{ input: "Conceptual Implementation", expected: "Adapter implements Duck, wraps Turkey, translates quack->gobble and fly->fly (perhaps multiple times)."}]
                }
              }
            },
            {
              title: "Adapter Pattern Defined",
              content:
                "**Adapter Pattern:** Converts the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.\n\n* **Intent:** Match an existing object's interface to a different required interface.\n* **Also Known As:** Wrapper.\n* **Types:**\n    * **Object Adapter:** Uses composition (holds reference to adaptee) - generally preferred.\n    * **Class Adapter:** Uses multiple inheritance (inherits from both target interface and adaptee class - less common, requires language support).\n* **Benefits:** Allows reuse of existing classes with incompatible interfaces, promotes loose coupling between client and adaptee.\n* **Use Cases:** Integrating legacy code, using third-party libraries with different APIs, standardizing interfaces.",
              order: 3,
              duration: 15,
              exercise: { // Original L1 E1 MC adapted
                 type: "multiple-choice",
                 title: "Mini Exercise: Adapter Intent",
                 description: "What is the core purpose of the Adapter pattern?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "The primary purpose of the Adapter pattern is to:",
                   options: [
                     "A) Create families of related objects.",
                     "B) Add new responsibilities to an object dynamically.",
                     "C) Make two incompatible interfaces work together.",
                     "D) Define a one-to-many dependency."
                     ],
                   correctAnswer: "C) Make two incompatible interfaces work together.",
                   explanation: "It acts as a translator between different interfaces."
                 }
              }
            }
          ],
          endOfLessonQuiz: { // Original L1 Quiz adapted
            title: "Adapter Pattern Quiz",
            description: "Test your understanding of the Adapter pattern for making interfaces compatible.",
            duration: 15,
            passingScore: 75,
            questions: [
              { // Original L1 Q1
                type: "multiple-choice",
                question: "What problem does the Adapter pattern primarily solve?",
                options: [
                  "A) Creating unique instances.",
                  "B) Handling requests as objects.",
                  "C) Integrating classes with incompatible interfaces.",
                  "D) Adding behavior dynamically."
                  ],
                correctAnswer: "C) Integrating classes with incompatible interfaces.",
                points: 10
              },
              { // New
                 type: "multiple-choice",
                 question: "In the Duck/Turkey example, the `TurkeyAdapter` plays the role of the:",
                 options: ["A) Target", "B) Adaptee", "C) Adapter", "D) Client"],
                 correctAnswer: "C) Adapter",
                 points: 10,
                 explanation: "It adapts the Turkey (Adaptee) interface to match the Duck (Target) interface."
               },
               { // New
                 type: "true-false",
                 question: "The Object Adapter pattern uses inheritance to achieve adaptation.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "Object Adapter uses composition (holding a reference to the adaptee). Class Adapter uses multiple inheritance."
               }
            ]
          }
        },
        // ---------------------------
        // LESSON 2 - ENHANCED
        // ---------------------------
        {
          title: "The Facade Pattern: Simplifying Interfaces",
          slug: "facade-pattern",
          description: "Provide a unified, higher-level interface to a complex subsystem of classes, making it easier to use.",
          order: 2,
          duration: 50, // Adjusted

          parts: [
            {
              title: "Problem: Complex Subsystem Interaction (Home Theater)",
              content:
                "Imagine controlling a home theater system with many components: Amplifier, Tuner, DVD Player, CD Player, Projector, Screen, Lights.\n\nTo watch a movie, you need to perform a sequence of actions on different components: turn on projector, lower screen, turn on amplifier, set volume, set DVD player to movie mode, start DVD player, dim lights...\n\nDirectly controlling all these components from a client application makes the client code complex and tightly coupled to the subsystem's internal details.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Home Theater Complexity",
                description: "Why is controlling the home theater directly hard?",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What makes controlling the home theater system directly from a client difficult?",
                  options: [
                    "A) The components use too much power.",
                    "B) The client needs to know about and manage many different component objects and their specific methods.",
                    "C) The components are not compatible with each other.",
                    "D) The components are too expensive."
                    ],
                  correctAnswer: "B) The client needs to know about and manage many different component objects and their specific methods.",
                  explanation: "Direct interaction leads to complex client code and tight coupling."
                }
              }
            },
            {
              title: "Solution: The Facade Pattern",
              content:
                "**Facade Pattern:** Provides a **unified interface** to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.\n\n1.  Identify the complex subsystem components (`Amplifier`, `DvdPlayer`, `Projector`, `Screen`, etc.).\n2.  Create a `HomeTheaterFacade` class.\n3.  The Facade holds references to all the components in the subsystem.\n4.  Implement simple methods in the Facade for common tasks (e.g., `watchMovie()`, `endMovie()`).\n5.  These Facade methods orchestrate the necessary calls to the underlying subsystem components.\n\n```java\n// Example structure (pseudo-code)\nclass Amplifier { on(); setDvd(); setVolume(); off(); }\nclass DvdPlayer { on(); play(); stop(); off(); }\nclass Projector { on(); wideScreenMode(); off(); }\n// ... other components\n\nclass HomeTheaterFacade {\n  Amplifier amp;\n  DvdPlayer dvd;\n  Projector projector;\n  // ... references to other components\n\n  HomeTheaterFacade(amp, dvd, proj, ...) { /* assign refs */ }\n\n  watchMovie(movie) {\n    // Sequence of calls to components\n    lights.dim(10);\n    screen.down();\n    projector.on();\n    projector.wideScreenMode();\n    amp.on();\n    amp.setDvd(dvd);\n    amp.setSurroundSound();\n    amp.setVolume(5);\n    dvd.on();\n    dvd.play(movie);\n  }\n\n  endMovie() { /* Sequence to turn things off */ }\n}\n\n// Client code\nHomeTheaterFacade homeTheater = new HomeTheaterFacade(amp, dvd, ...);\nhomeTheater.watchMovie(\"Raiders of the Lost Ark\");\n```\nThe client interacts only with the simple `HomeTheaterFacade`.",
              order: 2,
              duration: 20, // Increased
              exercise: {
                type: "code-challenge",
                title: "Implement Facade (Conceptual)",
                description: "Outline the `watchMovie` method of a HomeTheaterFacade.",
                points: 10,
                difficulty: "beginner",
                content: {
                  instructions: "Assume you have classes like `Projector`, `Screen`, `Amplifier`, `DvdPlayer`. Outline the steps inside the `watchMovie()` method of a `HomeTheaterFacade` class that would correctly sequence calls to these components to start a movie. Use pseudocode or comments.",
                  testCases: [{ input: "Conceptual Implementation", expected: "Method shows sequence of calls: lights dim, screen down, projector on, amp on, dvd on, dvd play etc."}]
                }
              }
            },
            {
              title: "Facade Pattern Defined & Principle of Least Knowledge",
              content:
                "**Facade Pattern:** Provides a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.\n\n* **Intent:** Simplify interaction with a complex system by providing a single, simpler entry point.\n* **Benefits:**\n    * Decouples clients from the complex internal structure of a subsystem.\n    * Makes the subsystem easier to use.\n    * Can provide a layered architecture.\n* **Principle of Least Knowledge (Law of Demeter):** Talk only to your immediate friends. Facade helps adhere to this by preventing clients from needing direct access to many different subsystem objects. The client talks to the Facade, and the Facade talks to the subsystem components.",
              order: 3,
              duration: 15,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Facade vs. Adapter",
                 description: "Distinguish the intent of Facade and Adapter.",
                 points: 10,
                 difficulty: "intermediate",
                 content: {
                   question: "What is the primary difference in intent between the Facade and Adapter patterns?",
                   options: [
                     "A) Facade adds new behavior, Adapter makes interfaces compatible.",
                     "B) Facade simplifies an interface, Adapter converts an interface.",
                     "C) Facade ensures one instance, Adapter allows multiple.",
                     "D) Facade uses inheritance, Adapter uses composition."
                     ],
                   correctAnswer: "B) Facade simplifies an interface, Adapter converts an interface.",
                   explanation: "Facade provides a simpler view of a complex system, while Adapter makes an existing incompatible interface usable by a client expecting a different interface."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Facade Pattern Quiz",
            description: "Test your understanding of the Facade pattern for simplifying complex subsystem interfaces.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                 type: "multiple-choice",
                 question: "The Facade pattern primarily aims to:",
                 options: [
                   "A) Add responsibilities to objects.",
                   "B) Provide a simplified, unified interface to a complex subsystem.",
                   "C) Ensure only one instance of the subsystem exists.",
                   "D) Convert one interface to another."
                   ],
                 correctAnswer: "B) Provide a simplified, unified interface to a complex subsystem.",
                 points: 10
               },
              {
                 type: "true-false",
                 question: "Using a Facade prevents clients from accessing the underlying subsystem objects directly if they choose to.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "Facade provides a simpler interface but doesn't necessarily prevent access to the subsystem if needed (though it's often discouraged)."
               }
              //  {
              //    type: "short-answer",
              //    question: "Which design principle encourages minimizing interactions between objects ('talk only to your immediate friends'), often supported by using a Facade?",
              //    correctAnswer: "Principle of Least Knowledge", // or Law of Demeter
              //    points: 10
              //  }
            ]
          }
        }
      ], // end lessons in Chapter 7
      endOfChapterQuiz: {
        title: "Chapter 7 Quiz: Adapter and Facade",
        description: "Test your understanding of the Adapter and Facade structural patterns.",
        duration: 15, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-7-quiz", // Updated slug
        questions: [
          { // Original L1 Q1
            type: "multiple-choice",
            question: "Which pattern is used to make incompatible interfaces work together?",
            options: ["Adapter", "Facade", "Decorator", "Strategy"],
            correctAnswer: "Adapter",
            points: 10
          },
          { // New
            type: "multiple-choice",
            question: "Which pattern provides a simplified interface to a larger, more complex body of code?",
            options: ["Adapter", "Facade", "Observer", "Command"],
            correctAnswer: "Facade",
            points: 10
          },
          { // New
            type: "multiple-choice",
            question: "Making a `Turkey` object usable where `Duck` methods are expected is a classic example of the ______ pattern.",
            options: ["A) Facade", "B) Strategy", "C) Observer", "D) Adapter"],
            correctAnswer: "D) Adapter",
            points: 10
          },
          { // New
             type: "true-false",
             question: "The Facade pattern fundamentally changes the interfaces of the subsystem classes it wraps.",
             options: ["true", "false"],
             correctAnswer: "false",
             points: 10,
             explanation: "Facade provides a *new*, simpler interface but doesn't alter the underlying subsystem's interfaces."
           }
        ]
      }
    },
    // ========================================
    // CHAPTER 8 - ENHANCED (Template Method)
    // ========================================
    {
      title: "The Template Method Pattern",
      description: "Define the skeleton of an algorithm in a method, deferring some steps to subclasses, allowing subclasses to redefine steps without changing the algorithm's structure.",
      order: 8,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "Encapsulating Algorithms",
          slug: "template-method-pattern",
          description: "Learn the Template Method pattern by creating a template for making caffeine beverages, understanding hooks, and the Hollywood Principle.",
          order: 1,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Problem: Similar Algorithms with Variations (Caffeine Beverages)",
              content:
                "Consider making Coffee and Tea. The overall process is similar:\n1. Boil water.\n2. Brew (Coffee grounds or Tea bag).\n3. Pour into cup.\n4. Add condiments (Sugar/Milk or Lemon).\n\nPutting this logic into separate `Coffee` and `Tea` classes leads to code duplication for the common steps (boil water, pour in cup).\n\nCreating a `CaffeineBeverage` superclass with all steps might work initially, but how do you handle the different brewing and condiment steps cleanly?",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Beverage Code Duplication",
                description: "Identify the issue with separate Coffee/Tea classes.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "If `Coffee` and `Tea` classes both implement `boilWater()` and `pourInCup()` methods independently, what is the main problem?",
                  options: [
                    "A) Performance degradation.",
                    "B) Code duplication for common steps.",
                    "C) Inability to add condiments.",
                    "D) Tight coupling."
                    ],
                  correctAnswer: "B) Code duplication for common steps.",
                  explanation: "Identical logic in multiple places makes maintenance harder."
                }
              }
            },
            {
              title: "Solution: The Template Method Pattern",
              content:
                "**Template Method Pattern:** Defines the skeleton of an algorithm in an operation (the **template method**), deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.\n\n1.  Create an abstract base class (`CaffeineBeverage`).\n2.  Implement the overall algorithm structure as a `final` method (the template method) in the base class (e.g., `prepareRecipe()`).\n3.  The template method calls a series of abstract methods (for required varying steps) and concrete methods (for common steps or optional steps/hooks).\n    * `boilWater()` (Concrete - same for all)\n    * `brew()` (**Abstract** - implemented by `Coffee` and `Tea`)\n    * `pourInCup()` (Concrete - same for all)\n    * `addCondiments()` (**Abstract** - implemented by `Coffee` and `Tea`)\n4.  Concrete subclasses (`Coffee`, `Tea`) extend the base class and provide implementations only for the abstract primitive operations (`brew`, `addCondiments`).\n\n```java\n// Example structure (pseudo-code)\nabstract class CaffeineBeverage {\n  // The Template Method\n  final void prepareRecipe() {\n    boilWater();\n    brew(); // Abstract - implemented by subclass\n    pourInCup();\n    if (customerWantsCondiments()) { // Hook\n       addCondiments(); // Abstract - implemented by subclass\n    }\n  }\n\n  abstract void brew();\n  abstract void addCondiments();\n\n  void boilWater() { /* Boil water implementation */ }\n  void pourInCup() { /* Pour implementation */ }\n\n  // Hook - Subclasses can override, but default is true\n  boolean customerWantsCondiments() { return true; }\n}\n\nclass Coffee extends CaffeineBeverage {\n  brew() { /* Drip coffee through filter */ }\n  addCondiments() { /* Add sugar and milk */ }\n}\n\nclass Tea extends CaffeineBeverage {\n  brew() { /* Steep tea bag */ }\n  addCondiments() { /* Add lemon */ }\n}\n```\nThe algorithm structure is fixed, but steps can vary.",
              order: 2,
              duration: 25, // Increased
              exercise: {
                type: "code-challenge",
                title: "Implement Template Method (Conceptual)",
                description: "Outline the CaffeineBeverage Template Method structure.",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Define an abstract `CaffeineBeverage` class with a `final prepareRecipe` template method. This method should call concrete `boilWater`, `pourInCup` methods, and abstract `brew`, `addCondiments` methods. Show how `Coffee` and `Tea` subclasses extend `CaffeineBeverage` and implement only `brew` and `addCondiments`. Use pseudocode or your preferred language.",
                  testCases: [{ input: "Conceptual Implementation", expected: "Abstract class with template method calling abstract/concrete primitives; Concrete classes implementing primitives."}]
                }
              }
            },
            {
              title: "Template Method Defined, Hooks, and Hollywood Principle",
              content:
                "**Template Method Pattern:** Defines the skeleton of an algorithm in a method, deferring some steps to subclasses. Lets subclasses redefine certain steps without changing the algorithm structure.\n\n* **Intent:** Define algorithm outline, let subclasses implement details.\n* **Hooks:** Optional steps in the template method. These are methods in the base class with default (often empty) behavior. Subclasses *can* override them if needed, but don't have to. The `customerWantsCondiments()` method in the example is a hook.\n* **Hollywood Principle:** \"Don't call us, we'll call you.\" The base class template method calls the subclass methods (primitives/hooks), not the other way around. The framework/superclass controls the flow.\n* **Benefits:** Code reuse for algorithm structure, enforces overall algorithm flow, allows customization via subclassing.",
              order: 3,
              duration: 20, // Increased
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Template Method Hook",
                 description: "What is a 'hook' in the Template Method pattern?",
                 points: 10,
                 difficulty: "intermediate",
                 content: {
                   question: "In the Template Method pattern, what is a 'hook' method?",
                   options: [
                     "A) An abstract method that subclasses MUST implement.",
                     "B) A method in the base class that provides default behavior and can optionally be overridden by subclasses.",
                     "C) A final method that cannot be overridden.",
                     "D) A private helper method used only by the template method."
                     ],
                   correctAnswer: "B) A method in the base class that provides default behavior and can optionally be overridden by subclasses.",
                   explanation: "Hooks provide optional points for subclasses to plug into the algorithm's skeleton."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Template Method Pattern Quiz",
            description: "Test your understanding of defining algorithm skeletons, deferring steps to subclasses, hooks, and the Hollywood Principle.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                 type: "multiple-choice",
                 question: "The Template Method pattern defines the overall ______ of an algorithm in a base class.",
                 options: ["A) performance", "B) data types", "C) structure/skeleton", "D) concrete implementation"],
                 correctAnswer: "C) structure/skeleton",
                 points: 10,
                 explanation: "It outlines the steps, deferring some specific implementations to subclasses."
               },
              {
                 type: "multiple-choice",
                 question: "In the Template Method pattern, methods that subclasses MUST implement are typically declared as:",
                 options: ["A) final", "B) static", "C) private", "D) abstract"],
                 correctAnswer: "D) abstract",
                 points: 10,
                 explanation: "Abstract methods force subclasses to provide their specific implementation for required steps."
               },
               {
                 type: "true-false",
                 question: "The 'Hollywood Principle' ('Don't call us, we'll call you') suggests that subclasses frequently call methods in the base class within the Template Method pattern.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "The principle means the base class template method calls the subclass's implemented primitive operations/hooks; the control flow resides in the superclass."
               },
                {
                 type: "short-answer",
                 question: "Besides abstract methods for required steps, what kind of method provides an optional extension point in the template method algorithm?",
                 correctAnswer: "Hook", // or Hook method
                 points: 10
               }
            ]
          }
        }
      ], // end lessons in Chapter 8
      endOfChapterQuiz: {
        title: "Chapter 8 Quiz: Template Method",
        description: "Test your knowledge of the Template Method pattern for algorithm definition and customization.",
        duration: 15, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-8-quiz",
        questions: [
           {
             type: "multiple-choice",
             question: "Which pattern defines an algorithm's skeleton in a base class but lets subclasses override specific steps?",
             options: ["Strategy", "Observer", "Template Method", "Facade"],
             correctAnswer: "Template Method",
             points: 10
           },
           {
             type: "multiple-choice",
             question: "In the Template Method pattern, the main algorithm structure is usually defined in a method that is:",
             options: ["A) abstract", "B) private", "C) final", "D) static"],
             correctAnswer: "C) final",
             points: 10,
             explanation: "Marking the template method as final prevents subclasses from changing the overall algorithm structure."
           },
           {
             type: "true-false",
             question: "Hook methods in the Template Method pattern must always be overridden by subclasses.",
             options: ["true", "false"],
             correctAnswer: "false",
             points: 10,
             explanation: "Hooks are optional; subclasses only override them if they need to modify that specific part of the algorithm's default behavior."
           }
        ]
      }
    },
    // ========================================
    // END OF CHAPTER 8
    // ========================================
    // ========================================
    // CHAPTER 9 - ENHANCED (Iterator & Composite)
    // ========================================
    {
      title: "Iterator and Composite Patterns",
      description: "Patterns focused on accessing and managing collections of objects uniformly, whether they are simple items or complex hierarchical structures.",
      order: 9,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "The Iterator Pattern",
          slug: "iterator-pattern",
          description: "Provide a standard way to traverse through different collection types (like Arrays, Lists, HashMaps) without exposing their internal structure.",
          order: 1,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Problem: Merging Different Menus",
              content:
                "Imagine merging menus from two different restaurants: Lou's Diner (uses an `Array` for menu items) and Mel's Pancake House (uses an `ArrayList`).\n\nIf we want to write a single `Waitress` class that can print both menus, she needs to know the specific implementation details of each menu (`Array` vs. `ArrayList`) and write different loops to iterate through them. This is fragile and violates the Open/Closed principle – adding a third menu type (e.g., using a `HashMap`) would require modifying the `Waitress` class again.",
              order: 1,
              duration: 15,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Menu Iteration Problem",
                description: "Why is iterating over different menu implementations hard?",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What is the main problem if a `Waitress` class needs to know the concrete implementation (e.g., Array vs. ArrayList) of each menu it prints?",
                  options: [
                    "A) The menus cannot store enough items.",
                    "B) The Waitress code becomes complex and must be changed whenever a new menu implementation is added.",
                    "C) Performance is significantly degraded.",
                    "D) Different menus cannot have items with the same name."
                    ],
                  correctAnswer: "B) The Waitress code becomes complex and must be changed whenever a new menu implementation is added.",
                  explanation: "Tight coupling to concrete collection types makes the client code brittle and hard to extend."
                }
              }
            },
            {
              title: "Solution: The Iterator Pattern",
              content:
                "**Iterator Pattern:** Provides a way to access the elements of an aggregate object (collection) sequentially without exposing its underlying representation.\n\n1.  **Iterator Interface:** Defines methods for traversal (e.g., `hasNext()`, `next()`).\n2.  **Concrete Iterators:** Implement the Iterator interface for a specific collection type (e.g., `ArrayMenuIterator`, `ArrayListMenuIterator`). They know how to navigate their specific aggregate.\n3.  **Aggregate Interface:** Defines a method to create an Iterator object (e.g., `createIterator()`).\n4.  **Concrete Aggregates:** Implement the Aggregate interface, returning an instance of their specific Concrete Iterator.\n5.  **Client (`Waitress`):** Interacts *only* with the Aggregate and Iterator interfaces. Gets an Iterator from the Aggregate and uses `hasNext()`/`next()` to traverse, unaware of the underlying collection type.\n\n```java\n// Example structure (pseudo-code)\ninterface Iterator {\n  boolean hasNext();\n  Object next();\n}\n\ninterface Menu { // Aggregate\n  Iterator createIterator();\n}\n\nclass DinerMenu implements Menu {\n  MenuItem[] menuItems; // Array\n  createIterator() { return new DinerMenuIterator(menuItems); }\n}\n\nclass PancakeHouseMenu implements Menu {\n  ArrayList<MenuItem> menuItems; // ArrayList\n  createIterator() { return new PancakeHouseMenuIterator(menuItems); }\n}\n\nclass DinerMenuIterator implements Iterator { /* Iterates over array */ }\nclass PancakeHouseMenuIterator implements Iterator { /* Iterates over ArrayList */ }\n\nclass Waitress {\n  printMenu(Menu menu) {\n    Iterator iterator = menu.createIterator();\n    while (iterator.hasNext()) {\n      MenuItem item = (MenuItem)iterator.next();\n      // Print item\n    }\n  }\n}\n```\nThe Waitress now works with any `Menu` that provides an `Iterator`.",
              order: 2,
              duration: 25, // Increased
              exercise: {
                type: "code-challenge",
                title: "Implement Iterator (Conceptual)",
                description: "Outline the Iterator for an ArrayList-based menu.",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Define the `Iterator` interface (`hasNext`, `next`). Define the `Menu` interface (`createIterator`). Show the `PancakeHouseMenu` class (using an `ArrayList`) implementing `Menu` and returning a `PancakeHouseMenuIterator`. Outline the `PancakeHouseMenuIterator` class, showing how it tracks position and implements `hasNext`/`next` for an `ArrayList`. Use pseudocode or your preferred language.",
                  testCases: [{ input: "Conceptual Implementation", expected: "Shows interfaces, concrete aggregate returning iterator, and concrete iterator logic for ArrayList."}]
                }
              }
            },
            {
              title: "Iterator Pattern Defined",
              content:
                "**Iterator Pattern:** Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.\n\n* **Intent:** Decouple algorithms from containers; provide a standard traversal interface.\n* **Benefits:**\n    * Simplifies the Aggregate's interface (doesn't need traversal methods).\n    * Supports multiple concurrent traversals.\n    * Provides a uniform interface for traversing different aggregate structures.\n    * Client code interacts with the abstract Iterator, promoting loose coupling.\n* **Single Responsibility Principle:** Moves traversal responsibility out of the aggregate class into the iterator class.",
              order: 3,
              duration: 15,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Iterator Responsibility",
                 description: "What responsibility does the Iterator pattern extract?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "The Iterator pattern moves the responsibility for ______ from the collection class to a separate Iterator class.",
                   options: ["A) Storing elements", "B) Adding elements", "C) Traversing elements", "D) Sorting elements"],
                   correctAnswer: "C) Traversing elements",
                   explanation: "Separating traversal logic cleans up the collection's interface and allows different traversal strategies."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Iterator Pattern Quiz",
            description: "Test your understanding of providing uniform traversal across different collections using the Iterator pattern.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                 type: "multiple-choice",
                 question: "The main purpose of the Iterator pattern is to:",
                 options: [
                   "A) Ensure a collection has only one iterator.",
                   "B) Provide a standard way to traverse a collection without exposing its internal structure.",
                   "C) Combine multiple collections into one.",
                   "D) Add new operations to a collection dynamically."
                   ],
                 correctAnswer: "B) Provide a standard way to traverse a collection without exposing its internal structure.",
                 points: 10
               },
               {
                 type: "multiple-choice",
                 question: "In the Iterator pattern, the client code interacts directly with:",
                 options: [
                     "A) The concrete collection class (e.g., ArrayList).",
                     "B) The concrete iterator class.",
                     "C) The abstract Aggregate (e.g., Menu) and Iterator interfaces.",
                     "D) Helper utility classes."
                     ],
                 correctAnswer: "C) The abstract Aggregate (e.g., Menu) and Iterator interfaces.",
                 points: 10,
                 explanation: "Clients depend on the abstractions, allowing different implementations to be used."
               },
               {
                 type: "true-false",
                 question: "Using the Iterator pattern makes it harder to add new types of collections (Aggregates) later.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "It makes it easier, as client code using the Iterator interface doesn't need to change when a new Aggregate/Iterator pair is added."
               }
            ]
          }
        },
        // ---------------------------
        // LESSON 2 - ENHANCED
        // ---------------------------
        {
          title: "The Composite Pattern",
          slug: "composite-pattern",
          description: "Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.",
          order: 2,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Problem: Handling Hierarchies (Menus with Submenus)",
              content:
                "Expanding on the menu example, what if menus can contain other menus (submenus)? \n\nWe now have two types of things: individual `MenuItem` objects and `Menu` objects (which contain `MenuItems` *and potentially other `Menus`*). Writing code to navigate and operate on this structure (e.g., print the entire hierarchy, calculate total calories) becomes complicated if we have to constantly check the type of item we're dealing with (`if item is Menu` vs `if item is MenuItem`).",
              order: 1,
              duration: 10,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Tree Structure Issue",
                 description: "What makes tree-like menu structures complex to handle?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "What is the main difficulty when writing code to operate on a structure containing both individual items (leaves) and groups (composites) that can contain other items/groups?",
                   options: [
                       "A) The structure uses too much memory.",
                       "B) The need to treat leaves and composites differently in client code.",
                       "C) Performance degradation during traversal.",
                       "D) Inability to add new types of items."
                       ],
                   correctAnswer: "B) The need to treat leaves and composites differently in client code.",
                   explanation: "Writing separate code paths for individual items vs. groups/submenus makes the client complex."
                 }
              }
            },
            {
              title: "Solution: The Composite Pattern",
              content:
                "**Composite Pattern:** Composes objects into **tree structures** to represent part-whole hierarchies. Composite lets clients treat individual objects (**leaves**) and compositions of objects (**composites**) uniformly.\n\n1.  Define a common **Component** interface (or abstract class) that declares operations applicable to both leaves and composites (e.g., `print()`, `add()`, `remove()`, `getChild()`).\n2.  Create **Leaf** classes (e.g., `MenuItem`) that implement the Component interface. Leaf operations like `add`/`remove`/`getChild` typically do nothing or throw an exception.\n3.  Create **Composite** classes (e.g., `Menu`) that implement the Component interface. Composites hold a collection of child Components (leaves or other composites).\n    * Composite operations like `print()` usually iterate over children and delegate the call.\n    * Composite operations like `add`/`remove`/`getChild` manipulate the children collection.\n4.  **Client** code interacts with the hierarchy *only* through the Component interface, treating leaves and composites the same way.\n\n```java\n// Example structure (pseudo-code)\nabstract class MenuComponent {\n  // Common ops (may have default implementations or be abstract)\n  print() { throw new UnsupportedOperationException(); }\n  // Child management ops (default: throw exception for leaves)\n  add(MenuComponent c) { throw new UnsupportedOperationException(); }\n  remove(MenuComponent c) { throw new UnsupportedOperationException(); }\n  getChild(int i) { throw new UnsupportedOperationException(); }\n  // Leaf specific ops (default: throw exception for composites)\n  getName() { throw new UnsupportedOperationException(); }\n  getPrice() { throw new UnsupportedOperationException(); }\n}\n\nclass MenuItem extends MenuComponent { // Leaf\n  String name; double price;\n  MenuItem(n, p) { this.name = n; this.price = p; }\n  getName() { return name; }\n  getPrice() { return price; }\n  print() { /* Print item name/price */ }\n}\n\nclass Menu extends MenuComponent { // Composite\n  List<MenuComponent> menuComponents = new ArrayList<>();\n  String name;\n  Menu(n) { this.name = n; }\n\n  add(MenuComponent c) { menuComponents.add(c); }\n  remove(MenuComponent c) { menuComponents.remove(c); }\n  getChild(int i) { return menuComponents.get(i); }\n  getName() { return name; }\n\n  print() {\n    /* Print menu name */\n    // Iterate and call print() on children\n    Iterator iterator = menuComponents.iterator();\n    while (iterator.hasNext()) {\n      MenuComponent component = iterator.next();\n      component.print(); // Uniform call!\n    }\n  }\n}\n```\nClients can now call `print()` on the top-level menu and the entire hierarchy gets printed uniformly.",
              order: 2,
              duration: 25, // Increased
              exercise: {
                type: "code-challenge",
                title: "Implement Composite (Conceptual)",
                description: "Outline the structure for a Menu using Composite.",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Define an abstract `MenuComponent` class providing default implementations (or abstract declarations) for operations like `print`, `add`, `remove`, `getChild`. Create `MenuItem` (Leaf) inheriting from `MenuComponent`, implementing `print` and leaf-specific ops. Create `Menu` (Composite) inheriting from `MenuComponent`, holding a list of children and implementing `print`, `add`, `remove`, `getChild`. Use pseudocode or your preferred language.",
                  testCases: [{ input: "Conceptual Implementation", expected: "Shows Component, Leaf (MenuItem), and Composite (Menu) classes with appropriate method implementations/overrides."}]
                }
              }
            },
            {
              title: "Composite Pattern Defined",
              content:
                "**Composite Pattern:** Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.\n\n* **Intent:** Allow clients to operate on individual objects (leaves) and groups of objects (composites) through a common interface.\n* **Benefits:**\n    * Simplifies client code (treats all components uniformly).\n    * Easy to add new types of Components (leaves or composites).\n    * Represents hierarchies naturally.\n* **Drawbacks:** Can make the design overly general; type checking might be needed if operations only make sense for leaves or composites.",
              order: 3,
              duration: 15,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Composite Uniformity",
                 description: "What is the key benefit for client code using Composite?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "The main advantage of the Composite pattern for client code is that it allows clients to:",
                   options: [
                     "A) Access the internal state of all objects directly.",
                     "B) Treat individual objects (leaves) and groups of objects (composites) uniformly through a common interface.",
                     "C) Ensure that only one instance of the composite exists.",
                     "D) Add new methods to objects dynamically."
                     ],
                   correctAnswer: "B) Treat individual objects (leaves) and groups of objects (composites) uniformly through a common interface.",
                   explanation: "Clients don't need `if/else` checks for leaves vs. composites when performing common operations like `print()`."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Composite Pattern Quiz",
            description: "Test your understanding of representing part-whole hierarchies and treating leaves/composites uniformly.",
            duration: 15,
            passingScore: 75,
            questions: [
               {
                 type: "multiple-choice",
                 question: "The Composite pattern is used to represent what kind of structures?",
                 options: ["A) Linked Lists", "B) Hash Tables", "C) Part-whole hierarchies (Trees)", "D) State Machines"],
                 correctAnswer: "C) Part-whole hierarchies (Trees)",
                 points: 10
               },
               {
                 type: "multiple-choice",
                 question: "In the Composite pattern, both Leaf and Composite classes typically:",
                 options: ["A) Contain child components", "B) Implement the same Component interface/abstract class", "C) Have complex traversal logic", "D) Cannot be instantiated directly"],
                 correctAnswer: "B) Implement the same Component interface/abstract class",
                 points: 10,
                 explanation: "This common interface allows clients to treat them uniformly."
               },
               {
                 type: "true-false",
                 question: "Client code using the Composite pattern usually needs to check if an object is a Leaf or a Composite before calling operations.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "The goal is uniformity; clients ideally call methods via the Component interface without knowing the concrete type."
               }
            ]
          }
        }
      ], // end lessons in Chapter 9
      endOfChapterQuiz: {
        title: "Chapter 9 Quiz: Iterator and Composite",
        description: "Test your understanding of traversing collections (Iterator) and managing tree structures (Composite).",
        duration: 20, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-9-quiz",
        questions: [
          {
             type: "multiple-choice",
             question: "Which pattern provides a way to access elements sequentially without exposing the underlying collection's structure?",
             options: ["Iterator", "Composite", "Observer", "Strategy"],
             correctAnswer: "Iterator",
             points: 10
           },
          {
             type: "multiple-choice",
             question: "Which pattern allows treating individual objects and compositions of objects uniformly?",
             options: ["Iterator", "Composite", "Decorator", "Facade"],
             correctAnswer: "Composite",
             points: 10
           },
           {
             type: "true-false",
             question: "The Iterator pattern tightly couples the client code to the specific collection implementation (like ArrayList or Array).",
             options: ["true", "false"],
             correctAnswer: "false",
             points: 10,
             explanation: "Iterator *decouples* the client by providing a standard interface for traversal."
           },
           {
             type: "multiple-choice",
             question: "In the Composite pattern, a 'Leaf' node typically:",
             options: ["A) Contains other child components", "B) Represents an individual object with no children", "C) Defines the common interface", "D) Manages the traversal logic"],
             correctAnswer: "B) Represents an individual object with no children",
             points: 10
           }
        ]
      }
    },
    // ========================================
    // CHAPTER 10 - ENHANCED (State Pattern)
    // ========================================
    {
      title: "The State Pattern",
      description: "Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.",
      order: 10,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "Managing State Transitions",
          slug: "state-pattern",
          description: "Use the State pattern to encapsulate state-specific behavior and transitions, cleaning up complex conditional logic.",
          order: 1,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Problem: Conditional Logic Hell (Gumball Machine)",
              content:
                "Consider a Gumball Machine with states: No Quarter, Has Quarter, Gumball Sold, Sold Out.\n\nImplementing its behavior (`insertQuarter`, `ejectQuarter`, `turnCrank`, `dispense`) using conditional logic (`if/else` or `switch` based on the current state) inside the `GumballMachine` class leads to:\n\n* **Complex Methods:** Each action method becomes bloated with checks for every possible state.\n* **Difficult Maintenance:** Adding new states or modifying transitions requires changing multiple methods.\n* **Violation of Open/Closed:** Adding states requires modifying existing code.\n* **Hard to Understand:** The logic for a specific state is scattered across different methods.",
              order: 1,
              duration: 15,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Conditional State Issue",
                description: "Why is using `if/else` for state bad?",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What is the main problem with implementing state-dependent behavior using large `if/else` or `switch` statements within the main context class?",
                  options: [
                    "A) It improves performance.",
                    "B) It makes the code complex, hard to maintain, and violates the Open/Closed Principle.",
                    "C) It reduces memory usage.",
                    "D) It is the only way to handle state transitions."
                    ],
                  correctAnswer: "B) It makes the code complex, hard to maintain, and violates the Open/Closed Principle.",
                  explanation: "Conditional logic for state becomes tangled and difficult to modify or extend."
                }
              }
            },
            {
              title: "Solution: The State Pattern",
              content:
                "**State Pattern:** Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.\n\n1.  Define a **State Interface** (`State`) declaring methods for all possible actions (e.g., `insertQuarter`, `ejectQuarter`, `turnCrank`, `dispense`).\n2.  Create **Concrete State** classes for each state (`NoQuarterState`, `HasQuarterState`, `SoldState`, `SoldOutState`, `WinnerState`), implementing the `State` interface. Each state class implements the behavior appropriate for *that specific state*. For actions invalid in a state, the method might do nothing or throw an exception.\n3.  The **Context** class (`GumballMachine`) holds a reference to a `State` object representing its *current* state.\n4.  The Context delegates action calls (`insertQuarter()`, etc.) to the current state object.\n5.  Concrete State objects handle the action *and* are responsible for transitioning the Context to the *next* state by calling a setter on the Context (e.g., `gumballMachine.setState(gumballMachine.getHasQuarterState());`).\n\n```java\n// Example structure (pseudo-code)\ninterface State { insertQuarter(); ejectQuarter(); turnCrank(); dispense(); }\n\nclass GumballMachine { // Context\n  State noQuarterState, hasQuarterState, soldState, soldOutState;\n  State currentState;\n  int count = 0;\n\n  GumballMachine(numGumballs) { /* Init states, set initial state */ }\n  \n  // Delegate actions to current state\n  insertQuarter() { currentState.insertQuarter(); }\n  ejectQuarter() { currentState.ejectQuarter(); }\n  turnCrank() { currentState.turnCrank(); currentState.dispense(); }\n  // Internal dispense called by state\n  releaseBall() { /* decrement count */ }\n  \n  // State management\n  setState(State state) { this.currentState = state; }\n  // Getters for state objects...\n}\n\nclass NoQuarterState implements State {\n  GumballMachine machine;\n  NoQuarterState(m) { this.machine = m; }\n  insertQuarter() { /* OK: transition to HasQuarterState */ machine.setState(machine.getHasQuarterState()); }\n  ejectQuarter() { /* Invalid action */ }\n  turnCrank() { /* Invalid action */ }\n  dispense() { /* Invalid action */ }\n}\n\nclass HasQuarterState implements State {\n  GumballMachine machine;\n  HasQuarterState(m) { this.machine = m; }\n  insertQuarter() { /* Invalid action */ }\n  ejectQuarter() { /* OK: transition to NoQuarterState */ machine.setState(machine.getNoQuarterState()); }\n  turnCrank() { /* OK: transition to SoldState (or WinnerState) */ machine.setState(machine.getSoldState()); }\n  dispense() { /* Invalid action */ }\n}\n// ... other state classes ...\n```\nBehavior is now localized within state classes.",
              order: 2,
              duration: 25, // Increased
              exercise: {
                type: "code-challenge",
                title: "Implement State Pattern (Conceptual)",
                description: "Outline the `HasQuarterState` for the Gumball Machine.",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Define the `State` interface. Show the `HasQuarterState` class implementing `State`. Implement the `insertQuarter`, `ejectQuarter`, and `turnCrank` methods within `HasQuarterState`. Show how `ejectQuarter` transitions back to `NoQuarterState` and `turnCrank` transitions to `SoldState` by calling `setState` on the `GumballMachine` context. Assume `GumballMachine` has methods like `setState()` and `getNoQuarterState()`, `getSoldState()`. Use pseudocode or your preferred language.",
                  testCases: [{ input: "Conceptual Implementation", expected: "HasQuarterState implements State, handles actions, and calls setState() for transitions."}]
                }
              }
            },
            {
              title: "State Pattern Defined",
              content:
                "**State Pattern:** Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.\n\n* **Intent:** Encapsulate state-specific behavior and manage state transitions.\n* **Benefits:**\n    * Localizes state-specific behavior into separate classes.\n    * Makes state transitions explicit.\n    * Adheres to Open/Closed Principle (adding new states often involves adding new classes, not modifying existing ones).\n* **Relation to Strategy:** Structure is similar (Context delegates to another object). State manages transitions *between* different behavior objects; Strategy usually lets the client choose the behavior object.",
              order: 3,
              duration: 15,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: State vs. Strategy",
                 description: "Distinguish State from Strategy pattern.",
                 points: 10,
                 difficulty: "intermediate",
                 content: {
                   question: "What is a key difference between the State and Strategy patterns?",
                   options: [
                     "A) State uses inheritance, Strategy uses composition.",
                     "B) State allows behavior to change based on internal state transitions, Strategy typically lets the client select the behavior.",
                     "C) Strategy encapsulates algorithms, State encapsulates object creation.",
                     "D) State is a Creational pattern, Strategy is a Behavioral pattern." // Both are Behavioral
                     ],
                   correctAnswer: "B) State allows behavior to change based on internal state transitions, Strategy typically lets the client select the behavior.",
                   explanation: "State handles the transitions between different behavior (state) objects itself, while Strategy often relies on external client code to set the desired behavior."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "State Pattern Quiz",
            description: "Test your understanding of encapsulating state-dependent behavior and transitions using the State pattern.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                 type: "multiple-choice",
                 question: "The State pattern allows an object's behavior to change when its _______ changes.",
                 options: ["A) interface", "B) internal state", "C) client", "D) memory location"],
                 correctAnswer: "B) internal state",
                 points: 10
               },
              {
                 type: "multiple-choice",
                 question: "In the State pattern, where is the logic for handling a specific action (like `insertQuarter`) primarily located?",
                 options: [
                   "A) Within the Context class (`GumballMachine`) using conditional statements.",
                   "B) Within the Concrete State class corresponding to the current state.",
                   "C) Within the client code that calls the action.",
                   "D) Within a separate utility class."
                   ],
                 correctAnswer: "B) Within the Concrete State class corresponding to the current state.",
                 points: 10,
                 explanation: "Each state class encapsulates the behavior valid for that state."
               },
               {
                 type: "true-false",
                 question: "In the State pattern, the Context object (`GumballMachine`) is typically responsible for deciding which state to transition to next.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "Usually, the Concrete State objects themselves determine and trigger the transition to the next state by calling a method on the Context."
               }
            ]
          }
        }
      ], // end lessons in Chapter 10
      endOfChapterQuiz: {
        title: "Chapter 10 Quiz: State Pattern",
        description: "Test your knowledge of the State pattern for managing state-specific behavior and transitions.",
        duration: 15, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-10-quiz",
        questions: [
          {
             type: "multiple-choice",
             question: "Which pattern allows an object to change its behavior when its internal state changes?",
             options: ["Strategy", "State", "Observer", "Command"],
             correctAnswer: "State",
             points: 10
           },
          {
             type: "multiple-choice",
             question: "The State pattern helps eliminate complex ______ statements in the Context class.",
             options: ["A) import", "B) inheritance", "C) conditional (if/else, switch)", "D) looping (for, while)"],
             correctAnswer: "C) conditional (if/else, switch)",
             points: 10,
             explanation: "State-specific logic is moved into separate state classes, simplifying the context."
           },
           {
             type: "true-false",
             question: "The State pattern makes it difficult to add new states to the system later.",
             options: ["true", "false"],
             correctAnswer: "false",
             points: 10,
             explanation: "Adding new states typically involves creating a new state class and updating transitions in existing states, often adhering well to the Open/Closed Principle."
           }
        ]
      }
    },
    // ========================================
    // CHAPTER 11 - ENHANCED (Proxy Pattern)
    // ========================================
    {
      title: "The Proxy Pattern",
      description: "Provide a surrogate or placeholder for another object to control access to it. Explore different types of proxies like Remote, Virtual, and Protection.",
      order: 11,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "Controlling Object Access",
          slug: "proxy-pattern",
          description: "Learn the Proxy pattern to provide a surrogate or placeholder, controlling access to the real subject object. Explore Remote and Virtual Proxy examples.",
          order: 1,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Problem: Controlling Access to Objects",
              content:
                "Sometimes you need to control access to an object. Reasons might include:\n\n* **Location:** The object is in a different address space (Remote Proxy).\n* **Creation Cost:** Creating the object is expensive; delay creation until needed (Virtual Proxy).\n* **Security:** Need to check access rights before allowing operations (Protection Proxy).\n* **Additional Behavior:** Add logging or caching around object access (Smart Reference Proxy).\n\nDirectly giving clients access to the real object doesn't allow for this controlled or mediated access.",
              order: 1,
              duration: 10,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Need for Control",
                 description: "Why might direct access to an object be undesirable?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "Which is NOT a typical reason for needing to control access to an object (and thus potentially use a Proxy)?",
                   options: [
                     "A) The object resides on a remote machine.",
                     "B) The object's methods need to be renamed.",
                     "C) Creating the object is resource-intensive.",
                     "D) Access needs to be restricted based on user permissions."
                     ],
                   correctAnswer: "B) The object's methods need to be renamed.",
                   explanation: "Renaming methods is usually handled by refactoring or the Adapter pattern, not Proxy."
                 }
              }
            },
            {
              title: "Solution: The Proxy Pattern Structure",
              content:
                "**Proxy Pattern:** Provides a **surrogate** or **placeholder** for another object to control access to it.\n\n1.  **Subject Interface:** Defines the common interface for both the RealSubject and the Proxy, so the Proxy can be substituted for the RealSubject.\n2.  **RealSubject:** The actual object that the proxy represents and controls access to.\n3.  **Proxy:**\n    * Implements the Subject interface.\n    * Holds a reference to the RealSubject (it might create the RealSubject itself, e.g., Virtual Proxy).\n    * Controls access to the RealSubject: it can perform actions before or after forwarding requests (e.g., network communication, lazy creation, access checks).\n\n```java\n// Example structure (pseudo-code)\ninterface Image { display(); }\n\nclass RealImage implements Image {\n  String filename;\n  RealImage(fname) { this.filename = fname; loadFromDisk(); }\n  loadFromDisk() { /* Expensive operation */ }\n  display() { /* Display loaded image */ }\n}\n\nclass ImageProxy implements Image { // Virtual Proxy\n  RealImage realImage = null;\n  String filename;\n  ImageProxy(fname) { this.filename = fname; }\n\n  display() {\n    if (realImage == null) {\n      realImage = new RealImage(filename); // Lazy creation\n    }\n    realImage.display(); // Delegate\n  }\n}\n\n// Client code\nImage image = new ImageProxy(\"my_large_image.jpg\");\n// RealImage not loaded yet\nimage.display(); // Now RealImage is created and loaded, then displayed\n```\nThe client interacts with the `ImageProxy` exactly as if it were a `RealImage`.",
              order: 2,
              duration: 25, // Increased
              exercise: {
                type: "code-challenge",
                title: "Implement Proxy (Conceptual)",
                description: "Outline a Virtual Proxy for loading a heavy resource.",
                points: 15,
                difficulty: "intermediate",
                content: {
                  instructions: "Define a `HeavyResource` interface with an `accessResource()` method. Create `RealHeavyResource` which simulates expensive loading in its constructor. Create `VirtualHeavyResourceProxy` which implements the interface, holds a null reference to the real resource initially, and only creates/loads the `RealHeavyResource` inside the `accessResource()` method the first time it's called. Use pseudocode or your preferred language.",
                  testCases: [{ input: "Conceptual Implementation", expected: "Proxy implements interface, delays creation of RealSubject until first access."}]
                }
              }
            },
            {
              title: "Proxy Pattern Defined & Variations",
              content:
                "**Proxy Pattern:** Provides a surrogate or placeholder for another object to control access to it.\n\n* **Intent:** Control access to the original object; manage its lifecycle or add functionality without the client knowing.\n* **Common Variations:**\n    * **Remote Proxy:** Represents an object in a different address space (e.g., on a remote server). Hides network communication details. (e.g., Java RMI stubs).\n    * **Virtual Proxy:** Creates expensive objects on demand. Acts as a placeholder until the real object is needed (e.g., image loading example).\n    * **Protection Proxy:** Controls access based on permissions or rights. Checks if the caller has access before forwarding the request.\n    * **Smart Reference/Proxy:** Performs additional actions when accessed (e.g., reference counting, logging, caching - Caching Proxy).\n* **Relation to Decorator:** Both wrap objects and implement the same interface. Decorator *adds* behavior, Proxy *controls access*.",
              order: 3,
              duration: 20, // Increased
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Proxy vs. Decorator",
                 description: "Distinguish the primary intent of Proxy vs. Decorator.",
                 points: 10,
                 difficulty: "intermediate",
                 content: {
                   question: "While both Proxy and Decorator wrap objects, what is the primary intent of Proxy?",
                   options: [
                     "A) To add multiple, stackable responsibilities.",
                     "B) To control access to the wrapped object (remotely, lazily, securely, etc.).",
                     "C) To change the interface of the wrapped object.",
                     "D) To ensure only one instance of the wrapped object exists."
                     ],
                   correctAnswer: "B) To control access to the wrapped object (remotely, lazily, securely, etc.).",
                   explanation: "Proxy focuses on mediation and controlling access, while Decorator focuses on dynamically adding behavior."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Proxy Pattern Quiz",
            description: "Test your understanding of the Proxy pattern for controlling object access, including Remote and Virtual proxies.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                 type: "multiple-choice",
                 question: "The Proxy pattern provides a ______ for another object to control access to it.",
                 options: ["A) superclass", "B) direct reference", "C) surrogate or placeholder", "D) copy"],
                 correctAnswer: "C) surrogate or placeholder",
                 points: 10
               },
              {
                 type: "multiple-choice",
                 question: "Which type of Proxy is used to represent an object located in a different address space (e.g., on another server)?",
                 options: ["A) Virtual Proxy", "B) Protection Proxy", "C) Remote Proxy", "D) Smart Reference Proxy"],
                 correctAnswer: "C) Remote Proxy",
                 points: 10,
                 explanation: "Remote proxies handle the network communication needed to interact with the distant object."
               },
               {
                 type: "multiple-choice",
                 question: "A Virtual Proxy is primarily used to:",
                 options: [
                   "A) Restrict access based on permissions.",
                   "B) Log calls to the real object.",
                   "C) Delay the creation of an expensive object until it's actually needed.",
                   "D) Adapt the object's interface."
                   ],
                 correctAnswer: "C) Delay the creation of an expensive object until it's actually needed.",
                 points: 10,
                 explanation: "It acts as a lightweight placeholder, deferring resource-intensive instantiation."
               },
               {
                 type: "true-false",
                 question: "The client code using a Proxy object usually needs to be aware that it's interacting with a proxy instead of the RealSubject.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "A key benefit is transparency; the Proxy implements the same interface as the RealSubject, so the client uses it identically."
               }
            ]
          }
        }
      ], // end lessons in Chapter 11
      endOfChapterQuiz: {
        title: "Chapter 11 Quiz: Proxy Pattern",
        description: "Test your knowledge of using Proxies to control object access.",
        duration: 15, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-11-quiz",
        questions: [
          {
             type: "multiple-choice",
             question: "Which pattern provides a placeholder for another object to control access to it?",
             options: ["State", "Proxy", "Iterator", "Template Method"],
             correctAnswer: "Proxy",
             points: 10
           },
           {
             type: "multiple-choice",
             question: "A proxy that delays loading a large image until it's actually needed is an example of a:",
             options: ["A) Remote Proxy", "B) Protection Proxy", "C) Virtual Proxy", "D) Cache Proxy"],
             correctAnswer: "C) Virtual Proxy",
             points: 10
           },
           {
             type: "true-false",
             question: "The Proxy pattern and the Decorator pattern have identical structures and intents.",
             options: ["true", "false"],
             correctAnswer: "false",
             points: 10,
             explanation: "While structurally similar (wrapping), Decorator adds behavior, while Proxy controls access."
           }
        ]
      }
    },
    // ========================================
    // END OF CHAPTER 11
    // ========================================
    // ========================================
    // CHAPTER 12 - ENHANCED (Compound & MVC)
    // ========================================

    {
      title: "Compound Patterns & MVC",
      description: "Explore how patterns work together by combining them into Compound Patterns. Deep dive into the widely used Model-View-Controller (MVC) architectural pattern.",
      order: 12,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "Compound Patterns",
          slug: "compound-patterns",
          description: "Learn how multiple patterns can collaborate to solve a larger design problem, using the Duck simulator as a case study incorporating MVC concepts.",
          order: 1,
          duration: 60, // Adjusted

          parts: [
            {
              title: "Patterns Working Together",
              content:
                "Individual patterns are powerful, but often multiple patterns are combined to create a robust solution. A **Compound Pattern** combines two or more patterns into a solution that solves a general or recurring problem.\n\nInstead of thinking of them as entirely new patterns, view them as common collaborations between existing patterns that have proven effective.",
              order: 1,
              duration: 10,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Compound Pattern Nature",
                 description: "What is a Compound Pattern?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "A Compound Pattern is best described as:",
                   options: [
                     "A) A completely new design pattern distinct from the GoF patterns.",
                     "B) A combination of two or more existing patterns working together to solve a common problem.",
                     "C) A pattern that uses only composition.",
                     "D) A pattern applicable only to user interfaces."
                     ],
                   correctAnswer: "B) A combination of two or more existing patterns working together to solve a common problem.",
                   explanation: "They represent synergies and common collaborations between individual patterns."
                 }
              }
            },
            {
              title: "Case Study: Duck Simulator Revisited (MVC Style)",
              content:
                "Let's revisit the Duck simulator and make it interactive, track goose honks, and manage flocks using patterns:\n\n* **Adapter:** Adapt a `Goose` (with `honk()`) to the `Quackable` interface using a `GooseAdapter`.\n* **Decorator:** Add a `QuackCounter` decorator to count quacks without modifying duck classes.\n* **Abstract Factory:** Create duck families (`DuckFactory`) or specific ducks, possibly hiding implementation details.\n* **Composite:** Manage flocks of ducks (or geese adapters) using the Composite pattern. A `Flock` acts as a `Quackable` composite, delegating `quack()` to all ducks in the flock.\n* **Observer:** Allow external objects (`Quackologist`) to observe individual `Quackable` objects or entire `Flocks`. The `Quackable` objects become the Subjects.\n\nThis combination shows how patterns build upon each other to create a flexible and extensible system.",
              order: 2,
              duration: 25, // Increased
              exercise: {
                type: "drag-and-drop",
                title: "Mini Exercise: Duck Simulator Patterns",
                description: "Match the pattern to its role in the enhanced Duck simulator.",
                points: 15, // Increased points
                difficulty: "intermediate",
                content: {
                  items: ["Adapter", "Decorator", "Composite", "Observer", "Abstract Factory"],
                  targets: [
                    "[Make a Goose usable as a Duck]",
                    "[Count quacks without changing Ducks]",
                    "[Manage flocks containing individual Ducks or other Flocks]",
                    "[Notify a Quackologist when any Duck quacks]",
                    "[Create different types of ducks or duck families]"
                    ],
                  correctPairs: [
                    ["Adapter", "[Make a Goose usable as a Duck]"],
                    ["Decorator", "[Count quacks without changing Ducks]"],
                    ["Composite", "[Manage flocks containing individual Ducks or other Flocks]"],
                    ["Observer", "[Notify a Quackologist when any Duck quacks]"],
                    ["Abstract Factory", "[Create different types of ducks or duck families]"]
                  ]
                }
              }
            },
            {
              title: "Introducing Model-View-Controller (MVC)",
              content:
                "The enhanced Duck simulator starts to resemble the **Model-View-Controller (MVC)** pattern, a widely used Compound Pattern for structuring interactive applications.\n\n* **Model:** Holds the application data and business logic (e.g., the Ducks, Geese, Flocks, their state).\n* **View:** Responsible for the visual representation of the Model (e.g., displaying the ducks, counters).\n* **Controller:** Takes user input and translates it into actions on the Model or changes to the View.\n\nPatterns play key roles within MVC:\n* Observer: Often used to keep the View updated when the Model changes.\n* Strategy: Can be used in the Controller to handle different user actions or in the Model for varying logic.\n* Composite: Can be used in the View (e.g., nested UI components) or Model (e.g., the Flock).\n\nWe'll explore MVC in more detail next.",
              order: 3,
              duration: 15,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: MVC Components",
                 description: "Identify the primary responsibility of the Model in MVC.",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "In the Model-View-Controller (MVC) pattern, what is the primary responsibility of the Model?",
                   options: [
                     "A) Displaying information to the user.",
                     "B) Handling user input and commands.",
                     "C) Containing the application's data and business logic.",
                     "D) Coordinating communication between View and Controller."
                     ],
                   correctAnswer: "C) Containing the application's data and business logic.",
                   explanation: "The Model encapsulates the core state and rules of the application domain."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Compound Patterns Quiz",
            description: "Test your understanding of how design patterns work together and the basic concepts of MVC.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                 type: "multiple-choice",
                 question: "A Compound Pattern is:",
                 options: [
                   "A) A fundamentally new pattern not related to others.",
                   "B) A combination of multiple patterns used together to solve a recurring problem.",
                   "C) A pattern that only uses composition.",
                   "D) A pattern only applicable to GUI design."
                   ],
                 correctAnswer: "B) A combination of multiple patterns used together to solve a recurring problem.",
                 points: 10
               },
              {
                 type: "multiple-choice",
                 question: "In the enhanced Duck Simulator example, which pattern was used to count quacks without modifying the Duck classes?",
                 options: ["Adapter", "Composite", "Decorator", "Observer"],
                 correctAnswer: "Decorator",
                 points: 10,
                 explanation: "The QuackCounter wrapped existing Quackable objects to add counting behavior."
               },
               {
                 type: "short-answer",
                 question: "What are the three main components of the Model-View-Controller (MVC) pattern?",
                 correctAnswer: "Model, View, Controller",
                 points: 10
               }
            ]
          }
        },
        // ---------------------------
        // LESSON 2 - ENHANCED
        // ---------------------------
        {
          title: "Model-View-Controller (MVC) Deep Dive",
          slug: "mvc-deep-dive",
          description: "Explore the interactions and roles within the MVC pattern, understanding how it promotes separation of concerns and facilitates GUI development.",
          order: 2,
          duration: 55, // Adjusted

          parts: [
            {
              title: "MVC Architecture Goals",
              content:
                "MVC aims to separate application logic from user interface concerns, leading to:\n\n* **Separation of Concerns:** Model (data/logic), View (presentation), and Controller (input handling) are distinct.\n* **Maintainability:** Changes to the UI (View) are less likely to break the core logic (Model).\n* **Reusability:** The Model can potentially be reused with different Views/Controllers.\n* **Testability:** Components can often be tested independently.",
              order: 1,
              duration: 10,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: MVC Benefit",
                 description: "What is a key benefit of separating Model, View, and Controller?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "A major advantage of the MVC pattern's separation of concerns is:",
                   options: [
                     "A) It always makes the application run faster.",
                     "B) It reduces the total amount of code required.",
                     "C) It makes the system more maintainable by decoupling the UI from the business logic.",
                     "D) It eliminates the need for design patterns."
                     ],
                   correctAnswer: "C) It makes the system more maintainable by decoupling the UI from the business logic.",
                   explanation: "Changes to one part (e.g., redesigning the UI) have less impact on other parts (e.g., the core data handling)."
                 }
              }
            },
            {
              title: "MVC Component Interactions",
              content:
                "Interactions typically flow like this:\n\n1.  User interacts with the **View** (e.g., clicks a button).\n2.  The View informs the **Controller** of the user action.\n3.  The Controller interprets the action and calls appropriate methods on the **Model** to update its state.\n4.  The Model changes its state and (often using the **Observer** pattern) notifies interested Views that a change occurred.\n5.  The View queries the Model for the updated state it needs to display.\n6.  The View updates its presentation to reflect the Model's new state.\n\nNote: The Controller might sometimes directly tell the View to update (e.g., selecting a different screen), but updates driven by *data changes* typically flow from Model -> View.",
              order: 2,
              duration: 20, // Increased
               exercise: {
                 type: "drag-and-drop",
                 title: "Mini Exercise: MVC Interaction Flow",
                 description: "Order the typical MVC interaction steps for a user action that changes data.",
                 points: 15,
                 difficulty: "intermediate",
                 content: {
                   items: [
                       "Controller updates Model",
                       "View updates display",
                       "User interacts with View",
                       "View informs Controller",
                       "Model notifies View",
                       "View queries Model"
                       ],
                   targets: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"],
                   correctPairs: [
                     ["User interacts with View", "Step 1"],
                     ["View informs Controller", "Step 2"],
                     ["Controller updates Model", "Step 3"],
                     ["Model notifies View", "Step 4"],
                     ["View queries Model", "Step 5"],
                     ["View updates display", "Step 6"]
                   ]
                 }
               }
            },
            {
              title: "MVC Variations and Web Frameworks",
              content:
                "While classic MVC is influential, variations exist:\n\n* **Model-View-Presenter (MVP):** Presenter mediates between Model and View; View is more passive.\n* **Model-View-ViewModel (MVVM):** ViewModel exposes data/commands for the View, often using data binding.\n\nMany web frameworks (Ruby on Rails, Django, ASP.NET MVC, etc.) are based on MVC principles, although their specific implementations might differ slightly from the classic pattern. The core idea of separating data/logic, presentation, and input handling remains central.",
              order: 3,
              duration: 15,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: MVC Family Goal",
                 description: "What is the common goal of MVC and its variants?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "What core goal do patterns like MVC, MVP, and MVVM share?",
                   options: [
                     "A) To use as few classes as possible.",
                     "B) To separate user interface concerns from application data and logic.",
                     "C) To ensure all code runs on a single thread.",
                     "D) To eliminate the need for databases."
                     ],
                   correctAnswer: "B) To separate user interface concerns from application data and logic.",
                   explanation: "They all aim to decouple presentation, application logic/state, and input handling."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "MVC Pattern Quiz",
            description: "Test your understanding of the Model-View-Controller pattern's components, interactions, and goals.",
            duration: 15,
            passingScore: 75,
            questions: [
              {
                 type: "multiple-choice",
                 question: "In MVC, which component is typically responsible for handling user input?",
                 options: ["A) Model", "B) View", "C) Controller", "D) Database"],
                 correctAnswer: "C) Controller",
                 points: 10
               },
               {
                 type: "multiple-choice",
                 question: "Which pattern is often used to allow the Model to notify the View of state changes without being tightly coupled?",
                 options: ["A) Strategy", "B) Facade", "C) Adapter", "D) Observer"],
                 correctAnswer: "D) Observer",
                 points: 10,
                 explanation: "The View observes the Model and updates itself when the Model changes."
               },
                {
                 type: "true-false",
                 question: "In a typical MVC interaction, the View directly modifies the Model's data.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "Typically, the View sends user actions to the Controller, which then instructs the Model to update itself."
               }
            ]
          }
        }
      ], // end lessons in Chapter 12
      endOfChapterQuiz: {
        title: "Chapter 12 Quiz: Compound Patterns & MVC",
        description: "Test your knowledge of combining patterns and the MVC architecture.",
        duration: 20, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-12-quiz",
        questions: [
           {
             type: "multiple-choice",
             question: "A Compound Pattern refers to:",
             options: [
               "A) A pattern that simplifies a complex interface.",
               "B) A pattern that ensures only one instance.",
               "C) A solution combining two or more patterns.",
               "D) A pattern for managing object state."
               ],
             correctAnswer: "C) A solution combining two or more patterns.",
             points: 10
           },
           {
             type: "multiple-choice",
             question: "In MVC, the component responsible for presenting data to the user is the:",
             options: ["A) Model", "B) View", "C) Controller", "D) Observer"],
             correctAnswer: "B) View",
             points: 10
           },
            {
             type: "multiple-choice",
             question: "Which pattern is LEAST likely to be part of a typical MVC implementation?",
             options: ["A) Observer", "B) Strategy", "C) Composite", "D) Singleton"], // Singleton *could* be used, but less intrinsically part of MVC structure than others.
             correctAnswer: "D) Singleton",
             points: 10,
             explanation: "Observer (Model->View update), Strategy (Controller actions), and Composite (View structure) are very common in MVC. Singleton might be used elsewhere but isn't core to MVC itself."
           },
           {
             type: "true-false",
             question: "MVC promotes tight coupling between the Model and the View.",
             options: ["true", "false"],
             correctAnswer: "false",
             points: 10,
             explanation: "MVC aims for loose coupling, allowing the View and Model to change independently."
           }
        ]
      }
    },
    // ========================================
    // CHAPTER 13 - ENHANCED (Conclusion)
    // ========================================
    {
      title: "Patterns in the Wild & Conclusion",
      description: "Review key design principles, see how patterns appear in real-world frameworks, discuss anti-patterns, and conclude the journey.",
      order: 13,
      lessons: [
        // ---------------------------
        // LESSON 1 - ENHANCED
        // ---------------------------
        {
          title: "Design Principles Revisited",
          slug: "design-principles-revisited",
          description: "Solidify your understanding of the core OO design principles encountered throughout the course.",
          order: 1,
          duration: 30, // Adjusted

          parts: [
            {
              title: "Recap of Key Principles",
              content:
                "Let's quickly recap the principles that guide good OO design and are leveraged by patterns:\n\n* Encapsulate what varies.\n* Program to an interface, not an implementation.\n* Favor composition over inheritance.\n* Strive for loosely coupled designs.\n* Open/Closed Principle: Open for extension, closed for modification.\n* Dependency Inversion Principle: Depend on abstractions.\n* Principle of Least Knowledge (Law of Demeter): Talk only to immediate friends.\n\nUnderstanding these principles helps you choose and apply patterns effectively, and write better code even when not using a specific named pattern.",
              order: 1,
              duration: 15,
              exercise: {
                type: "multiple-choice",
                title: "Mini Exercise: Principle Application",
                description: "Match a pattern to a principle it strongly supports.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "The Strategy pattern most directly embodies which design principle?",
                  options: [
                    "A) Principle of Least Knowledge",
                    "B) Encapsulate what varies",
                    "C) Singleton Principle", // Not a principle
                    "D) Composite Principle" // Not a principle
                    ],
                  correctAnswer: "B) Encapsulate what varies",
                  explanation: "Strategy explicitly separates varying algorithms into their own encapsulated objects."
                }
              }
            },
            {
              title: "SOLID Principles Overview",
              content:
                "The principles we've seen often overlap with the SOLID principles, a well-known mnemonic for OO design:\n\n* **S**ingle Responsibility Principle: A class should have one reason to change.\n* **O**pen/Closed Principle: Open for extension, closed for modification.\n* **L**iskov Substitution Principle: Subtypes must be substitutable for their base types without altering correctness.\n* **I**nterface Segregation Principle: Clients should not be forced to depend on interfaces they do not use.\n* **D**ependency Inversion Principle: Depend upon abstractions, not concretions.\n\nPatterns often help achieve these SOLID goals.",
              order: 2,
              duration: 15,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: OCP Example",
                 description: "Which pattern directly helps achieve the Open/Closed Principle?",
                 points: 10,
                 difficulty: "intermediate",
                 content: {
                   question: "Patterns like Strategy and Decorator directly help achieve which SOLID principle by allowing behavior to be extended without modifying existing classes?",
                   options: [
                     "A) Single Responsibility Principle",
                     "B) Open/Closed Principle",
                     "C) Liskov Substitution Principle",
                     "D) Interface Segregation Principle"
                     ],
                   correctAnswer: "B) Open/Closed Principle",
                   explanation: "They allow adding new strategies or decorators (extension) without changing the context or component classes (modification)."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Design Principles Review Quiz",
            description: "Test your recall and understanding of fundamental OO design principles.",
            duration: 10,
            passingScore: 75,
            questions: [
              {
                 type: "multiple-choice",
                 question: "Programming to an interface, not an implementation, primarily promotes:",
                 options: ["A) Code reuse", "B) Performance", "C) Loose coupling", "D) Data hiding"],
                 correctAnswer: "C) Loose coupling",
                 points: 10
               },
               {
                 type: "short-answer",
                 question: "What does the 'S' in SOLID stand for?",
                 correctAnswer: "Single Responsibility Principle",
                 points: 10
               }
            ]
          }
        },
        // ---------------------------
        // LESSON 2 - ENHANCED
        // ---------------------------
        {
          title: "Patterns in the Real World",
          slug: "patterns-in-real-world",
          description: "See examples of how design patterns are used in common Java APIs and frameworks.",
          order: 2,
          duration: 30, // Adjusted

          parts: [
            {
              title: "Recognizing Patterns",
              content:
                "Once you know patterns, you start seeing them everywhere!\n\n* **Decorator:** Java I/O (`BufferedInputStream` wraps `FileInputStream`).\n* **Iterator:** Java Collections Framework (`java.util.Iterator`).\n* **Observer:** Java Swing GUI event listeners (`ActionListener`), Java Beans (`PropertyChangeListener`).\n* **Factory Method:** Often used in frameworks for creating objects (e.g., `DocumentBuilderFactory` in XML parsing).\n* **Singleton:** Used for logging, configuration, sometimes controversially.\n* **Adapter:** Used to make incompatible library interfaces work together.\n* **Template Method:** Common in frameworks where core algorithm structure is fixed but steps are customizable (e.g., servlet `doGet`/`doPost` methods overriding a base service method).\n* **MVC:** The structure for many web frameworks and GUI toolkits.",
              order: 1,
              duration: 15,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Java I/O Pattern",
                 description: "Identify the pattern used by Java's InputStream wrappers.",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "The way classes like `BufferedInputStream` and `DataInputStream` wrap other `InputStream` objects in Java's I/O library is a classic example of which pattern?",
                   options: ["A) Factory Method", "B) Singleton", "C) Adapter", "D) Decorator"],
                   correctAnswer: "D) Decorator",
                   explanation: "They dynamically add responsibilities (buffering, typed data reading) while conforming to the InputStream interface."
                 }
              }
            },
            {
              title: "Beyond GoF: Other Patterns",
              content:
                "The Gang of Four (GoF) patterns are foundational, but many other patterns exist, often building upon or specializing the originals.\n\nExamples mentioned or related in Head First:\n* **Model-View-Controller (MVC):** A compound pattern for GUIs/Web Apps.\n* **Simple Factory:** An idiom, not a GoF pattern.\n* Other patterns sometimes seen include: Builder, Prototype (Creational); Bridge, Flyweight (Structural); Chain of Responsibility, Mediator, Memento, Visitor (Behavioral).\n\nUnderstanding the GoF patterns gives you a strong base for recognizing and learning others.",
              order: 2,
              duration: 15,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Pattern Categories",
                 description: "Classify the MVC pattern.",
                 points: 10,
                 difficulty: "intermediate",
                 content: {
                   question: "Model-View-Controller (MVC) is best described as which type of pattern?",
                   options: ["A) Creational", "B) Structural", "C) Behavioral", "D) Compound / Architectural"],
                   correctAnswer: "D) Compound / Architectural",
                   explanation: "MVC structures an application using multiple collaborating objects and often incorporates other patterns like Observer and Strategy."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Patterns in the Wild Quiz",
            description: "Test your ability to recognize patterns in common frameworks and libraries.",
            duration: 10,
            passingScore: 75,
            questions: [
              {
                 type: "short-answer",
                 question: "The Java Collections Framework uses which pattern extensively to allow traversal over different collection types?",
                 correctAnswer: "Iterator",
                 points: 10
               },
               {
                 type: "multiple-choice",
                 question: "Which pattern provides a placeholder to control access to another object, potentially because it's remote or expensive to create?",
                 options: ["Facade", "Proxy", "Adapter", "Bridge"],
                 correctAnswer: "Proxy",
                 points: 10
               }
            ]
          }
        },
        // ---------------------------
        // LESSON 3 - ENHANCED
        // ---------------------------
        {
          title: "Anti-Patterns and Pattern Pitfalls",
          slug: "anti-patterns-pitfalls",
          description: "Learn to recognize common design smells (Anti-Patterns) and understand when *not* to apply a specific design pattern.",
          order: 3,
          duration: 30, // Adjusted

          parts: [
            {
              title: "Knowing When NOT to Use Patterns",
              content:
                "Design patterns are tools, not dogma. Applying a pattern unnecessarily can add complexity without benefit.\n\n* **Over-engineering:** Don't apply complex patterns to simple problems that don't require that level of flexibility yet (YAGNI - You Ain't Gonna Need It).\n* **Wrong Context:** Ensure the problem you're solving actually matches the pattern's intent and applicability.\n* **Performance Costs:** Some patterns introduce levels of indirection or extra objects that might impact performance in critical sections (measure first!).",
              order: 1,
              duration: 15,
              exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: Pattern Misuse",
                 description: "When might using a pattern be inappropriate?",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "Applying a complex design pattern to a very simple, stable part of the code might be an example of:",
                   options: ["A) Good defensive coding", "B) Over-engineering", "C) Following best practices", "D) The Singleton pattern"],
                   correctAnswer: "B) Over-engineering",
                   explanation: "Patterns add complexity; only use them when the flexibility or structure they provide is actually needed."
                 }
              }
            },
            {
              title: "Introduction to Anti-Patterns",
              content:
                "**Anti-Patterns** describe commonly used 'solutions' that are ineffective or counterproductive.\n\nExamples related to OO design:\n* **God Class/Object:** A class that knows or does too much, centralizing excessive responsibility (violates Single Responsibility).\n* **Lava Flow:** Dead or obsolete code and structures that are left in place because developers are afraid to remove them.\n* **Spaghetti Code:** Code with tangled control flow, excessive global state, and lack of structure.\n* **Reinventing the Wheel:** Solving a common problem from scratch when a well-known pattern or library exists.\n\nRecognizing anti-patterns helps you identify and refactor problematic designs.",
              order: 2,
              duration: 15,
               exercise: {
                 type: "multiple-choice",
                 title: "Mini Exercise: God Class Anti-Pattern",
                 description: "Identify the 'God Class' problem.",
                 points: 10,
                 difficulty: "beginner",
                 content: {
                   question: "A 'God Class' anti-pattern refers to a class that:",
                   options: [
                     "A) Is immutable.",
                     "B) Has only static methods.",
                     "C) Does too many things and has too many responsibilities.",
                     "D) Cannot be instantiated."
                     ],
                   correctAnswer: "C) Does too many things and has too many responsibilities.",
                   explanation: "It violates the Single Responsibility Principle and leads to tightly coupled, hard-to-maintain code."
                 }
              }
            }
          ],
          endOfLessonQuiz: {
            title: "Anti-Patterns & Pitfalls Quiz",
            description: "Test your understanding of when patterns might be misused and recognize common Anti-Patterns.",
            duration: 10,
            passingScore: 75,
            questions: [
              {
                 type: "true-false",
                 question: "You should always apply as many design patterns as possible to your code.",
                 options: ["true", "false"],
                 correctAnswer: "false",
                 points: 10,
                 explanation: "Patterns should solve specific problems; unnecessary application adds complexity (over-engineering)."
               },
               {
                 type: "short-answer",
                 question: "What term describes a commonly used but counterproductive solution to a problem?",
                 correctAnswer: "Anti-Pattern",
                 points: 10
               }
            ]
          }
        },
        // ---------------------------
        // LESSON 4 - ENHANCED
        // ---------------------------
        {
          title: "Course Conclusion",
          slug: "course-conclusion",
          description: "Summarize the key takeaways from the course and encourage further exploration of design patterns.",
          order: 4,
          duration: 15, // Adjusted

          parts: [
            {
              title: "Summary: Power of Patterns",
              content:
                "You've learned many foundational design patterns (Strategy, Observer, Decorator, Factory, Singleton, Command, Adapter, Facade, Template Method, Iterator, Composite, State, Proxy, MVC/Compound) and the core principles behind them.\n\nPatterns give you:\n* A toolbox of proven solutions.\n* A vocabulary for design discussion.\n* Techniques for building flexible, maintainable, reusable OO systems.",
              order: 1,
              duration: 5,
              // No exercise
            },
            {
              title: "Next Steps & Continuous Learning",
              content:
                "This is just the beginning! \n\n* Practice applying these patterns in your own projects.\n* Look for patterns in code you read (frameworks, libraries, colleagues' code).\n* Explore other GoF patterns not covered in depth here (Builder, Prototype, Bridge, Flyweight, Chain of Responsibility, Mediator, Memento, Visitor).\n* Read more advanced design books and articles.\n\nKeep learning and refining your design skills!",
              order: 2,
              duration: 10,
              // No exercise
            }
          ],
          // No quiz for the conclusion lesson
        }
      ], // end lessons in Chapter 13
      endOfChapterQuiz: {
        title: "Chapter 13 Quiz: Principles and Patterns Review",
        description: "Final check on key principles and pattern recognition.",
        duration: 15, // Adjusted
        passingScore: 75,
        slug: "design-patterns-chapter-13-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "Which SOLID principle is most directly supported by the Decorator pattern allowing new functionalities (decorators) to be added without changing the component class?",
            options: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Dependency Inversion"],
            correctAnswer: "Open/Closed",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Leaving obsolete code in a system because developers are afraid to remove it is an example of which anti-pattern?",
            options: ["God Class", "Spaghetti Code", "Lava Flow", "Reinventing the Wheel"],
            correctAnswer: "Lava Flow",
            points: 10
          },
          {
            type: "true-false",
            question: "Design patterns should only be used if explicitly required by the project manager.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Developers should apply patterns judiciously when they recognize a suitable problem context to improve design quality."
          }
        ]
      }
    }
    // ========================================
    // END OF CHAPTER 13
    // ========================================
  ], // end chapters array

  // Existing endOfCourseExam from user prompt - Needs expansion based on full course content
  endOfCourseExam: {
    title: "Design Patterns Final Exam",
    description: "Comprehensive test of all design patterns and principles covered in the course.",
    duration: 60, // Should likely be longer, e.g., 90
    passingScore: 80,
    slug: "design-patterns-final-exam", // Updated slug
    questions: [
      { // Existing Q1 - Singleton (Ch 5)
        type: "multiple-choice",
        question: "Which pattern ensures a class has only one instance and provides a global point of access?",
        options: ["Factory Method", "Singleton", "Decorator", "Proxy"],
        correctAnswer: "Singleton",
        points: 10 // Adjusted points
      },
      { // New - Strategy (Ch 1)
        type: "multiple-choice",
        question: "Which pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable?",
        options: ["Observer", "Strategy", "Command", "State"],
        correctAnswer: "Strategy",
        points: 10
      },
      { // New - Observer (Ch 2)
        type: "multiple-choice",
        question: "Which pattern defines a one-to-many dependency where objects are notified automatically of state changes?",
        options: ["Decorator", "Observer", "Adapter", "Facade"],
        correctAnswer: "Observer",
        points: 10
      },
      { // New - Decorator (Ch 3)
        type: "multiple-choice",
        question: "Which pattern attaches additional responsibilities to an object dynamically?",
        options: ["Singleton", "Command", "Decorator", "Template Method"],
        correctAnswer: "Decorator",
        points: 10
      },
      { // New - Factory Method (Ch 4)
        type: "multiple-choice",
        question: "Which pattern defers object instantiation to subclasses?",
        options: ["Abstract Factory", "Singleton", "Factory Method", "Builder"],
        correctAnswer: "Factory Method",
        points: 10
      },
      { // New - Command (Ch 6)
        type: "multiple-choice",
        question: "Which pattern encapsulates a request as an object?",
        options: ["Command", "State", "Proxy", "Iterator"],
        correctAnswer: "Command",
        points: 10
      },
      { // New - Adapter (Ch 7)
        type: "multiple-choice",
        question: "Which pattern converts an interface into another interface clients expect?",
        options: ["Facade", "Adapter", "Bridge", "Composite"],
        correctAnswer: "Adapter",
        points: 10
      },
      { // New - Facade (Ch 7)
        type: "multiple-choice",
        question: "Which pattern provides a simplified, unified interface to a complex subsystem?",
        options: ["Adapter", "Decorator", "Proxy", "Facade"],
        correctAnswer: "Facade",
        points: 10
      },
      { // New - Template Method (Ch 8)
        type: "multiple-choice",
        question: "Which pattern defines an algorithm's skeleton but lets subclasses override specific steps?",
        options: ["Strategy", "Template Method", "State", "Command"],
        correctAnswer: "Template Method",
        points: 10
      },
      { // New - Iterator (Ch 9)
        type: "multiple-choice",
        question: "Which pattern provides sequential access to elements of a collection without exposing its internal structure?",
        options: ["Composite", "Iterator", "Flyweight", "Visitor"],
        correctAnswer: "Iterator",
        points: 10
      },
       { // New - Composite (Ch 9)
        type: "multiple-choice",
        question: "Which pattern allows clients to treat individual objects and compositions of objects uniformly?",
        options: ["Composite", "Decorator", "Bridge", "Proxy"],
        correctAnswer: "Composite",
        points: 10
      },
       { // New - State (Ch 10)
        type: "multiple-choice",
        question: "Which pattern allows an object to change its behavior when its internal state changes?",
        options: ["Strategy", "Command", "State", "Observer"],
        correctAnswer: "State",
        points: 10
      },
       { // New - Proxy (Ch 11)
        type: "multiple-choice",
        question: "Which pattern provides a surrogate or placeholder to control access to another object?",
        options: ["Adapter", "Facade", "Decorator", "Proxy"],
        correctAnswer: "Proxy",
        points: 10
      },
       { // New - MVC (Ch 12)
        type: "short-answer",
        question: "What are the three components of the Model-View-Controller (MVC) pattern?",
        correctAnswer: "Model, View, Controller",
        points: 10
      },
       { // New - Principle (Ch 1/13)
        type: "multiple-choice",
        question: "The principle 'Favor composition over inheritance' suggests that:",
        options: [
            "A) Inheritance should never be used.",
            "B) Flexibility is often better achieved by holding references to objects with the desired behavior rather than inheriting the behavior.",
            "C) Composition leads to faster runtime performance.",
            "D) All classes should be composed of exactly five other classes."
        ],
        correctAnswer: "B) Flexibility is often better achieved by holding references to objects with the desired behavior rather than inheriting the behavior.",
        points: 10
      }
    ]
  },
  // ... prerequisites, learningOutcomes etc. from user template remain here ...
  prerequisites: [
    "Basic understanding of Object-Oriented Programming",
    "Familiarity with at least one OOP language (Java, C++, Python)",
    "Understanding of basic software development principles"
  ],
  learningOutcomes: [
    "Implement key Gang of Four design patterns as presented in Head First Design Patterns", // Adjusted slightly
    "Identify which patterns to use in different design scenarios",
    "Apply core OO design principles in pattern implementation",
    "Recognize patterns used in existing code and frameworks",
    "Create more maintainable, flexible, and reusable software" // Adjusted
  ],
  estimatedDuration: 780, // 13 hours - Seems reasonable for ~13 chapters
  enrolledCount: 0, // From template
  completionRate: 0, // From template
  rating: { // From template
    average: 4.8,
    count: 0
  }
};