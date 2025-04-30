import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    // Get the authenticated user
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Get the user from the database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if user has a subscription
    if (!user.subscription?.subscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      );
    }
    
    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: user.subscription.customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
    });
    
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Manage subscription API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Endpoint to get subscription status
export async function GET(req) {
  try {
    // Get the authenticated user
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Get the user from the database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return subscription info
    return NextResponse.json({
      subscription: user.subscription || { tier: 'FREE', status: 'ACTIVE' }
    });
  } catch (error) {
    console.error('Get subscription API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 