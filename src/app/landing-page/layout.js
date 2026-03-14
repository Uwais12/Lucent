export const metadata = {
  title: "Lucent - Interactive Software Engineering Courses",
  description:
    "Master system design, design patterns, clean code, and software architecture through bite-sized interactive lessons, quizzes, and hands-on exercises. Start learning for free.",
  keywords: [
    "learn software engineering",
    "system design course",
    "design patterns tutorial",
    "clean code course",
    "software architecture learning",
    "interactive coding lessons",
    "engineering book summaries",
    "DDIA course",
    "programming exercises",
    "free software engineering courses",
  ],
  alternates: {
    canonical: "https://lucentapp.io/landing-page",
  },
  openGraph: {
    title: "Lucent - Interactive Software Engineering Courses",
    description:
      "Master system design, design patterns, clean code, and software architecture through bite-sized interactive lessons. Start learning for free.",
    url: "https://lucentapp.io/landing-page",
  },
};

export default function LandingPageLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Lucent",
            url: "https://lucentapp.io",
            description:
              "Interactive software engineering learning platform with courses on system design, design patterns, clean code, and software architecture.",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://lucentapp.io/course-details/{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Lucent",
            url: "https://lucentapp.io",
            logo: "https://lucentapp.io/favicon.ico",
            sameAs: [],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "Course",
                position: 1,
                name: "Designing Data-Intensive Applications",
                description:
                  "Master distributed systems, data modeling, replication, partitioning, and more from the DDIA book.",
                provider: { "@type": "Organization", name: "Lucent" },
                url: "https://lucentapp.io/course-details/designing-data-intensive-applications",
                educationalLevel: "Advanced",
                isAccessibleForFree: true,
              },
              {
                "@type": "Course",
                position: 2,
                name: "Design Patterns",
                description:
                  "Learn creational, structural, and behavioral design patterns with interactive examples and exercises.",
                provider: { "@type": "Organization", name: "Lucent" },
                url: "https://lucentapp.io/course-details/design-patterns",
                educationalLevel: "Intermediate",
                isAccessibleForFree: true,
              },
              {
                "@type": "Course",
                position: 3,
                name: "Clean Code",
                description:
                  "Write readable, maintainable code. Learn naming, functions, error handling, and refactoring techniques.",
                provider: { "@type": "Organization", name: "Lucent" },
                url: "https://lucentapp.io/course-details/clean-code",
                educationalLevel: "Intermediate",
                isAccessibleForFree: true,
              },
              {
                "@type": "Course",
                position: 4,
                name: "Software Architecture",
                description:
                  "Learn architectural patterns, microservices, event-driven design, and scalability principles.",
                provider: { "@type": "Organization", name: "Lucent" },
                url: "https://lucentapp.io/course-details/software-architecture",
                educationalLevel: "Advanced",
                isAccessibleForFree: true,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Lucent?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lucent is an interactive learning platform that breaks down complex software engineering books into 15-minute bite-sized lessons with quizzes and hands-on exercises. It covers system design, design patterns, clean code, and software architecture.",
                },
              },
              {
                "@type": "Question",
                name: "Is Lucent free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Lucent offers a free tier that includes access to courses with daily limits on lessons and quizzes. Pro and Enterprise plans unlock unlimited access to all content.",
                },
              },
              {
                "@type": "Question",
                name: "What courses are available on Lucent?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lucent currently offers courses on Designing Data-Intensive Applications (system design), Design Patterns, Clean Code, and Fundamentals of Software Architecture. Each course includes multiple chapters with interactive lessons, exercises, and quizzes.",
                },
              },
              {
                "@type": "Question",
                name: "How does Lucent differ from other coding platforms?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lucent focuses specifically on advanced software engineering concepts from authoritative books, not basic programming. Lessons are designed to be completed in 15 minutes with interactive exercises including drag-and-drop, fill-in-the-blanks, multiple-choice, and code challenges.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need prior programming experience?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Lucent is designed for developers who already know how to code and want to deepen their understanding of software engineering principles. Basic programming knowledge and familiarity with object-oriented programming is recommended.",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
