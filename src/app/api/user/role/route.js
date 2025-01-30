import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { getAuth } from '@clerk/nextjs';

export async function GET() {
  try {
    const { userId } = getAuth();
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      return new Response(JSON.stringify({ role: 'USER' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ role: user.role }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user role' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 