import { Award } from 'lucide-react';

export const badgeDefinitions = {
  FIRST_QUIZ_COMPLETED: {
    id: 'FIRST_QUIZ_COMPLETED',
    name: 'Quiz Pioneer',
    description: 'Congratulations on completing your first quiz!',
    icon: Award, // Using lucide-react's Award icon
    type: 'MILESTONE_QUIZ',
  },
  STREAK_5_DAY: {
    id: 'STREAK_5_DAY',
    name: '5-Day Streak',
    description: "You've maintained a 5-day learning streak! Keep it up!",
    iconUrl: '/assets/badges/streak_5_day.svg', // Placeholder icon path
    type: 'MILESTONE_STREAK',
    criteria: { streakLength: 5 },
  },
  STREAK_10_DAY: {
    id: 'STREAK_10_DAY',
    name: '10-Day Streak',
    description: "Wow! A 10-day learning streak! You're on fire!",
    iconUrl: '/assets/badges/streak_10_day.svg', // Placeholder icon path
    type: 'MILESTONE_STREAK',
    criteria: { streakLength: 10 },
  },
  // Future course completion badges could be dynamically referenced or added here if needed
  // e.g. COURSE_COMPLETE_JS_FUNDAMENTALS: { ... }
};

// Helper function to get a badge definition by its ID
export const getBadgeDefinition = (badgeId) => {
  return badgeDefinitions[badgeId] || null;
};

// Example of how course completion badge data could be structured if we predefine them
// This is more for illustration, as currently they are generated on the fly with course specifics.
export const courseBadgeTemplates = {
  default: {
    nameSuffix: 'Master',
    descriptionPrefix: 'Mastered the',
    descriptionSuffix: 'course.',
    iconUrl: '/assets/badges/course_master_default.svg',
    type: 'COURSE_COMPLETION',
  }
}; 