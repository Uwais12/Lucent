'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import {
  Star,
  MessageSquare,
  ThumbsUp,
  User,
  Briefcase,
  Send,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function ReviewsPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    content: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect non-authenticated users
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in?redirect_url=/reviews');
    }
  }, [isLoaded, user, router]);
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    
    fetchUserData();
  }, [user]);
  
  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        // Call the real API endpoint
        const response = await fetch('/api/reviews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRatingChange = (rating) => {
    setReviewForm(prev => ({
      ...prev,
      rating
    }));
  };
  
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!reviewForm.title.trim() || !reviewForm.content.trim()) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all fields.'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send review data to API endpoint
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user.fullName,
          rating: reviewForm.rating,
          title: reviewForm.title,
          content: reviewForm.content,
          userRole: userData?.workplace?.position || 'User',
          userWorkplace: userData?.workplace?.company || '',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      
      const newReview = await response.json();
      
      // Add to reviews list (optimistic update)
      setReviews(prev => [newReview, ...prev]);
      
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your review has been submitted successfully!'
      });
      
      // Reset form
      setReviewForm({
        rating: 5,
        title: '',
        content: ''
      });
    } catch (err) {
      console.error('Error submitting review:', err);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Failed to submit your review. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Rating component
  const StarRating = ({ rating, onChange, interactive = false }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            onClick={interactive ? () => onChange(star) : undefined}
            className={`${interactive ? 'cursor-pointer' : ''} text-lg focus:outline-none`}
          >
            <Star
              className={`w-6 h-6 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
            />
          </button>
        ))}
      </div>
    );
  };
  
  // Review card component
  const ReviewCard = ({ review }) => {
    const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">{review.title}</h3>
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} />
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{review.content}</p>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
              <User className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{review.userName}</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {review.userRole}{review.userWorkplace ? ` at ${review.userWorkplace}` : ''}
              </div>
            </div>
          </div>
          
          <button className="flex items-center gap-1 text-gray-500 hover:text-violet-600 text-sm">
            <ThumbsUp className="w-4 h-4" />
            <span>{review.likes}</span>
          </button>
        </div>
      </div>
    );
  };
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 container mx-auto px-4">
          <div className="animate-pulse h-64 w-full max-w-3xl mx-auto bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-4">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">User Reviews</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Are Saying</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from people who are using Lucent to enhance their learning journey and build engineering expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Review Form */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Share Your Experience</h2>
                
                {formStatus.submitted && (
                  <div className={`mb-6 p-4 rounded-lg ${formStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {formStatus.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <p className={`font-medium ${formStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                        {formStatus.success ? 'Review Submitted' : 'Error'}
                      </p>
                    </div>
                    <p className={formStatus.success ? 'text-green-700 text-sm' : 'text-red-700 text-sm'}>
                      {formStatus.message}
                    </p>
                  </div>
                )}
                
                <form onSubmit={handleSubmitReview} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Rating
                    </label>
                    <StarRating 
                      rating={reviewForm.rating} 
                      onChange={handleRatingChange} 
                      interactive={true} 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Review Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={reviewForm.title}
                      onChange={handleReviewChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      placeholder="Summarize your experience"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Review
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      rows="5"
                      value={reviewForm.content}
                      onChange={handleReviewChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"
                      placeholder="Tell us about your experience with Lucent..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
            
            {/* Right Side: Reviews List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {isLoading ? (
                  // Loading state
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-44 bg-gray-100 rounded-lg mb-4"></div>
                    </div>
                  ))
                ) : error ? (
                  // Error state
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <AlertCircle className="w-5 h-5" />
                      <p className="font-medium">Error</p>
                    </div>
                    <p className="text-red-600">{error}</p>
                  </div>
                ) : reviews.length > 0 ? (
                  // Reviews list
                  reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  // No reviews
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 