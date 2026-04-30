// ========================================
// App-wide Constants
// ========================================

// XP & Leveling
export const XP_PER_LEVEL = 1000;
export const BASE_LESSON_XP = 100;
export const BASE_QUIZ_XP = 50;
export const BASE_EXERCISE_XP = 50;
export const LESSON_COMPLETION_XP = 100;
export const LESSON_COMPLETION_GEMS = 5;
export const CHAPTER_COMPLETION_XP = 250;
export const CHAPTER_COMPLETION_GEMS = 10;
export const COURSE_COMPLETION_XP = 1000;
export const COURSE_COMPLETION_GEMS = 50;
export const LEVEL_UP_GEMS = 50;

// Quiz Settings
export const DEFAULT_PASSING_SCORE = 70;
export const QUIZ_TIME_LIMIT_MINUTES = 5;

// Subscription Tiers
export const TIERS = {
  FREE: 'FREE',
  PRO: 'PRO',
  ENTERPRISE: 'ENTERPRISE',
};

// Lucent is fully free — every tier gets unlimited access.
const UNLIMITED = {
  courses: Number.MAX_SAFE_INTEGER,
  lessons: Number.MAX_SAFE_INTEGER,
  exercises: Number.MAX_SAFE_INTEGER,
  quizzes: Number.MAX_SAFE_INTEGER,
};

export const DAILY_LIMITS = {
  [TIERS.FREE]: UNLIMITED,
  [TIERS.PRO]: UNLIMITED,
  [TIERS.ENTERPRISE]: UNLIMITED,
};

// User Roles
export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

// Calculate user level from XP
export function calculateLevel(xp) {
  return Math.floor((xp || 0) / XP_PER_LEVEL) + 1;
}

// Calculate XP remaining until next level
export function xpForNextLevel(currentXp) {
  const currentLevel = calculateLevel(currentXp);
  const nextLevelXp = currentLevel * XP_PER_LEVEL;
  return nextLevelXp - (currentXp || 0);
}

// Calculate XP progress within current level (0-100%)
export function levelProgress(currentXp) {
  const xpInCurrentLevel = (currentXp || 0) % XP_PER_LEVEL;
  return Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100);
}

// Every user has unlimited access now.
export function isUnlimitedTier() {
  return true;
}

export function getDailyQuizLimit() {
  return Number.MAX_SAFE_INTEGER;
}
