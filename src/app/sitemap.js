import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

export default async function sitemap() {
  const baseUrl = "https://lucentapp.io";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/landing-page`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  let coursePages = [];
  let lessonPages = [];
  try {
    await connectToDatabase();
    const courses = await Course.find({}, { slug: 1, updatedAt: 1, chapters: 1 }).lean();

    coursePages = courses.map((course) => ({
      url: `${baseUrl}/course-details/${course.slug}`,
      lastModified: course.updatedAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    // Include individual lesson pages
    for (const course of courses) {
      for (const chapter of course.chapters || []) {
        for (const lesson of chapter.lessons || []) {
          if (lesson.slug) {
            lessonPages.push({
              url: `${baseUrl}/lesson/${lesson.slug}`,
              lastModified: course.updatedAt || new Date(),
              changeFrequency: "monthly",
              priority: 0.6,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return [...staticPages, ...coursePages, ...lessonPages];
}
