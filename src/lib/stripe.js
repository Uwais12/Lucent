// Lucent is now fully free. Every gate in the codebase grants access.
// This module is a stub kept to satisfy existing imports — Stripe is not invoked.

export const stripe = null;

export const STRIPE_PRICE_IDS = {
  PRO_MONTHLY: null,
  PRO_YEARLY: null,
  ENTERPRISE: null,
};

export const FREE_TIER_LIMITS = {
  maxCourses: Number.MAX_SAFE_INTEGER,
  maxLessonsPerDay: Number.MAX_SAFE_INTEGER,
  maxExercisesPerDay: Number.MAX_SAFE_INTEGER,
};

export const PRO_TIER_BENEFITS = {
  unlimitedCourses: true,
  unlimitedLessons: true,
  unlimitedExercises: true,
  prioritySupport: true,
};

export const hasActiveSubscription = () => true;
export const canAccessProFeatures = () => true;
export const isWithinFreeTierLimits = () => true;
