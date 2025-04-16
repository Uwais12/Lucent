import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export function useEnrollmentCheck() {
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();
  const enrollmentCache = useRef(new Map());

  const checkEnrollment = async (contentSlug, contentType) => {
    // Generate cache key
    const cacheKey = `${contentSlug}-${contentType}`;

    // Check cache first
    if (enrollmentCache.current.has(cacheKey)) {
      return enrollmentCache.current.get(cacheKey);
    }

    try {
      setIsChecking(true);
      const response = await fetch('/api/courses/check-enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentSlug, contentType })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check enrollment');
      }

      if (!data.isEnrolled) {
        toast.error(`You need to enroll in "${data.courseTitle}" before accessing this content`);
        router.push(`/course-details/${data.courseSlug}`);
        // Cache the negative result
        enrollmentCache.current.set(cacheKey, false);
        return false;
      }

      // Cache the positive result
      enrollmentCache.current.set(cacheKey, true);
      return true;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      toast.error('Failed to check enrollment. Please try again.');
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const clearEnrollmentCache = () => {
    enrollmentCache.current.clear();
  };

  return { checkEnrollment, isChecking, clearEnrollmentCache };
} 