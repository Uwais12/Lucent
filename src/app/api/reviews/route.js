import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/mongodb';
import Review from '@/models/Review';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get all visible reviews, sorted by newest first
    const reviews = await Review.find({ isVisible: true })
      .sort({ createdAt: -1 })
      .limit(50);
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const data = await request.json();
    const { rating, title, content, userName, userWorkplace, userRole } = data;
    
    // Log the incoming data for debugging
    console.log("Received review data:", { userId, rating, title, content, userName, userWorkplace, userRole });
    
    // Validate required fields
    if (!rating || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Ensure userName is present
    if (!userName) {
      return NextResponse.json(
        { error: 'userName is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectToDatabase();
    
    // Create new review
    const review = new Review({
      userId,
      userName,
      rating,
      title,
      content,
      userWorkplace: userWorkplace || '',
      userRole: userRole || 'Student'
    });
    
    // Save review
    await review.save();
    
    return NextResponse.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    // Provide more detailed error information
    const errorMessage = error.name === 'ValidationError' 
      ? `Validation error: ${Object.values(error.errors).map(e => e.message).join(', ')}`
      : 'Failed to create review';
    
    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 500 }
    );
  }
}