# Lucent Subscription System Setup Guide

This document provides instructions on how to set up and configure the subscription system for Lucent.

## Overview

The subscription system is built using:
- Stripe for payment processing and subscription management
- MongoDB for storing user subscription data
- Clerk for authentication
- NextJS for the frontend and API routes

## Prerequisites

### Node.js Version Requirement

**IMPORTANT**: This project requires Node.js version 18 or higher. The current codebase shows v14.17.0 which will cause compatibility issues with several dependencies including:
- @clerk/nextjs
- stripe
- mongodb/mongoose
- next
- @radix-ui components

To check your Node.js version, run:
```
node -v
```

To update Node.js, we recommend using a version manager:
- For macOS/Linux: Use [nvm](https://github.com/nvm-sh/nvm)
- For Windows: Use [nvm-windows](https://github.com/coreybutler/nvm-windows)

Example installation with nvm:
```
nvm install 18
nvm use 18
```

After upgrading Node.js, reinstall dependencies:
```
npm ci
```

### Other Requirements
- Stripe account
- Clerk account
- MongoDB database

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```
# Stripe API Keys (Replace with actual keys from your Stripe Dashboard)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Stripe Price IDs (from your Stripe dashboard)
STRIPE_PRICE_ID_PRO_MONTHLY=price_xxxxx
STRIPE_PRICE_ID_PRO_YEARLY=price_xxxxx
STRIPE_PRICE_ID_ENTERPRISE=price_xxxxx

# App URL (for redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Stripe Setup

1. **Create Products and Prices in Stripe Dashboard**:
   - Create a "Pro" product with two price points:
     - Monthly: £20/month
     - Yearly: £200/year
   - Create an "Enterprise" product
   - Take note of the price IDs and add them to your `.env.local` file

2. **Set Up Stripe Webhook**:
   - For local development, use ngrok:
     ```
     npx ngrok http 3000
     ```
   - Create a webhook endpoint in the Stripe Dashboard:
     - URL: `https://your-ngrok-url/api/webhooks/stripe`
     - Events to listen for:
       - `customer.subscription.created`
       - `customer.subscription.updated`
       - `customer.subscription.deleted`
       - `invoice.payment_succeeded`
       - `invoice.payment_failed`
   - Copy the webhook signing secret to your `.env.local` file

## Migrate Existing Users

Run the migration script to set all existing users to the free tier. This can be done by calling the migration API endpoint:

```
POST /api/admin/migrate-to-subscriptions
Body: { "dryRun": false }
```

To test first without making changes, set `dryRun` to `true`.

## Implementing Subscription Guards

Add the `SubscriptionGuard` component to any content that should be limited based on subscription tier:

```jsx
import SubscriptionGuard from '@/components/SubscriptionGuard';

// Example in a course page
<SubscriptionGuard 
  limitType="courses" 
  currentCount={enrolledCoursesCount}
>
  {/* Protected content */}
</SubscriptionGuard>

// Example in a lesson page
<SubscriptionGuard 
  limitType="lessonsPerDay" 
  currentCount={lessonsAccessedToday}
>
  {/* Protected lesson content */}
</SubscriptionGuard>
```

The subscription guard will:
1. Allow unlimited access to Pro/Enterprise tier users
2. Check if Free tier users have reached their limits
3. Show an upgrade prompt if limits are reached

## Subscription Hook Usage

To access subscription status in any component:

```jsx
import { useSubscription } from '@/hooks/useSubscription';

function MyComponent() {
  const { 
    subscription, 
    loading, 
    isFreeTier,
    isProTier,
    isEnterpriseTier,
    isActive,
    createCheckoutSession,
    redirectToBillingPortal
  } = useSubscription();
  
  // Use subscription data to conditionally render UI
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {isFreeTier && <div>You're on the free plan</div>}
      {isProTier && <div>You're on the pro plan</div>}
      {/* ... */}
    </div>
  );
}
```

## Free Tier Limits

The current free tier limits are configured in `src/lib/stripe.js`:

```javascript
export const FREE_TIER_LIMITS = {
  maxCourses: 2,         // Number of courses accessible
  maxLessonsPerDay: 3,   // Number of lessons per day
  maxExercisesPerDay: 5, // Number of exercises per day
};
```

You can adjust these values as needed.

## Testing the Subscription Flow

1. **Sign up/Sign in as a user**
2. **Navigate to the profile page**
3. **Test the upgrade flow**:
   - Click on "Subscribe to Pro"
   - Complete the checkout using Stripe test card:
     - Card number: 4242 4242 4242 4242
     - Expiry: Any future date
     - CVC: Any 3 digits
     - Postal code: Any valid postal code
4. **Test the subscription management**:
   - Click on "Manage Billing"
   - Test canceling the subscription

## Troubleshooting

### Webhook Issues
- Check the signing secret matches
- Ensure you're listening for the correct events
- Review server logs for details

### API Issues
- Check environment variables are set correctly
- Verify Stripe API key is valid
- Check MongoDB connection

### Node.js Version Issues
- Update to Node.js v18+ as many packages require it
- If unable to update immediately, you could try downgrading specific packages:
  ```
  npm install stripe@14.0.0 @radix-ui/react-tabs@0.1.4
  ```
  Note: This is not recommended for production, but might work as a temporary solution.

### Route Pattern Issues
- The middleware uses path-to-regexp for route matching
- Wildcards should be specified as `(.*)` instead of `*`
- Example: `/sign-in(.*)` instead of `/sign-in*`

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [NextJS API Routes Documentation](https://nextjs.org/docs/api-routes/introduction) 