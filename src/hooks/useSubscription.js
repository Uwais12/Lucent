// Lucent is fully free. This hook is kept as a stub for existing imports —
// it reports every user as having unlimited Pro access without any network call.

const noop = async () => ({ success: true });

export function useSubscription() {
  return {
    subscription: { tier: 'PRO', status: 'ACTIVE' },
    loading: false,
    error: null,
    createCheckoutSession: noop,
    redirectToBillingPortal: noop,
    isFreeTier: false,
    isProTier: true,
    isEnterpriseTier: false,
    isActive: true,
    willCancel: false,
    formattedExpirationDate: null,
  };
}
