'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSubscription } from '@/hooks/useSubscription';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { 
    subscription, 
    loading, 
    createCheckoutSession,
    redirectToBillingPortal,
    isFreeTier,
    formattedExpirationDate,
    willCancel
  } = useSubscription();
  
  const [selectedInterval, setSelectedInterval] = useState('month');
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in?redirect_url=/profile');
    }
  }, [isLoaded, user, router]);
  
  if (!isLoaded || loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse h-64 w-full max-w-3xl bg-gray-100 rounded-lg"></div>
      </div>
    );
  }
  
  if (!user) {
    return null;
  }
  
  const handleSubscribe = async (tierType) => {
    await createCheckoutSession(null, tierType, selectedInterval);
  };
  
  const handleManageBilling = async () => {
    await redirectToBillingPortal();
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Return to Lucent
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            {user && (
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={user.imageUrl}
                    alt={user.fullName || 'User'} 
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <button
                    onClick={() => window.location.href = '/user/account'}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Manage Account Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Subscription</h2>
            
            {subscription && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">
                  Current Plan: <span className="text-blue-600">{subscription.tier}</span>
                </p>
                {!isFreeTier && (
                  <>
                    <p className="text-sm text-gray-600 mt-1">
                      Status: <span className={subscription.status === 'ACTIVE' ? 'text-green-600' : 'text-amber-600'}>
                        {subscription.status.toLowerCase()}
                      </span>
                    </p>
                    {formattedExpirationDate && (
                      <p className="text-sm text-gray-600 mt-1">
                        {willCancel 
                          ? `Your plan will be canceled on ${formattedExpirationDate}`
                          : `Your plan renews on ${formattedExpirationDate}`}
                      </p>
                    )}
                    <div className="mt-4">
                      <button
                        onClick={handleManageBilling}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Manage Billing
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {isFreeTier && (
              <div className="mt-6">
                <h3 className="font-medium text-lg mb-4">Upgrade Your Plan</h3>
                
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-100 p-1 rounded-full">
                    <button
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedInterval === 'month' ? 'bg-white shadow-sm' : ''
                      }`}
                      onClick={() => setSelectedInterval('month')}
                    >
                      Monthly
                    </button>
                    <button
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedInterval === 'year' ? 'bg-white shadow-sm' : ''
                      }`}
                      onClick={() => setSelectedInterval('year')}
                    >
                      Yearly
                      <span className="ml-1 text-xs text-green-600 font-medium">
                        Save 15%
                      </span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pro Plan Card */}
                  <div className="border rounded-lg p-6 flex flex-col">
                    <div className="mb-4">
                      <h4 className="font-bold text-xl">Pro Plan</h4>
                      <p className="text-gray-600 mt-2">Perfect for individual learners</p>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-3xl font-bold">
                        {selectedInterval === 'month' ? '£20' : '£200'}
                        <span className="text-gray-400 text-lg font-normal">
                          /{selectedInterval}
                        </span>
                      </p>
                    </div>
                    
                    <ul className="mb-6 text-sm space-y-2 flex-grow">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Unlimited course access
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Unlimited lessons per day
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Unlimited exercises
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Priority support
                      </li>
                    </ul>
                    
                    <button
                      onClick={() => handleSubscribe('PRO')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                    >
                      Subscribe to Pro
                    </button>
                  </div>
                  
                  {/* Enterprise Plan Card */}
                  <div className="border rounded-lg p-6 flex flex-col border-blue-200 bg-blue-50">
                    <div className="mb-4">
                      <h4 className="font-bold text-xl">Enterprise Plan</h4>
                      <p className="text-gray-600 mt-2">For teams and organizations</p>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-3xl font-bold">
                        Custom
                      </p>
                      <p className="text-gray-600 text-sm">
                        Contact us for pricing
                      </p>
                    </div>
                    
                    <ul className="mb-6 text-sm space-y-2 flex-grow">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Everything in Pro plan
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Team management dashboard
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        SSO integration
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Dedicated account manager
                      </li>
                    </ul>
                    
                    <button
                      onClick={() => window.location.href = '/contact'}
                      className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-md"
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 