'use client';

import { useEffect, useRef, useState } from 'react';
// import { toast } from 'react-hot-toast'; // Commented out or remove if not used elsewhere
import { Award, X } from 'lucide-react'; // Using Award as a default icon, X for close

// Simple component for custom toast content
// const BadgeToast = ({ badge }) => { // Commenting out BadgeToast as we'll inline modal content or create a new Modal component
//   if (!badge) return null;
//   const IconComponent = badge.icon && typeof badge.icon === 'function' ? badge.icon : Award;
// 
//   return (
//     <div className="flex items-center bg-white p-4 rounded-lg shadow-lg border border-gray-200">
//       {badge.iconUrl ? (
//         <img src={badge.iconUrl} alt={badge.name} className="w-10 h-10 mr-3 object-contain" />
//       ) : (
//         <IconComponent className="w-10 h-10 mr-3 text-violet-500" />
//       )}
//       <div>
//         <p className="font-semibold text-gray-800">Badge Unlocked!</p>
//         <p className="text-sm text-gray-600">{badge.name}: {badge.description}</p>
//       </div>
//     </div>
//   );
// };

export default function GlobalNotificationHandler() {
  const notifiedBadgeIdsInSession = useRef(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBadge, setCurrentBadge] = useState(null);
  const handleShareToLinkedIn = (badgeName, badgeReason) => {
    const text = `I&#39;ve just achieved the "${badgeName}" badge (${badgeReason}) on Lucent! \nStart your streak now: https://lucentapp.io/landing-page\n#LucentLearning #AchievementUnlocked`;
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&text=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
  };

  const handleShare = (badge) => {
    console.log(`Share button clicked for badge: ${badge.name}`, badge);
    // Implement actual share functionality here, e.g., navigator.share or social media links
    handleShareToLinkedIn(badge.name, badge.description);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.dispatchEvent(new CustomEvent('badgeNotificationClosed'));
  };

  useEffect(() => {
    const handleShowBadge = (event) => {
      const badgeDetail = event.detail;
      if (badgeDetail && typeof badgeDetail.id !== 'undefined') {
        if (!notifiedBadgeIdsInSession.current.has(badgeDetail.id)) {
          setCurrentBadge(badgeDetail);
          setIsModalOpen(true);
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
  }, []);

  if (!isModalOpen || !currentBadge) {
    return null;
  }

  const IconComponent = currentBadge.icon && typeof currentBadge.icon === 'function' ? currentBadge.icon : Award;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out" onClick={closeModal}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ease-in-out scale-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Badge Unlocked!</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            {currentBadge.iconUrl ? (
              <img src={currentBadge.iconUrl} alt={currentBadge.name} className="w-24 h-24 mb-4 object-contain" />
            ) : (
              <IconComponent className="w-24 h-24 mb-4 text-violet-500" />
            )}
            <h3 className="text-xl font-semibold text-gray-700 mb-1">{currentBadge.name}</h3>
            <p className="text-sm text-gray-600 mb-6">{currentBadge.description}</p>

            <button
              onClick={() => handleShare(currentBadge)}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
            >
              Share Achievement
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 