import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import { ddiaCourse } from "@/data/seedCourse";

export async function POST() {
  try {
    console.log("YOOO");

    await connectToDatabase();

    // Check if course already exists
    const existingCourse = await Course.findOne({ slug: ddiaCourse.slug });
    console.log("YOOO");

    if (!existingCourse) {
      const course = new Course(ddiaCourse);
      await course.save();
      console.log("SEDEDDDD DONE");
      return Response.json({ message: "Successfully seeded DDIA course" });
    } else {
      console.log("SEDEDDDD F");

      return Response.json({ message: "DDIA course already exists" });
    }
  } catch (error) {
    console.log("SEDEDDDD Fauked");

    console.error("Error seeding database:", error);
    return Response.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
