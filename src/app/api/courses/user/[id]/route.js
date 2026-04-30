import { connectToDatabase } from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';
import { getAuth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

async function authoriseOwnerOrAdmin(userId, courseId) {
  await connectToDatabase();
  const course = await Course.findById(courseId);
  if (!course) return { error: 'Course not found', status: 404 };
  const user = await User.findOne({ clerkId: userId }).lean();
  const isOwner = course.createdBy?.clerkId === userId;
  const isAdmin = user?.role === 'ADMIN';
  if (!isOwner && !isAdmin) {
    return { error: 'Forbidden', status: 403 };
  }
  return { course };
}

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const course = await Course.findById(params.id).lean();
    if (!course) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(course);
  } catch (error) {
    console.error('GET /api/courses/user/[id] error:', error);
    return Response.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const auth = await authoriseOwnerOrAdmin(userId, params.id);
    if (auth.error) return Response.json({ error: auth.error }, { status: auth.status });

    const payload = await req.json();
    const updatable = ['title', 'description', 'level', 'tags', 'book', 'chapters',
      'prerequisites', 'learningOutcomes', 'estimatedDuration', 'isPublished'];
    for (const key of updatable) {
      if (payload[key] !== undefined) auth.course[key] = payload[key];
    }
    await auth.course.save();
    return Response.json(auth.course);
  } catch (error) {
    console.error('PUT /api/courses/user/[id] error:', error);
    return Response.json({ error: error.message || 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const auth = await authoriseOwnerOrAdmin(userId, params.id);
    if (auth.error) return Response.json({ error: auth.error }, { status: auth.status });

    await Course.findByIdAndDelete(params.id);
    return Response.json({ message: 'Course deleted' });
  } catch (error) {
    console.error('DELETE /api/courses/user/[id] error:', error);
    return Response.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
