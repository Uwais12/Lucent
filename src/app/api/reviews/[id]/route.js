import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/mongodb';
import Review from '@/models/Review';

// Get a single review
export async function GET(request, { params }) {
  try {
    const reviewId = params.id;
    
    await connectToDatabase();
    
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

// Update a review
export async function PUT(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const reviewId = params.id;
    const data = await request.json();
    
    await connectToDatabase();
    
    // Find the review
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Check if the user is the owner of the review
    if (review.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized - you can only edit your own reviews' },
        { status: 403 }
      );
    }
    
    // Update fields
    if (data.title) review.title = data.title;
    if (data.content) review.content = data.content;
    if (data.rating) review.rating = data.rating;
    if (data.userName) review.userName = data.userName;
    
    // Save the updated review
    await review.save();
    
    return NextResponse.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// Delete a review
export async function DELETE(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const reviewId = params.id;
    
    await connectToDatabase();
    
    // Find the review
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Check if the user is the owner of the review
    if (review.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized - you can only delete your own reviews' },
        { status: 403 }
      );
    }
    
    // Delete the review
    await Review.findByIdAndDelete(reviewId);
    
    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
} 