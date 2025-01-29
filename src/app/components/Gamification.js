"use client";
import { useState } from "react";

export default function Gamification({ lessonId }) {
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);

  const completeLesson = () => {
    setXP(xp + 10);
    setStreak(streak + 1);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-6">
      <h2 className="text-xl font-semibold">Your Progress</h2>
      <p>XP: {xp}</p>
      <p>Streak: {streak} days</p>
      <button
        onClick={completeLesson}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Mark Lesson as Completed
      </button>
    </div>
  );
}
