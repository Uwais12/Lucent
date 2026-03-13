import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";

export default async function sitemap() {
  const baseUrl = "https://lucentapp.io";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/landing-page`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Dynamic course pages
  let coursePages = [];
  try {
    await connectToDatabase();
    const courses = await Course.find({}, { slug: 1, updatedAt: 1 }).lean();
    coursePages = courses.map((course) => ({
      url: `${baseUrl}/course-details/${course.slug}`,
      lastModified: course.updatedAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating sitemap courses:", error);
  }

  return [...staticPages, ...coursePages];
}
