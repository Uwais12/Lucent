import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

// WARNING: THIS IS FOR DEVELOPMENT USE ONLY
// This endpoint should be removed or secured in production
export async function POST(req) {
  try {
    // Check if we're in development environment
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'This endpoint is only available in development mode' },
        { status: 403 }
      );
    }
    
    // Connect to the database
    await connectToDatabase();
    
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