import { connectToDatabase } from '@/lib/mongodb';
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

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const search = url.searchParams.get('search') || '';
    const role = url.searchParams.get('role');
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';

    await connectToDatabase();

    // Build query
    const query = {};
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (role) {
      query.role = role.toUpperCase();
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Get total count for pagination
    const total = await User.countDocuments(query);

    // Get users with pagination
    const users = await User.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select({
        clerkId: 1,
        email: 1,
        role: 1,
        xp: 1,
        gems: 1,
        level: 1,
        dailyStreak: 1,
        lastActivity: 1,
        createdAt: 1,
        'progress.courses': 1 // Include courses array for completion calculation
      })
      .lean() // Convert to plain JavaScript objects
      .exec();

    // Calculate completion percentage manually to avoid virtual property issues
    const usersWithCompletion = users.map(user => {
      const courses = user.progress?.courses || [];
      const completionPercentage = courses.length > 0
        ? courses.reduce((sum, course) => sum + (course.completionPercentage || 0), 0) / courses.length
        : 0;

      return {
        ...user,
        completionPercentage
      };
    });

    return new Response(JSON.stringify({
      users: usersWithCompletion,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId || !await isAdmin(userId)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { targetUserId } = await req.json();
    if (!targetUserId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();
    
    // Don't allow deleting yourself
    const adminUser = await User.findOne({ clerkId: userId });
    if (adminUser._id.toString() === targetUserId) {
      return new Response(JSON.stringify({ error: 'Cannot delete your own account' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deletedUser = await User.findByIdAndDelete(targetUserId);
    if (!deletedUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'User deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 