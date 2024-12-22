const STORAGE_KEY = 'trolley_statistics';

/**
 * Retrieves all stats from localStorage (or returns an empty object if none).
 */
export const getStatistics = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

/**
 * Records an answer for the given questionId/choiceId,
 * updates localStorage, and returns the new percentages.
 */
export const recordAnswer = (questionId, choiceId) => {
  const stats = getStatistics();

  // Initialize question stats if not present
  if (!stats[questionId]) {
    stats[questionId] = {
      total: 0,
      choices: {},
    };
  }

  // Initialize choice stats if not present
  if (!stats[questionId].choices[choiceId]) {
    stats[questionId].choices[choiceId] = 0;
  }

  // Increment total and this choice count
  stats[questionId].total += 1;
  stats[questionId].choices[choiceId] += 1;

  // Save back to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));

  // Return updated stats for this question
  return calculatePercentages(stats[questionId]);
};

/**
 * Given a question's stats (with { total, choices: { choiceId: count } }),
 * returns an object { total, percentages: { choiceId: percentage } }.
 * Ensures we always return a stable shape.
 */
export const calculatePercentages = (questionStats) => {
  // If questionStats is missing or total is 0, return an empty shape with total=0
  if (!questionStats || questionStats.total === 0) {
    return {
      total: 0,
      percentages: {},
    };
  }

  const { total, choices } = questionStats;
  const percentages = {};

  Object.entries(choices).forEach(([choiceId, count]) => {
    percentages[choiceId] = Math.round((count / total) * 100);
  });

  return { total, percentages };
};

/**
 * Returns { total, percentages } for the given questionId,
 * even if the question has no recorded answers yet (0 total).
 * Ensures a stable shape, so your React code won’t break.
 */
export const getQuestionStatistics = (questionId) => {
  const stats = getStatistics();

  // If no data for this question yet, return zero stats
  if (!stats[questionId]) {
    return { total: 0, percentages: {} };
  }

  // Otherwise, calculate its percentages
  return calculatePercentages(stats[questionId]);
};