/**
 * Calculate XP earned from a quiz score
 * @param {number} score - Quiz score (0-100)
 * @returns {number} XP earned
 */
export function calculateXP(score) {
  // Base XP calculation (2 XP per percentage point)
  return Math.round(score * 2);
}

/**
 * Calculate gems earned from a quiz score
 * @param {number} score - Quiz score (0-100)
 * @returns {number} Gems earned
 */
export function calculateGems(score) {
  // Gems based on score brackets
  if (score >= 90) {
    return 5;
  } else if (score >= 70) {
    return 3;
  } else if (score >= 50) {
    return 1;
  }
  return 0;
}

/**
 * Calculate level up bonus gems
 * @param {number} oldLevel - Previous level
 * @param {number} newLevel - New level
 * @returns {number} Bonus gems earned
 */
export function calculateLevelUpBonus(oldLevel, newLevel) {
  return (newLevel - oldLevel) * 25;
}

/**
 * Calculate course completion bonus
 * @returns {Object} Object containing XP and gems earned
 */
export function calculateCourseCompletionBonus() {
  return {
    xp: 1000,
    gems: 50
  };
}

/**
 * Calculate chapter completion bonus
 * @returns {Object} Object containing XP and gems earned
 */
export function calculateChapterCompletionBonus() {
  return {
    xp: 250,
    gems: 10
  };
}

/**
 * Calculate lesson completion bonus
 * @returns {Object} Object containing XP and gems earned
 */
export function calculateLessonCompletionBonus() {
  return {
    xp: 100,
    gems: 5
  };
} 