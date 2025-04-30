'use client';

import { useState, useEffect } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import Link from 'next/link';
import { isWithinFreeTierLimits } from '@/lib/stripe';

export default function SubscriptionGuard({ 
  children, 
  limitType, 
  currentCount,
  redirectPath = '/profile',
  showUpgradePrompt = true 
}) {
  const { subscription, isFreeTier, loading } = useSubscription();
  const [isAllowed, setIsAllowed] = useState(true);
  const [checkingAccess, setCheckingAccess] = useState(true);
  
  useEffect(() => {
    // If not loading and we have subscription data, check if user is within limits
    if (!loading) {
      // Skip check for premium users
      if (!isFreeTier) {
        setIsAllowed(true);
        setCheckingAccess(false);
        return;
      }
      
      // For free tier users, check if they're within limits
      const allowed = isWithinFreeTierLimits({ subscription }, limitType, currentCount);
      setIsAllowed(allowed);
      setCheckingAccess(false);
    }
  }, [loading, isFreeTier, limitType, currentCount, subscription]);
  
  if (loading || checkingAccess) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!isAllowed && showUpgradePrompt) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8 max-w-2xl mx-auto text-center">
        <h3 className="text-xl font-semibold text-blue-900 mb-3">
          Subscription Limit Reached
        </h3>
        <p className="text-blue-800 mb-4">
          You've reached the limit for the free plan. Upgrade to our Pro plan to access unlimited {limitType}.
        </p>
        <div className="mt-4">
          <Link 
            href={redirectPath} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    );
  }
  
  return children;
} 