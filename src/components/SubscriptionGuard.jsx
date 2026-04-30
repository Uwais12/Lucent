'use client';

// Lucent is fully free — every feature is allowed. This component used to
// gate access for free-tier users; it is now a transparent passthrough.
export default function SubscriptionGuard({ children }) {
  return children;
}
