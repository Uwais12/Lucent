import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import { ddiaCourse, designPatternsCourse, cleanCodeCourse, softwareArchitectureCourse } from "@/data/seedCourse";

const coursesToSeed = [
  { data: ddiaCourse, name: "DDIA" },
  { data: designPatternsCourse, name: "Design Patterns" },
  { data: cleanCodeCourse, name: "Clean Code" },
  { data: softwareArchitectureCourse, name: "Software Architecture" },
];

export async function POST() {
  try {
    await connectToDatabase();

    const results = {};

    for (const { data, name } of coursesToSeed) {
      const existing = await Course.findOne({ slug: data.slug });
      if (!existing) {
        const course = new Course(data);
        await course.save();
        results[name] = "seeded";
      } else {
        // Update existing course with latest data
        await Course.findOneAndUpdate({ slug: data.slug }, data, { overwrite: true });
        results[name] = "updated";
      }
    }

    return Response.json({
      message: "Successfully seeded/updated courses",
      results
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({ error: "Failed to seed database", details: error.message }, { status: 500 });
  }
}
