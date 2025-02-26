"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import XPNotification from "@/app/components/XPNotification";

// Separate client component for handling XP notifications
function XPNotificationHandler({ params }) {
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [xpNotificationData, setXPNotificationData] = useState(null);
  const router = useRouter();
  
  // Use URL search params safely for client-side only
  let searchParams;
  try {
    searchParams = new URLSearchParams(window.location.search);
  } catch (e) {
    // Handle case where window is not available during SSR
    searchParams = { get: () => null };
  }
  
  // Check for XP gain parameters in URL
  useEffect(() => {
    if (searchParams.get('xpGained')) {
      const notificationData = {
        message: 'Experience Earned!',
        courseId: searchParams.get('courseId'),
        xpGained: parseInt(searchParams.get('xpGained') || '0'),
        gemsGained: parseInt(searchParams.get('gemsGained') || '0'),
        levelUp: searchParams.get('levelUp') === 'true',
        completionPercentage: parseInt(searchParams.get('completionPercentage') || '0')
      };
      
      setXPNotificationData(notificationData);
      setShowXPNotification(true);
      
      // Clear the URL parameters after a delay
      setTimeout(() => {
        router.replace(`/learn/${params.slug}`);
      }, 500);
    }
  }, [searchParams, router, params.slug]);

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
    />
  );
}

export default function LearnPage() {
  const params = useParams();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [prevLesson, setPrevLesson] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);
  const [progress, setProgress] = useState(0);

  // ... rest of the component stays the same ...

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      {/* XP Notification with Confetti */}
      <Suspense fallback={null}>
        <XPNotificationHandler params={params} />
      </Suspense>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* ... rest of your JSX ... */}
      </main>
    </div>
  );
} 