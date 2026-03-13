export const cleanCodeCourse = {
  title: "Clean Code",
  slug: "clean-code",
  description: "Master the art of writing clean, maintainable, and professional code based on Robert C. Martin's timeless principles. Learn to write code that communicates intent, is easy to read, and stands the test of time.",
  level: "intermediate",
  tags: ["clean-code", "refactoring", "best-practices", "software-craftsmanship"],
  book: {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    coverUrl: "/books/clean-code.jpg",
    amazonUrl: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
  },
  chapters: [
    // ========================================
    // CHAPTER 1: Meaningful Names
    // ========================================
    {
      title: "Meaningful Names",
      description: "Learn why naming is one of the most important aspects of clean code and how to choose names that reveal intent, avoid disinformation, and make your code self-documenting.",
      order: 1,
      lessons: [
        {
          title: "The Power of Intention-Revealing Names",
          slug: "intention-revealing-names",
          description: "Understand why names matter and how to choose names that clearly communicate purpose and intent.",
          order: 1,
          duration: 30,
          parts: [
            {
              title: "Why Names Matter",
              content: "Naming is one of the hardest things in programming, but also one of the most important. The name of a variable, function, or class should answer three big questions: **Why does it exist? What does it do? How is it used?**\n\nConsider this code:\n\n```javascript\n// BAD: What does this do?\nfunction getThem() {\n  const list1 = [];\n  for (const x of theList) {\n    if (x[0] === 4) {\n      list1.push(x);\n    }\n  }\n  return list1;\n}\n```\n\nThe code is simple, but its intent is completely hidden. Now look at the same logic with meaningful names:\n\n```javascript\n// CLEAN: Immediately clear what this does\nfunction getFlaggedCells() {\n  const flaggedCells = [];\n  for (const cell of gameBoard) {\n    if (cell.isFlagged()) {\n      flaggedCells.push(cell);\n    }\n  }\n  return flaggedCells;\n}\n```\n\nThe complexity hasn't changed, but the code is now dramatically more readable. That is the power of good naming.",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Recognizing Intention-Revealing Names",
                description: "Identify which variable name best reveals intent.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "You need a variable to store the number of days since an account was last modified. Which name best reveals intent?",
                  options: [
                    "A) d",
                    "B) days",
                    "C) daysSinceLastModification",
                    "D) elapsedTimeInDays"
                  ],
                  correctAnswer: "C) daysSinceLastModification",
                  explanation: "'daysSinceLastModification' answers all three questions: why it exists (to track modification recency), what it contains (a count of days), and how it's used (relative to the last modification). 'elapsedTimeInDays' is vague about what event it measures from."
                }
              }
            },
            {
              title: "Avoid Disinformation",
              content: "Programmers must avoid leaving false clues that obscure the meaning of code. We should avoid words whose entrenched meanings vary from our intended meaning.\n\n```javascript\n// BAD: 'accountList' is not actually a List — it's a Map\nconst accountList = new Map();\n\n// CLEAN: Name reflects the actual type and purpose\nconst accountsByEmail = new Map();\n```\n\n```javascript\n// BAD: These names are too similar\nconst XYZControllerForEfficientHandlingOfStrings = ...;\nconst XYZControllerForEfficientStorageOfStrings = ...;\n\n// CLEAN: Distinct, meaningful names\nconst stringParser = ...;\nconst stringStore = ...;\n```\n\nAvoid using lowercase 'L' or uppercase 'O' as variable names — they look too much like '1' and '0'. Beware of names that differ only in subtle ways. Your readers will thank you.",
              order: 2,
              duration: 7,
              exercise: {
                type: "multiple-choice",
                title: "Spotting Disinformation",
                description: "Determine if the naming choice introduces disinformation.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "True or False: Naming a variable 'userArray' when it is actually a Set is acceptable because both are collections.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "This introduces disinformation. The suffix 'Array' implies a specific data structure (ordered, indexed). If the variable is actually a Set (unordered, unique), the name lies to the reader. A better name would be 'uniqueUsers' or 'userSet'."
                }
              }
            },
            {
              title: "Make Meaningful Distinctions",
              content: "If names must be different, they should also mean something different. Number-series naming (a1, a2, a3) and noise words are the opposite of intentional naming.\n\n```javascript\n// BAD: Noise words and number-series naming\nfunction copyChars(a1, a2) {\n  for (let i = 0; i < a1.length; i++) {\n    a2[i] = a1[i];\n  }\n}\n\n// CLEAN: Names reveal roles\nfunction copyChars(source, destination) {\n  for (let i = 0; i < source.length; i++) {\n    destination[i] = source[i];\n  }\n}\n```\n\nNoise words are another meaningless distinction. Consider `ProductInfo` vs `ProductData` — what's the difference? Or `theMessage` vs `message`? The word 'the' adds nothing. If you can't tell what two names mean differently, rename them until you can.",
              order: 3,
              duration: 7,
              exercise: {
                type: "fill-in-blanks",
                title: "Removing Noise Words",
                description: "Replace the noisy parameter names with meaningful ones.",
                points: 10,
                difficulty: "beginner",
                content: {
                  text: "In `function transferMoney(a1, a2, amount)`, parameter `a1` should be renamed to `{{blank}}` and `a2` should be renamed to `{{blank}}`.",
                  blanks: ["sourceAccount", "destinationAccount"]
                }
              }
            },
            {
              title: "Use Pronounceable and Searchable Names",
              content: "If you can't pronounce a name, you can't discuss it without sounding silly. This matters more than you think — programming is a social activity.\n\n```javascript\n// BAD: Try saying this in a meeting\nclass DtaRcrd102 {\n  constructor() {\n    this.genymdhms = new Date(); // generation year, month, day, hour, minute, second\n    this.modymdhms = new Date();\n  }\n}\n\n// CLEAN: You can actually discuss this code\nclass Customer {\n  constructor() {\n    this.generationTimestamp = new Date();\n    this.modificationTimestamp = new Date();\n  }\n}\n```\n\nSingle-letter names are hard to search for. The name `e` is a poor choice for any variable — it's the most common letter in the English language and will show up in every passage of text. The length of a name should correspond to the size of its scope.",
              order: 4,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Making Names Pronounceable",
                description: "Suggest a clean replacement for a cryptic name.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "A function is named `calcRvnPrdPrcPctDsc`. What would be a clean, pronounceable replacement?",
                  options: [
                    "A) calcRevPriceDsc",
                    "B) calculateRevenueProductPricePercentDiscount",
                    "C) c_r_p_p_d",
                    "D) discountCalc"
                  ],
                  correctAnswer: "B) calculateRevenueProductPricePercentDiscount",
                  explanation: "The full, pronounceable name clearly communicates what the function does. The other options are still cryptic or lose important meaning."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Advanced Naming Techniques",
          slug: "advanced-naming-techniques",
          description: "Go beyond basics to master class naming, method naming, and avoiding encoding in names.",
          order: 2,
          duration: 30,
          parts: [
            {
              title: "Class and Method Names",
              content: "**Class names** should be nouns or noun phrases: `Customer`, `WikiPage`, `Account`, `AddressParser`. Avoid words like `Manager`, `Processor`, `Data`, or `Info` in class names — they are vague and often signal a class that does too much.\n\n**Method names** should be verbs or verb phrases: `postPayment`, `deletePage`, `save`. Accessors, mutators, and predicates should follow the JavaBeans convention: `getName`, `setName`, `isPosted`.\n\n```javascript\n// BAD: Class named with a verb, method named with a noun\nclass ProcessPayments {\n  transaction(amount) { ... }\n}\n\n// CLEAN: Noun class, verb methods\nclass PaymentProcessor {\n  processTransaction(amount) { ... }\n  refundPayment(transactionId) { ... }\n  isPaymentComplete(transactionId) { ... }\n}\n```\n\nWhen constructors are overloaded, use static factory methods with names that describe the arguments:\n\n```javascript\n// CLEAN: Factory method reveals intent\nconst point = Point.fromPolarCoordinates(radius, angle);\n// vs.\nconst point = new Point(radius, angle); // What do these args mean?\n```",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Naming Classes and Methods",
                description: "Choose the best class and method name combination.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "You are building a module that validates email addresses. Which class/method combination follows clean naming conventions?",
                  options: [
                    "A) class DoEmailWork { run(email) { ... } }",
                    "B) class EmailValidator { isValid(email) { ... } }",
                    "C) class EmailData { emailCheck(email) { ... } }",
                    "D) class ValidateEmails { email(addr) { ... } }"
                  ],
                  correctAnswer: "B) class EmailValidator { isValid(email) { ... } }",
                  explanation: "EmailValidator is a clear noun phrase. isValid is a predicate method with a verb prefix that reads naturally: emailValidator.isValid(email). The other options use vague nouns, verb class names, or unclear method names."
                }
              }
            },
            {
              title: "Don't Encode Types in Names",
              content: "Hungarian Notation and type prefixes were necessary when compilers didn't check types. In modern languages with strong type systems and smart IDEs, encoding types in names adds clutter without value.\n\n```javascript\n// BAD: Type encoding (Hungarian Notation)\nconst strName = 'Alice';\nconst iCount = 5;\nconst bIsActive = true;\nconst arrItems = [1, 2, 3];\n\n// CLEAN: Let the type system do its job\nconst name = 'Alice';\nconst count = 5;\nconst isActive = true;\nconst items = [1, 2, 3];\n```\n\nSimilarly, don't prefix interfaces with `I`. In modern practice, the implementation gets the encoding, not the interface:\n\n```javascript\n// BAD\nclass ShapeFactory implements IShapeFactory { ... }\n\n// CLEAN\nclass ShapeFactoryImpl implements ShapeFactory { ... }\n// Or better yet:\nclass CircleFactory implements ShapeFactory { ... }\n```",
              order: 2,
              duration: 7,
              exercise: {
                type: "multiple-choice",
                title: "Type Encoding",
                description: "Evaluate whether type encoding in names is beneficial.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: In a modern TypeScript project, prefixing all interface names with 'I' (e.g., IUserService) makes the codebase cleaner and easier to navigate.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "The 'I' prefix is a form of encoding that adds noise. Modern IDEs clearly distinguish interfaces from classes. The 'I' prefix forces readers to mentally filter out meaningless characters and leaks implementation details into names."
                }
              }
            },
            {
              title: "Use Solution Domain and Problem Domain Names",
              content: "Your code will be read by programmers. Use computer science terms, algorithm names, pattern names, and math terms freely. The name `AccountVisitor` means something specific to a programmer familiar with the Visitor pattern.\n\nWhen there is no CS term for what you're doing, use the name from the problem domain. The code that has more to do with problem domain concepts should have names drawn from the problem domain.\n\n```javascript\n// Solution domain names (CS terms programmers know)\nclass JobQueue { ... }           // Queue data structure\nclass AccountObserver { ... }    // Observer pattern\nfunction mergeSort(items) { ... } // Known algorithm\n\n// Problem domain names (business concepts)\nclass MortgageApplication { ... }\nfunction calculateAmortization(principal, rate, term) { ... }\nclass UnderwritingDecision { ... }\n```\n\nSeparating solution and problem domain concepts is part of the job of a good programmer and designer. The more your names align with the right domain, the more context your code carries.",
              order: 3,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Domain-Appropriate Names",
                description: "Identify whether a name comes from the solution domain or problem domain.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "In an e-commerce application, which of these names is a SOLUTION domain name (CS/programming concept)?",
                  options: [
                    "A) ShoppingCart",
                    "B) OrderEventQueue",
                    "C) TaxCalculator",
                    "D) ShippingAddress"
                  ],
                  correctAnswer: "B) OrderEventQueue",
                  explanation: "'Queue' is a computer science data structure concept. ShoppingCart, TaxCalculator, and ShippingAddress are all problem domain terms from e-commerce. A programmer seeing 'OrderEventQueue' knows the data structure and behavior pattern involved."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Naming Refactoring Workshop",
          slug: "naming-refactoring-workshop",
          description: "Practice renaming real code examples to follow clean naming principles.",
          order: 3,
          duration: 25,
          parts: [
            {
              title: "Complete Naming Refactoring: Before and After",
              content: "Let's walk through a complete naming refactoring of a real-world code example. Study the transformation and understand why each rename was made.\n\n```javascript\n// BEFORE: A sea of cryptic names\nclass Mgr {\n  constructor() {\n    this.lst = [];\n    this.cnt = 0;\n  }\n\n  proc(d) {\n    const r = this.chk(d);\n    if (r) {\n      const o = this.mk(d);\n      this.lst.push(o);\n      this.cnt++;\n      this.ntfy(o);\n    }\n    return r;\n  }\n\n  chk(d) {\n    return d.n && d.n.length > 0 && d.e && d.e.includes('@');\n  }\n\n  mk(d) {\n    return { id: genId(), n: d.n, e: d.e, ts: Date.now() };\n  }\n\n  ntfy(o) {\n    snd(o.e, 'Welcome', `Hello ${o.n}`);\n  }\n}\n\n// AFTER: Every name reveals intent\nclass UserRegistrationService {\n  constructor() {\n    this.registeredUsers = [];\n    this.registrationCount = 0;\n  }\n\n  registerUser(registrationData) {\n    const isValid = this.isValidRegistration(registrationData);\n    if (isValid) {\n      const user = this.createUser(registrationData);\n      this.registeredUsers.push(user);\n      this.registrationCount++;\n      this.sendWelcomeEmail(user);\n    }\n    return isValid;\n  }\n\n  isValidRegistration(data) {\n    const hasName = data.name && data.name.length > 0;\n    const hasValidEmail = data.email && data.email.includes('@');\n    return hasName && hasValidEmail;\n  }\n\n  createUser(data) {\n    return {\n      id: generateUniqueId(),\n      name: data.name,\n      email: data.email,\n      registeredAt: Date.now()\n    };\n  }\n\n  sendWelcomeEmail(user) {\n    sendEmail(user.email, 'Welcome', `Hello ${user.name}`);\n  }\n}\n```\n\n**Changes made:**\n- `Mgr` -> `UserRegistrationService` (what it manages)\n- `lst` -> `registeredUsers` (what the list contains)\n- `proc` -> `registerUser` (what it does)\n- `chk` -> `isValidRegistration` (boolean predicate)\n- `mk` -> `createUser` (factory method)\n- `d` -> `registrationData` / `data` (what it represents)\n- `o` -> `user` (what it is)\n- `n`, `e`, `ts` -> `name`, `email`, `registeredAt`",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Naming Refactoring",
                description: "Choose the best rename for a cryptic name.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "You see a variable `const t = Date.now() - startTime;` used to decide if a request has timed out. What is the best rename?",
                  options: [
                    "A) const time = Date.now() - startTime;",
                    "B) const diff = Date.now() - startTime;",
                    "C) const elapsedMilliseconds = Date.now() - startTime;",
                    "D) const delta = Date.now() - startTime;"
                  ],
                  correctAnswer: "C) const elapsedMilliseconds = Date.now() - startTime;",
                  explanation: "'elapsedMilliseconds' reveals three things: it's a duration (elapsed), it's measured in milliseconds (units), and it's relative to the start. 'time' and 'diff' are too vague, and 'delta' is jargon."
                }
              }
            },
            {
              title: "Context and Scope in Naming",
              content: "Names exist within a context. You can add context by using well-named classes, functions, and namespaces. You rarely need to add prefixes for context.\n\n```javascript\n// BAD: Prefixes used for context\nconst addrFirstName = 'John';\nconst addrLastName = 'Doe';\nconst addrStreet = '123 Main St';\nconst addrCity = 'Springfield';\nconst addrState = 'IL';\nconst addrZipCode = '62701';\n\n// CLEAN: The class provides the context\nclass Address {\n  constructor(firstName, lastName, street, city, state, zipCode) {\n    this.firstName = firstName; // Context is clear: Address.firstName\n    this.lastName = lastName;\n    this.street = street;\n    this.city = city;\n    this.state = state;\n    this.zipCode = zipCode;\n  }\n}\n```\n\n**Avoid adding gratuitous context.** If your application is called 'Gas Station Deluxe', don't prefix every class with `GSD`: `GSDAccountAddress`, `GSDCustomerPayment`, `GSDMailing`. The application name is not useful context within the application itself.\n\n```javascript\n// BAD: Unnecessary application prefix\nclass GSDUser { ... }\nclass GSDOrder { ... }\nclass GSDProduct { ... }\n\n// CLEAN: The namespace/module provides the context\n// In module gas-station-deluxe:\nclass User { ... }\nclass Order { ... }\nclass Product { ... }\n```\n\nShorter names are generally better than longer ones, so long as they are clear. Add no more context to a name than is necessary. The names `accountAddress` and `customerAddress` are fine names for instances of the `Address` class but would be poor names for classes.",
              order: 2,
              duration: 8,
              exercise: {
                type: "fill-in-blanks",
                title: "Context in Names",
                description: "Apply the context principle.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  text: "Instead of using prefixes like `addrStreet` and `addrCity` for context, the clean approach is to create a {{blank}} that provides context through its name.",
                  blanks: ["class"]
                }
              }
            },
            {
              title: "Naming Conventions Across the Codebase",
              content: "Consistency in naming across the codebase is just as important as individual name quality. Pick one word per concept and stick with it.\n\n```javascript\n// BAD: Inconsistent naming for the same concept\nclass UserController {\n  fetchUser(id) { ... }    // Uses 'fetch'\n}\nclass OrderController {\n  getOrder(id) { ... }     // Uses 'get'\n}\nclass ProductController {\n  retrieveProduct(id) { ... }  // Uses 'retrieve'\n}\n\n// CLEAN: One word per concept\nclass UserController {\n  getUser(id) { ... }\n}\nclass OrderController {\n  getOrder(id) { ... }\n}\nclass ProductController {\n  getProduct(id) { ... }\n}\n```\n\nSimilarly, don't use the same word for two different concepts:\n\n```javascript\n// BAD: 'add' means different things\nclass MathHelper {\n  add(a, b) { return a + b; }  // Mathematical addition\n}\nclass Collection {\n  add(item) { this.items.push(item); }  // Insert into collection\n}\n\n// CLEAN: Different concepts, different words\nclass MathHelper {\n  add(a, b) { return a + b; }  // Mathematical addition\n}\nclass Collection {\n  insert(item) { this.items.push(item); }  // 'insert' for collections\n  // Or: append, push, include — anything that isn't 'add'\n}\n```\n\nWhen you maintain consistent vocabulary, developers can predict the name of a method before they look it up. This dramatically improves productivity and reduces cognitive load.",
              order: 3,
              duration: 7,
              exercise: {
                type: "multiple-choice",
                title: "Consistent Naming",
                description: "Evaluate naming consistency.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "True or False: Using 'fetch' in UserService, 'get' in OrderService, and 'retrieve' in ProductService for the same type of database lookup operation is acceptable because the methods are in different classes.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "Same concept should use the same word across the codebase. Using different words for the same operation forces developers to remember which word goes with which class, increasing cognitive load."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        }
      ],
      endOfChapterQuiz: {
        title: "Meaningful Names Quiz",
        description: "Test your understanding of naming principles from Clean Code.",
        duration: 20,
        passingScore: 70,
        slug: "clean-code-chapter-1-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "Which naming principle does `int d; // elapsed time in days` violate?",
            options: [
              "A) Use searchable names",
              "B) Use intention-revealing names",
              "C) Avoid disinformation",
              "D) Use pronounceable names"
            ],
            correctAnswer: "B) Use intention-revealing names",
            points: 10
          },
          {
            type: "true-false",
            question: "In clean code, class names should typically be verbs or verb phrases.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Class names should be nouns or noun phrases. Method names should be verbs or verb phrases."
          },
          {
            type: "multiple-choice",
            question: "What is wrong with naming two variables `productInfo` and `productData`?",
            options: [
              "A) They are too long",
              "B) They are noise word distinctions with no meaningful difference",
              "C) They use Hungarian Notation",
              "D) They violate the single responsibility principle"
            ],
            correctAnswer: "B) They are noise word distinctions with no meaningful difference",
            points: 10
          },
          {
            type: "short-answer",
            question: "What should method names for boolean-returning functions typically start with?",
            correctAnswer: "is",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Why should names be pronounceable?",
            options: [
              "A) It makes code compile faster",
              "B) It's required by most style guides",
              "C) Programming is a social activity and you need to discuss code with others",
              "D) It helps the computer parse the code"
            ],
            correctAnswer: "C) Programming is a social activity and you need to discuss code with others",
            points: 10
          },
          {
            type: "true-false",
            question: "Single-letter variable names are always bad practice in clean code.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Single-letter names can be acceptable in very small scopes, like a loop counter 'i' in a short loop. The length of a name should correspond to the size of its scope."
          },
          {
            type: "multiple-choice",
            question: "You see `const theUsers = getUsers();`. What naming principle does the prefix 'the' violate?",
            options: [
              "A) Avoid mental mapping",
              "B) Make meaningful distinctions — 'the' is a noise word",
              "C) Use solution domain names",
              "D) Don't use encodings"
            ],
            correctAnswer: "B) Make meaningful distinctions — 'the' is a noise word",
            points: 10
          },
          {
            type: "short-answer",
            question: "Complete the principle: The length of a name should correspond to the size of its ___.",
            correctAnswer: "scope",
            points: 10
          }
        ]
      }
    },
    // ========================================
    // CHAPTER 2: Functions
    // ========================================
    {
      title: "Functions",
      description: "Learn to write small, focused functions that do one thing well. Master the art of function arguments, side effects, and the command-query separation principle.",
      order: 2,
      lessons: [
        {
          title: "Small Functions That Do One Thing",
          slug: "small-functions-one-thing",
          description: "Understand why functions should be small and focused on a single responsibility.",
          order: 1,
          duration: 35,
          parts: [
            {
              title: "The First Rule: Functions Should Be Small",
              content: "The first rule of functions is that they should be small. The second rule is that **they should be smaller than that**.\n\nHow short should a function be? Robert C. Martin suggests functions should hardly ever be 20 lines long. The goal is that each function tells a story, and each step in the story leads you to the next in a compelling order.\n\n```javascript\n// BAD: A monolithic function doing everything\nfunction processOrder(order) {\n  // Validate order (10 lines)\n  if (!order.items || order.items.length === 0) {\n    throw new Error('No items');\n  }\n  for (const item of order.items) {\n    if (item.quantity <= 0) throw new Error('Invalid qty');\n    if (!item.price) throw new Error('No price');\n  }\n  // Calculate total (8 lines)\n  let subtotal = 0;\n  for (const item of order.items) {\n    subtotal += item.price * item.quantity;\n  }\n  const tax = subtotal * 0.08;\n  const shipping = subtotal > 100 ? 0 : 9.99;\n  const total = subtotal + tax + shipping;\n  // Save to database (5 lines)\n  db.orders.insert({ ...order, total, tax, shipping });\n  // Send confirmation (5 lines)\n  emailService.send(order.customer.email, 'Order confirmed', total);\n  return { total, tax, shipping };\n}\n\n// CLEAN: Each function does one thing\nfunction processOrder(order) {\n  validateOrder(order);\n  const pricing = calculatePricing(order);\n  saveOrder(order, pricing);\n  sendConfirmation(order, pricing);\n  return pricing;\n}\n```\n\nThe clean version reads like a well-written paragraph. Each function name describes exactly what happens at that step.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Identifying the Single Responsibility",
                description: "Determine how many responsibilities a function has.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "A function called `validateAndSaveUser` checks field validity, hashes the password, stores the user in the database, and sends a welcome email. How many responsibilities does it have?",
                  options: [
                    "A) 1 — it handles user creation",
                    "B) 2 — validation and saving",
                    "C) 4 — validation, password hashing, persistence, notification",
                    "D) It depends on the business requirements"
                  ],
                  correctAnswer: "C) 4 — validation, password hashing, persistence, notification",
                  explanation: "Each of these is a distinct responsibility that could change for different reasons. Validation rules might change independently from how passwords are hashed, how users are stored, or how notifications are sent."
                }
              }
            },
            {
              title: "One Level of Abstraction Per Function",
              content: "In order to make sure functions are doing one thing, we need to make sure the statements within a function are all at the same level of abstraction.\n\nMixing levels of abstraction within a function is always confusing. Readers may not be able to tell whether a particular expression is an essential concept or a detail.\n\n```javascript\n// BAD: Mixed levels of abstraction\nfunction renderPage(page) {\n  const html = `<html><head><title>${page.title}</title></head>`;\n  const content = page.getContent();\n  const formattedContent = content.replace(/\\n/g, '<br>');\n  const sidebarHtml = buildSidebar(page.navigation);\n  return html + '<body>' + sidebarHtml + '<div>' + formattedContent + '</div></body></html>';\n}\n\n// CLEAN: Consistent level of abstraction\nfunction renderPage(page) {\n  const header = renderHeader(page);\n  const sidebar = renderSidebar(page.navigation);\n  const content = renderContent(page.content);\n  return assembleHtml(header, sidebar, content);\n}\n```\n\n**The Stepdown Rule:** We want code to read like a top-down narrative. Every function should be followed by functions at the next level of abstraction. This is the key to keeping functions short and making sure they do one thing.",
              order: 2,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Abstraction Levels",
                description: "Evaluate whether a function maintains consistent abstraction levels.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: A function that calls `getUser()`, then manually parses a JSON string with `JSON.parse(response.body.split('\\n')[0])`, then calls `updateDashboard(user)` maintains a consistent level of abstraction.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "The function mixes high-level operations (getUser, updateDashboard) with low-level string manipulation (split, JSON.parse). The parsing should be extracted into its own function like `parseUserResponse(response)` to maintain consistent abstraction."
                }
              }
            },
            {
              title: "The Switch Statement Problem",
              content: "By their nature, switch statements do N things. We can't always avoid them, but we can make sure each switch statement is buried in a low-level class and is never repeated. We do this with polymorphism.\n\n```javascript\n// BAD: Switch must be updated for every new employee type\nfunction calculatePay(employee) {\n  switch (employee.type) {\n    case 'COMMISSIONED':\n      return calculateCommissionedPay(employee);\n    case 'HOURLY':\n      return calculateHourlyPay(employee);\n    case 'SALARIED':\n      return calculateSalariedPay(employee);\n    default:\n      throw new Error(`Invalid type: ${employee.type}`);\n  }\n}\n// This same switch appears in isPayday(), deliverPay(), etc.\n\n// CLEAN: Use polymorphism — the switch exists only in the factory\nclass EmployeeFactory {\n  static create(record) {\n    switch (record.type) {\n      case 'COMMISSIONED': return new CommissionedEmployee(record);\n      case 'HOURLY':       return new HourlyEmployee(record);\n      case 'SALARIED':     return new SalariedEmployee(record);\n      default: throw new Error(`Invalid type: ${record.type}`);\n    }\n  }\n}\n// Now each type handles its own behavior:\n// employee.calculatePay(), employee.isPayday(), etc.\n```\n\nThe general rule for switch statements: bury them in an Abstract Factory and never let them be seen again.",
              order: 3,
              duration: 9,
              exercise: {
                type: "multiple-choice",
                title: "Handling Switch Statements",
                description: "Choose the cleanest approach to dealing with type-based branching.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "You have a `getDiscount(customerType)` switch in 4 different functions. What is the Clean Code approach?",
                  options: [
                    "A) Keep the switch statements — they are clear and easy to read",
                    "B) Replace with if/else chains for better readability",
                    "C) Use polymorphism so each customer type calculates its own discount",
                    "D) Use a lookup table mapping types to discount percentages"
                  ],
                  correctAnswer: "C) Use polymorphism so each customer type calculates its own discount",
                  explanation: "When the same switch appears in multiple functions, polymorphism eliminates the duplication. Each customer type class encapsulates its own behavior, and adding a new type means adding a new class rather than modifying every switch."
                }
              }
            },
            {
              title: "Use Descriptive Names",
              content: "Don't be afraid to make a name long. A long descriptive name is better than a short enigmatic name. A long descriptive name is better than a long descriptive comment.\n\n```javascript\n// BAD: Short, cryptic names\nfunction calc(u, d) { ... }\nfunction handle(e) { ... }\nfunction proc(data) { ... }\n\n// CLEAN: Descriptive names that tell the story\nfunction calculateMonthlyInterest(account, asOfDate) { ... }\nfunction handleAuthenticationFailure(error) { ... }\nfunction processRefundRequest(refundData) { ... }\n```\n\nSpend time choosing a name. Try several names and read the code with each in place. Modern IDEs make renaming trivial, so there's no excuse for a bad function name.\n\nBe consistent in your naming. Use the same phrases, nouns, and verbs in the function names you choose. `includeSetupPage`, `includeTeardownPage`, `includeSuiteSetupPage` — the consistent use of 'include' tells a story.",
              order: 4,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Descriptive Function Naming",
                description: "Provide a clean name for a function.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "A function takes an order and checks if all items are in stock, returning true or false. Which is the cleanest, most descriptive name?",
                  options: [
                    "A) check(order)",
                    "B) processOrder(order)",
                    "C) areAllItemsInStock(order)",
                    "D) validateOrderItems(order)"
                  ],
                  correctAnswer: "C) areAllItemsInStock(order)",
                  explanation: "This name is a predicate (returns boolean), describes exactly what it checks (all items in stock), and reads naturally. The other options are vague or don't indicate the boolean return type."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Function Arguments and Side Effects",
          slug: "function-arguments-side-effects",
          description: "Master the principles of function arguments, avoid hidden side effects, and understand command-query separation.",
          order: 2,
          duration: 30,
          parts: [
            {
              title: "Ideal Number of Function Arguments",
              content: "The ideal number of arguments for a function is **zero** (niladic). Next comes **one** (monadic), followed closely by **two** (dyadic). **Three** arguments (triadic) should be avoided where possible. More than three requires very special justification.\n\nArguments are hard. They take a lot of conceptual power. They are at a different level of abstraction than the function name and force you to know a detail that isn't particularly important at that point.\n\n```javascript\n// BAD: Too many arguments — hard to remember the order\nfunction createUser(name, email, age, role, department, isActive, createdBy) {\n  // ...\n}\ncreateUser('Alice', 'alice@co.com', 30, 'admin', 'eng', true, 'system');\n\n// CLEAN: Use an object for multiple related arguments\nfunction createUser({ name, email, age, role, department, isActive, createdBy }) {\n  // ...\n}\ncreateUser({\n  name: 'Alice',\n  email: 'alice@co.com',\n  age: 30,\n  role: 'admin',\n  department: 'eng',\n  isActive: true,\n  createdBy: 'system'\n});\n```\n\nWhen a function needs two or three arguments, consider whether some of them ought to be wrapped into a class of their own. `makeCircle(double x, double y, double radius)` becomes `makeCircle(Point center, double radius)`.",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Reducing Function Arguments",
                description: "Choose the best refactoring for a function with too many arguments.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "You have `sendEmail(to, cc, bcc, subject, body, isHtml, priority, attachments)`. What is the best clean code approach?",
                  options: [
                    "A) Keep it — all parameters are necessary",
                    "B) Split into 8 separate functions, one per parameter",
                    "C) Wrap the parameters in an EmailMessage object",
                    "D) Use default values for most parameters"
                  ],
                  correctAnswer: "C) Wrap the parameters in an EmailMessage object",
                  explanation: "An EmailMessage object groups these related parameters into a meaningful concept. It reduces the argument count to one, makes the call site readable, and creates a named concept that can be reused and documented."
                }
              }
            },
            {
              title: "Avoid Side Effects",
              content: "Side effects are lies. Your function promises to do one thing, but it also does other hidden things. They may make unexpected changes to class variables, global variables, or parameters passed in.\n\n```javascript\n// BAD: Hidden side effect — checkPassword also initializes a session!\nclass UserValidator {\n  checkPassword(userName, password) {\n    const user = UserGateway.findByName(userName);\n    if (user) {\n      const codedPhrase = user.getPhraseEncodedByPassword();\n      if (codedPhrase === encrypt(password)) {\n        Session.initialize(); // <-- SIDE EFFECT!\n        return true;\n      }\n    }\n    return false;\n  }\n}\n\n// CLEAN: No hidden side effects\nclass UserValidator {\n  isPasswordValid(userName, password) {\n    const user = UserGateway.findByName(userName);\n    if (!user) return false;\n    const codedPhrase = user.getPhraseEncodedByPassword();\n    return codedPhrase === encrypt(password);\n  }\n}\n// Session initialization happens explicitly where it belongs\n```\n\nThe side effect creates a temporal coupling: `checkPassword` can only be called at certain times (when it's safe to initialize the session). If it's called out of order, session data may be lost. If you must have a temporal coupling, make it explicit in the name: `checkPasswordAndInitializeSession` — though that also admits the function does more than one thing.",
              order: 2,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Identifying Side Effects",
                description: "Determine if a function has a hidden side effect.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: A function called `validateEmail(email)` that returns true/false AND adds valid emails to a global mailing list has no side effects because adding to the list is part of validation.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "Adding to a global mailing list is a hidden side effect. The function name promises only to validate. A caller expecting pure validation would unknowingly trigger subscriptions. This violates the principle of least surprise."
                }
              }
            },
            {
              title: "Command-Query Separation",
              content: "Functions should either **do something** (command) or **answer something** (query), but not both. Doing both leads to confusion.\n\n```javascript\n// BAD: Does this set the attribute or check if it exists?\nif (set('username', 'uncle bob')) { ... }\n\n// What does 'set' return? Does it mean:\n// \"set the username and tell me if it succeeded\"?\n// \"check if username was already set to this value\"?\n```\n\nThe solution is to separate the command from the query:\n\n```javascript\n// CLEAN: Query and command are separate\nif (attributeExists('username')) {\n  setAttribute('username', 'uncle bob');\n}\n```\n\nNow the intent is crystal clear. `attributeExists` asks a question. `setAttribute` performs an action.\n\n**Prefer Exceptions to Error Codes:**\n\n```javascript\n// BAD: Error codes force nested structure\nif (deletePage(page) === OK) {\n  if (registry.deleteReference(page.name) === OK) {\n    if (configKeys.deleteKey(page.name.makeKey()) === OK) {\n      logger.log('page deleted');\n    } else {\n      logger.log('configKey not deleted');\n    }\n  } else {\n    logger.log('deleteReference failed');\n  }\n} else {\n  logger.log('delete failed');\n}\n\n// CLEAN: Exceptions simplify the flow\ntry {\n  deletePage(page);\n  registry.deleteReference(page.name);\n  configKeys.deleteKey(page.name.makeKey());\n} catch (error) {\n  logger.log(error.message);\n}\n```",
              order: 3,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Command-Query Separation",
                description: "Identify a violation of the command-query separation principle.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Which function signature violates command-query separation?",
                  options: [
                    "A) function getUser(id): User",
                    "B) function saveUser(user): void",
                    "C) function isValid(email): boolean",
                    "D) function updateAndReturnUser(id, data): User"
                  ],
                  correctAnswer: "D) function updateAndReturnUser(id, data): User",
                  explanation: "updateAndReturnUser is both a command (update) and a query (return). It should be split into updateUser(id, data) and getUser(id). The others are pure queries or pure commands."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Function Refactoring Workshop",
          slug: "function-refactoring-workshop",
          description: "Practice extracting, simplifying, and cleaning up real-world functions.",
          order: 3,
          duration: 25,
          parts: [
            {
              title: "Extracting Functions: A Step-by-Step Refactoring",
              content: "Let's walk through a complete function refactoring, step by step.\n\n```javascript\n// BEFORE: A 40-line monolith\nfunction generateReport(employees, month, year) {\n  let html = '<html><body>';\n  html += `<h1>Payroll Report - ${month}/${year}</h1>`;\n  html += '<table><tr><th>Name</th><th>Hours</th><th>Pay</th><th>Tax</th><th>Net</th></tr>';\n  let totalGross = 0;\n  let totalTax = 0;\n  let totalNet = 0;\n  for (const emp of employees) {\n    let hours = 0;\n    for (const entry of emp.timeEntries) {\n      if (entry.month === month && entry.year === year) {\n        hours += entry.hours;\n      }\n    }\n    let grossPay;\n    if (emp.type === 'hourly') {\n      grossPay = hours * emp.rate;\n      if (hours > 160) {\n        grossPay += (hours - 160) * emp.rate * 0.5; // overtime\n      }\n    } else {\n      grossPay = emp.salary / 12;\n    }\n    const taxRate = grossPay > 5000 ? 0.3 : grossPay > 3000 ? 0.25 : 0.2;\n    const tax = grossPay * taxRate;\n    const netPay = grossPay - tax;\n    totalGross += grossPay;\n    totalTax += tax;\n    totalNet += netPay;\n    html += `<tr><td>${emp.name}</td><td>${hours}</td>`;\n    html += `<td>$${grossPay.toFixed(2)}</td>`;\n    html += `<td>$${tax.toFixed(2)}</td>`;\n    html += `<td>$${netPay.toFixed(2)}</td></tr>`;\n  }\n  html += `<tr><td>TOTAL</td><td></td>`;\n  html += `<td>$${totalGross.toFixed(2)}</td>`;\n  html += `<td>$${totalTax.toFixed(2)}</td>`;\n  html += `<td>$${totalNet.toFixed(2)}</td></tr>`;\n  html += '</table></body></html>';\n  return html;\n}\n\n// AFTER: Each function does one thing\nfunction generatePayrollReport(employees, month, year) {\n  const payrollData = calculatePayroll(employees, month, year);\n  return renderPayrollHtml(payrollData, month, year);\n}\n\nfunction calculatePayroll(employees, month, year) {\n  return employees.map(emp => ({\n    name: emp.name,\n    hours: calculateMonthlyHours(emp.timeEntries, month, year),\n    grossPay: calculateGrossPay(emp, month, year),\n    tax: calculateTax(calculateGrossPay(emp, month, year)),\n    netPay: calculateGrossPay(emp, month, year) - calculateTax(calculateGrossPay(emp, month, year))\n  }));\n}\n\nfunction calculateMonthlyHours(timeEntries, month, year) {\n  return timeEntries\n    .filter(e => e.month === month && e.year === year)\n    .reduce((sum, e) => sum + e.hours, 0);\n}\n\nfunction calculateGrossPay(employee, month, year) {\n  const hours = calculateMonthlyHours(employee.timeEntries, month, year);\n  if (employee.type === 'hourly') {\n    return calculateHourlyPay(hours, employee.rate);\n  }\n  return employee.salary / 12;\n}\n```\n\nNotice how each extracted function has a clear name, does one thing, and operates at one level of abstraction.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Extraction Practice",
                description: "Identify what to extract from a large function.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "A function validates input, queries a database, transforms the results, and sends an email. How many functions should this be extracted into?",
                  options: [
                    "A) 1 — keep it all together since it's one workflow",
                    "B) 2 — separate validation from the rest",
                    "C) 4 — validateInput, queryDatabase, transformResults, sendNotification, with a top-level orchestrator",
                    "D) 6 — each line should be its own function"
                  ],
                  correctAnswer: "C) 4 — validateInput, queryDatabase, transformResults, sendNotification, with a top-level orchestrator",
                  explanation: "Each step is a distinct responsibility. The top-level function ties them together (like processAndNotify), and each extracted function does one thing. This follows the single responsibility principle."
                }
              }
            },
            {
              title: "DRY Functions: Eliminating Duplication",
              content: "The DRY principle (Don't Repeat Yourself) is crucial for functions. Duplication means bugs need to be fixed in multiple places and changes need to be synchronized.\n\n```javascript\n// BEFORE: Duplication across three functions\nfunction validateCreateUserRequest(req) {\n  if (!req.body.name || req.body.name.trim().length === 0) {\n    return { valid: false, error: 'Name is required' };\n  }\n  if (!req.body.email || !req.body.email.includes('@')) {\n    return { valid: false, error: 'Valid email is required' };\n  }\n  return { valid: true };\n}\n\nfunction validateUpdateUserRequest(req) {\n  if (!req.body.name || req.body.name.trim().length === 0) {\n    return { valid: false, error: 'Name is required' };\n  }\n  if (!req.body.email || !req.body.email.includes('@')) {\n    return { valid: false, error: 'Valid email is required' };\n  }\n  if (!req.params.id) {\n    return { valid: false, error: 'User ID is required' };\n  }\n  return { valid: true };\n}\n\n// AFTER: Shared validation, composed for each use case\nfunction requireNonEmptyString(value, fieldName) {\n  if (!value || value.trim().length === 0) {\n    return `${fieldName} is required`;\n  }\n  return null;\n}\n\nfunction requireValidEmail(email) {\n  if (!email || !email.includes('@')) {\n    return 'Valid email is required';\n  }\n  return null;\n}\n\nfunction validateCreateUserRequest(req) {\n  const errors = [\n    requireNonEmptyString(req.body.name, 'Name'),\n    requireValidEmail(req.body.email)\n  ].filter(Boolean);\n  return errors.length === 0\n    ? { valid: true }\n    : { valid: false, error: errors[0] };\n}\n\nfunction validateUpdateUserRequest(req) {\n  const errors = [\n    requireNonEmptyString(req.body.name, 'Name'),\n    requireValidEmail(req.body.email),\n    requireNonEmptyString(req.params.id, 'User ID')\n  ].filter(Boolean);\n  return errors.length === 0\n    ? { valid: true }\n    : { valid: false, error: errors[0] };\n}\n```\n\nThe validation rules are defined once and composed. Adding a new validation rule means writing one function, not modifying every validator.",
              order: 2,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "DRY Principles",
                description: "Evaluate a DRY refactoring decision.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: Two functions that both contain the line `const timestamp = new Date().toISOString();` are duplicated and should always share a `getTimestamp()` function.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "Not all textual duplication is meaningful duplication. A one-liner that's clear and unlikely to change may not warrant extraction. DRY is about duplicated knowledge and business rules, not duplicated characters. Extract when the logic is complex or likely to change."
                }
              }
            },
            {
              title: "Structured Programming and Error Flow",
              content: "Edsger Dijkstra's rules of structured programming say that every function should have one entry and one exit. However, in small functions, multiple returns, break, and continue statements are acceptable and can be more expressive.\n\n```javascript\n// CLEAN: Early returns make the function clearer\nfunction calculateDiscount(customer, order) {\n  if (!customer.isActive) {\n    return 0;\n  }\n\n  if (order.total < 50) {\n    return 0;\n  }\n\n  if (customer.isVIP) {\n    return order.total * 0.20;\n  }\n\n  if (customer.yearsActive > 5) {\n    return order.total * 0.10;\n  }\n\n  return order.total * 0.05;\n}\n\n// vs. single-return version (harder to read)\nfunction calculateDiscount(customer, order) {\n  let discount = 0;\n  if (customer.isActive) {\n    if (order.total >= 50) {\n      if (customer.isVIP) {\n        discount = order.total * 0.20;\n      } else if (customer.yearsActive > 5) {\n        discount = order.total * 0.10;\n      } else {\n        discount = order.total * 0.05;\n      }\n    }\n  }\n  return discount;\n}\n```\n\nGuard clauses (early returns for invalid conditions) flatten the structure and make the main logic stand out. In small functions, this is always preferred over deeply nested if/else chains.\n\n**The key rule:** If your function is small (which it should be), then the occasional `return`, `break`, or `continue` is no problem. They can sometimes even be more expressive than the single-entry, single-exit rule.",
              order: 3,
              duration: 7,
              exercise: {
                type: "multiple-choice",
                title: "Guard Clauses",
                description: "Choose the cleaner function structure.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "A function has three conditions that should return early (null input, empty array, unauthorized user) before doing real work. What is the cleanest structure?",
                  options: [
                    "A) Nest all three checks: if (input) { if (input.length > 0) { if (isAuthorized) { ... } } }",
                    "B) Use three guard clauses at the top with early returns, then the main logic",
                    "C) Use a single try-catch to handle all three conditions",
                    "D) Combine all three conditions into one large if statement"
                  ],
                  correctAnswer: "B) Use three guard clauses at the top with early returns, then the main logic",
                  explanation: "Guard clauses handle edge cases at the top and return early, keeping the main logic at the lowest indentation level. This is far more readable than nested conditions or a combined mega-condition."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        }
      ],
      endOfChapterQuiz: {
        title: "Functions Quiz",
        description: "Test your knowledge of clean function design principles.",
        duration: 20,
        passingScore: 70,
        slug: "clean-code-chapter-2-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "What is the ideal number of function arguments according to Clean Code?",
            options: ["A) One", "B) Zero", "C) Two", "D) Three"],
            correctAnswer: "B) Zero",
            points: 10
          },
          {
            type: "true-false",
            question: "A function named 'checkAccess' that also logs the access attempt has a side effect.",
            options: ["true", "false"],
            correctAnswer: "true",
            points: 10,
            explanation: "Logging is a side effect not implied by the name 'check'. The name suggests a query (checking), not a command (logging)."
          },
          {
            type: "multiple-choice",
            question: "What principle states that functions should either do something or answer something, but not both?",
            options: [
              "A) Single Responsibility Principle",
              "B) Command-Query Separation",
              "C) Don't Repeat Yourself",
              "D) Law of Demeter"
            ],
            correctAnswer: "B) Command-Query Separation",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What technique does Clean Code recommend to replace switch statements that appear in multiple functions?",
            options: [
                "A) Lookup tables",
                "B) Polymorphism",
                "C) If-else chains",
                "D) Strategy pattern only"
              ],
            correctAnswer: "B) Polymorphism",
              explanation: "Clean Code recommends burying switch statements in an Abstract Factory and using polymorphism to eliminate repeated switch logic.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What is 'the Stepdown Rule'?",
            options: [
              "A) Functions should decrease in length as you go down the file",
              "B) Each function should be followed by functions at the next level of abstraction",
              "C) Functions at the bottom of a file are less important",
              "D) You should step down into implementation details in comments"
            ],
            correctAnswer: "B) Each function should be followed by functions at the next level of abstraction",
            points: 10
          },
          {
            type: "true-false",
            question: "According to Clean Code, a function should have no more than 20 lines.",
            options: ["true", "false"],
            correctAnswer: "true",
            points: 10,
            explanation: "Robert C. Martin suggests functions should hardly ever be 20 lines long. Shorter is better."
          },
          {
            type: "multiple-choice",
            question: "Why should you prefer exceptions to returning error codes?",
            options: [
              "A) Exceptions are faster at runtime",
              "B) Error codes are deprecated in modern languages",
              "C) Exceptions separate error handling from the happy path, reducing nesting",
              "D) Error codes use more memory"
            ],
            correctAnswer: "C) Exceptions separate error handling from the happy path, reducing nesting",
            points: 10
          },
          {
            type: "short-answer",
            question: "Complete the rule: Functions should do ___ thing.",
            correctAnswer: "one",
            points: 10
          }
        ]
      }
    },
    // ========================================
    // CHAPTER 3: Comments
    // ========================================
    {
      title: "Comments",
      description: "Understand when comments are necessary and when they are a sign of failure. Learn to express yourself in code instead of relying on comments as a crutch.",
      order: 3,
      lessons: [
        {
          title: "Good Comments vs. Bad Comments",
          slug: "good-comments-vs-bad-comments",
          description: "Learn to distinguish between comments that add value and comments that clutter and mislead.",
          order: 1,
          duration: 30,
          parts: [
            {
              title: "Comments Are a Necessary Evil",
              content: "The proper use of comments is to compensate for our failure to express ourselves in code. Comments are always failures. We must have them because we cannot always figure out how to express ourselves without them, but their use is not a cause for celebration.\n\nWhy? Because comments lie. Not always, and not intentionally, but too often. The older a comment is, the farther away it is from the code it describes. Code changes and evolves; comments don't always follow.\n\n```javascript\n// BAD: Comment that will become a lie\n// Returns the count of active users\nfunction getUsers() {\n  return db.query('SELECT * FROM users'); // Oops — returns ALL users, not active ones\n}\n\n// CLEAN: Code that doesn't need a comment\nfunction getAllUsers() {\n  return db.query('SELECT * FROM users');\n}\n\nfunction getActiveUsers() {\n  return db.query('SELECT * FROM users WHERE active = true');\n}\n```\n\nTruth can only be found in one place: the code. Only the code can truly tell you what it does. It is the only source of truly accurate information.",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Why Comments Lie",
                description: "Understand the fundamental problem with comments.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What is the primary reason comments become inaccurate over time?",
                  options: [
                    "A) Programmers deliberately write misleading comments",
                    "B) Code changes but comments often don't get updated to match",
                    "C) Comments are parsed differently by different compilers",
                    "D) Comments slow down code execution"
                  ],
                  correctAnswer: "B) Code changes but comments often don't get updated to match",
                  explanation: "As code evolves through maintenance and refactoring, comments are frequently left behind. They become stale, misleading, or outright wrong — which is worse than having no comment at all."
                }
              }
            },
            {
              title: "Good Comments",
              content: "Some comments are necessary and beneficial:\n\n**Legal Comments:** Copyright and license headers required by corporate standards.\n\n**Informative Comments:** Sometimes it's useful to provide basic information with a comment:\n```javascript\n// Format: kk:mm:ss EEE, MMM dd, yyyy\nconst timestampPattern = /\\d{2}:\\d{2}:\\d{2} \\w{3}, \\w{3} \\d{2}, \\d{4}/;\n```\n\n**Explanation of Intent:** Sometimes a comment goes beyond implementation to explain the *why*:\n```javascript\n// We use a TreeMap here because the client requested alphabetical ordering\n// and we need O(log n) insertions during the import process\nconst accounts = new TreeMap();\n```\n\n**Warning of Consequences:**\n```javascript\n// Don't run unless you have 2+ hours — this test hits the production API\ntest('fullIntegrationSuite', () => { ... });\n```\n\n**TODO Comments:** Notes about things that should be done but can't be done right now:\n```javascript\n// TODO: Extract this into a shared utility once the auth module is refactored\n```\n\nThe key: good comments explain **why**, not **what**.",
              order: 2,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Identifying Good Comments",
                description: "Determine which comment adds genuine value.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Which of these comments is genuinely helpful?",
                  options: [
                    "A) // Increment i by 1\n    i++;",
                    "B) // We sort descending because the business requires newest transactions first\n    transactions.sort((a, b) => b.date - a.date);",
                    "C) // Set the name\n    this.name = name;",
                    "D) // This is the constructor\n    constructor() { }"
                  ],
                  correctAnswer: "B) // We sort descending because the business requires newest transactions first\n    transactions.sort((a, b) => b.date - a.date);",
                  explanation: "This comment explains WHY the sort order was chosen (business requirement), which cannot be inferred from the code alone. The other comments merely restate what the code already says."
                }
              }
            },
            {
              title: "Bad Comments",
              content: "Most comments fall into this category:\n\n**Mumbling:** Comments written hastily without thought.\n\n**Redundant Comments:** Comments that say exactly what the code says:\n```javascript\n// BAD: Every line is a redundant comment\n// The name of the user\nconst name = user.name;\n// Check if name is null\nif (name === null) {\n  // Set default name\n  name = 'Unknown';\n}\n```\n\n**Mandated Comments:** Rules that say every function must have a Javadoc or every variable must have a comment just produce clutter:\n```javascript\n// BAD: Mandated documentation that adds nothing\n/**\n * @param name The name\n * @param email The email\n * @returns The user\n */\nfunction createUser(name, email) { ... }\n```\n\n**Journal Comments:** A log of changes at the top of the file — that's what version control is for.\n\n**Noise Comments:** Comments that restate the obvious:\n```javascript\n// BAD: Noise\n/** Default constructor */\nconstructor() { }\n\n/** The day of the month */\nthis.dayOfMonth = dayOfMonth;\n```\n\n**Commented-Out Code:** Just delete it. Version control remembers everything:\n```javascript\n// BAD: Dead code as comments\n// const oldValue = calculate(x);\n// if (oldValue > threshold) {\n//   notify(oldValue);\n// }\nconst value = calculateNew(x);\n```",
              order: 3,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Spotting Bad Comments",
                description: "Evaluate whether a commenting practice is clean.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "True or False: Keeping commented-out code in the codebase is good practice because it preserves history that might be useful later.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "Version control systems (Git) preserve all history. Commented-out code clutters the codebase, confuses readers who wonder why it's there, and slowly rots as surrounding code changes. Delete it — you can always find it in the commit history."
                }
              }
            },
            {
              title: "Express Yourself in Code",
              content: "In many cases, it's simply a matter of creating a function that says the same thing as the comment you want to write:\n\n```javascript\n// BAD: Comment to explain a complex condition\n// Check if the employee is eligible for full benefits\nif (employee.flags & HOURLY_FLAG && employee.age > 65) { ... }\n\n// CLEAN: The code speaks for itself\nif (employee.isEligibleForFullBenefits()) { ... }\n```\n\n```javascript\n// BAD: Comment explaining a magic number\nsetTimeout(retry, 86400000); // 86400000ms = 1 day\n\n// CLEAN: Named constant eliminates the need for a comment\nconst ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;\nsetTimeout(retry, ONE_DAY_IN_MS);\n```\n\nEvery time you write a comment, grimace and feel the failure of your ability to express yourself in code. Then see if there's a way to turn that comment into well-named code.",
              order: 4,
              duration: 6,
              exercise: {
                type: "multiple-choice",
                title: "Code Over Comments",
                description: "Replace a comment with self-documenting code.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "You see `// Check if user is an admin` followed by `if (user.role === 3)`. What is the best way to eliminate the need for this comment?",
                  options: [
                    "A) Improve the comment to say `// role 3 = admin`",
                    "B) Use `user.isAdmin()` method or a named constant `const ADMIN_ROLE = 3`",
                    "C) Remove the comment and leave the magic number",
                    "D) Add a JSDoc comment to the function"
                  ],
                  correctAnswer: "B) Use `user.isAdmin()` method or a named constant `const ADMIN_ROLE = 3`",
                  explanation: "A well-named method or constant makes the comment unnecessary. The code itself communicates intent, eliminating the risk of the comment becoming stale."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Refactoring Comments into Clean Code",
          slug: "refactoring-comments-into-clean-code",
          description: "Practice the art of eliminating unnecessary comments by writing more expressive code.",
          order: 2,
          duration: 25,
          parts: [
            {
              title: "Replacing Comments with Better Naming",
              content: "Every comment is an opportunity to improve the code itself. When you feel compelled to write a comment, first try to refactor the code so the comment becomes unnecessary.\n\n```javascript\n// BEFORE: Comments compensating for bad names\nfunction calc(u, t) {\n  // Calculate the user's age based on their birth date\n  const a = new Date() - new Date(u.bd);\n  // Convert milliseconds to years\n  const y = Math.floor(a / 31557600000);\n  // Check if user is eligible (must be over 18 and have verified email)\n  if (y >= t && u.ev) {\n    return true;\n  }\n  return false;\n}\n\n// AFTER: Self-documenting code — no comments needed\nfunction isUserEligible(user, minimumAge) {\n  const userAge = calculateAgeInYears(user.birthDate);\n  const meetsAgeRequirement = userAge >= minimumAge;\n  const hasVerifiedEmail = user.emailVerified;\n  return meetsAgeRequirement && hasVerifiedEmail;\n}\n\nfunction calculateAgeInYears(birthDate) {\n  const ageInMilliseconds = Date.now() - new Date(birthDate).getTime();\n  const MILLISECONDS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;\n  return Math.floor(ageInMilliseconds / MILLISECONDS_PER_YEAR);\n}\n```\n\nNotice how the refactored version tells the same story as the comments did, but through the code itself. The variable names act as documentation. The extracted function has a clear name. No comments are needed.",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Comment-Free Refactoring",
                description: "Choose the best refactoring to eliminate a comment.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "You see: `// Check if the order qualifies for free shipping (over $50 and domestic)` followed by `if (o.t > 50 && o.c === 'US')`. What is the best refactoring?",
                  options: [
                    "A) Improve the comment to be more detailed",
                    "B) Extract to `order.qualifiesForFreeShipping()` using named constants",
                    "C) Add a @see reference to the shipping policy document",
                    "D) Rename `o` to `order` but keep the comment"
                  ],
                  correctAnswer: "B) Extract to `order.qualifiesForFreeShipping()` using named constants",
                  explanation: "A well-named method makes the comment redundant. The business rule is encapsulated in one place, easily testable, and the calling code reads like prose."
                }
              }
            },
            {
              title: "When to Keep Comments — The Exceptions",
              content: "While most comments should be eliminated, some are genuinely valuable and should be kept:\n\n**Legal Comments:**\n```javascript\n// Copyright (c) 2024 Acme Corp. All rights reserved.\n// Licensed under the MIT License.\n```\n\n**Warning Comments:**\n```javascript\n// WARNING: This regex has O(2^n) worst-case complexity.\n// Do NOT use with untrusted input longer than 25 characters.\nconst emailRegex = /^([a-zA-Z0-9]+[._-])*[a-zA-Z0-9]+@...$/;\n```\n\n**Intent and Clarification:**\n```javascript\n// We deliberately use insertion sort here instead of quicksort because\n// the input is almost always nearly-sorted (items arrive chronologically)\n// and insertion sort is O(n) for nearly-sorted data.\ninsertionSort(transactions);\n```\n\n**Amplification — drawing attention to something important:**\n```javascript\n// This trim() is critical — the upstream API sometimes returns\n// whitespace-padded tokens that cause silent auth failures\nconst token = response.headers['x-auth-token'].trim();\n```\n\nThe test for a good comment: does it tell the reader something they cannot determine from the code alone? If yes, keep it. If no, delete it and improve the code.",
              order: 2,
              duration: 9,
              exercise: {
                type: "multiple-choice",
                title: "Comment Value",
                description: "Evaluate whether a specific comment adds value.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: The comment `// We use a LinkedList instead of ArrayList because elements are frequently inserted and removed from the middle of the collection` is a good comment that should be kept.",
                  options: ["True", "False"],
                  correctAnswer: "True",
                  explanation: "This comment explains the WHY behind a design decision that cannot be inferred from the code alone. A future developer might otherwise 'optimize' it to an ArrayList, not knowing why LinkedList was chosen."
                }
              }
            },
            {
              title: "The Commented-Out Code Epidemic",
              content: "Commented-out code is one of the most pernicious code smells. It accumulates like sediment, and nobody dares delete it because everyone assumes someone else put it there for a reason.\n\n```javascript\n// BAD: Archaeological layers of commented-out code\nfunction processPayment(payment) {\n  // const legacyGateway = new LegacyPaymentGateway();\n  // const result = legacyGateway.process(payment);\n  // if (result.status === 'pending') {\n  //   legacyGateway.retry(payment, 3);\n  // }\n  \n  // v2: Updated for new gateway\n  // const gateway = new StripeGateway(config.stripeKey);\n  \n  // v3: Using payment service\n  const service = new PaymentService();\n  return service.charge(payment);\n  \n  // TODO: Re-enable fraud check after false positive rate drops\n  // const fraudResult = FraudDetector.check(payment);\n  // if (fraudResult.suspicious) {\n  //   return { status: 'held', reason: fraudResult.reason };\n  // }\n}\n\n// CLEAN: Just the code that matters\nfunction processPayment(payment) {\n  const service = new PaymentService();\n  return service.charge(payment);\n}\n// If you need the old code, it's in git:\n// git log --all -p -- payments/processPayment.js\n```\n\nVersion control systems never forget. There is absolutely no reason to comment out code. Delete it. If you need it, you can always find it in a previous revision.",
              order: 3,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Handling Old Code",
                description: "Explain how to handle code you might need again.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "A teammate says 'I don't want to delete this code because we might need it later.' What is the Clean Code response?",
                  options: [
                    "A) Comment it out so it's preserved in the file",
                    "B) Move it to a 'deprecated' folder",
                    "C) Delete it — version control (Git) preserves all history and you can recover it from a previous commit",
                    "D) Keep it but add a TODO comment"
                  ],
                  correctAnswer: "C) Delete it — version control (Git) preserves all history and you can recover it from a previous commit",
                  explanation: "Version control never forgets. Commented-out code clutters the codebase and confuses readers. Delete it confidently knowing Git has the history."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        }
      ],
      endOfChapterQuiz: {
        title: "Comments Quiz",
        description: "Test your understanding of when comments help and when they harm.",
        duration: 20,
        passingScore: 70,
        slug: "clean-code-chapter-3-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "According to Clean Code, what do comments represent?",
            options: [
              "A) A mark of professional documentation",
              "B) A failure to express yourself in code",
              "C) A required part of every function",
              "D) The most reliable source of truth"
            ],
            correctAnswer: "B) A failure to express yourself in code",
            points: 10
          },
          {
            type: "true-false",
            question: "TODO comments are acceptable in clean code when they note things that can't be done right now.",
            options: ["true", "false"],
            correctAnswer: "true",
            points: 10,
            explanation: "TODO comments are listed as acceptable good comments. They note future work that can't be addressed immediately. Modern IDEs can locate all TODOs."
          },
          {
            type: "multiple-choice",
            question: "Which type of comment is considered 'noise'?",
            options: [
              "A) A comment explaining a regex pattern",
              "B) A comment explaining a business rule",
              "C) /** Default constructor */ above an empty constructor",
              "D) A warning about test runtime"
            ],
            correctAnswer: "C) /** Default constructor */ above an empty constructor",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Instead of commenting `// 604800 seconds = 1 week`, what clean code technique should you use?",
            options: [
                "A) A more detailed comment explaining the calculation",
                "B) A named constant like ONE_WEEK_IN_SECONDS = 604800",
                "C) A helper function that returns 604800",
                "D) An inline annotation"
              ],
            correctAnswer: "B) A named constant like ONE_WEEK_IN_SECONDS = 604800",
              explanation: "Named constants replace magic numbers and make comments unnecessary by expressing intent directly in the code.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Why is commented-out code problematic?",
            options: [
              "A) It increases compile time",
              "B) It clutters the codebase and others are afraid to delete it, thinking it might be important",
              "C) It causes merge conflicts",
              "D) It violates syntax rules"
            ],
            correctAnswer: "B) It clutters the codebase and others are afraid to delete it, thinking it might be important",
            points: 10
          },
          {
            type: "true-false",
            question: "A good comment explains WHAT the code does rather than WHY.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Good comments explain WHY, not WHAT. The code itself shows what it does. Comments should provide intent, rationale, or warnings that the code cannot convey."
          },
          {
            type: "multiple-choice",
            question: "How should you handle a complex boolean condition that needs explanation?",
            options: [
              "A) Add a comment above it explaining the condition",
              "B) Extract it into a well-named method or function",
              "C) Break it across multiple lines with inline comments",
              "D) Add the explanation to the project wiki"
            ],
            correctAnswer: "B) Extract it into a well-named method or function",
            points: 10
          },
          {
            type: "short-answer",
            question: "Complete: Truth can only be found in one place: the ___.",
            correctAnswer: "code",
            points: 10
          }
        ]
      }
    },
    // ========================================
    // CHAPTER 4: Formatting
    // ========================================
    {
      title: "Formatting",
      description: "Learn why code formatting matters, how vertical and horizontal formatting affects readability, and how to establish team formatting rules.",
      order: 4,
      lessons: [
        {
          title: "Vertical and Horizontal Formatting",
          slug: "vertical-horizontal-formatting",
          description: "Master the principles of vertical openness, density, distance, and horizontal alignment to make code visually clear.",
          order: 1,
          duration: 30,
          parts: [
            {
              title: "The Purpose of Formatting",
              content: "Code formatting is about communication, and communication is the professional developer's first order of business. The coding style and readability set precedents that continue to affect maintainability long after the original code has been changed beyond recognition.\n\nYour style and discipline survive even when your code does not.\n\n**Vertical Formatting — File Size:**\nSignificant systems can be built with files that are typically 200 lines long, with an upper limit of 500. Small files are usually easier to understand than large files.\n\n**The Newspaper Metaphor:** A source file should be like a newspaper article. The name should be simple but explanatory. The topmost parts should provide the high-level concepts and algorithms. Detail should increase as we move downward.\n\n```javascript\n// CLEAN: Organized like a newspaper article\n// 1. Module-level constants and imports\n// 2. Public/exported functions (high-level)\n// 3. Private helper functions (details)\n// 4. Utility functions (lowest-level details)\n\nimport { database } from './db';\n\nconst MAX_RETRY_ATTEMPTS = 3;\n\n// High-level public API\nexport function processOrder(order) {\n  const validated = validateOrder(order);\n  const priced = calculatePricing(validated);\n  return saveOrder(priced);\n}\n\n// Mid-level helpers\nfunction validateOrder(order) { ... }\nfunction calculatePricing(order) { ... }\nfunction saveOrder(order) { ... }\n\n// Low-level utilities\nfunction formatCurrency(amount) { ... }\n```",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "The Newspaper Metaphor",
                description: "Apply the newspaper metaphor to code organization.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "According to the newspaper metaphor, what should appear at the top of a source file?",
                  options: [
                    "A) Detailed implementation functions",
                    "B) All variable declarations",
                    "C) High-level concepts and public API, with details increasing downward",
                    "D) Comments explaining the entire module"
                  ],
                  correctAnswer: "C) High-level concepts and public API, with details increasing downward",
                  explanation: "Like a newspaper, the headline (file name) tells you if you're in the right place, the first paragraph (public functions) gives you the synopsis, and the details increase as you read further down."
                }
              }
            },
            {
              title: "Vertical Openness and Density",
              content: "**Vertical Openness Between Concepts:** Each blank line is a visual cue that identifies a new and separate concept. Each group of lines represents a complete thought.\n\n```javascript\n// BAD: No vertical openness — concepts run together\nimport { UserService } from './userService';\nimport { Logger } from './logger';\nconst MAX_ATTEMPTS = 3;\nconst DEFAULT_TIMEOUT = 5000;\nfunction authenticate(credentials) {\n  const user = UserService.find(credentials.email);\n  if (!user) throw new AuthError('User not found');\n  const isValid = user.verifyPassword(credentials.password);\n  if (!isValid) throw new AuthError('Invalid password');\n  return createSession(user);\n}\nfunction createSession(user) {\n  return { token: generateToken(user), expiresAt: Date.now() + DEFAULT_TIMEOUT };\n}\n\n// CLEAN: Blank lines separate distinct concepts\nimport { UserService } from './userService';\nimport { Logger } from './logger';\n\nconst MAX_ATTEMPTS = 3;\nconst DEFAULT_TIMEOUT = 5000;\n\nfunction authenticate(credentials) {\n  const user = UserService.find(credentials.email);\n  if (!user) throw new AuthError('User not found');\n\n  const isValid = user.verifyPassword(credentials.password);\n  if (!isValid) throw new AuthError('Invalid password');\n\n  return createSession(user);\n}\n\nfunction createSession(user) {\n  return {\n    token: generateToken(user),\n    expiresAt: Date.now() + DEFAULT_TIMEOUT\n  };\n}\n```\n\n**Vertical Density:** Lines of code that are tightly related should appear vertically dense — close together without intervening comments or blank lines.",
              order: 2,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Vertical Formatting",
                description: "Evaluate a vertical formatting choice.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "True or False: Adding a blank line between every single line of code improves readability because it gives the code room to breathe.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "Too many blank lines destroy the visual grouping of related statements. Blank lines should separate CONCEPTS, not individual lines. Tightly related lines should be vertically dense."
                }
              }
            },
            {
              title: "Vertical Distance and Ordering",
              content: "Concepts that are closely related should be kept vertically close to each other. This means:\n\n**Variable Declarations** should be as close to their usage as possible. In short functions, declare them at the top. Loop variables should be declared within the loop statement.\n\n**Dependent Functions:** If one function calls another, they should be vertically close, and the caller should be above the callee where possible.\n\n```javascript\n// BAD: Caller and callee are far apart\nfunction processReport(data) {\n  const summary = generateSummary(data);\n  return formatOutput(summary);\n}\n\n// ... 200 lines of unrelated code ...\n\nfunction generateSummary(data) { ... }\n\n// CLEAN: Dependent functions are close together\nfunction processReport(data) {\n  const summary = generateSummary(data);\n  return formatOutput(summary);\n}\n\nfunction generateSummary(data) {\n  const totals = calculateTotals(data);\n  return { totals, createdAt: new Date() };\n}\n\nfunction calculateTotals(data) { ... }\n```\n\n**Conceptual Affinity:** Certain code wants to be near other code. The stronger the affinity, the less vertical distance there should be. Functions that do similar things or are called together should be close.",
              order: 3,
              duration: 7,
              exercise: {
                type: "multiple-choice",
                title: "Vertical Distance",
                description: "Choose the best placement for related functions.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Function A calls Function B, and Function B calls Function C. How should they be ordered vertically?",
                  options: [
                    "A) Alphabetically: A, B, C",
                    "B) Reverse order: C, B, A (bottom-up)",
                    "C) Caller above callee: A, B, C (top-down)",
                    "D) By line count, shortest first"
                  ],
                  correctAnswer: "C) Caller above callee: A, B, C (top-down)",
                  explanation: "The caller should be above the callee. This creates a natural top-down reading flow where you encounter the high-level logic first and can drill down into details as needed."
                }
              }
            },
            {
              title: "Horizontal Formatting and Team Rules",
              content: "**Line Length:** Keep lines short. The old 80-character limit has some flexibility in the age of wide monitors, but 120 characters is a reasonable upper limit.\n\n**Horizontal Alignment:** Don't use horizontal alignment to line up variable names and values — it draws the eye to the wrong things:\n\n```javascript\n// BAD: Horizontal alignment emphasizes names, not types/values\nconst name          = user.getName();\nconst email         = user.getEmail();\nconst lastLoginDate = user.getLastLogin();\n\n// CLEAN: Normal formatting\nconst name = user.getName();\nconst email = user.getEmail();\nconst lastLoginDate = user.getLastLogin();\n```\n\n**Indentation:** A source file is a hierarchy. Each level of the hierarchy is a scope. To make this hierarchy visible, we indent the lines of source code in proportion to their position in the hierarchy.\n\nNever collapse scopes:\n```javascript\n// BAD: Collapsed scope hides structure\nif (isEmpty) return [];\n\n// CLEAN: Indentation reveals structure\nif (isEmpty) {\n  return [];\n}\n```\n\n**Team Rules:** A team of developers should agree on a single formatting style. The team rules. Every member should format their code consistently. A good software system is composed of a set of documents that read nicely.",
              order: 4,
              duration: 7,
              exercise: {
                type: "fill-in-blanks",
                title: "Formatting Principles",
                description: "Complete the formatting rule.",
                points: 10,
                difficulty: "beginner",
                content: {
                  text: "Code formatting is about {{blank}}, and {{blank}} is the professional developer's first order of business.",
                  blanks: ["communication", "communication"]
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Formatting in Practice",
          slug: "formatting-in-practice",
          description: "Apply formatting principles to real code scenarios and establish team conventions.",
          order: 2,
          duration: 25,
          parts: [
            {
              title: "Before and After: Formatting Refactoring",
              content: "Let's see how formatting transforms real code from hard-to-read into clean, organized structures.\n\n```javascript\n// BEFORE: Poor formatting makes logic hard to follow\nclass UserManager{constructor(db,cache,logger){this.db=db;this.cache=cache;this.logger=logger;}\nasync getUser(id){let user=this.cache.get(id);if(!user){user=await this.db.findById(id);if(user){this.cache.set(id,user);}else{this.logger.warn(`User ${id} not found`);return null;}}return user;}\nasync updateUser(id,data){const user=await this.getUser(id);if(!user)throw new Error('Not found');Object.assign(user,data);await this.db.save(user);this.cache.set(id,user);this.logger.info(`Updated user ${id}`);return user;}}\n\n// AFTER: Clean formatting reveals the structure\nclass UserManager {\n  constructor(db, cache, logger) {\n    this.db = db;\n    this.cache = cache;\n    this.logger = logger;\n  }\n\n  async getUser(id) {\n    const cachedUser = this.cache.get(id);\n    if (cachedUser) {\n      return cachedUser;\n    }\n\n    const user = await this.db.findById(id);\n    if (!user) {\n      this.logger.warn(`User ${id} not found`);\n      return null;\n    }\n\n    this.cache.set(id, user);\n    return user;\n  }\n\n  async updateUser(id, data) {\n    const user = await this.getUser(id);\n    if (!user) {\n      throw new Error('Not found');\n    }\n\n    Object.assign(user, data);\n    await this.db.save(user);\n    this.cache.set(id, user);\n    this.logger.info(`Updated user ${id}`);\n    return user;\n  }\n}\n```\n\nThe logic is identical, but the formatted version is dramatically easier to understand. Blank lines separate concepts, indentation reveals scope, and consistent spacing makes patterns visible.",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Formatting Impact",
                description: "Understand the impact of formatting on comprehension.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "Two developers write identical logic. Developer A uses proper formatting with blank lines, indentation, and consistent spacing. Developer B puts everything on minimum lines. What is the practical impact?",
                  options: [
                    "A) No difference — the code runs the same way",
                    "B) Developer A's code compiles faster",
                    "C) Developer A's code is dramatically easier to read, understand, and maintain",
                    "D) Developer B's code uses less disk space, which is beneficial"
                  ],
                  correctAnswer: "C) Developer A's code is dramatically easier to read, understand, and maintain",
                  explanation: "Code is read far more often than it is written. Formatting directly impacts comprehension speed, debugging efficiency, and maintenance cost. The few extra bytes of whitespace are irrelevant."
                }
              }
            },
            {
              title: "Establishing Team Formatting Standards",
              content: "Every team should agree on a single set of formatting rules and configure their tools to enforce them automatically. The best formatting standards are enforced by machines, not code reviews.\n\n**Key Decisions Every Team Should Make:**\n\n1. **Indentation:** Tabs vs spaces, and how many? (2 spaces, 4 spaces)\n2. **Line length:** 80, 100, or 120 characters?\n3. **Braces:** Same line or next line?\n4. **Semicolons:** Required or omitted? (in JavaScript)\n5. **Trailing commas:** Yes or no?\n6. **Import ordering:** Alphabetical? Grouped by type?\n\n```javascript\n// Example .prettierrc — automated formatting\n{\n  \"printWidth\": 100,\n  \"tabWidth\": 2,\n  \"useTabs\": false,\n  \"semi\": true,\n  \"singleQuote\": true,\n  \"trailingComma\": \"es5\"\n}\n```\n\n**The key insight:** The specific rules matter less than consistency. A team that consistently uses 4-space indentation with 120-char lines writes cleaner code than a team where each developer uses their own style.\n\nAutomate formatting with tools like Prettier, ESLint, or your language's formatter. Run them on pre-commit hooks so formatting is never a discussion in code review.",
              order: 2,
              duration: 9,
              exercise: {
                type: "fill-in-blanks",
                title: "Team Standards",
                description: "Complete the formatting principle.",
                points: 10,
                difficulty: "beginner",
                content: {
                  text: "The specific formatting rules matter less than {{blank}}. A team should agree on one style and everyone should follow it.",
                  blanks: ["consistency"]
                }
              }
            },
            {
              title: "The Boy Scout Rule",
              content: "The Boy Scout Rule says: **Leave the campground cleaner than you found it.** Applied to code: always leave the code cleaner than you found it.\n\nIf you open a file to add a feature or fix a bug and notice poor formatting, fix it. Not the whole file necessarily — just the area you're working in.\n\n```javascript\n// You open a file to fix a bug and see this:\nfunction processItems(items,callback,options){\nif(!items||items.length===0){return [];}\nconst results=[];\nfor(let i=0;i<items.length;i++){\n  // BUG: Should be <= not <\n  if(items[i].value<options.threshold){\n  results.push(callback(items[i]));}\n}\nreturn results;}\n\n// You fix the bug AND clean up the formatting:\nfunction processItems(items, callback, options) {\n  if (!items || items.length === 0) {\n    return [];\n  }\n\n  const results = [];\n  for (let i = 0; i < items.length; i++) {\n    if (items[i].value <= options.threshold) {\n      results.push(callback(items[i]));\n    }\n  }\n  return results;\n}\n```\n\nThe code gradually gets better over time. This is the opposite of code rot, where code gradually deteriorates. The Boy Scout Rule, applied consistently by every team member, prevents the slow degradation that turns clean codebases into unmaintainable messes.",
              order: 3,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "The Boy Scout Rule",
                description: "Apply the Boy Scout Rule principle.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "True or False: When fixing a bug in a poorly formatted file, you should only fix the bug and leave the formatting alone to minimize the diff in the pull request.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "The Boy Scout Rule says to leave the code cleaner than you found it. While massive reformatting may warrant a separate commit, cleaning up the immediate area around your change is expected of a professional developer."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        }
      ],
      endOfChapterQuiz: {
        title: "Formatting Quiz",
        description: "Test your knowledge of code formatting principles.",
        duration: 20,
        passingScore: 70,
        slug: "clean-code-chapter-4-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "According to the newspaper metaphor, a source file should have:",
            options: [
              "A) The most complex code at the top",
              "B) A simple, explanatory name with high-level concepts at the top and details below",
              "C) All private methods before public methods",
              "D) Comments at the top explaining every function"
            ],
            correctAnswer: "B) A simple, explanatory name with high-level concepts at the top and details below",
            points: 10
          },
          {
            type: "true-false",
            question: "Horizontal alignment of assignments (lining up the = signs) is recommended in Clean Code.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Horizontal alignment draws the eye away from what matters and creates maintenance burden when names change length."
          },
          {
            type: "multiple-choice",
            question: "Where should variable declarations appear?",
            options: [
              "A) All at the top of the file",
              "B) As close to their usage as possible",
              "C) In a separate declarations section",
              "D) Always at the bottom of the function"
            ],
            correctAnswer: "B) As close to their usage as possible",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What should blank lines between code sections represent?",
            options: [
                "A) The end of a function",
                "B) Separate concepts or complete thoughts",
                "C) A pause for the compiler",
                "D) Required formatting by the linter"
              ],
            correctAnswer: "B) Separate concepts or complete thoughts",
              explanation: "Blank lines act as visual separators between distinct concepts, like paragraph breaks in prose.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "When team members disagree on formatting style, what should happen?",
            options: [
              "A) Each developer uses their own preferred style",
              "B) The team agrees on one style and everyone follows it consistently",
              "C) The most senior developer's style wins",
              "D) No formatting rules are needed with modern IDEs"
            ],
            correctAnswer: "B) The team agrees on one style and everyone follows it consistently",
            points: 10
          },
          {
            type: "true-false",
            question: "If one function calls another, the caller should ideally appear above the callee in the file.",
            options: ["true", "false"],
            correctAnswer: "true",
            points: 10,
            explanation: "This creates a top-down reading experience where high-level logic appears first and you can drill down into details."
          },
          {
            type: "multiple-choice",
            question: "What is the recommended typical file length in Clean Code?",
            options: [
              "A) Under 50 lines",
              "B) Exactly 100 lines",
              "C) Around 200 lines, with 500 as an upper limit",
              "D) File length doesn't matter"
            ],
            correctAnswer: "C) Around 200 lines, with 500 as an upper limit",
            points: 10
          },
          {
            type: "short-answer",
            question: "A source file is a ___. We indent lines to show their position in that structure.",
            correctAnswer: "hierarchy",
            points: 10
          }
        ]
      }
    },
    // ========================================
    // CHAPTER 5: Objects and Data Structures
    // ========================================
    {
      title: "Objects and Data Structures",
      description: "Understand the fundamental difference between objects and data structures, the Law of Demeter, and how to avoid creating hybrids that combine the worst of both worlds.",
      order: 5,
      lessons: [
        {
          title: "Data Abstraction and the Law of Demeter",
          slug: "data-abstraction-law-of-demeter",
          description: "Learn the difference between objects that hide data behind abstractions and data structures that expose data, and how the Law of Demeter guides clean interactions.",
          order: 1,
          duration: 30,
          parts: [
            {
              title: "Objects vs. Data Structures",
              content: "There is a fundamental dichotomy between objects and data structures:\n\n- **Objects** hide their data behind abstractions and expose functions that operate on that data.\n- **Data structures** expose their data and have no meaningful functions.\n\nThese two things are virtual opposites.\n\n```javascript\n// DATA STRUCTURE: Exposes data, no behavior\nclass PointData {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n}\n\n// OBJECT: Hides data, exposes behavior\nclass PointObject {\n  #x;\n  #y;\n  constructor(x, y) {\n    this.#x = x;\n    this.#y = y;\n  }\n  getDistanceFromOrigin() {\n    return Math.sqrt(this.#x ** 2 + this.#y ** 2);\n  }\n  getAngle() {\n    return Math.atan2(this.#y, this.#x);\n  }\n}\n```\n\n**The Asymmetry:**\n- Procedural code (using data structures) makes it easy to add new functions without changing existing data structures. It makes it hard to add new data structures because all functions must change.\n- OO code makes it easy to add new classes without changing existing functions. It makes it hard to add new functions because all classes must change.\n\nThe things that are hard for OO are easy for procedural, and vice versa. Mature developers know that the idea that everything is an object is a myth.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Objects vs Data Structures",
                description: "Identify when to use objects vs data structures.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "You need to represent shapes (circle, square, triangle) and frequently add new operations (area, perimeter, draw, serialize). Should you use objects or data structures?",
                  options: [
                    "A) Objects — because shapes are naturally object-oriented",
                    "B) Data structures with external functions — because adding new operations is easier",
                    "C) Always use objects — Clean Code says everything should be an object",
                    "D) It doesn't matter — they are equivalent"
                  ],
                  correctAnswer: "B) Data structures with external functions — because adding new operations is easier",
                  explanation: "If you frequently add new operations but rarely add new types, procedural code with data structures is easier to modify. Adding a new function doesn't require changing any existing shape type. With objects, every new operation means modifying every shape class."
                }
              }
            },
            {
              title: "The Law of Demeter",
              content: "The Law of Demeter says a module should not know about the innards of the objects it manipulates. Objects hide their data and expose operations. This means an object should not expose its internal structure through accessors.\n\nMore precisely, the Law of Demeter says a method `f` of class `C` should only call methods on:\n- `C` itself\n- An object created by `f`\n- An object passed as an argument to `f`\n- An object held in an instance variable of `C`\n\nIt should NOT call methods on objects returned by any of the allowed functions. Don't talk to strangers!\n\n```javascript\n// BAD: Train wreck — violates Law of Demeter\nconst outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();\n\n// This chain reaches through multiple objects:\n// ctxt -> options -> scratchDir -> absolutePath\n// Each dot is a coupling point\n\n// CLEAN: Tell, don't ask\nconst outputDir = ctxt.getOutputDirectory();\n// Let ctxt figure out how to find it\n\n// Even better — why do we need the path? To create a file?\nconst outputStream = ctxt.createScratchFileStream(classFileName);\n// Now ctxt handles the details internally\n```\n\n**Train Wrecks:** Chains of calls like `a.getB().getC().doSomething()` are called train wrecks. They should be avoided because they couple the caller to the internal structure of multiple objects.",
              order: 2,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Law of Demeter",
                description: "Evaluate a Law of Demeter violation.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: The code `user.getAddress().getCity().getZipCode()` is acceptable because each method returns a well-defined object.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "This is a train wreck that violates the Law of Demeter. The calling code is coupled to the internal structure of User, Address, and City. If any of these structures change, the caller breaks. Better: user.getZipCode() or expose only what the caller truly needs."
                }
              }
            },
            {
              title: "Data Transfer Objects and Active Records",
              content: "**Data Transfer Objects (DTOs):** The quintessential form of a data structure is a class with public variables and no functions. DTOs are useful for communicating with databases, parsing messages from sockets, etc.\n\n```javascript\n// DTO: Pure data structure for transferring data\nclass UserDTO {\n  constructor(data) {\n    this.id = data.id;\n    this.name = data.name;\n    this.email = data.email;\n    this.createdAt = data.createdAt;\n  }\n}\n```\n\n**Active Records:** A special form of DTO with navigational methods like `save` and `find`. They are data structures with database access. The problem comes when developers try to treat them as objects by putting business rules in them.\n\n```javascript\n// BAD: Active Record with business logic — a hybrid\nclass User {\n  save() { db.save(this); }\n  find(id) { return db.find(id); }\n  // Business logic mixed in — makes this a hybrid!\n  isEligibleForDiscount() {\n    return this.orderCount > 10 && this.memberSince < oneYearAgo;\n  }\n}\n\n// CLEAN: Separate the data structure from the business object\nclass UserRecord {  // Data structure\n  save() { db.save(this); }\n  static find(id) { return db.find(id); }\n}\n\nclass UserPolicy {  // Object with business rules\n  constructor(userRecord) {\n    this.user = userRecord;\n  }\n  isEligibleForDiscount() {\n    return this.user.orderCount > 10 && this.user.memberSince < oneYearAgo;\n  }\n}\n```\n\n**Hybrids** are the worst of both worlds. They have functions that do significant things AND public variables or accessors. Avoid creating them.",
              order: 3,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Identifying Hybrids",
                description: "Spot the hybrid data structure/object.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Which of these is a problematic hybrid?",
                  options: [
                    "A) A class with only public data fields and no methods",
                    "B) A class with private data and methods that operate on that data",
                    "C) A class with public data fields AND business logic methods that operate on those fields",
                    "D) A plain JSON object used for API responses"
                  ],
                  correctAnswer: "C) A class with public data fields AND business logic methods that operate on those fields",
                  explanation: "A hybrid exposes its internals like a data structure but also has significant behavior like an object. This makes it hard to add new functions (like an object) AND hard to add new data structures (like procedural code) — the worst of both approaches."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Applying the Object/Data Structure Dichotomy",
          slug: "applying-object-data-structure-dichotomy",
          description: "Practice choosing between objects and data structures in real-world scenarios and fixing Law of Demeter violations.",
          order: 2,
          duration: 25,
          parts: [
            {
              title: "Refactoring Train Wrecks",
              content: "Train wrecks are one of the most common Law of Demeter violations in everyday code. Let's practice refactoring them.\n\n```javascript\n// BEFORE: Train wrecks everywhere\nfunction getShippingLabel(order) {\n  const street = order.getCustomer().getAddress().getStreet();\n  const city = order.getCustomer().getAddress().getCity();\n  const state = order.getCustomer().getAddress().getState();\n  const zip = order.getCustomer().getAddress().getZipCode();\n  const name = order.getCustomer().getFullName();\n  \n  return `${name}\\n${street}\\n${city}, ${state} ${zip}`;\n}\n\n// AFTER: Tell, don't ask\nfunction getShippingLabel(order) {\n  return order.getFormattedShippingLabel();\n}\n\n// The Order knows how to produce its shipping label\nclass Order {\n  getFormattedShippingLabel() {\n    return this.customer.getFormattedAddress();\n  }\n}\n\n// The Customer knows how to format their address\nclass Customer {\n  getFormattedAddress() {\n    return `${this.fullName}\\n${this.address.format()}`;\n  }\n}\n\n// The Address knows its own formatting\nclass Address {\n  format() {\n    return `${this.street}\\n${this.city}, ${this.state} ${this.zipCode}`;\n  }\n}\n```\n\nThe key principle is **Tell, Don't Ask**. Instead of asking objects for their data and doing things with it, tell objects to do things for you. Each object handles its own concerns.",
              order: 1,
              duration: 9,
              exercise: {
                type: "multiple-choice",
                title: "Refactoring Train Wrecks",
                description: "Choose the best refactoring for a train wreck.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "You see: `const tax = invoice.getItems().getSubtotal().multiply(taxRate)`. What is the cleanest fix?",
                  options: [
                    "A) Cache the intermediate results in variables",
                    "B) Add a `calculateTax(taxRate)` method to Invoice",
                    "C) Create a helper function that does the chain",
                    "D) Use optional chaining: `invoice?.getItems()?.getSubtotal()?.multiply(taxRate)`"
                  ],
                  correctAnswer: "B) Add a `calculateTax(taxRate)` method to Invoice",
                  explanation: "Tell the Invoice to calculate its own tax. This follows 'Tell, Don't Ask' — the Invoice has all the information it needs. The other options still expose the internal structure."
                }
              }
            },
            {
              title: "Choosing Objects vs Data Structures in Real Scenarios",
              content: "The choice between objects and data structures depends on what changes more often in your system: the types of data or the operations on that data.\n\n**Scenario 1: Configuration data** — Data structure is better.\n```javascript\n// Configuration rarely gains new behavior, but new fields are added often\nconst dbConfig = {\n  host: 'localhost',\n  port: 5432,\n  database: 'myapp',\n  maxConnections: 10\n};\n// Functions operate on it from outside\nfunction createConnectionString(config) {\n  return `postgres://${config.host}:${config.port}/${config.database}`;\n}\n```\n\n**Scenario 2: Payment processing** — Objects are better.\n```javascript\n// New payment types are added often; the operations are stable\nclass CreditCardPayment {\n  process() { /* credit card specific logic */ }\n  refund() { /* credit card refund logic */ }\n}\n\nclass PayPalPayment {\n  process() { /* PayPal specific logic */ }\n  refund() { /* PayPal refund logic */ }\n}\n// Adding CryptoPayment doesn't modify existing classes\n```\n\n**Rule of thumb:**\n- Types change often, operations stable -> Use objects (polymorphism)\n- Operations change often, types stable -> Use data structures (procedural)\n- Both change often -> You may need the Visitor pattern or a plugin architecture",
              order: 2,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Choosing the Right Approach",
                description: "Explain when to choose data structures over objects.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "You're building a reporting system where new report types (PDF, CSV, HTML, Excel) need to be added frequently, but the data model rarely changes. What is the best approach?",
                  options: [
                    "A) Use objects for everything — data model and report generators",
                    "B) Use data structures for the stable data model and objects (polymorphism) for the report generators",
                    "C) Use data structures for everything",
                    "D) Use a single ReportManager class with switch statements"
                  ],
                  correctAnswer: "B) Use data structures for the stable data model and objects (polymorphism) for the report generators",
                  explanation: "Data structures work well for stable types where new operations are added. Objects with polymorphism work well for report generators where new types (PDF, CSV, etc.) are added frequently without changing existing code."
                }
              }
            },
            {
              title: "The Hidden Coupling Problem",
              content: "Every time you access an object's internal structure, you create a coupling. The more structure you know about, the more brittle your code becomes.\n\n```javascript\n// BAD: This function knows WAY too much about the internal structure\nfunction calculateShippingCost(order) {\n  const items = order.cart.items;\n  let totalWeight = 0;\n  for (const item of items) {\n    totalWeight += item.product.physicalProperties.weight * item.quantity;\n  }\n  const destination = order.customer.shippingAddresses[0].country;\n  const carrier = order.shippingPreferences.preferredCarrier;\n  \n  // This function is coupled to:\n  // - order.cart.items structure\n  // - item.product.physicalProperties.weight\n  // - order.customer.shippingAddresses array\n  // - order.shippingPreferences.preferredCarrier\n  // If ANY of these change, this function breaks!\n  \n  return carrier.calculateRate(totalWeight, destination);\n}\n\n// CLEAN: Minimal coupling — ask for only what you need\nfunction calculateShippingCost(totalWeight, destinationCountry, carrier) {\n  return carrier.calculateRate(totalWeight, destinationCountry);\n}\n\n// Let the Order compute its own weight\nclass Order {\n  getTotalWeight() {\n    return this.cart.getTotalWeight();\n  }\n  getShippingDestination() {\n    return this.customer.primaryShippingCountry;\n  }\n}\n```\n\nThe refactored version is coupled only to the carrier's `calculateRate` method. It doesn't know about carts, items, products, or address arrays.",
              order: 3,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Coupling and Structure",
                description: "Evaluate coupling through data access.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: Accessing `order.customer.addresses[0].city` is acceptable because each accessor returns a well-typed object with a clear API.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "This chain couples your code to Order's internal customer field, Customer's internal addresses array, the fact that index 0 is meaningful, and Address's city field. Any structural change breaks the caller. Use `order.getShippingCity()` instead."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        }
      ],
      endOfChapterQuiz: {
        title: "Objects and Data Structures Quiz",
        description: "Test your understanding of the object/data structure dichotomy.",
        duration: 20,
        passingScore: 70,
        slug: "clean-code-chapter-5-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "What is the fundamental difference between objects and data structures?",
            options: [
              "A) Objects are in OOP languages; data structures are in functional languages",
              "B) Objects hide data and expose behavior; data structures expose data and have no behavior",
              "C) Objects are mutable; data structures are immutable",
              "D) There is no real difference"
            ],
            correctAnswer: "B) Objects hide data and expose behavior; data structures expose data and have no behavior",
            points: 10
          },
          {
            type: "true-false",
            question: "According to Clean Code, the idea that everything should be an object is correct.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "The idea that everything is an object is a myth. Sometimes simple data structures with procedural code are the cleaner solution."
          },
          {
            type: "multiple-choice",
            question: "What is the name for code like `a.getB().getC().doSomething()` that violates the Law of Demeter?",
            options: [
                "A) Spaghetti code",
                "B) Train wreck",
                "C) God object",
                "D) Shotgun surgery"
              ],
            correctAnswer: "B) Train wreck",
              explanation: "A chain of method calls like a.getB().getC().doSomething() is called a 'train wreck' because it looks like a line of coupled train cars reaching through multiple objects.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "When is it easier to use procedural code with data structures instead of objects?",
            options: [
              "A) When you frequently add new data types",
              "B) When you frequently add new functions that operate on existing data types",
              "C) When you need encapsulation",
              "D) Always — procedural is always better"
            ],
            correctAnswer: "B) When you frequently add new functions that operate on existing data types",
            points: 10
          },
          {
            type: "true-false",
            question: "An Active Record should contain business rules alongside its save/find methods.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Active Records are data structures. Business rules should be in separate objects that contain the Active Record data."
          },
          {
            type: "multiple-choice",
            question: "The Law of Demeter states that a method should only call methods on:",
            options: [
              "A) Any object it can access through any chain of calls",
              "B) Its own class, objects it creates, its parameters, and its instance variables",
              "C) Only static methods and constants",
              "D) Only public methods of other classes"
            ],
            correctAnswer: "B) Its own class, objects it creates, its parameters, and its instance variables",
            points: 10
          },
          {
            type: "short-answer",
            question: "A class that has both public data and business logic methods is called a ___.",
            correctAnswer: "hybrid",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Why are hybrids problematic?",
            options: [
              "A) They use too much memory",
              "B) They make it hard to add both new types AND new functions",
              "C) They can't be serialized",
              "D) They violate naming conventions"
            ],
            correctAnswer: "B) They make it hard to add both new types AND new functions",
            points: 10
          }
        ]
      }
    },
    // ========================================
    // CHAPTER 6: Error Handling
    // ========================================
    {
      title: "Error Handling",
      description: "Learn to write error handling that is clean and doesn't obscure the logic of your code. Master exceptions, null handling, and writing robust code.",
      order: 6,
      lessons: [
        {
          title: "Writing Clean Error Handling",
          slug: "clean-error-handling",
          description: "Master the principles of using exceptions properly, providing context, and avoiding null returns.",
          order: 1,
          duration: 30,
          parts: [
            {
              title: "Use Exceptions Rather Than Return Codes",
              content: "Error handling is important, but if it obscures logic, it's wrong. In the old days, languages didn't have exceptions, so you had to check return codes:\n\n```javascript\n// BAD: Error codes obscure the logic\nclass DeviceController {\n  sendShutDown() {\n    const handle = getHandle(DEV1);\n    if (handle !== DeviceHandle.INVALID) {\n      const record = retrieveDeviceRecord(handle);\n      if (record.getStatus() !== DEVICE_SUSPENDED) {\n        pauseDevice(handle);\n        clearDeviceWorkQueue(handle);\n        closeDevice(handle);\n      } else {\n        logger.log('Device suspended.');\n      }\n    } else {\n      logger.log('Invalid handle.');\n    }\n  }\n}\n\n// CLEAN: Exceptions separate the happy path from error handling\nclass DeviceController {\n  sendShutDown() {\n    try {\n      tryToShutDown();\n    } catch (error) {\n      logger.log(error);\n    }\n  }\n\n  tryToShutDown() {\n    const handle = getHandle(DEV1);\n    const record = retrieveDeviceRecord(handle);\n    pauseDevice(handle);\n    clearDeviceWorkQueue(handle);\n    closeDevice(handle);\n  }\n}\n```\n\nThe code is dramatically cleaner. The device shutdown algorithm and the error handling are now separated. You can look at each independently and understand them.",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Exceptions vs Return Codes",
                description: "Choose the cleanest error handling approach.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Why are exceptions preferred over error return codes in Clean Code?",
                  options: [
                    "A) Exceptions are faster to execute",
                    "B) They separate the error handling concern from the main logic, keeping the happy path clean",
                    "C) Return codes use more memory",
                    "D) Exceptions are required by all modern languages"
                  ],
                  correctAnswer: "B) They separate the error handling concern from the main logic, keeping the happy path clean",
                  explanation: "With error codes, the caller must check for errors immediately after each call, tangling error handling with the algorithm. Exceptions allow you to write the happy path cleanly and handle errors separately."
                }
              }
            },
            {
              title: "Write Your Try-Catch-Finally First",
              content: "One of the most interesting things about exceptions is that they define a scope within your program. When you execute code in the `try` block, you are stating that execution can abort at any point and resume at the `catch`.\n\nTry blocks are like transactions. Your `catch` has to leave your program in a consistent state. For this reason, it is good practice to start with a try-catch-finally statement when you are writing code that could throw exceptions.\n\n```javascript\n// CLEAN: Write the test first, then make it pass\n// This is TDD for error handling\n\n// Step 1: Write a test that expects the exception\ntest('throws on missing file', () => {\n  expect(() => readConfigFile('missing.json'))\n    .toThrow(FileNotFoundException);\n});\n\n// Step 2: Write the try-catch structure first\nfunction readConfigFile(path) {\n  try {\n    const content = fs.readFileSync(path, 'utf8');\n    return JSON.parse(content);\n  } catch (error) {\n    if (error.code === 'ENOENT') {\n      throw new FileNotFoundException(`Config file not found: ${path}`);\n    }\n    throw new ConfigParseError(`Invalid config: ${error.message}`);\n  }\n}\n```\n\n**Provide Context with Exceptions:** Create informative error messages that include the operation that failed and the type of failure. Don't just rethrow generic errors — wrap them with context.",
              order: 2,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Try-Catch First",
                description: "Evaluate the try-catch-first approach.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: When writing code that could throw exceptions, you should write the try-catch-finally structure first because it helps you define the scope and expected behavior of that code.",
                  options: ["True", "False"],
                  correctAnswer: "True",
                  explanation: "Starting with try-catch-finally helps you think about what can go wrong, what state needs to be maintained, and what the caller should expect. It's like defining a transaction boundary."
                }
              }
            },
            {
              title: "Don't Return or Pass Null",
              content: "Returning null from a method is bad. Passing null into a method is worse.\n\n```javascript\n// BAD: Returning null — forces every caller to check\nfunction getEmployee(id) {\n  const emp = database.find(id);\n  if (emp) return emp;\n  return null; // Every caller must check for null!\n}\n\n// Every call site becomes polluted:\nconst employee = getEmployee(id);\nif (employee !== null) {\n  const pay = employee.calculatePay();\n  if (pay !== null) { // More null checks cascade\n    processPay(pay);\n  }\n}\n\n// CLEAN: Throw an exception or return a special case\nfunction getEmployee(id) {\n  const emp = database.find(id);\n  if (!emp) throw new EmployeeNotFoundError(id);\n  return emp;\n}\n\n// Or use the Special Case Pattern:\nfunction getEmployees() {\n  const employees = database.findAll();\n  if (employees.length === 0) {\n    return []; // Empty list, not null!\n  }\n  return employees;\n}\n\n// Now callers don't need null checks:\nconst employees = getEmployees();\nfor (const emp of employees) { // Works fine with empty array\n  processPay(emp.calculatePay());\n}\n```\n\nWhen you are tempted to return null, consider throwing an exception or returning a Special Case object instead. If you are calling a third-party API that can return null, wrap that method and throw an exception or return a special case.",
              order: 3,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Avoiding Null",
                description: "Choose the cleanest alternative to returning null.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "A function `findUserByEmail(email)` might not find a match. What is the cleanest approach?",
                  options: [
                    "A) Return null and let the caller check",
                    "B) Return undefined",
                    "C) Throw a UserNotFoundError with the searched email in the message",
                    "D) Return a string 'NOT_FOUND'"
                  ],
                  correctAnswer: "C) Throw a UserNotFoundError with the searched email in the message",
                  explanation: "Throwing a specific exception with context (the email that wasn't found) provides clear error handling, prevents null propagation, and gives the caller meaningful information. The caller handles it with try-catch, keeping the happy path clean."
                }
              }
            },
            {
              title: "Define Exception Classes by Caller Needs",
              content: "When we define exception classes in an application, our most important concern should be **how they are caught**. Define your exceptions in terms of what the caller needs.\n\n```javascript\n// BAD: Too many exception types that are all handled the same way\ntry {\n  port.open();\n} catch (error) {\n  if (error instanceof DeviceResponseException) {\n    reportPortError(error);\n    logger.log('Device response', error);\n  } else if (error instanceof ATM1212UnlockedException) {\n    reportPortError(error);\n    logger.log('Unlock exception', error);\n  } else if (error instanceof GMXError) {\n    reportPortError(error);\n    logger.log('Device response', error);\n  }\n}\n\n// CLEAN: Wrap the third-party API and throw one common exception\nclass LocalPort {\n  constructor(innerPort) {\n    this.innerPort = innerPort;\n  }\n  open() {\n    try {\n      this.innerPort.open();\n    } catch (error) {\n      throw new PortDeviceFailure(error);\n    }\n  }\n}\n\n// Now the caller is simple:\ntry {\n  port.open();\n} catch (error) {\n  reportError(error);\n  logger.log(error.message);\n}\n```\n\nWrapping third-party APIs is a best practice. It minimizes your dependencies on that API, makes testing easier, and lets you define your own exception types.",
              order: 4,
              duration: 6,
              exercise: {
                type: "multiple-choice",
                title: "Exception Class Design",
                description: "Explain the principle of defining exceptions.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "When designing exception classes, what should be the primary concern according to Clean Code?",
                  options: [
                    "A) The source of the error — where it originated",
                    "B) How they are caught — define exceptions based on the caller's needs",
                    "C) The severity of the error — critical vs. warning",
                    "D) The HTTP status code the error maps to"
                  ],
                  correctAnswer: "B) How they are caught — define exceptions based on the caller's needs",
                  explanation: "The most important concern is how exceptions are caught by the caller. Define exceptions that make the catch blocks clean and meaningful for the code that handles them."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Error Handling Patterns in Practice",
          slug: "error-handling-patterns-practice",
          description: "Apply clean error handling patterns to real-world scenarios including API wrapping, the Special Case Pattern, and error boundaries.",
          order: 2,
          duration: 25,
          parts: [
            {
              title: "The Special Case Pattern",
              content: "Instead of returning null and forcing the caller to handle the absence of data, create a Special Case object that encapsulates the default behavior.\n\n```javascript\n// BAD: Null checks proliferate throughout the codebase\nfunction displayMealExpenses(expenses) {\n  let total = 0;\n  for (const expense of expenses) {\n    const mealExpense = expense.getMealPerDiem();\n    if (mealExpense !== null) {\n      total += mealExpense;\n    } else {\n      total += getDefaultMealPerDiem(); // null handling scattered\n    }\n  }\n  return total;\n}\n\n// CLEAN: Special Case Pattern — no null checks needed\nclass PerDiemMealExpense {\n  // Special case object for missing meal expenses\n  getMealPerDiem() {\n    return getDefaultMealPerDiem();\n  }\n}\n\nfunction displayMealExpenses(expenses) {\n  let total = 0;\n  for (const expense of expenses) {\n    total += expense.getMealPerDiem(); // Works for both normal and special case\n  }\n  return total;\n}\n```\n\nThe Special Case Pattern works because the special case object has the same interface as the real object. Calling code never needs to know whether it has a real expense or a default one. Martin Fowler calls this the **Null Object Pattern** — a special case of the Special Case Pattern specifically for handling null.\n\n```javascript\n// Another example: NullUser instead of null\nclass NullUser {\n  get name() { return 'Guest'; }\n  get email() { return ''; }\n  isAuthenticated() { return false; }\n  hasPermission(p) { return false; }\n}\n\nfunction getCurrentUser() {\n  const user = session.getUser();\n  return user || new NullUser();\n}\n// Callers never need to check for null!\n```",
              order: 1,
              duration: 9,
              exercise: {
                type: "multiple-choice",
                title: "Special Case Pattern",
                description: "Apply the Special Case Pattern.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Your `getSettings()` function returns null when no custom settings exist, causing null checks in 12 different places. What is the cleanest fix?",
                  options: [
                    "A) Add null checks in all 12 places",
                    "B) Return a DefaultSettings object that has the same interface but returns default values",
                    "C) Throw an exception when settings don't exist",
                    "D) Use optional chaining (?.) in all 12 places"
                  ],
                  correctAnswer: "B) Return a DefaultSettings object that has the same interface but returns default values",
                  explanation: "A DefaultSettings object (Special Case Pattern) eliminates all 12 null checks. The calling code works identically whether it has real settings or defaults, because the interface is the same."
                }
              }
            },
            {
              title: "Wrapping Third-Party APIs for Clean Error Handling",
              content: "Third-party APIs are a prime source of messy error handling. They throw their own exception types, use different conventions, and can change between versions. Wrapping them gives you control.\n\n```javascript\n// BAD: Third-party exceptions leak throughout your code\nasync function getWeatherForecast(city) {\n  try {\n    const response = await weatherApi.getForecast(city);\n    return response;\n  } catch (error) {\n    if (error instanceof WeatherApiAuthError) {\n      // Handle auth error\n    } else if (error instanceof WeatherApiRateLimitError) {\n      // Handle rate limit\n    } else if (error instanceof WeatherApiNetworkError) {\n      // Handle network error\n    } else if (error.code === 'CITY_NOT_FOUND') {\n      // Handle not found\n    }\n    throw error;\n  }\n}\n\n// CLEAN: Wrapper translates all errors to your domain\nclass WeatherService {\n  constructor(apiClient) {\n    this.api = apiClient;\n  }\n\n  async getForecast(city) {\n    try {\n      const response = await this.api.getForecast(city);\n      return this.#mapToForecast(response);\n    } catch (error) {\n      throw this.#translateError(error, city);\n    }\n  }\n\n  #translateError(error, city) {\n    if (error.code === 'CITY_NOT_FOUND') {\n      return new CityNotFoundError(city);\n    }\n    return new WeatherServiceError(\n      `Failed to get forecast for ${city}`,\n      { cause: error }\n    );\n  }\n\n  #mapToForecast(response) {\n    return new Forecast(response.data);\n  }\n}\n```\n\nBenefits of wrapping:\n1. **Single point of change** when the API updates\n2. **Your error types** in your domain language\n3. **Easy to mock** for testing\n4. **Easy to swap** to a different weather provider",
              order: 2,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "API Wrapping Benefits",
                description: "Explain why wrapping third-party APIs improves error handling.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "What are the key benefits of wrapping a third-party API's error handling in your own service layer?",
                  options: [
                    "A) It makes the API faster and reduces network latency",
                    "B) Single point of change when the API updates, domain-specific error types, and easier testing with mocks",
                    "C) It eliminates all possible errors from the third party",
                    "D) It allows you to avoid try-catch blocks entirely"
                  ],
                  correctAnswer: "B) Single point of change when the API updates, domain-specific error types, and easier testing with mocks",
                  explanation: "Wrapping provides a single point of change, lets you use your own domain-specific error types, makes it easy to mock for testing, and makes it easy to swap providers later."
                }
              }
            },
            {
              title: "Error Handling Anti-Patterns",
              content: "Let's examine the most common error handling anti-patterns and their clean alternatives.\n\n**Anti-pattern 1: Swallowing exceptions silently**\n```javascript\n// TERRIBLE: The silent killer\ntry {\n  processPayment(order);\n} catch (error) {\n  // TODO: handle this later\n}\n// Payment failed but the system continues as if it succeeded!\n\n// CLEAN: Always handle or propagate\ntry {\n  processPayment(order);\n} catch (error) {\n  logger.error('Payment failed', { orderId: order.id, error });\n  throw new PaymentFailedError(order.id, { cause: error });\n}\n```\n\n**Anti-pattern 2: Using exceptions for control flow**\n```javascript\n// BAD: Exception as a goto statement\nfunction findUser(id) {\n  try {\n    return users[id]; // throws if undefined\n  } catch (e) {\n    return createDefaultUser(); // Using exception as control flow\n  }\n}\n\n// CLEAN: Use normal control flow\nfunction findUser(id) {\n  if (id in users) {\n    return users[id];\n  }\n  return createDefaultUser();\n}\n```\n\n**Anti-pattern 3: Catching too broadly**\n```javascript\n// BAD: Catches EVERYTHING including programming errors\ntry {\n  const result = processData(nul); // typo! Should be null\n} catch (error) {\n  return defaultResult; // Hides the ReferenceError bug!\n}\n\n// CLEAN: Catch specific expected errors\ntry {\n  const result = processData(input);\n} catch (error) {\n  if (error instanceof ValidationError) {\n    return handleValidationError(error);\n  }\n  throw error; // Let unexpected errors propagate\n}\n```",
              order: 3,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Error Anti-Patterns",
                description: "Identify the worst error handling anti-pattern.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Which error handling practice is MOST dangerous?",
                  options: [
                    "A) Throwing generic Error instead of specific types",
                    "B) Catching all exceptions with an empty catch block",
                    "C) Using error codes instead of exceptions",
                    "D) Having too many try-catch blocks"
                  ],
                  correctAnswer: "B) Catching all exceptions with an empty catch block",
                  explanation: "Empty catch blocks silently swallow errors, including bugs and critical failures. The system continues in an unknown state, making problems extremely hard to diagnose. It's the coding equivalent of ignoring a fire alarm."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        }
      ],
      endOfChapterQuiz: {
        title: "Error Handling Quiz",
        description: "Test your understanding of clean error handling patterns.",
        duration: 20,
        passingScore: 70,
        slug: "clean-code-chapter-6-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "What is the primary problem with returning null?",
            options: [
              "A) It uses too much memory",
              "B) It forces every caller to add null checks, and missing one causes runtime errors",
              "C) Null is deprecated in modern languages",
              "D) It makes the code run slower"
            ],
            correctAnswer: "B) It forces every caller to add null checks, and missing one causes runtime errors",
            points: 10
          },
          {
            type: "true-false",
            question: "Passing null as a function argument is even worse than returning null.",
            options: ["true", "false"],
            correctAnswer: "true",
            points: 10,
            explanation: "Passing null forces the function to defensively check arguments, and there is rarely a good way to handle a null argument."
          },
          {
            type: "multiple-choice",
            question: "Why should you wrap third-party APIs?",
            options: [
              "A) To make them slower",
              "B) To minimize dependencies, simplify testing, and define your own exception types",
              "C) To add more features to the API",
              "D) It's only necessary for poorly written APIs"
            ],
            correctAnswer: "B) To minimize dependencies, simplify testing, and define your own exception types",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What pattern can you use instead of returning null for an empty result from a list query?",
            options: [
                "A) Throw an exception",
                "B) Return undefined",
                "C) Return an empty list or empty collection",
                "D) Return a special sentinel value like -1"
              ],
            correctAnswer: "C) Return an empty list or empty collection",
              explanation: "Returning an empty collection instead of null eliminates the need for null checks and prevents NullPointerExceptions.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Why should you write try-catch-finally first?",
            options: [
              "A) It's required by the compiler",
              "B) It helps define the scope and transaction-like behavior of the code",
              "C) It makes the code run faster",
              "D) To satisfy code coverage requirements"
            ],
            correctAnswer: "B) It helps define the scope and transaction-like behavior of the code",
            points: 10
          },
          {
            type: "true-false",
            question: "Exception classes should be defined based on the source of the error, not how they are caught.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "The most important concern is how exceptions are caught. Define them based on the caller's needs."
          },
          {
            type: "short-answer",
            question: "Error handling is important, but if it obscures ___, it's wrong.",
            correctAnswer: "logic",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What is the Special Case Pattern?",
            options: [
              "A) A pattern where you throw a unique exception for every error",
              "B) A pattern where you return an object that handles the special case instead of returning null",
              "C) A pattern for handling database errors",
              "D) A pattern for logging special events"
            ],
            correctAnswer: "B) A pattern where you return an object that handles the special case instead of returning null",
            points: 10
          }
        ]
      }
    },
    // ========================================
    // CHAPTER 7: Unit Tests
    // ========================================
    {
      title: "Unit Tests",
      description: "Learn the three laws of TDD, how to write clean tests, and why test code is as important as production code. Master the F.I.R.S.T. principles of clean tests.",
      order: 7,
      lessons: [
        {
          title: "The Three Laws of TDD",
          slug: "three-laws-of-tdd",
          description: "Understand test-driven development and how to write tests that serve as living documentation.",
          order: 1,
          duration: 30,
          parts: [
            {
              title: "The Three Laws",
              content: "Test-driven development asks us to write unit tests first, before we write production code. Consider these three laws:\n\n1. **You may not write production code until you have written a failing unit test.**\n2. **You may not write more of a unit test than is sufficient to fail** (and not compiling counts as failing).\n3. **You may not write more production code than is sufficient to pass the currently failing test.**\n\nThese three laws lock you into a cycle that is perhaps thirty seconds long. The tests and the production code are written together, with the tests just a few seconds ahead of the production code.\n\n```javascript\n// TDD Cycle Example:\n\n// Step 1: Write a failing test\ntest('stack is empty when created', () => {\n  const stack = new Stack();\n  expect(stack.isEmpty()).toBe(true); // FAILS: Stack doesn't exist yet\n});\n\n// Step 2: Write just enough code to pass\nclass Stack {\n  isEmpty() { return true; }\n}\n\n// Step 3: Write next failing test\ntest('stack is not empty after push', () => {\n  const stack = new Stack();\n  stack.push(42);\n  expect(stack.isEmpty()).toBe(false); // FAILS: push doesn't exist\n});\n\n// Step 4: Write just enough code\nclass Stack {\n  #items = [];\n  push(item) { this.#items.push(item); }\n  isEmpty() { return this.#items.length === 0; }\n}\n```\n\nIf we work this way, we will write dozens of tests every day, hundreds every month, thousands every year. These tests cover virtually all of our production code.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "TDD Laws",
                description: "Apply the three laws of TDD.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "According to the Three Laws of TDD, what should you do when your current test passes?",
                  options: [
                    "A) Write more production code to handle edge cases",
                    "B) Refactor the production code, then write the next failing test",
                    "C) Write documentation for the code you just wrote",
                    "D) Deploy the code to staging"
                  ],
                  correctAnswer: "B) Refactor the production code, then write the next failing test",
                  explanation: "The TDD cycle is Red (failing test) -> Green (make it pass) -> Refactor (clean up). After the test passes and you refactor, you write the next failing test to continue the cycle."
                }
              }
            },
            {
              title: "Keeping Tests Clean",
              content: "Test code is just as important as production code. It requires thought, design, and care. It must be kept as clean as production code.\n\nHaving dirty tests is equivalent to, if not worse than, having no tests. The problem is that tests must change as the production code evolves. The dirtier the tests, the harder they are to change. Eventually dirty tests become a liability.\n\n**What makes a clean test? Readability, readability, and readability.**\n\n```javascript\n// BAD: Hard to understand what's being tested\ntest('test1', () => {\n  const p = makeP('My Page');\n  const d = crawl(p);\n  const r = d.find('MyWidget');\n  expect(r).not.toBeNull();\n  expect(r.getAttribute('type')).toBe('text');\n  const s = r.getAttribute('size');\n  expect(parseInt(s)).toBeGreaterThan(0);\n});\n\n// CLEAN: Build-Operate-Check pattern\ntest('widget on page has text type and positive size', () => {\n  // Build\n  const page = createPageWithWidget('My Page', 'MyWidget');\n\n  // Operate\n  const widget = page.findWidget('MyWidget');\n\n  // Check\n  expect(widget).toBeDefined();\n  expect(widget.type).toBe('text');\n  expect(widget.size).toBeGreaterThan(0);\n});\n```\n\nThe **Build-Operate-Check** pattern (also called Arrange-Act-Assert) keeps tests clear: build up the test data, operate on it, then check the results.",
              order: 2,
              duration: 10,
              exercise: {
                type: "fill-in-blanks",
                title: "Clean Test Pattern",
                description: "Name the three phases of clean test structure.",
                points: 10,
                difficulty: "beginner",
                content: {
                  text: "The three phases of a clean test are: {{blank}} the test data, {{blank}} on it, and {{blank}} the results.",
                  blanks: ["build", "operate", "check"]
                }
              }
            },
            {
              title: "One Assert Per Test and Single Concept",
              content: "There is a school of thought that says every test function should have one and only one assert statement. This is a good guideline, though sometimes you need a few related asserts.\n\nA better rule: **Test a single concept in each test function.**\n\n```javascript\n// BAD: Multiple concepts in one test\ntest('date handling', () => {\n  // Concept 1: Month parsing\n  expect(parseMonth('January')).toBe(1);\n  expect(parseMonth('Feb')).toBe(2);\n\n  // Concept 2: Date arithmetic\n  expect(addDays('2024-01-30', 1)).toBe('2024-01-31');\n  expect(addDays('2024-01-31', 1)).toBe('2024-02-01');\n\n  // Concept 3: Leap year\n  expect(isLeapYear(2024)).toBe(true);\n  expect(isLeapYear(2023)).toBe(false);\n});\n\n// CLEAN: One concept per test\ntest('parseMonth converts full month names to numbers', () => {\n  expect(parseMonth('January')).toBe(1);\n  expect(parseMonth('December')).toBe(12);\n});\n\ntest('addDays rolls over to next month correctly', () => {\n  expect(addDays('2024-01-31', 1)).toBe('2024-02-01');\n});\n\ntest('isLeapYear identifies divisible-by-4 years as leap years', () => {\n  expect(isLeapYear(2024)).toBe(true);\n  expect(isLeapYear(2023)).toBe(false);\n});\n```\n\nWhen a test fails, you want its name to tell you exactly what concept broke.",
              order: 3,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Single Concept Tests",
                description: "Evaluate test organization.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: A test called 'testUserModule' that tests creation, validation, deletion, and serialization of users follows clean test practices.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "This test covers at least four separate concepts. When it fails, you won't know which concept broke without reading the entire test. Each concept should be its own test with a descriptive name."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "F.I.R.S.T. Principles of Clean Tests",
          slug: "first-principles-clean-tests",
          description: "Master the five rules that make tests truly clean: Fast, Independent, Repeatable, Self-Validating, and Timely.",
          order: 2,
          duration: 25,
          parts: [
            {
              title: "Fast, Independent, Repeatable",
              content: "Clean tests follow the **F.I.R.S.T.** acronym:\n\n**Fast:** Tests should run quickly. When tests run slow, you won't want to run them frequently. You won't find problems early. You won't feel free to clean up your code.\n\n```javascript\n// BAD: Slow test that hits external service\ntest('user exists', async () => {\n  const user = await fetch('https://api.example.com/users/1'); // Slow!\n  expect(user).toBeDefined();\n});\n\n// CLEAN: Fast test using mock\ntest('user exists', () => {\n  const userRepo = new MockUserRepository([{ id: 1, name: 'Alice' }]);\n  const user = userRepo.findById(1);\n  expect(user).toBeDefined();\n});\n```\n\n**Independent:** Tests should not depend on each other. One test should not set up conditions for the next test. You should be able to run each test independently and in any order.\n\n**Repeatable:** Tests should be repeatable in any environment — your development machine, the CI server, the airplane without a network. If tests aren't repeatable, you'll always have an excuse for why they fail.",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "FIRST Principles",
                description: "Apply the FIRST principles.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Test B relies on data created by Test A, and Test C cleans up data from both. Which FIRST principle is violated?",
                  options: [
                    "A) Fast",
                    "B) Independent",
                    "C) Repeatable",
                    "D) Self-Validating"
                  ],
                  correctAnswer: "B) Independent",
                  explanation: "Tests should not depend on each other. If Test A fails, Test B will also fail not because of its own logic, but because of Test A's failure. Each test should set up its own data and clean up after itself."
                }
              }
            },
            {
              title: "Self-Validating and Timely",
              content: "**Self-Validating:** Tests should have a boolean output — pass or fail. You should not have to read through a log file to figure out whether tests passed. You should not have to manually compare two text files.\n\n```javascript\n// BAD: Not self-validating — requires human inspection\ntest('calculate totals', () => {\n  const result = calculateTotals(orders);\n  console.log('Totals:', result); // Developer has to read this and decide\n});\n\n// CLEAN: Self-validating — pass or fail\ntest('calculateTotals sums all order amounts', () => {\n  const orders = [{ amount: 100 }, { amount: 200 }, { amount: 50 }];\n  const result = calculateTotals(orders);\n  expect(result.total).toBe(350);\n});\n```\n\n**Timely:** Tests need to be written in a timely fashion. Unit tests should be written *just before* the production code that makes them pass. If you write tests after the production code, you may find the production code to be hard to test. You may decide that some production code is too hard to test. You may not design the production code to be testable.\n\nTests are not an afterthought. They are a first-class citizen of your codebase, deserving the same care and attention as production code.",
              order: 2,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Self-Validating Tests",
                description: "Explain what makes a test self-validating.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What does it mean for a test to be 'self-validating'?",
                  options: [
                    "A) The test validates its own source code for syntax errors",
                    "B) The test has a boolean output — it either passes or fails automatically without requiring manual inspection",
                    "C) The test checks that other tests have run correctly",
                    "D) The test validates the test framework is working"
                  ],
                  correctAnswer: "B) The test has a boolean output — it either passes or fails automatically without requiring manual inspection",
                  explanation: "Self-validating means the test determines pass/fail on its own. You should not have to read log files or manually compare outputs to determine if a test passed."
                }
              }
            },
            {
              title: "Test Code Quality Matters",
              content: "If you let your tests rot, then your code will rot too. Keep your tests clean.\n\nTest code must evolve with production code. When production APIs change, tests must change too. If the tests are dirty, they are a drag on development. The team starts to view them as a burden rather than a safety net. Eventually they delete the test suite.\n\nWithout tests:\n- You cannot ensure that changes to one part of the system don't break others.\n- You begin to fear making changes.\n- You stop cleaning your production code because you're afraid you'll break something.\n- Your production code begins to rot.\n\n```javascript\n// CLEAN: Tests as living documentation\ndescribe('ShoppingCart', () => {\n  test('starts with zero items', () => {\n    const cart = new ShoppingCart();\n    expect(cart.itemCount).toBe(0);\n  });\n\n  test('increases item count when product is added', () => {\n    const cart = new ShoppingCart();\n    cart.add(new Product('Widget', 9.99));\n    expect(cart.itemCount).toBe(1);\n  });\n\n  test('calculates total from all item prices', () => {\n    const cart = new ShoppingCart();\n    cart.add(new Product('Widget', 9.99));\n    cart.add(new Product('Gadget', 24.99));\n    expect(cart.total).toBeCloseTo(34.98);\n  });\n});\n```\n\nThese tests serve as documentation — they tell you exactly what ShoppingCart does. When they pass, you know the cart works. When one fails, you know exactly what broke.",
              order: 3,
              duration: 9,
              exercise: {
                type: "multiple-choice",
                title: "Test Code Importance",
                description: "Understand why test code quality matters.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "What happens when a team lets their test suite become dirty and hard to maintain?",
                  options: [
                    "A) Nothing — dirty tests still provide coverage",
                    "B) Tests become a burden, the team eventually deletes them, and production code starts to rot",
                    "C) The production code automatically gets cleaner",
                    "D) The CI pipeline runs faster"
                  ],
                  correctAnswer: "B) Tests become a burden, the team eventually deletes them, and production code starts to rot",
                  explanation: "Dirty tests are worse than no tests. They slow development, are hard to maintain, and eventually get deleted. Without tests, developers fear changes, stop refactoring, and the codebase deteriorates."
                }
              }
            },
            {
              title: "Test Names as Documentation",
              content: "Test names are one of the most underrated forms of documentation. A well-named test suite reads like a specification of the system's behavior.\n\n```javascript\n// BAD: Test names that describe implementation\ndescribe('UserService', () => {\n  test('test1', () => { ... });\n  test('returns object', () => { ... });\n  test('calls database', () => { ... });\n});\n\n// CLEAN: Test names that describe behavior\ndescribe('UserService', () => {\n  test('creates a user with a unique ID', () => { ... });\n  test('rejects registration when email already exists', () => { ... });\n  test('deactivates user and preserves their order history', () => { ... });\n  test('throws AuthenticationError when password is incorrect', () => { ... });\n  test('returns null when user is not found', () => { ... });\n});\n```\n\nWhen these tests are listed by a test runner, they read like a feature specification:\n\n```\nUserService\n  ✓ creates a user with a unique ID\n  ✓ rejects registration when email already exists\n  ✓ deactivates user and preserves their order history\n  ✗ throws AuthenticationError when password is incorrect\n  ✓ returns null when user is not found\n```\n\nThe failing test name immediately tells you what behavior is broken. You don't even need to read the test code to understand the problem.\n\n**Naming pattern:** `[action] [expected result] [condition]`\n- 'rejects registration when email already exists'\n- 'calculates overtime pay for hours exceeding 40'\n- 'sends notification email after successful order'",
              order: 4,
              duration: 7,
              exercise: {
                type: "multiple-choice",
                title: "Test Naming",
                description: "Write a clean test name.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "Which is the cleanest test name for: a test that verifies a shopping cart applies a 10% discount when the total exceeds $100?",
                  options: [
                    "A) testDiscount",
                    "B) test_cart_1",
                    "C) applies 10 percent discount when cart total exceeds 100 dollars",
                    "D) discountTest100"
                  ],
                  correctAnswer: "C) applies 10 percent discount when cart total exceeds 100 dollars",
                  explanation: "This name follows the pattern [action] [expected result] [condition], reading like a sentence that describes the behavior being tested. The other options are cryptic or non-descriptive."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        }
      ],
      endOfChapterQuiz: {
        title: "Unit Tests Quiz",
        description: "Test your knowledge of TDD and clean test principles.",
        duration: 20,
        passingScore: 70,
        slug: "clean-code-chapter-7-quiz",
        questions: [
          {
            type: "short-answer",
            question: "The three laws of TDD: 1) Don't write production code until you have a failing test. 2) Don't write more of a test than is sufficient to ___. 3) Don't write more production code than is sufficient to pass the test.",
            correctAnswer: "fail",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What does F.I.R.S.T. stand for in clean testing?",
            options: [
              "A) Fast, Integrated, Reliable, Simple, Thorough",
              "B) Fast, Independent, Repeatable, Self-Validating, Timely",
              "C) Focused, Isolated, Repeatable, Small, Testable",
              "D) Fast, Immutable, Readable, Stable, Trackable"
            ],
            correctAnswer: "B) Fast, Independent, Repeatable, Self-Validating, Timely",
            points: 10
          },
          {
            type: "true-false",
            question: "Test code can be sloppier than production code because it doesn't ship to customers.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Test code requires the same care as production code. Dirty tests become a liability and eventually get deleted, causing production code to rot."
          },
          {
            type: "multiple-choice",
            question: "What pattern structures a test into setup, execution, and verification phases?",
            options: [
              "A) Model-View-Controller",
              "B) Build-Operate-Check (Arrange-Act-Assert)",
              "C) Observer Pattern",
              "D) Factory Pattern"
            ],
            correctAnswer: "B) Build-Operate-Check (Arrange-Act-Assert)",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Why should each test function test only a single concept?",
            options: [
                "A) To reduce test file size",
                "B) So that when a test fails, the name tells you exactly which concept broke",
                "C) Because testing frameworks only support one assertion per test",
                "D) To make tests run faster"
              ],
            correctAnswer: "B) So that when a test fails, the name tells you exactly which concept broke",
              explanation: "Single-concept tests provide precise failure diagnostics. When a test fails, its name immediately identifies what broke.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What does it mean for tests to be 'repeatable'?",
            options: [
              "A) You should run them multiple times",
              "B) They should produce the same result in any environment",
              "C) They should repeat the same assertion",
              "D) They should test the same code path multiple times"
            ],
            correctAnswer: "B) They should produce the same result in any environment",
            points: 10
          },
          {
            type: "true-false",
            question: "According to TDD, unit tests should be written after the production code is complete.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "The 'T' in FIRST stands for Timely — tests should be written just BEFORE the production code, not after."
          },
          {
            type: "multiple-choice",
            question: "Why should tests be fast?",
            options: [
              "A) To reduce electricity costs",
              "B) So developers run them frequently and catch problems early",
              "C) Because fast tests have fewer bugs",
              "D) To reduce CI server load"
            ],
            correctAnswer: "B) So developers run them frequently and catch problems early",
            points: 10
          }
        ]
      }
    },
    // ========================================
    // CHAPTER 8: Classes
    // ========================================
    {
      title: "Classes",
      description: "Learn to organize classes for clarity and maintainability. Master the Single Responsibility Principle and understand cohesion in class design.",
      order: 8,
      lessons: [
        {
          title: "Class Organization and SRP",
          slug: "class-organization-srp",
          description: "Learn how to organize classes following clean conventions and the Single Responsibility Principle.",
          order: 1,
          duration: 30,
          parts: [
            {
              title: "Class Organization",
              content: "Following the standard convention, a class should begin with a list of variables. Public static constants come first, then private static variables, followed by private instance variables. There is seldom a good reason to have a public variable.\n\nPublic functions should follow the list of variables. Private utilities called by a public function come right after the public function itself. This follows the stepdown rule and helps the program read like a newspaper article.\n\n```javascript\n// CLEAN: Well-organized class\nclass Journal {\n  // Public static constants\n  static MAX_ENTRIES = 1000;\n\n  // Private instance variables\n  #entries = [];\n  #lastModified = null;\n\n  // Public methods\n  addEntry(text) {\n    this.#validateNotFull();\n    const entry = this.#createEntry(text);\n    this.#entries.push(entry);\n    this.#lastModified = new Date();\n    return entry;\n  }\n\n  getEntries() {\n    return [...this.#entries];\n  }\n\n  // Private helpers — right after the public methods that use them\n  #validateNotFull() {\n    if (this.#entries.length >= Journal.MAX_ENTRIES) {\n      throw new Error('Journal is full');\n    }\n  }\n\n  #createEntry(text) {\n    return { text, createdAt: new Date(), id: crypto.randomUUID() };\n  }\n}\n```\n\n**Encapsulation:** We want to keep variables and utility functions private, but we're not fanatic about it. Sometimes we need to make a variable or utility protected so a test can access it. Tests rule.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Class Organization",
                description: "Identify the correct order of elements in a class.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "What is the correct order of elements in a well-organized class?",
                  options: [
                    "A) Private variables, public methods, public constants, private methods",
                    "B) Public constants, private variables, public methods, private helper methods",
                    "C) Public methods, private methods, public constants, private variables",
                    "D) Constructors first, then everything else alphabetically"
                  ],
                  correctAnswer: "B) Public constants, private variables, public methods, private helper methods",
                  explanation: "The convention is: public static constants, private static variables, private instance variables, then public functions followed by their private helpers. This follows the newspaper metaphor."
                }
              }
            },
            {
              title: "The Single Responsibility Principle",
              content: "**The Single Responsibility Principle (SRP):** A class should have one, and only one, reason to change.\n\nSRP is one of the most important concepts in OO design, yet it's also one of the most abused. We regularly encounter classes that do far too much. Why? Getting software to work and making software clean are two very different activities. The problem is that too many of us think we are done once the program works.\n\n```javascript\n// BAD: This class has multiple reasons to change\nclass Employee {\n  constructor(name, hourlyRate) {\n    this.name = name;\n    this.hourlyRate = hourlyRate;\n  }\n\n  // Reason to change: pay calculation rules change\n  calculatePay(hoursWorked) {\n    return this.hourlyRate * hoursWorked;\n  }\n\n  // Reason to change: report format changes\n  generatePayReport(hoursWorked) {\n    const pay = this.calculatePay(hoursWorked);\n    return `Employee: ${this.name}\\nPay: $${pay.toFixed(2)}`;\n  }\n\n  // Reason to change: database schema changes\n  save() {\n    db.execute(`INSERT INTO employees VALUES ('${this.name}', ${this.hourlyRate})`);\n  }\n}\n\n// CLEAN: Each class has one reason to change\nclass Employee {\n  constructor(name, hourlyRate) {\n    this.name = name;\n    this.hourlyRate = hourlyRate;\n  }\n}\n\nclass PayCalculator {\n  calculate(employee, hoursWorked) {\n    return employee.hourlyRate * hoursWorked;\n  }\n}\n\nclass PayReportGenerator {\n  generate(employee, pay) {\n    return `Employee: ${employee.name}\\nPay: $${pay.toFixed(2)}`;\n  }\n}\n\nclass EmployeeRepository {\n  save(employee) {\n    db.execute('INSERT INTO employees VALUES (?, ?)', [employee.name, employee.hourlyRate]);\n  }\n}\n```\n\nEvery sizable system contains a large amount of logic and complexity. The primary goal in managing this complexity is to organize it so that a developer knows where to look to find things and need only understand the directly affected complexity at any given time.",
              order: 2,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Single Responsibility Principle",
                description: "Evaluate SRP compliance.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: A UserService class that handles user authentication, sends welcome emails, and generates usage reports follows the Single Responsibility Principle because all operations are 'user-related'.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "Having 'user' in all the operations doesn't make them a single responsibility. Authentication, email, and reporting are three separate concerns that change for different reasons. Each should be its own class."
                }
              }
            },
            {
              title: "Cohesion",
              content: "Classes should have a small number of instance variables. Each of the methods of a class should manipulate one or more of those variables. The more variables a method manipulates, the more cohesive that method is to its class. A class in which each variable is used by each method is maximally cohesive.\n\n```javascript\n// HIGH COHESION: Every method uses the instance variables\nclass Stack {\n  #items = [];\n\n  push(item) { this.#items.push(item); }\n  pop() { return this.#items.pop(); }\n  peek() { return this.#items[this.#items.length - 1]; }\n  isEmpty() { return this.#items.length === 0; }\n  size() { return this.#items.length; }\n}\n\n// LOW COHESION: Methods don't share instance variables\nclass UserUtils {\n  #emailRegex = /^[^@]+@[^@]+$/;\n  #passwordMinLength = 8;\n  #dateFormat = 'YYYY-MM-DD';\n\n  isValidEmail(email) { return this.#emailRegex.test(email); }\n  isStrongPassword(pwd) { return pwd.length >= this.#passwordMinLength; }\n  formatDate(date) { /* uses #dateFormat only */ }\n}\n```\n\nWhen cohesion is low, it means the class is trying to do too many things. **When classes lose cohesion, split them.** The act of breaking a large function into smaller functions often gives us the opportunity to split several smaller classes out as well.",
              order: 3,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Cohesion",
                description: "Explain what makes a class highly cohesive.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "What makes a class 'maximally cohesive'?",
                  options: [
                    "A) The class has the maximum number of methods possible",
                    "B) Each method uses every instance variable — all methods and variables are tightly related",
                    "C) The class inherits from multiple base classes",
                    "D) The class has no dependencies on other classes"
                  ],
                  correctAnswer: "B) Each method uses every instance variable — all methods and variables are tightly related",
                  explanation: "Maximum cohesion means every method manipulates every instance variable. All parts of the class form a single logical unit. When cohesion is low, the class should be split."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Organizing for Change",
          slug: "organizing-for-change",
          description: "Learn to structure classes so they are open for extension but closed for modification.",
          order: 2,
          duration: 25,
          parts: [
            {
              title: "Open-Closed Principle",
              content: "Classes should be open for extension but closed for modification. The **Open-Closed Principle (OCP)** is one of the key principles of clean class design.\n\n```javascript\n// BAD: Must modify this class to add new SQL types\nclass Sql {\n  generate(type, table, columns) {\n    switch (type) {\n      case 'CREATE':\n        return `CREATE TABLE ${table} (${columns.join(', ')})`;\n      case 'SELECT':\n        return `SELECT ${columns.join(', ')} FROM ${table}`;\n      case 'INSERT':\n        return `INSERT INTO ${table} (${columns.join(', ')}) VALUES (?)`;\n      // Must modify class to add UPDATE, DELETE, etc.\n    }\n  }\n}\n\n// CLEAN: Open for extension, closed for modification\nclass Sql {\n  constructor(table, columns) {\n    this.table = table;\n    this.columns = columns;\n  }\n}\n\nclass CreateSql extends Sql {\n  generate() {\n    return `CREATE TABLE ${this.table} (${this.columns.join(', ')})`;\n  }\n}\n\nclass SelectSql extends Sql {\n  generate() {\n    return `SELECT ${this.columns.join(', ')} FROM ${this.table}`;\n  }\n}\n\nclass InsertSql extends Sql {\n  generate() {\n    return `INSERT INTO ${this.table} (${this.columns.join(', ')}) VALUES (?)`;\n  }\n}\n// Adding UpdateSql doesn't modify any existing class!\n```\n\nIn an ideal system, we incorporate new features by extending the system, not by modifying existing code.",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Open-Closed Principle",
                description: "Apply the Open-Closed Principle.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "A NotificationService has a switch statement for 'email', 'sms', and 'push'. You need to add 'slack' notifications. What is the OCP approach?",
                  options: [
                    "A) Add a new case to the switch statement",
                    "B) Create a SlackNotifier class that extends a Notifier interface, no existing code changes",
                    "C) Add an if/else for Slack",
                    "D) Create a separate SlackService with duplicate code"
                  ],
                  correctAnswer: "B) Create a SlackNotifier class that extends a Notifier interface, no existing code changes",
                  explanation: "OCP says we extend the system without modifying existing code. A new SlackNotifier class can be added without touching the existing email, SMS, or push notification code."
                }
              }
            },
            {
              title: "Isolating from Change with DIP",
              content: "The **Dependency Inversion Principle (DIP)** says our classes should depend on abstractions, not on concrete details. A class that depends on concrete details is at risk when those details change.\n\n```javascript\n// BAD: Portfolio directly depends on concrete StockExchange API\nclass Portfolio {\n  #stockExchange = new NYSEStockExchange(); // Concrete dependency!\n\n  calculateValue() {\n    let total = 0;\n    for (const holding of this.holdings) {\n      total += this.#stockExchange.getPrice(holding.symbol) * holding.shares;\n    }\n    return total;\n  }\n}\n// Problem: Can't test without hitting the real NYSE API!\n\n// CLEAN: Depend on abstraction\nclass Portfolio {\n  #stockExchange;\n\n  constructor(stockExchange) {\n    this.#stockExchange = stockExchange; // Inject the dependency\n  }\n\n  calculateValue() {\n    let total = 0;\n    for (const holding of this.holdings) {\n      total += this.#stockExchange.getPrice(holding.symbol) * holding.shares;\n    }\n    return total;\n  }\n}\n\n// Now we can test with a mock:\ntest('portfolio value calculated from stock prices', () => {\n  const mockExchange = { getPrice: (symbol) => symbol === 'MSFT' ? 100 : 50 };\n  const portfolio = new Portfolio(mockExchange);\n  portfolio.addHolding('MSFT', 10);\n  expect(portfolio.calculateValue()).toBe(1000);\n});\n```\n\nBy minimizing coupling through dependency injection, our classes adhere to DIP. We depend on abstractions, not concrete implementations.",
              order: 2,
              duration: 9,
              exercise: {
                type: "fill-in-blanks",
                title: "Dependency Inversion",
                description: "Complete the DIP definition.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  text: "The Dependency Inversion Principle says our classes should depend on {{blank}}, not on concrete {{blank}}.",
                  blanks: ["abstractions", "details"]
                }
              }
            },
            {
              title: "Classes Should Be Small",
              content: "With functions, we measured size by counting physical lines. With classes, we use a different measure: **responsibilities**.\n\nThe name of a class should describe what responsibilities it fulfills. If we cannot derive a concise name for a class, it's likely too large. The more ambiguous the class name, the more likely it has too many responsibilities.\n\n**Warning signs of a class that is too large:**\n- The class name includes words like 'Manager', 'Processor', 'Super', or 'Handler'\n- You can't describe what the class does without using the word 'and'\n- The class has more than about 5-10 methods\n- Different subsets of methods use different subsets of instance variables\n\n```javascript\n// BAD: Too many responsibilities (name is a red flag)\nclass UserManager {\n  createUser() { ... }\n  deleteUser() { ... }\n  authenticateUser() { ... }\n  sendWelcomeEmail() { ... }\n  generateUserReport() { ... }\n  updateUserPreferences() { ... }\n  validateUserInput() { ... }\n  exportUsersToCSV() { ... }\n}\n\n// CLEAN: Focused, single-purpose classes\nclass UserRepository { create() {} delete() {} findById() {} }\nclass Authenticator { authenticate() {} }\nclass WelcomeMailer { send() {} }\nclass UserReporter { generate() {} export() {} }\n```\n\nWe want our systems composed of many small classes, not a few large ones. Each small class encapsulates a single responsibility, has a single reason to change, and collaborates with a few others to achieve the desired system behaviors.",
              order: 3,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Class Size",
                description: "Evaluate class size principles.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "True or False: A class with 20 methods is acceptable as long as all the methods relate to the same domain entity (e.g., all methods deal with 'User').",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "Relating to the same entity doesn't mean single responsibility. A User class handling creation, authentication, reporting, and email has multiple reasons to change. Break it into smaller classes each with one responsibility."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        }
      ],
      endOfChapterQuiz: {
        title: "Classes Quiz",
        description: "Test your knowledge of class organization and design principles.",
        duration: 20,
        passingScore: 70,
        slug: "clean-code-chapter-8-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "What does the Single Responsibility Principle state?",
            options: [
              "A) A class should have only one method",
              "B) A class should have one, and only one, reason to change",
              "C) A class should only be used by one other class",
              "D) A class should only have one instance variable"
            ],
            correctAnswer: "B) A class should have one, and only one, reason to change",
            points: 10
          },
          {
            type: "true-false",
            question: "A maximally cohesive class has every method using every instance variable.",
            options: ["true", "false"],
            correctAnswer: "true",
            points: 10,
            explanation: "Maximum cohesion means each method manipulates every instance variable — all parts of the class are tightly related."
          },
          {
            type: "multiple-choice",
            question: "What is a warning sign that a class is too large?",
            options: [
              "A) It has a constructor",
              "B) Its name includes words like 'Manager' or 'Processor'",
              "C) It uses private variables",
              "D) It implements an interface"
            ],
            correctAnswer: "B) Its name includes words like 'Manager' or 'Processor'",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "What design principle says classes should depend on abstractions rather than concrete details?",
            options: [
                "A) Single Responsibility Principle",
                "B) Open-Closed Principle",
                "C) Liskov Substitution Principle",
                "D) Dependency Inversion Principle"
              ],
            correctAnswer: "D) Dependency Inversion Principle",
              explanation: "The Dependency Inversion Principle (DIP) states that high-level modules should not depend on low-level modules — both should depend on abstractions.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "How do we measure the size of a class?",
            options: [
              "A) Number of lines of code",
              "B) Number of methods",
              "C) Number of responsibilities",
              "D) Number of instance variables"
            ],
            correctAnswer: "C) Number of responsibilities",
            points: 10
          },
          {
            type: "short-answer",
            question: "The Open-Closed Principle says classes should be open for ___ but closed for ___. What fills the first blank?",
            correctAnswer: "extension",
            points: 10
          },
          {
            type: "true-false",
            question: "When cohesion is low in a class, you should add more instance variables to increase it.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Low cohesion means the class is trying to do too many things. The answer is to SPLIT the class into smaller, more focused classes."
          },
          {
            type: "multiple-choice",
            question: "Why does Dependency Injection help with testing?",
            options: [
              "A) It makes tests run faster",
              "B) It allows you to swap in mock/fake implementations for testing",
              "C) It automatically generates test cases",
              "D) It removes the need for test frameworks"
            ],
            correctAnswer: "B) It allows you to swap in mock/fake implementations for testing",
            points: 10
          }
        ]
      }
    },
    // ========================================
    // CHAPTER 9: Systems
    // ========================================
    {
      title: "Systems",
      description: "Learn how to separate construction from use, manage cross-cutting concerns, and build systems that can grow incrementally through clean architecture.",
      order: 9,
      lessons: [
        {
          title: "Separating Construction from Use",
          slug: "separating-construction-from-use",
          description: "Understand why object construction should be separated from business logic and how dependency injection enables clean systems.",
          order: 1,
          duration: 30,
          parts: [
            {
              title: "Separate Constructing from Using",
              content: "Software systems should separate the startup process — when application objects are constructed and dependencies are wired together — from the runtime logic that takes over after startup.\n\nConsider this: you wouldn't want the waiter at a restaurant to also be the one building the kitchen. Construction and use are very different concerns.\n\n```javascript\n// BAD: Construction mixed with business logic\nclass OrderService {\n  processOrder(orderData) {\n    // Construction mixed into business logic\n    const validator = new OrderValidator();\n    const pricer = new PricingEngine(new TaxCalculator('US'));\n    const repo = new OrderRepository(new MySQLConnection('prod-db'));\n    const notifier = new EmailNotifier(new SMTPClient('mail.server.com'));\n\n    // Business logic\n    validator.validate(orderData);\n    const order = pricer.price(orderData);\n    repo.save(order);\n    notifier.notify(order);\n  }\n}\n\n// CLEAN: Construction separated from use\nclass OrderService {\n  constructor(validator, pricer, repository, notifier) {\n    this.validator = validator;\n    this.pricer = pricer;\n    this.repository = repository;\n    this.notifier = notifier;\n  }\n\n  processOrder(orderData) {\n    this.validator.validate(orderData);\n    const order = this.pricer.price(orderData);\n    this.repository.save(order);\n    this.notifier.notify(order);\n  }\n}\n\n// Construction happens elsewhere — in main() or a factory\nfunction createOrderService() {\n  const validator = new OrderValidator();\n  const pricer = new PricingEngine(new TaxCalculator('US'));\n  const repo = new OrderRepository(new MySQLConnection('prod-db'));\n  const notifier = new EmailNotifier(new SMTPClient('mail.server.com'));\n  return new OrderService(validator, pricer, repo, notifier);\n}\n```\n\nOne way to separate construction from use is to move all aspects of construction to `main` or modules called by `main`. The main function builds the objects necessary for the system, then passes them to the application.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Separating Construction",
                description: "Identify the benefit of separating construction from use.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "What is the primary benefit of separating object construction from business logic?",
                  options: [
                    "A) It makes the code run faster",
                    "B) Business logic becomes testable and independent of specific implementations",
                    "C) It reduces the total number of classes",
                    "D) It eliminates the need for constructors"
                  ],
                  correctAnswer: "B) Business logic becomes testable and independent of specific implementations",
                  explanation: "When construction is separated, you can test business logic with mock implementations. The business code doesn't know or care how its dependencies were built — only that they fulfill the expected interface."
                }
              }
            },
            {
              title: "Scaling Up and Cross-Cutting Concerns",
              content: "Cities grow from small towns. They start with roads and basic services, then add highways, bridges, and utilities as they grow. Software should work the same way — start small and scale up.\n\n**Cross-cutting concerns** are aspects of a system that affect many parts: logging, security, transaction management, caching. They tend to cut across the natural object boundaries.\n\n```javascript\n// BAD: Cross-cutting concerns tangled with business logic\nclass AccountService {\n  transfer(fromId, toId, amount) {\n    logger.info(`Transfer started: ${fromId} -> ${toId}: $${amount}`);\n    if (!authService.isAuthorized(currentUser, 'transfer')) {\n      logger.warn(`Unauthorized transfer attempt by ${currentUser}`);\n      throw new UnauthorizedError();\n    }\n    try {\n      db.beginTransaction();\n      const from = accountRepo.find(fromId);\n      const to = accountRepo.find(toId);\n      from.debit(amount);\n      to.credit(amount);\n      accountRepo.save(from);\n      accountRepo.save(to);\n      db.commit();\n      logger.info(`Transfer completed successfully`);\n    } catch (error) {\n      db.rollback();\n      logger.error(`Transfer failed: ${error.message}`);\n      throw error;\n    }\n  }\n}\n\n// CLEAN: Business logic separated from cross-cutting concerns\nclass AccountService {\n  transfer(from, to, amount) {\n    from.debit(amount);\n    to.credit(amount);\n  }\n}\n// Logging, auth, and transactions handled by decorators/middleware/aspects\n```\n\nThe goal is to keep business logic clean and handle cross-cutting concerns through decorators, middleware, or aspect-oriented approaches.",
              order: 2,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Cross-Cutting Concerns",
                description: "Identify cross-cutting concerns.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Which of the following are all cross-cutting concerns that tend to tangle with business logic?",
                  options: [
                    "A) Logging, security/authentication, and transaction management",
                    "B) User registration, order processing, and payment",
                    "C) HTML rendering, CSS styling, and JavaScript events",
                    "D) Database schemas, API routes, and UI components"
                  ],
                  correctAnswer: "A) Logging, security/authentication, and transaction management",
                  explanation: "Cross-cutting concerns are aspects that affect many parts of the system and cut across natural object boundaries. Logging, security, and transactions are classic examples that should be separated from business logic."
                }
              }
            },
            {
              title: "Use Standards Wisely and Keep It Simple",
              content: "Standards make it easier to reuse ideas and components, recruit people with relevant experience, encapsulate good ideas, and wire components together. However, the process of creating standards can sometimes take too long, and some standards lose touch with the real needs of the adopters they are intended to serve.\n\n**Keep it simple.** A system should be only as complex as it needs to be right now. Don't build infrastructure for requirements you don't have yet.\n\n```javascript\n// BAD: Over-engineered for current needs\n// Building a full microservice architecture for a simple CRUD app\nclass UserEventBus { ... }\nclass UserEventHandler { ... }\nclass UserCommandDispatcher { ... }\nclass UserQueryHandler { ... }\nclass UserReadModel { ... }\nclass UserWriteModel { ... }\nclass UserSaga { ... }\n// All you needed was:\n\n// CLEAN: Appropriate complexity for current needs\nclass UserService {\n  async createUser(data) {\n    const user = new User(data);\n    return this.repository.save(user);\n  }\n\n  async getUser(id) {\n    return this.repository.findById(id);\n  }\n}\n```\n\n**Use the simplest thing that can possibly work.** An optimal system architecture consists of modularized domains of concern, each implemented with plain objects. The different domains are integrated with minimally invasive aspects or aspect-like tools. This architecture can be test-driven, just like the code.",
              order: 3,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "System Simplicity",
                description: "Evaluate architectural decisions.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: Building a full event-driven microservice architecture from day one for a new CRUD application follows clean code principles because it prepares for future growth.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "Clean Code advocates for appropriate complexity. Over-engineering for imaginary future needs adds unnecessary complexity. Start simple and evolve the architecture as real requirements emerge."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Clean Architecture in Practice",
          slug: "clean-architecture-in-practice",
          description: "Apply system-level clean code principles to build modular, testable, and maintainable architectures.",
          order: 2,
          duration: 25,
          parts: [
            {
              title: "Dependency Injection Patterns",
              content: "Dependency Injection (DI) is the primary mechanism for separating construction from use. There are three common forms:\n\n**Constructor Injection** — the most common and recommended:\n```javascript\nclass OrderProcessor {\n  constructor(paymentService, inventoryService, notifier) {\n    this.paymentService = paymentService;\n    this.inventoryService = inventoryService;\n    this.notifier = notifier;\n  }\n\n  async process(order) {\n    await this.inventoryService.reserve(order.items);\n    await this.paymentService.charge(order.total);\n    await this.notifier.sendConfirmation(order);\n  }\n}\n```\n\n**Factory Injection** — when you need to create objects at runtime:\n```javascript\nclass ReportGenerator {\n  constructor(reportFactory) {\n    this.reportFactory = reportFactory;\n  }\n\n  generate(data, format) {\n    const formatter = this.reportFactory.create(format);\n    return formatter.render(data);\n  }\n}\n\n// In tests:\nconst mockFactory = { create: () => new MockFormatter() };\nconst generator = new ReportGenerator(mockFactory);\n```\n\n**Composition Root** — wire everything together at the entry point:\n```javascript\n// main.js — the composition root\nfunction main() {\n  // Construct the object graph\n  const db = new PostgresDatabase(config.db);\n  const userRepo = new UserRepository(db);\n  const emailService = new SendGridEmailService(config.email);\n  const authService = new AuthService(userRepo);\n  const app = new Application(authService, userRepo, emailService);\n  \n  // Start the application\n  app.start();\n}\n```\n\nThe Composition Root is the only place that knows about concrete implementations. Everything else depends on abstractions.",
              order: 1,
              duration: 9,
              exercise: {
                type: "multiple-choice",
                title: "Dependency Injection",
                description: "Choose the correct DI approach.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Where should all concrete class instantiation happen in a clean architecture?",
                  options: [
                    "A) In each class that needs the dependency",
                    "B) In global singleton factories",
                    "C) At the composition root — the application's entry point",
                    "D) Spread across service locators in each module"
                  ],
                  correctAnswer: "C) At the composition root — the application's entry point",
                  explanation: "The composition root is the single place where the object graph is constructed. All other code depends on abstractions, not concrete implementations. This makes the system testable and flexible."
                }
              }
            },
            {
              title: "Incremental Growth: Start Simple",
              content: "Clean systems grow incrementally. The greatest risk in software is over-architecture — building for imaginary future requirements.\n\n```javascript\n// PHASE 1: Start with the simplest thing that works\n// Just a module with functions\nconst userStore = new Map();\n\nexport function createUser(data) {\n  const user = { id: generateId(), ...data };\n  userStore.set(user.id, user);\n  return user;\n}\n\nexport function getUser(id) {\n  return userStore.get(id) || null;\n}\n\n// PHASE 2: When you need persistence, extract an interface\nclass UserRepository {\n  constructor(store) {\n    this.store = store;\n  }\n  create(data) {\n    const user = { id: generateId(), ...data };\n    this.store.save(user);\n    return user;\n  }\n  findById(id) {\n    return this.store.findById(id);\n  }\n}\n\n// PHASE 3: When you need multiple data sources, add adapters\nclass PostgresUserStore {\n  async save(user) { /* SQL insert */ }\n  async findById(id) { /* SQL select */ }\n}\n\nclass RedisUserCache {\n  async save(user) { /* Redis SET */ }\n  async findById(id) { /* Redis GET */ }\n}\n```\n\nAt each phase, you refactor to accommodate the new requirement. You don't build all three phases on day one. **YAGNI: You Ain't Gonna Need It.** The best architectures emerge from evolution, not from grand upfront design.",
              order: 2,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Incremental Architecture",
                description: "Evaluate an architectural decision.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: For a new project with 3 users, building a microservice architecture with message queues, API gateways, and distributed caching from day one is a responsible engineering decision because it 'prepares for scale'.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "This is over-architecture. Start with the simplest thing that works and evolve as real requirements emerge. Most systems never need microservices. The complexity cost of premature architecture far outweighs the cost of refactoring later."
                }
              }
            },
            {
              title: "Domain-Driven Design Basics",
              content: "Clean systems organize code around the problem domain, not around technical concerns. This is the core idea of Domain-Driven Design (DDD).\n\n```javascript\n// BAD: Organized by technical layer\nsrc/\n  controllers/\n    userController.js\n    orderController.js\n    productController.js\n  services/\n    userService.js\n    orderService.js\n    productService.js\n  repositories/\n    userRepository.js\n    orderRepository.js\n    productRepository.js\n\n// CLEAN: Organized by domain\nsrc/\n  users/\n    User.js\n    UserRepository.js\n    UserService.js\n    UserController.js\n  orders/\n    Order.js\n    OrderRepository.js\n    OrderService.js\n    OrderController.js\n  products/\n    Product.js\n    ProductRepository.js\n    ProductService.js\n```\n\nWhen organized by domain, adding a new feature (say, 'reviews') means adding a new folder — not touching every existing folder. This aligns with the Open-Closed Principle at the system level.\n\n**Use the language of the domain** in your code. If business users talk about 'underwriting decisions', your code should have an `UnderwritingDecision` class — not a `ProcessResult` or `DataObject`. This is called the **Ubiquitous Language** in DDD.",
              order: 3,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Domain Organization",
                description: "Explain domain-driven code organization.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Why is organizing code by domain (users/, orders/, products/) better than by technical layer (controllers/, services/, repositories/)?",
                  options: [
                    "A) It reduces the total number of files in the project",
                    "B) Related code stays together — adding a new feature means adding a new folder instead of modifying every layer folder",
                    "C) It makes the code run faster at runtime",
                    "D) It is required by all modern frameworks"
                  ],
                  correctAnswer: "B) Related code stays together — adding a new feature means adding a new folder instead of modifying every layer folder",
                  explanation: "Domain organization keeps related code together, making features easier to find, understand, and modify. Adding a new feature is additive (new folder) rather than invasive (touching every existing folder)."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        }
      ],
      endOfChapterQuiz: {
        title: "Systems Quiz",
        description: "Test your understanding of system-level clean code principles.",
        duration: 20,
        passingScore: 70,
        slug: "clean-code-chapter-9-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "Why should construction be separated from use?",
            options: [
              "A) To reduce the number of import statements",
              "B) To make business logic independent of specific implementations and easier to test",
              "C) To make the code compile faster",
              "D) Because constructors are bad practice"
            ],
            correctAnswer: "B) To make business logic independent of specific implementations and easier to test",
            points: 10
          },
          {
            type: "true-false",
            question: "Cross-cutting concerns like logging and security should be mixed into business logic for efficiency.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Cross-cutting concerns should be separated from business logic using decorators, middleware, or aspect-oriented approaches."
          },
          {
            type: "multiple-choice",
            question: "What is the clean code philosophy about system complexity?",
            options: [
                "A) Plan for every possible future requirement upfront",
                "B) Use the simplest thing that can possibly work — only as complex as current needs require",
                "C) Always use the most advanced design patterns available",
                "D) Complexity is acceptable if it improves performance"
              ],
            correctAnswer: "B) Use the simplest thing that can possibly work — only as complex as current needs require",
              explanation: "Clean Code advocates for simplicity. Systems should only be as complex as their current requirements demand, not speculative future needs.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "How should a system grow according to Clean Code?",
            options: [
              "A) Plan the entire architecture upfront before writing any code",
              "B) Start simple and grow incrementally as real requirements emerge",
              "C) Always build for the maximum possible scale from day one",
              "D) Rewrite from scratch every 6 months"
            ],
            correctAnswer: "B) Start simple and grow incrementally as real requirements emerge",
            points: 10
          },
          {
            type: "short-answer",
            question: "Software systems should separate the ___ process from the runtime logic.",
            correctAnswer: "startup",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Which is an example of a cross-cutting concern?",
            options: [
              "A) Calculating order totals",
              "B) Transaction management that spans multiple operations",
              "C) Validating user input fields",
              "D) Sorting a list of products"
            ],
            correctAnswer: "B) Transaction management that spans multiple operations",
            points: 10
          },
          {
            type: "true-false",
            question: "Standards are always beneficial and should be adopted as early as possible in a project.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Standards can be helpful but sometimes become bureaucratic or lose touch with real needs. Use standards wisely."
          },
          {
            type: "multiple-choice",
            question: "What pattern does Clean Code recommend for wiring dependencies?",
            options: [
              "A) Global singletons",
              "B) Dependency Injection",
              "C) Service locator with static methods",
              "D) Hard-coded constructors in each class"
            ],
            correctAnswer: "B) Dependency Injection",
            points: 10
          }
        ]
      }
    },
    // ========================================
    // CHAPTER 10: Emergence & Code Smells
    // ========================================
    {
      title: "Emergence & Code Smells",
      description: "Learn the four rules of simple design that help good designs emerge, and recognize the most common code smells that signal your code needs cleaning.",
      order: 10,
      lessons: [
        {
          title: "The Four Rules of Simple Design",
          slug: "four-rules-simple-design",
          description: "Master Kent Beck's four rules that guide the emergence of clean, well-designed systems.",
          order: 1,
          duration: 30,
          parts: [
            {
              title: "Getting Clean via Emergent Design",
              content: "Kent Beck's four rules of Simple Design help us create well-designed software. A design is 'simple' if it follows these rules (in order of importance):\n\n1. **Runs all the tests**\n2. **Contains no duplication**\n3. **Expresses the intent of the programmer**\n4. **Minimizes the number of classes and methods**\n\n**Rule 1 — Runs all the tests:** A system that cannot be verified through tests is a system that should never be deployed. Making our systems testable pushes us toward designs where classes are small, single-purpose, and follow SRP. Tight coupling makes it hard to write tests, so testability drives us toward better design.\n\n```javascript\n// A testable design is inherently a clean design\n// Because to test this, you need small, focused, injectable classes\n\ntest('order total includes tax and shipping', () => {\n  const taxCalc = new FlatTaxCalculator(0.08);\n  const shipCalc = new FreeAboveThresholdShipping(100, 9.99);\n  const pricer = new OrderPricer(taxCalc, shipCalc);\n\n  const total = pricer.calculate([{ price: 50, qty: 2 }]);\n\n  expect(total.subtotal).toBe(100);\n  expect(total.tax).toBe(8);\n  expect(total.shipping).toBe(0); // Free shipping above $100\n  expect(total.total).toBe(108);\n});\n```\n\nThe fact that we have tests eliminates the fear of cleaning up the code. With tests, we have no fear of making changes. Without tests, every change is a possible bug.",
              order: 1,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Rules of Simple Design",
                description: "Prioritize the rules of simple design.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "According to Kent Beck's rules, which is MOST important for simple design?",
                  options: [
                    "A) Minimize the number of classes",
                    "B) Express the intent of the programmer",
                    "C) Run all the tests",
                    "D) Contain no duplication"
                  ],
                  correctAnswer: "C) Run all the tests",
                  explanation: "The rules are ordered by importance. 'Runs all the tests' comes first because a system that can't be verified should never be deployed. Testability also drives us toward better design naturally."
                }
              }
            },
            {
              title: "No Duplication and Expressiveness",
              content: "**Rule 2 — No Duplication:** Duplication is the primary enemy of a well-designed system. It represents additional work, additional risk, and additional unnecessary complexity.\n\n```javascript\n// BAD: Subtle duplication in two methods\nfunction scaleToOneDimension(desiredDimension, imageDimension) {\n  if (Math.abs(desiredDimension - imageDimension) < errorThreshold) return;\n  const scalingFactor = desiredDimension / imageDimension;\n  scalingFactor = Math.floor(scalingFactor * 100) / 100;\n  const newImage = ImageUtilities.getScaledImage(image, scalingFactor);\n  image.dispose();\n  image = newImage;\n}\n\nfunction rotate(degrees) {\n  const newImage = ImageUtilities.getRotatedImage(image, degrees);\n  image.dispose();\n  image = newImage;\n}\n\n// CLEAN: Extract the common pattern\nfunction scaleToOneDimension(desiredDimension, imageDimension) {\n  if (Math.abs(desiredDimension - imageDimension) < errorThreshold) return;\n  const scalingFactor = Math.floor((desiredDimension / imageDimension) * 100) / 100;\n  replaceImage(ImageUtilities.getScaledImage(image, scalingFactor));\n}\n\nfunction rotate(degrees) {\n  replaceImage(ImageUtilities.getRotatedImage(image, degrees));\n}\n\nfunction replaceImage(newImage) {\n  image.dispose();\n  image = newImage;\n}\n```\n\n**Rule 3 — Expressiveness:** The majority of the cost of a software project is in long-term maintenance. Code should clearly express the intent of its author. The clearer the author's intent, the less time others will need to understand it.\n\nChoose good names. Keep functions and classes small. Use standard nomenclature (design patterns). Well-written tests act as documentation by example.",
              order: 2,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Duplication",
                description: "Evaluate a duplication scenario.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: Two functions that have different names but contain the same three lines for disposing an old image and replacing it with a new one are not really duplicated because they serve different purposes (scaling vs rotating).",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "The image replacement logic is duplicated regardless of the calling context. The common pattern (dispose old, assign new) should be extracted into a shared function like `replaceImage()`. Duplication is about the code, not the business purpose."
                }
              }
            },
            {
              title: "Minimal Classes and Methods",
              content: "**Rule 4 — Minimal Classes and Methods:** Even concepts as fundamental as eliminating duplication, code expressiveness, and SRP can be taken too far. In an effort to make our classes and methods small, we might create too many tiny classes and methods.\n\nThis rule suggests we keep our overall function and class count low. High class and method counts are sometimes the result of pointless dogmatism. This rule has the lowest priority of the four, meaning it should not override the others.\n\n```javascript\n// BAD: Over-extracted — too many tiny classes\nclass StringValidator {\n  validate(s) { return s !== null; }\n}\nclass StringLengthChecker {\n  check(s) { return s.length > 0; }\n}\nclass StringTrimmer {\n  trim(s) { return s.trim(); }\n}\nclass NonEmptyStringValidator {\n  constructor() {\n    this.validator = new StringValidator();\n    this.checker = new StringLengthChecker();\n    this.trimmer = new StringTrimmer();\n  }\n  validate(s) {\n    return this.validator.validate(s) && this.checker.check(this.trimmer.trim(s));\n  }\n}\n\n// CLEAN: Pragmatic simplicity\nfunction isNonEmptyString(s) {\n  return s !== null && s.trim().length > 0;\n}\n```\n\nThe goal is pragmatic balance. Follow SRP and eliminate duplication, but don't create an explosion of tiny classes that makes the system harder to understand. Use your judgment.",
              order: 3,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Pragmatic Design",
                description: "Choose the pragmatic approach.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "A developer creates a separate class for every single validation rule, resulting in 47 validation classes for a simple form. What rule of simple design are they violating?",
                  options: [
                    "A) Runs all the tests",
                    "B) Contains no duplication",
                    "C) Expresses intent",
                    "D) Minimizes the number of classes and methods"
                  ],
                  correctAnswer: "D) Minimizes the number of classes and methods",
                  explanation: "While each class may be focused, 47 classes for simple form validation is pointless dogmatism. The fourth rule reminds us to keep overall counts manageable and avoid over-extraction."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        },
        {
          title: "Recognizing Code Smells",
          slug: "recognizing-code-smells",
          description: "Learn to identify the most common code smells that indicate your code needs refactoring.",
          order: 2,
          duration: 30,
          parts: [
            {
              title: "Comments and Environment Smells",
              content: "Code smells are surface indications of deeper problems. Learning to detect them is a crucial skill.\n\n**Comment Smells:**\n- **Inappropriate Information:** Comments holding information better held in source control, issue tracking, or other systems.\n- **Obsolete Comment:** A comment that has gotten old, irrelevant, or incorrect. Get rid of it.\n- **Redundant Comment:** A comment that describes something that adequately describes itself.\n- **Commented-Out Code:** Rotting code that nobody dares to delete. Source control remembers.\n\n```javascript\n// SMELL: Obsolete comment (function was refactored but comment wasn't)\n// Sorts users by last name, then first name\nfunction getUsers() {\n  return db.query('SELECT * FROM users ORDER BY created_at DESC');\n}\n\n// SMELL: Redundant comment\n// Returns the user's name\nfunction getUserName(user) {\n  return user.name;\n}\n```\n\n**Environment Smells:**\n- **Build Requires More Than One Step:** You should be able to check out the system with a single command and build it with a single command.\n- **Tests Require More Than One Step:** You should be able to run all unit tests with just one quick command.",
              order: 1,
              duration: 8,
              exercise: {
                type: "multiple-choice",
                title: "Identifying Smells",
                description: "Spot the code smell.",
                points: 10,
                difficulty: "beginner",
                content: {
                  question: "A project requires 6 manual steps to build: install dependencies, set env vars, run migrations, compile, link assets, then start. Which smell is this?",
                  options: [
                    "A) Redundant Comment",
                    "B) Build Requires More Than One Step",
                    "C) Dead Function",
                    "D) Feature Envy"
                  ],
                  correctAnswer: "B) Build Requires More Than One Step",
                  explanation: "Building should be a single command. Complex build processes discourage building, testing, and onboarding. Script the entire process into one command."
                }
              }
            },
            {
              title: "Function and General Smells",
              content: "**Function Smells:**\n- **Too Many Arguments:** More than three arguments is a smell. Wrap them in objects.\n- **Output Arguments:** Arguments used for output are counterintuitive. If your function must change the state of something, have it change the state of the object it belongs to.\n- **Flag Arguments:** Boolean arguments loudly declare the function does more than one thing. Split it.\n- **Dead Function:** Methods that are never called should be deleted. Source control remembers.\n\n```javascript\n// SMELL: Flag argument — function does two things\nfunction createUser(userData, sendWelcomeEmail) {\n  const user = db.insert(userData);\n  if (sendWelcomeEmail) {  // Flag!\n    emailService.sendWelcome(user);\n  }\n  return user;\n}\n\n// CLEAN: Two focused functions\nfunction createUser(userData) {\n  return db.insert(userData);\n}\n\nfunction createUserAndNotify(userData) {\n  const user = createUser(userData);\n  emailService.sendWelcome(user);\n  return user;\n}\n```\n\n**General Smells:**\n- **Duplication:** Every time you see duplication in code, it represents a missed opportunity for abstraction.\n- **Code at Wrong Level of Abstraction:** High-level concepts in the base class; low-level details in derivatives.\n- **Feature Envy:** A method that uses more features of another class than its own.\n- **Selector Arguments:** Using an argument to select behavior is lazy. Use polymorphism instead.",
              order: 2,
              duration: 10,
              exercise: {
                type: "multiple-choice",
                title: "Function Smells",
                description: "Identify a function smell.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "True or False: A function `render(page, isTestMode)` that takes a boolean flag to change its rendering behavior is clean code because it keeps related logic together.",
                  options: ["True", "False"],
                  correctAnswer: "False",
                  explanation: "Boolean flag arguments are a smell — they loudly declare the function does more than one thing. Split into `renderPage(page)` and `renderTestPage(page)`, or better yet, use polymorphism."
                }
              }
            },
            {
              title: "Naming and Testing Smells",
              content: "**Naming Smells:**\n- **Choose Descriptive Names:** Names should describe side effects. A function that does more than its name says is deceptive.\n- **Names Should Describe Side Effects:** `getOos` doesn't tell you it creates the object if it doesn't exist. `createOrReturnOos` is more honest.\n- **Use Standard Nomenclature:** If you use a design pattern, include the pattern name: `AccountDecorator`, `OrderFactory`.\n- **Names at Appropriate Abstraction Level:** Don't pick names that communicate implementation; choose names that reflect the level of abstraction.\n\n```javascript\n// SMELL: Name hides side effect\nfunction getUser(id) {\n  let user = cache.get(id);\n  if (!user) {\n    user = db.find(id);\n    cache.set(id, user);  // Side effect not in the name!\n    analytics.track('user-lookup');  // Another hidden side effect!\n  }\n  return user;\n}\n\n// CLEAN: Name reveals behavior\nfunction findUserWithCaching(id) {\n  let user = cache.get(id);\n  if (!user) {\n    user = db.find(id);\n    cache.set(id, user);\n  }\n  return user;\n}\n```\n\n**Testing Smells:**\n- **Insufficient Tests:** A test suite should test everything that could possibly break.\n- **Skipping Trivial Tests:** They are easy to write and their documentary value is higher than the cost to produce them.\n- **An Ignored Test Is a Question About Ambiguity:** If requirements are unclear, express your question as a test that is commented out or marked with `@Ignore`.\n- **Test Boundary Conditions:** Pay special attention to boundary conditions. We often get the middle right but fumble at the edges.\n- **Don't Skip Tests That Are Inconvenient:** They expose real weaknesses in your code.",
              order: 3,
              duration: 7,
              exercise: {
                type: "multiple-choice",
                title: "Code Smell Recognition",
                description: "Name the code smell.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "A method in class A accesses five properties of class B and only one of its own. What code smell is this?",
                  options: [
                    "A) God Class",
                    "B) Feature Envy",
                    "C) Shotgun Surgery",
                    "D) Dead Code"
                  ],
                  correctAnswer: "B) Feature Envy",
                  explanation: "Feature Envy occurs when a method is more interested in another class than its own. This method probably belongs in class B since it uses more of B's data."
                }
              }
            },
            {
              title: "Refactoring in Practice",
              content: "Knowing the smells is not enough — you need to practice refactoring. Here is a complete before/after example:\n\n```javascript\n// BEFORE: Multiple smells\nclass Utils {\n  // Smell: Vague class name, low cohesion\n  static proc(data, type, flag) {\n    // Smell: Cryptic function name, flag argument, too many args\n    let res = null;\n    // Smell: Dead code below\n    // let oldRes = data.map(x => x * 2);\n    if (type === 'sum') {\n      res = 0;\n      for (let i = 0; i < data.length; i++) {\n        res += data[i]; // Smell: Using index when forEach would be clearer\n      }\n    } else if (type === 'avg') {\n      res = 0;\n      for (let i = 0; i < data.length; i++) {\n        res += data[i]; // Smell: Duplication of the summing loop\n      }\n      res = res / data.length;\n    }\n    if (flag) console.log(res); // Smell: Side effect via flag\n    return res;\n  }\n}\n\n// AFTER: Clean, focused, expressive\nfunction sum(numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\n\nfunction average(numbers) {\n  if (numbers.length === 0) return 0;\n  return sum(numbers) / numbers.length;\n}\n```\n\nSmells identified and fixed:\n1. Vague class name -> focused standalone functions\n2. Cryptic name `proc` -> descriptive `sum` and `average`\n3. Flag argument removed -> logging handled elsewhere\n4. Dead commented-out code removed\n5. Duplication eliminated -> `average` reuses `sum`\n6. Selector argument (type) replaced with separate functions\n7. Added boundary condition handling (empty array)",
              order: 4,
              duration: 5,
              exercise: {
                type: "multiple-choice",
                title: "Refactoring Exercise",
                description: "Count the smells in a code sample.",
                points: 10,
                difficulty: "intermediate",
                content: {
                  question: "Given: `function handle(data, log, format, notify) { if(log) console.log(data); if(format) data = JSON.stringify(data); if(notify) sendEmail(data); return data; }` — How many distinct code smells are present?",
                  options: [
                    "A) 1 — just too many arguments",
                    "B) 2 — too many arguments and flag arguments",
                    "C) 3 — too many arguments, flag arguments, and the function does multiple things",
                    "D) 4 — too many arguments, flag arguments, multiple responsibilities, and side effects"
                  ],
                  correctAnswer: "D) 4 — too many arguments, flag arguments, multiple responsibilities, and side effects",
                  explanation: "The function has: (1) too many arguments, (2) three boolean flag arguments, (3) does at least three unrelated things (logging, formatting, notifying), and (4) has side effects (console.log, sendEmail) mixed with a return value."
                }
              }
            }
          ],
          endOfChapterQuiz: null
        }
      ],
      endOfChapterQuiz: {
        title: "Emergence & Code Smells Quiz",
        description: "Test your knowledge of simple design rules and code smell recognition.",
        duration: 20,
        passingScore: 70,
        slug: "clean-code-chapter-10-quiz",
        questions: [
          {
            type: "multiple-choice",
            question: "What are Kent Beck's four rules of Simple Design, in order of importance?",
            options: [
              "A) No duplication, expressiveness, minimal classes, runs tests",
              "B) Runs all tests, no duplication, expresses intent, minimizes classes and methods",
              "C) Minimal classes, runs tests, no duplication, expressiveness",
              "D) Expresses intent, runs tests, minimal classes, no duplication"
            ],
            correctAnswer: "B) Runs all tests, no duplication, expresses intent, minimizes classes and methods",
            points: 10
          },
          {
            type: "true-false",
            question: "The rule 'minimize classes and methods' should override the other three rules of simple design when they conflict.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "It has the LOWEST priority. It should not override testing, duplication elimination, or expressiveness."
          },
          {
            type: "multiple-choice",
            question: "What is 'Feature Envy'?",
            options: [
              "A) A class that has too many features",
              "B) A method that uses more features of another class than its own",
              "C) When developers envy each other's code",
              "D) A class that inherits features it doesn't use"
            ],
            correctAnswer: "B) A method that uses more features of another class than its own",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Why are boolean flag arguments a code smell?",
            options: [
                "A) Booleans use more memory than other types",
                "B) They indicate the function does more than one thing — it has different behavior paths based on the flag",
                "C) They make the function name longer",
                "D) They are not supported in all languages"
              ],
            correctAnswer: "B) They indicate the function does more than one thing — it has different behavior paths based on the flag",
              explanation: "A boolean flag argument loudly proclaims that the function does two things: one when the flag is true and another when it is false.",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Dead functions (methods that are never called) should be:",
            options: [
              "A) Kept for potential future use",
              "B) Commented out for reference",
              "C) Deleted — source control remembers them",
              "D) Moved to a utility class"
            ],
            correctAnswer: "C) Deleted — source control remembers them",
            points: 10
          },
          {
            type: "true-false",
            question: "Trivial tests should be skipped because they don't provide enough value for the effort.",
            options: ["true", "false"],
            correctAnswer: "false",
            points: 10,
            explanation: "Trivial tests are easy to write and their documentary value is higher than the cost to produce them. Don't skip them."
          },
          {
            type: "short-answer",
            question: "Duplication is the primary ___ of a well-designed system.",
            correctAnswer: "enemy",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "Which testing smell is most dangerous?",
            options: [
              "A) Verbose test names",
              "B) Not testing boundary conditions",
              "C) Tests that run slowly",
              "D) Using real database in tests"
            ],
            correctAnswer: "B) Not testing boundary conditions",
            points: 10
          },
          {
            type: "multiple-choice",
            question: "A function named `getUser` that also creates the user if it doesn't exist has which smell?",
            options: [
              "A) Feature Envy",
              "B) Too Many Arguments",
              "C) Name doesn't describe side effects",
              "D) Dead Function"
            ],
            correctAnswer: "C) Name doesn't describe side effects",
            points: 10
          },
          {
            type: "true-false",
            question: "Having tests eliminates the fear of cleaning up code.",
            options: ["true", "false"],
            correctAnswer: "true",
            points: 10,
            explanation: "With a comprehensive test suite, you can refactor confidently knowing tests will catch regressions."
          }
        ]
      }
    }
  ],
  prerequisites: [
    "Basic programming knowledge in at least one language",
    "Familiarity with object-oriented programming concepts",
    "Some experience writing and maintaining code in a team setting"
  ],
  learningOutcomes: [
    "Write intention-revealing names for variables, functions, and classes",
    "Create small, focused functions that do one thing well",
    "Recognize and eliminate common code smells",
    "Apply the Single Responsibility Principle to class design",
    "Write clean error handling that doesn't obscure business logic",
    "Design testable systems using dependency injection",
    "Apply Kent Beck's four rules of simple design",
    "Refactor existing code using clean code techniques",
    "Write clean tests following the F.I.R.S.T. principles",
    "Separate construction from use in system architecture"
  ],
  estimatedDuration: 720,
  enrolledCount: 0,
  completionRate: 0,
  rating: {
    average: 4.8,
    count: 0
  },
  completionBadge: {
    name: "Clean Code Master",
    description: "Completed the Clean Code course",
    iconUrl: "/badges/clean-code.png"
  },
  endOfCourseExam: {
    title: "Clean Code Final Exam",
    description: "Comprehensive exam covering all chapters of Clean Code. Demonstrate your mastery of naming, functions, comments, formatting, objects, error handling, testing, classes, systems, and code smells.",
    duration: 90,
    passingScore: 80,
    slug: "clean-code-final-exam",
    questions: [
      {
        type: "multiple-choice",
        question: "A variable is named `d` with a comment `// elapsed time in days`. What is the clean code fix?",
        options: [
          "A) Add a longer comment explaining the variable",
          "B) Rename the variable to `elapsedTimeInDays`",
          "C) Create a constant `D = 'elapsed time in days'`",
          "D) Move the comment to a separate documentation file"
        ],
        correctAnswer: "B) Rename the variable to `elapsedTimeInDays`",
        points: 5,
        explanation: "The name should reveal intent, making the comment unnecessary."
      },
      {
        type: "multiple-choice",
        question: "Which is the most important of Kent Beck's four rules of Simple Design?",
        options: [
          "A) Contains no duplication",
          "B) Expresses the intent of the programmer",
          "C) Runs all the tests",
          "D) Minimizes the number of classes and methods"
        ],
        correctAnswer: "C) Runs all the tests",
        points: 5,
        explanation: "The rules are ordered by importance. A system that can't be verified should never be deployed."
      },
      {
        type: "true-false",
        question: "According to Clean Code, functions should have at most 20 lines and do only one thing.",
        options: ["true", "false"],
        correctAnswer: "true",
        points: 5,
        explanation: "Robert C. Martin advocates for very small functions that do exactly one thing."
      },
      {
        type: "multiple-choice",
        question: "What does the Law of Demeter prevent?",
        options: [
          "A) Classes from having too many methods",
          "B) Functions from having too many arguments",
          "C) Objects from reaching through other objects to access their internals (train wrecks)",
          "D) Tests from being too slow"
        ],
        correctAnswer: "C) Objects from reaching through other objects to access their internals (train wrecks)",
        points: 5
      },
      {
        type: "multiple-choice",
        question: "What pattern separates a test into three distinct phases?",
            options: [
            "A) Given-When-Then",
            "B) Arrange-Act-Assert",
            "C) Setup-Execute-Verify",
            "D) Red-Green-Refactor"
          ],
            correctAnswer: "B) Arrange-Act-Assert",
          explanation: "The Arrange-Act-Assert (also called Build-Operate-Check) pattern separates tests into three clear phases: setup, execution, and verification.",
        points: 5
      },
      {
        type: "multiple-choice",
        question: "Why should you avoid returning null?",
        options: [
          "A) Null uses too much memory",
          "B) It forces callers to add null checks everywhere, and one missed check causes a runtime error",
          "C) Null is deprecated in modern JavaScript",
          "D) It makes functions slower"
        ],
        correctAnswer: "B) It forces callers to add null checks everywhere, and one missed check causes a runtime error",
        points: 5
      },
      {
        type: "true-false",
        question: "Comments that explain WHY a decision was made are considered good comments in Clean Code.",
        options: ["true", "false"],
        correctAnswer: "true",
        points: 5,
        explanation: "Explanation of intent is listed as a type of good comment. The code shows WHAT; the comment explains WHY."
      },
      {
        type: "multiple-choice",
        question: "What does Command-Query Separation mean?",
        options: [
          "A) Commands and queries should be in separate files",
          "B) A function should either change state (command) or return a value (query), but not both",
          "C) Database reads and writes should use different connections",
          "D) Commands should always come before queries in code"
        ],
        correctAnswer: "B) A function should either change state (command) or return a value (query), but not both",
        points: 5
      },
      {
            type: "short-answer",
            question: "The SRP states that a class should have one, and only one, reason to ___.",
            correctAnswer: "change",
            points: 5
          },
      {
        type: "multiple-choice",
        question: "A class named `DataManager` that handles validation, persistence, caching, and logging violates which principle?",
        options: [
          "A) Open-Closed Principle",
          "B) Liskov Substitution Principle",
          "C) Single Responsibility Principle",
          "D) Interface Segregation Principle"
        ],
        correctAnswer: "C) Single Responsibility Principle",
        points: 5
      },
      {
        type: "true-false",
        question: "Test code can be sloppier than production code because it doesn't run in production.",
        options: ["true", "false"],
        correctAnswer: "false",
        points: 5,
        explanation: "Test code requires the same care as production code. Dirty tests become a liability and eventually get deleted."
      },
      {
        type: "multiple-choice",
        question: "What does F.I.R.S.T. stand for in testing?",
        options: [
          "A) Fast, Integrated, Reliable, Simple, Thorough",
          "B) Fast, Independent, Repeatable, Self-Validating, Timely",
          "C) Focused, Isolated, Readable, Small, Tested",
          "D) Functional, Integrated, Responsive, Stable, Tracked"
        ],
        correctAnswer: "B) Fast, Independent, Repeatable, Self-Validating, Timely",
        points: 5
      },
      {
        type: "multiple-choice",
        question: "According to the newspaper metaphor, how should a source file be organized?",
        options: [
          "A) Alphabetically by function name",
          "B) High-level concepts at the top, with increasing detail as you read down",
          "C) Private methods first, then public methods",
          "D) Tests at the top, implementation at the bottom"
        ],
        correctAnswer: "B) High-level concepts at the top, with increasing detail as you read down",
        points: 5
      },
      {
        type: "multiple-choice",
        question: "What is a 'train wreck' in the context of the Law of Demeter?",
            options: [
            "A) A function that modifies global state",
            "B) A chain of method calls like a.getB().getC().doSomething() that reaches through multiple objects",
            "C) A class with too many constructors",
            "D) A deeply nested if-else structure"
          ],
            correctAnswer: "B) A chain of method calls like a.getB().getC().doSomething() that reaches through multiple objects",
          explanation: "Train wrecks are chains of method calls that violate the Law of Demeter by reaching through objects to access their internals.",
        points: 5
      },
      {
        type: "multiple-choice",
        question: "What is the cleanest way to handle a function that takes 7 parameters?",
        options: [
          "A) Use default values for some parameters",
          "B) Split into 7 separate functions",
          "C) Group related parameters into an object",
          "D) Use global variables instead"
        ],
        correctAnswer: "C) Group related parameters into an object",
        points: 5
      },
      {
        type: "true-false",
        question: "Horizontal alignment of variable declarations (lining up the = signs) is recommended for readability.",
        options: ["true", "false"],
        correctAnswer: "false",
        points: 5,
        explanation: "Horizontal alignment draws attention to the wrong things and creates maintenance burden."
      },
      {
        type: "multiple-choice",
        question: "What code smell is present when a method in Class A accesses 5 properties of Class B but only 1 of its own?",
        options: [
          "A) God Class",
          "B) Dead Code",
          "C) Feature Envy",
          "D) Shotgun Surgery"
        ],
        correctAnswer: "C) Feature Envy",
        points: 5
      },
      {
        type: "multiple-choice",
        question: "Why should object construction be separated from business logic?",
        options: [
          "A) It's a Java-specific pattern",
          "B) It makes business logic testable and independent of specific implementations",
          "C) It reduces the number of files in the project",
          "D) It makes code run faster"
        ],
        correctAnswer: "B) It makes business logic testable and independent of specific implementations",
        points: 5
      },
      {
            type: "short-answer",
            question: "Duplication is the primary ___ of a well-designed system.",
            correctAnswer: "enemy",
            points: 5
          },
      {
        type: "multiple-choice",
        question: "Which approach does Clean Code recommend for handling switch statements that appear in multiple functions?",
        options: [
          "A) Replace with if/else chains",
          "B) Use polymorphism, burying the switch in an Abstract Factory",
          "C) Use lookup tables",
          "D) Accept them as necessary"
        ],
        correctAnswer: "B) Use polymorphism, burying the switch in an Abstract Factory",
        points: 5
      },
      {
        type: "true-false",
        question: "According to Clean Code, everything in a software system should be an object.",
        options: ["true", "false"],
        correctAnswer: "false",
        points: 5,
        explanation: "The idea that everything is an object is a myth. Sometimes data structures with procedural code are the better choice."
      },
      {
        type: "multiple-choice",
        question: "What makes a class 'maximally cohesive'?",
        options: [
          "A) It has the maximum number of methods",
          "B) Every method uses every instance variable",
          "C) It inherits from the maximum number of classes",
          "D) It has no dependencies on other classes"
        ],
        correctAnswer: "B) Every method uses every instance variable",
        points: 5
      },
      {
        type: "multiple-choice",
        question: "You see `// Check if employee is eligible for benefits` followed by `if ((e.flags & 0x2) && e.age > 65)`. What is the clean code fix?",
        options: [
          "A) Improve the comment to be more detailed",
          "B) Extract the condition into a method: `employee.isEligibleForBenefits()`",
          "C) Add more comments explaining each flag",
          "D) Create a constant for 0x2"
        ],
        correctAnswer: "B) Extract the condition into a method: `employee.isEligibleForBenefits()`",
        points: 5
      },
      {
        type: "multiple-choice",
        question: "What principle states that classes should be open for extension but closed for modification?",
            options: [
            "A) Single Responsibility Principle (SRP)",
            "B) Liskov Substitution Principle (LSP)",
            "C) Open-Closed Principle (OCP)",
            "D) Dependency Inversion Principle (DIP)"
          ],
            correctAnswer: "C) Open-Closed Principle (OCP)",
          explanation: "The Open-Closed Principle states that software entities should be open for extension but closed for modification, allowing new behavior without changing existing code.",
        points: 5
      },
      {
        type: "multiple-choice",
        question: "A function `render(page, isTestMode)` uses a boolean to change behavior. What clean code principle does this violate?",
        options: [
          "A) Single Responsibility Principle only",
          "B) The 'no flag arguments' guideline — the function does two things based on the flag",
          "C) Law of Demeter",
          "D) Dependency Inversion Principle"
        ],
        correctAnswer: "B) The 'no flag arguments' guideline — the function does two things based on the flag",
        points: 5
      }
    ]
  }
};
