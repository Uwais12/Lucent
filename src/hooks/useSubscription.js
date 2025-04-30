import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export function useSubscription() {
  const { isSignedIn, user } = useUser();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubscription() {
      if (!isSignedIn) {
        setSubscription(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/billing/manage');
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscription');
        }
        
        const data = await response.json();
        setSubscription(data.subscription);
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [isSignedIn, user?.id]);

  const createCheckoutSession = async (priceId, tierType, billingInterval) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/billing/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          tierType,
          billingInterval,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const data = await response.json();
      window.location.href = data.url;
      
      return { success: true };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const redirectToBillingPortal = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/billing/manage', {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to redirect to billing portal');
      }

      const data = await response.json();
      window.location.href = data.url;
      
      return { success: true };
    } catch (error) {
      console.error('Error redirecting to billing portal:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to check subscription status
  const isFreeTier = !subscription || subscription.tier === 'FREE';
  const isProTier = subscription?.tier === 'PRO';
  const isEnterpriseTier = subscription?.tier === 'ENTERPRISE';
  const isActive = !subscription || ['ACTIVE', 'TRIALING'].includes(subscription.status);
  const willCancel = subscription?.cancelAtPeriodEnd;
  
  // Expiration date in readable format
  const formattedExpirationDate = subscription?.currentPeriodEnd 
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
    : null;

  return {
    subscription,
    loading,
    error,
    createCheckoutSession,
    redirectToBillingPortal,
    isFreeTier,
    isProTier,
    isEnterpriseTier,
    isActive,
    willCancel,
    formattedExpirationDate,
  };
} 