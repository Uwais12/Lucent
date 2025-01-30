import { connectToDatabase } from "@/lib/mongodb";
import Course from "@/models/Course";
import { ddiaCourse } from "@/data/seedCourse";

export async function POST() {
  try {
    await connectToDatabase();
    
    // Check if course already exists
    const existingCourse = await Course.findOne({ slug: ddiaCourse.slug });
    
    if (!existingCourse) {
      const course = new Course(ddiaCourse);
      await course.save();
      return Response.json({ message: 'Successfully seeded DDIA course' });
    } else {
      return Response.json({ message: 'DDIA course already exists' });
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    return Response.json({ error: 'Failed to seed database' }, { status: 500 });
  }
} 