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

// Helper function to check if user can take daily quiz
function canTakeDailyQuiz(lastQuizCompletion) {
  if (!lastQuizCompletion) return true;
  const lastQuizDate = new Date(lastQuizCompletion);
  const today = new Date();
  return lastQuizDate.getDate() !== today.getDate() ||
         lastQuizDate.getMonth() !== today.getMonth() ||
         lastQuizDate.getFullYear() !== today.getFullYear();
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
        lastQuizCompletion: 1,
        createdAt: 1,
        'progress.courses': 1
      })
      .lean()
      .exec();

    // Calculate completion percentage and add daily quiz status
    const usersWithDetails = users.map(user => {
      const courses = user.progress?.courses || [];
      const completionPercentage = courses.length > 0
        ? courses.reduce((sum, course) => sum + (course.completionPercentage || 0), 0) / courses.length
        : 0;

      return {
        ...user,
        completionPercentage,
        canTakeDailyQuiz: canTakeDailyQuiz(user.lastQuizCompletion),
        lastQuizCompletion: user.lastQuizCompletion
      };
    });

    return new Response(JSON.stringify({
      users: usersWithDetails,
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

export async function PATCH(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId || !await isAdmin(userId)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { targetUserId, action } = await req.json();
    if (!targetUserId || action !== 'resetDailyQuiz') {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();
    
    const user = await User.findById(targetUserId);
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Reset the last quiz completion time
    user.lastQuizCompletion = null;
    await user.save();

    return new Response(JSON.stringify({ 
      message: 'Daily quiz reset successfully',
      canTakeDailyQuiz: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error resetting daily quiz:', error);
    return new Response(JSON.stringify({ error: 'Failed to reset daily quiz' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 