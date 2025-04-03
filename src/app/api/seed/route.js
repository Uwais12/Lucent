import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import { ddiaCourse, designPatternsCourse } from "@/data/seedCourse";

export async function POST() {
  try {
    await connectToDatabase();

    // Seed DDIA course
    const existingDDIACourse = await Course.findOne({ slug: ddiaCourse.slug });
    if (!existingDDIACourse) {
      const course = new Course(ddiaCourse);
      await course.save();
      console.log("Successfully seeded DDIA course");
    } else {
      console.log("DDIA course already exists");
    }

    // Seed Design Patterns course
    const existingDesignPatternsCourse = await Course.findOne({ slug: designPatternsCourse.slug });
    if (!existingDesignPatternsCourse) {
      const course = new Course(designPatternsCourse);
      await course.save();
      console.log("Successfully seeded Design Patterns course");
    } else {
      console.log("Design Patterns course already exists");
    }

    return Response.json({ 
      message: "Successfully seeded courses",
      ddiaSeeded: !existingDDIACourse,
      designPatternsSeeded: !existingDesignPatternsCourse
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
