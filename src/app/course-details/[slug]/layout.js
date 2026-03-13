import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function generateMetadata({ params }) {
  try {
    await connectToDatabase();
    const course = await Course.findOne({ slug: params.slug }, {
      title: 1,
      description: 1,
      slug: 1,
      chapters: 1,
    }).lean();

    if (!course) {
      return { title: "Course Not Found" };
    }

    const lessonCount = course.chapters?.reduce(
      (sum, ch) => sum + (ch.lessons?.length || 0),
      0
    ) || 0;
    const chapterCount = course.chapters?.length || 0;

    const description = course.description
      ? `${course.description.slice(0, 140)}... ${chapterCount} chapters, ${lessonCount} lessons with quizzes & exercises.`
      : `Learn ${course.title} through ${chapterCount} chapters and ${lessonCount} interactive lessons with quizzes and exercises.`;

    return {
      title: course.title,
      description,
      alternates: {
        canonical: `https://lucentapp.io/course-details/${course.slug}`,
      },
      openGraph: {
        title: `${course.title} | Lucent`,
        description,
        url: `https://lucentapp.io/course-details/${course.slug}`,
        type: "website",
      },
    };
  } catch {
    return { title: "Course Details" };
  }
}

export default function CourseDetailsLayout({ children }) {
  return children;
}
