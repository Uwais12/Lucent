import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

async function getLessonData(slug) {
  try {
    await connectToDatabase();
    const course = await Course.findOne(
      { "chapters.lessons.slug": slug },
      { title: 1, slug: 1, chapters: 1 }
    ).lean();
    if (!course) return null;

    for (const chapter of course.chapters || []) {
      const lesson = chapter.lessons?.find((l) => l.slug === slug);
      if (lesson) {
        return { lesson, chapter, course };
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const data = await getLessonData(params.slug);
  if (!data) return { title: "Lesson" };

  const { lesson, course } = data;
  const title = `${lesson.title} - ${course.title}`;
  const description = `Interactive lesson on ${lesson.title} from the ${course.title} course. Includes exercises, quizzes, and hands-on practice.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://lucentapp.io/lesson/${params.slug}`,
    },
    openGraph: {
      title: `${title} | Lucent`,
      description,
      url: `https://lucentapp.io/lesson/${params.slug}`,
    },
    robots: { index: false }, // Lessons require auth, don't index
  };
}

export default async function LessonLayout({ children, params }) {
  const data = await getLessonData(params.slug);

  return (
    <>
      {data && (
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
                  name: data.course.title,
                  item: `https://lucentapp.io/course-details/${data.course.slug}`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: data.chapter.title,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: data.lesson.title,
                  item: `https://lucentapp.io/lesson/${params.slug}`,
                },
              ],
            }),
          }}
        />
      )}
      {children}
    </>
  );
}
