import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import XPNotification from './XPNotification';

export default function XPNotificationHandler({ params }) {
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [xpNotificationData, setXPNotificationData] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    // Get URL parameters only once when component mounts
    const searchParams = new URLSearchParams(window.location.search);
    const hasXPGain = searchParams.get('xpGained');
    const isQuizCompleted = searchParams.get('quizCompleted') === 'true';
    
    if (hasXPGain || isQuizCompleted) {
      const notificationData = {
        message: isQuizCompleted ? 'Quiz Completed!' : 'Experience Earned!',
        courseId: searchParams.get('courseId'),
        score: parseInt(searchParams.get('score') || '0'),
        xpGained: parseInt(searchParams.get('xpGained') || '0'),
        gemsGained: parseInt(searchParams.get('gemsGained') || '0'),
        levelUp: searchParams.get('levelUp') === 'true',
        completionPercentage: parseInt(searchParams.get('completionPercentage') || '0')
      };
      
      setXPNotificationData(notificationData);
      setShowXPNotification(true);
      
      // Store nextLessonSlug for later use
      const nextLessonSlug = searchParams.get('nextLessonSlug');
      
      // Clear URL parameters after a delay and navigate if needed
      const timeoutId = setTimeout(() => {
        if (nextLessonSlug) {
          router.push(`/lesson/${nextLessonSlug}`);
        } else {
          // Use router.replace to avoid adding to history
          router.replace(`/lesson/${params.slug}`, { scroll: false });
        }
      }, 2000); // Increased delay to ensure notification is visible

      // Cleanup timeout on unmount
      return () => clearTimeout(timeoutId);
    }
  }, []); // Empty dependency array since we only want this to run once on mount

  return (
    <XPNotification 
      isVisible={showXPNotification}
      onClose={() => setShowXPNotification(false)}
      xpGained={xpNotificationData?.xpGained}
      gemsGained={xpNotificationData?.gemsGained}
      levelUp={xpNotificationData?.levelUp}
      message={xpNotificationData?.message}
      completionPercentage={xpNotificationData?.completionPercentage}
      courseId={xpNotificationData?.courseId}
      score={xpNotificationData?.score}
    />
  );
} 