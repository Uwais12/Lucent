'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Award } from 'lucide-react'; // Using Award as a default icon

// Simple component for custom toast content
const BadgeToast = ({ badge }) => {
  if (!badge) return null;
  // Attempt to use badge.icon if it's a component, otherwise default or iconUrl
  const IconComponent = badge.icon && typeof badge.icon === 'function' ? badge.icon : Award;

  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      {badge.iconUrl ? (
        <img src={badge.iconUrl} alt={badge.name} className="w-10 h-10 mr-3 object-contain" />
      ) : (
        <IconComponent className="w-10 h-10 mr-3 text-violet-500" />
      )}
      <div>
        <p className="font-semibold text-gray-800">Badge Unlocked!</p>
        <p className="text-sm text-gray-600">{badge.name}: {badge.description}</p>
      </div>
    </div>
  );
};

export default function GlobalNotificationHandler() {
  const notifiedBadgeIdsInSession = useRef(new Set());

  useEffect(() => {
    const handleShowBadge = (event) => {
      const badgeDetail = event.detail;
      if (badgeDetail && typeof badgeDetail.id !== 'undefined') { 
        if (!notifiedBadgeIdsInSession.current.has(badgeDetail.id)) {
          toast.custom(
            (t) => (
              <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'}
                max-w-md w-full bg-transparent rounded-lg pointer-events-auto flex ring-0`}
              >
                <BadgeToast badge={badgeDetail} />
              </div>
            ),
            { duration: 5000, position: 'bottom-center' } // Show for 5 seconds, bottom-center
          );
          notifiedBadgeIdsInSession.current.add(badgeDetail.id);
        }
      } else {
        console.warn('Received badge notification event with invalid badge detail:', badgeDetail);
      }
    };

    window.addEventListener('showBadgeNotification', handleShowBadge);
    return () => {
      window.removeEventListener('showBadgeNotification', handleShowBadge);
    };
  }, []); // Empty dependency array so it runs once on mount

  return null; // This component no longer renders anything itself, only manages toasts
} 