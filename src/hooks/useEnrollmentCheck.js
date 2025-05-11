import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

export function useEnrollmentCheck() {
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();
  const enrollmentCache = useRef(new Map());
  const { user, isSignedIn } = useUser();
  
  // Get the userId for better cache keys
  const userId = user?.id;
  
  // Clear the cache when the user changes
  useEffect(() => {
    if (userId) {
      clearCache();
    }
  }, [userId]);
  
  // Cache expiration time: 5 minutes
  const CACHE_EXPIRY = 5 * 60 * 1000;
  
  // Function to clear the cache
  const clearCache = useCallback(() => {
    enrollmentCache.current.clear();
  }, []);

  const checkEnrollment = useCallback(async (contentSlug, contentType) => {
    if (!isSignedIn || !userId) {
      router.push('/sign-in');
      return false;
    }
    
    // Include userId in the cache key for per-user caching
    const cacheKey = `${userId}-${contentSlug}-${contentType}`;
    
    // Check cache first with expiry validation
    if (enrollmentCache.current.has(cacheKey)) {
      const cachedData = enrollmentCache.current.get(cacheKey);
      const now = Date.now();
      
      // If the cache hasn't expired, use the cached value
      if (now - cachedData.timestamp < CACHE_EXPIRY) {
        return cachedData.isEnrolled;
      }
      
      // Cache expired, remove it
      enrollmentCache.current.delete(cacheKey);
    }

    try {
      setIsChecking(true);
      
      // Add cache-busting query parameter to prevent browser caching
      const timestamp = Date.now();
      
      // Then check enrollment
      const response = await fetch(`/api/courses/check-enrollment?t=${timestamp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentSlug, contentType })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check enrollment');
      }

      const isEnrolled = data.isEnrolled;
      
      // Cache the result with timestamp
      enrollmentCache.current.set(cacheKey, {
        isEnrolled,
        timestamp: Date.now()
      });

      if (!isEnrolled) {
        toast.error(`You need to enroll in "${data.courseTitle}" before accessing this content`);
        router.push(`/course-details/${data.courseSlug}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      toast.error('Failed to check enrollment. Please try again.');
      return false;
    } finally {
      setIsChecking(false);
    }
  }, [router, userId, isSignedIn]);

  return { checkEnrollment, isChecking, clearCache };
}

// Export a standalone function to clear enrollment cache globally
// This can be imported and used in components without needing the full hook
let globalEnrollmentCache = new Map();

export function setGlobalEnrollmentCache(cache) {
  globalEnrollmentCache = cache;
}

export function clearGlobalEnrollmentCache() {
  globalEnrollmentCache.clear();
} 