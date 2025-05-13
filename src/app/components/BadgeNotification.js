'use client';

import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { X, Share2, Award } from 'lucide-react'; // Or your preferred icons

const BadgeNotification = ({ badge, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  useEffect(() => {
    if (badge) {
      setShowConfetti(true);
      // Stop confetti after a few seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [badge]);

  if (!badge) {
    return null;
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `I just earned the "${badge.name}" badge on Lucent! Check it out!`;

  const socialShares = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      icon: <svg /* Twitter icon SVG */ className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(badge.name)}&summary=${encodeURIComponent(shareText)}`,
      icon: <svg /* LinkedIn icon SVG */ className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
    }
    // Add more social media platforms if needed
  ];

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={250}
          gravity={0.15}
        />
      )}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-all animate-pop-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Award className="w-7 h-7 text-amber-500 mr-2" />
              Badge Unlocked!
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center my-6">
            {badge.icon ? (
              <badge.icon className="w-32 h-32 mx-auto mb-4 text-violet-500" />
            ) : badge.iconUrl ? (
              <img src={badge.iconUrl} alt={`${badge.name} badge`} className="w-32 h-32 mx-auto mb-4 object-contain" />
            ) : (
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-16 h-16 text-white" />
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{badge.name}</h3>
            <p className="text-gray-600 text-sm">{badge.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2 text-center">Share your achievement:</p>
            <div className="flex justify-center space-x-3">
              {socialShares.map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-800 transition-colors"
                  title={`Share on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
              <button
                onClick={() => navigator.clipboard.writeText(`${shareText} ${shareUrl}`)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-1.5 pl-2.5 pr-2.5"
                title="Copy link"
              >
                <svg /* Link icon */ className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </>
  );
};

export default BadgeNotification; 