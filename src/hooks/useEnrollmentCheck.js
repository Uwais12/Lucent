import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export function useEnrollmentCheck() {
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();

  const checkEnrollment = async (quizSlug, quizType) => {
    try {
      setIsChecking(true);
      const response = await fetch('/api/quizzes/check-enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizSlug, quizType })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check enrollment');
      }

      if (!data.isEnrolled) {
        toast.error(`You need to enroll in "${data.courseTitle}" before taking this quiz`);
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
  };

  return { checkEnrollment, isChecking };
} 