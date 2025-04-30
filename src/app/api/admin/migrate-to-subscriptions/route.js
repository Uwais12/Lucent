import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    // Check for admin permissions
    const { userId } = getAuth(req);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Verify the user is an admin
    const adminUser = await User.findOne({ clerkId: userId });
    
    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }
    
    // Parse the request body for options
    const body = await req.json();
    const { dryRun = true } = body;
    
    // Find all users that don't have subscription data yet
    const query = { 
      $or: [
        { subscription: { $exists: false } },
        { 'subscription.tier': { $exists: false } }
      ]
    };
    
    // Count users to migrate
    const userCount = await User.countDocuments(query);
    
    if (dryRun) {
      // Just return the count if it's a dry run
      return NextResponse.json({
        success: true,
        message: `Found ${userCount} users to migrate to free tier. This was a dry run, no changes were made.`,
        userCount
      });
    }
    
    // Perform the update
    const result = await User.updateMany(
      query,
      {
        $set: {
          'subscription.tier': 'FREE',
          'subscription.status': 'ACTIVE',
          'subscription.createdAt': new Date(),
          'subscription.updatedAt': new Date(),
        }
      }
    );
    
    return NextResponse.json({
      success: true,
      message: `Migrated ${result.modifiedCount} users to free tier.`,
      affectedUsers: result.modifiedCount
    });
    
  } catch (error) {
    console.error('Migration script error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 