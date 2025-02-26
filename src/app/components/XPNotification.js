"use client";

import { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import { Zap, Award, X, Gem } from "lucide-react";

export default function XPNotification({ 
  isVisible, 
  onClose, 
  xpGained = 0,
  gemsGained = 0, 
  levelUp = false, 
  message = "Experience Earned!", 
  completionPercentage = null,
  courseId = null 
}) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Control confetti timing
  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000); // Stop confetti after 4 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Auto-hide notification after delay
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000); // Auto close after 6 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
        />
      )}
      
      <div className="fixed top-24 right-4 z-50 w-96 bg-white rounded-lg shadow-xl border-l-4 border-violet-500 overflow-hidden animate-slide-in">
        <div className="p-5">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Zap className="h-6 w-6 text-violet-500" />
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">{message}</p>
              
              {xpGained > 0 && (
                <div className="mt-2 flex items-center text-sm text-indigo-600">
                  <Zap className="mr-1.5 h-4 w-4" />
                  <span>+{xpGained} XP gained</span>
                </div>
              )}
              
              {gemsGained > 0 && (
                <div className="mt-2 flex items-center text-sm text-teal-600">
                  <Gem className="mr-1.5 h-4 w-4" />
                  <span>+{gemsGained} Gems earned</span>
                </div>
              )}
              
              {levelUp && (
                <div className="mt-2 flex items-center text-sm text-amber-600">
                  <Award className="mr-1.5 h-4 w-4" />
                  <span>Level Up! Congratulations!</span>
                </div>
              )}
              
              {completionPercentage !== null && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Course Progress</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-500 rounded-full"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 