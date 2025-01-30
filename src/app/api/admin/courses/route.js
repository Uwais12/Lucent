import { connectToDatabase } from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';
import { getAuth } from '@clerk/nextjs/server';

// Helper function to check if user is admin
async function isAdmin(userId) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    return user?.role === 'ADMIN';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId || !await isAdmin(userId)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();
    const courses = await Course.find({}).sort({ createdAt: -1 });
    
    return new Response(JSON.stringify(courses), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch courses' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId || !await isAdmin(userId)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const courseData = await req.json();
    await connectToDatabase();
    
    // Check if course with same slug exists
    const existingCourse = await Course.findOne({ slug: courseData.slug });
    if (existingCourse) {
      return new Response(JSON.stringify({ error: 'Course with this slug already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const course = new Course(courseData);
    await course.save();
    
    return new Response(JSON.stringify(course), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return new Response(JSON.stringify({ error: 'Failed to create course' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId || !await isAdmin(userId)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const courseData = await req.json();
    await connectToDatabase();
    
    // Check if another course has the same slug
    const existingCourse = await Course.findOne({ 
      slug: courseData.slug,
      _id: { $ne: courseData._id }
    });
    if (existingCourse) {
      return new Response(JSON.stringify({ error: 'Course with this slug already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const course = await Course.findByIdAndUpdate(
      courseData._id,
      courseData,
      { new: true, runValidators: true }
    );

    if (!course) {
      return new Response(JSON.stringify({ error: 'Course not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify(course), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return new Response(JSON.stringify({ error: 'Failed to update course' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 