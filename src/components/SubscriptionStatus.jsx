'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function SubscriptionStatus() {
  const {
    subscription,
    loading,
    isFreeTier,
    isProTier,
    isEnterpriseTier,
    isActive,
    willCancel,
    formattedExpirationDate,
  } = useSubscription();

  if (loading) {
    return (
      <div className="animate-pulse p-4 bg-gray-50 rounded-lg h-24"></div>
    );
  }

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Subscription Status</h3>
        <Link 
          href="/profile" 
          className="text-sm text-blue-600 hover:underline"
        >
          Manage
        </Link>
      </div>
      
      <div className="mt-3">
        <div className="flex items-center">
          <div 
            className={`w-3 h-3 rounded-full mr-2 ${
              isActive ? 'bg-green-500' : 'bg-amber-500'
            }`}
          />
          <span className="font-medium">
            {subscription?.tier || 'FREE'} Plan
          </span>
        </div>
        
        {!isFreeTier && (
          <div className="mt-2 text-sm text-gray-600">
            {willCancel 
              ? `Your plan will be canceled on ${formattedExpirationDate}`
              : `Renews on ${formattedExpirationDate}`}
          </div>
        )}
        
        {isFreeTier && (
          <div className="mt-2">
            <Link
              href="/profile"
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded inline-block"
            >
              Upgrade Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 