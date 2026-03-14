import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

async function getCourseData(slug) {
  try {
    await connectToDatabase();
    return await Course.findOne(
      { slug },
      { title: 1, description: 1, slug: 1, chapters: 1, difficulty: 1, duration: 1, book: 1 }
    ).lean();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const course = await getCourseData(params.slug);
  if (!course) return { title: "Course Not Found" };

  const lessonCount =
    course.chapters?.reduce((sum, ch) => sum + (ch.lessons?.length || 0), 0) || 0;
  const chapterCount = course.chapters?.length || 0;

  const description = course.description
    ? `${course.description.slice(0, 120)} ${chapterCount} chapters, ${lessonCount} lessons with quizzes & exercises.`
    : `Learn ${course.title} through ${chapterCount} chapters and ${lessonCount} interactive lessons with quizzes and exercises.`;

  return {
    title: course.title,
    description,
    alternates: {
      canonical: `https://lucentapp.io/course-details/${course.slug}`,
    },
    openGraph: {
      title: `${course.title} - Interactive Course | Lucent`,
      description,
      url: `https://lucentapp.io/course-details/${course.slug}`,
      type: "website",
    },
  };
}

export default async function CourseDetailsLayout({ children, params }) {
  const course = await getCourseData(params.slug);

  const lessonCount =
    course?.chapters?.reduce((sum, ch) => sum + (ch.lessons?.length || 0), 0) || 0;

  return (
    <>
      {course && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Course",
                name: course.title,
                description: course.description || `Learn ${course.title} with interactive lessons and quizzes.`,
                provider: {
                  "@type": "Organization",
                  name: "Lucent",
                  url: "https://lucentapp.io",
                },
                url: `https://lucentapp.io/course-details/${course.slug}`,
                educationalLevel: course.difficulty || "Intermediate",
                isAccessibleForFree: true,
                numberOfCredits: course.chapters?.length || 0,
                hasCourseInstance: {
                  "@type": "CourseInstance",
                  courseMode: "online",
                  courseWorkload: course.duration || `${lessonCount} lessons`,
                },
                ...(course.book && {
                  citation: {
                    "@type": "Book",
                    name: course.book.title,
                    author: course.book.author,
                  },
                }),
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://lucentapp.io",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Courses",
                    item: "https://lucentapp.io/landing-page",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: course.title,
                    item: `https://lucentapp.io/course-details/${course.slug}`,
                  },
                ],
              }),
            }}
          />
        </>
      )}
      {children}
    </>
  );
}
