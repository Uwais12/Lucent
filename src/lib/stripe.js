import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16', // Use the latest API version
  typescript: false,
});

// Subscription price IDs from Stripe dashboard
export const STRIPE_PRICE_IDS = {
  PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY,
  PRO_YEARLY: process.env.STRIPE_PRICE_PRO_YEARLY,
  ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY,
};

// Free tier limitations
export const FREE_TIER_LIMITS = {
  maxCourses: 2,         // Number of courses accessible
  maxLessonsPerDay: 3,   // Number of lessons per day
  maxExercisesPerDay: 5, // Number of exercises per day
};

// Pro tier benefits
export const PRO_TIER_BENEFITS = {
  unlimitedCourses: true,
  unlimitedLessons: true,
  unlimitedExercises: true,
  prioritySupport: true,
  // Add any other pro benefits here
};

// Helper function to check if user has an active subscription
export const hasActiveSubscription = (user) => {
  if (!user?.subscription) return false;
  
  const { tier, status, currentPeriodEnd } = user.subscription;
  
  // Free tier is always considered active
  if (tier === 'FREE') return true;
  
  // Check if subscription is active and not expired
  if (status === 'ACTIVE' || status === 'TRIALING') {
    if (!currentPeriodEnd) return true;
    return new Date(currentPeriodEnd) > new Date();
  }
  
  return false;
};

// Helper function to check if a user can access pro features
export const canAccessProFeatures = (user) => {
  if (!user) return false;
  
  // Admin users always have access
  if (user.role === 'ADMIN') return true;
  
  // Check if user has an active subscription with PRO or ENTERPRISE tier
  return hasActiveSubscription(user) && 
    (user.subscription.tier === 'PRO' || user.subscription.tier === 'ENTERPRISE');
};

// Helper function to check if a user is within free tier limits
export const isWithinFreeTierLimits = (user, limitType, currentCount) => {
  if (!user) return false;
  
  // Pro/Enterprise users have no limits
  if (canAccessProFeatures(user)) return true;
  
  // Check specific limit for free tier users
  switch(limitType) {
    case 'courses':
      return currentCount < FREE_TIER_LIMITS.maxCourses;
    case 'lessonsPerDay':
      return currentCount < FREE_TIER_LIMITS.maxLessonsPerDay;
    case 'exercisesPerDay':
      return currentCount < FREE_TIER_LIMITS.maxExercisesPerDay;
    default:
      return false;
  }
}; 