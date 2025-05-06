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
    displayName: '',
    isAnonymous: false
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    rating: 5,
    title: '',
    content: '',
    displayName: '',
    isAnonymous: false
  });
  const [isDeleting, setIsDeleting] = useState(false);
  
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
      
      console.log("Clerk user object:", {
        id: user.id,
        fullName: user.fullName,
        firstName: user.firstName,
        email: user.primaryEmailAddress?.emailAddress
      });
      
      try {
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        console.log("User profile data:", data);
        setUserData(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    
    if (user) {
    fetchUserData();
    }
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
    
    if (!reviewForm.isAnonymous && !reviewForm.displayName.trim()) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please enter a display name or select anonymous.'
      });
      return;
    }
    
    // Ensure we have the user and name available
    if (!user) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'User information not available. Please try again.'
      });
      return;
    }
    
    // Set the display name based on form input or Anonymous
    const displayName = reviewForm.isAnonymous ? 'Anonymous' : reviewForm.displayName.trim();
    console.log("Submitting review with userName:", displayName);
    
    setIsSubmitting(true);
    
    try {
      // Check if user data is available
      if (!userData) {
        throw new Error('User profile data is not available');
      }
      
      // Prepare review data
      const reviewData = {
        userName: displayName,
        rating: reviewForm.rating,
        title: reviewForm.title,
        content: reviewForm.content,
        userRole: userData?.workplace?.position || 'User',
        userWorkplace: userData?.workplace?.company || '',
      };
      
      // Log the data being sent
      console.log("Sending review data:", reviewData);
      
      // Send review data to API endpoint
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }
      
      const newReview = await response.json();
      
      // Add to reviews list (optimistic update)
      setReviews(prev => [
        {
          ...newReview,
          // Ensure a complete review object for display
          createdAt: newReview.createdAt || new Date().toISOString(),
          likes: newReview.likes || 0
        }, 
        ...prev
      ]);
      
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your review has been submitted successfully!'
      });
      
      // Reset form
      setReviewForm({
        rating: 5,
        title: '',
        content: '',
        displayName: '',
        isAnonymous: false
      });
      
      // Scroll to the top of reviews to see the new review
      setTimeout(() => {
        window.scrollTo({
          top: document.querySelector('.lg\\:col-span-2')?.offsetTop - 100 || 0,
          behavior: 'smooth'
      });
      }, 500);
    } catch (err) {
      console.error('Error submitting review:', err);
      setFormStatus({
        submitted: true,
        success: false,
        message: err.message || 'Failed to submit your review. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle edit button click
  const handleEditReview = (review) => {
    setEditingReviewId(review._id);
    setEditFormData({
      rating: review.rating,
      title: review.title,
      content: review.content,
      displayName: review.userName,
      isAnonymous: review.userName === 'Anonymous'
    });
  };

  // Handle edit form change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle edit rating change
  const handleEditRatingChange = (rating) => {
    setEditFormData(prev => ({
      ...prev,
      rating
    }));
  };

  // Handle anonymous toggle in edit mode
  const handleEditAnonymousToggle = () => {
    setEditFormData(prev => ({
      ...prev,
      isAnonymous: !prev.isAnonymous
    }));
  };

  // Handle save edited review
  const handleSaveReview = async (reviewId) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editFormData.title,
          content: editFormData.content,
          rating: editFormData.rating,
          userName: editFormData.isAnonymous ? 'Anonymous' : editFormData.displayName
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update review');
      }
      
      const updatedReview = await response.json();
      
      // Update the reviews list
      setReviews(prev => prev.map(r => r._id === reviewId ? updatedReview : r));
      
      // Exit edit mode
      setEditingReviewId(null);
      
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Review updated successfully!'
      });
    } catch (error) {
      console.error('Error updating review:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Failed to update review. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  // Handle delete review
  const handleDeleteReview = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }
    
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      
      // Remove the review from the list
      setReviews(prev => prev.filter(r => r._id !== reviewId));
      
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Review deleted successfully!'
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Failed to delete review. Please try again.'
      });
    } finally {
      setIsDeleting(false);
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
    
    const isOwner = user && review.userId === user.id;
    const isEditing = editingReviewId === review._id;
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        {isEditing ? (
          // Edit Form
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <StarRating 
                rating={editFormData.rating} 
                onChange={handleEditRatingChange}
                interactive={true} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Title
              </label>
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                name="content"
                rows="4"
                value={editFormData.content}
                onChange={handleEditFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="displayName"
                  value={editFormData.displayName}
                  onChange={handleEditFormChange}
                  disabled={editFormData.isAnonymous}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${editFormData.isAnonymous ? 'bg-gray-100' : ''}`}
                />
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <input
                    type="checkbox"
                    id={`anonymous-edit-${review._id}`}
                    checked={editFormData.isAnonymous}
                    onChange={handleEditAnonymousToggle}
                    className="rounded text-violet-600 focus:ring-violet-500"
                  />
                  <label htmlFor={`anonymous-edit-${review._id}`} className="text-sm text-gray-700">
                    Anonymous
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleSaveReview(review._id)}
                disabled={isSubmitting}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // Regular Review Display
          <>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">{review.title}</h3>
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} />
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
          </div>
              
              {isOwner && (
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleEditReview(review)}
                    className="p-1.5 text-gray-500 hover:text-violet-600 rounded-md hover:bg-gray-100"
                    title="Edit review"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                      <path d="m15 5 4 4"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDeleteReview(review._id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 rounded-md hover:bg-gray-100"
                    title="Delete review"
                    disabled={isDeleting}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      <line x1="10" x2="10" y1="11" y2="17"/>
                      <line x1="14" x2="14" y1="11" y2="17"/>
                    </svg>
                  </button>
                </div>
              )}
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
        </div>
          </>
        )}
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
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                      Display Name
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={reviewForm.displayName}
                        onChange={handleReviewChange}
                        disabled={reviewForm.isAnonymous}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 ${reviewForm.isAnonymous ? 'bg-gray-100' : ''}`}
                        placeholder="Your name for the review"
                      />
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={reviewForm.isAnonymous}
                          onChange={() => setReviewForm(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
                          className="rounded text-violet-600 focus:ring-violet-500"
                        />
                        <label htmlFor="anonymous" className="text-sm text-gray-700">
                          Anonymous
                        </label>
                      </div>
                    </div>
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