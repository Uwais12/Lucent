import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDatabase } from '@/utils/database';
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
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const data = await request.json();
    const { rating, title, content, userName, userWorkplace, userRole } = data;
    
    // Validate required fields
    if (!rating || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}