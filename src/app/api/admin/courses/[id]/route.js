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

export async function DELETE(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId || !await isAdmin(userId)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();
    const course = await Course.findByIdAndDelete(params.id);
    
    if (!course) {
      return new Response(JSON.stringify({ error: 'Course not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ message: 'Course deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete course' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 