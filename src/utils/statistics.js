const STORAGE_KEY = 'trolley_statistics';

export const getStatistics = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const recordAnswer = (questionId, choiceId) => {
  const stats = getStatistics();
  
  // Initialize question stats if they don't exist
  if (!stats[questionId]) {
    stats[questionId] = {
      total: 0,
      choices: {}
    };
  }
  
  // Initialize choice stats if they don't exist
  if (!stats[questionId].choices[choiceId]) {
    stats[questionId].choices[choiceId] = 0;
  }
  
  // Update counts
  stats[questionId].total += 1;
  stats[questionId].choices[choiceId] += 1;
  
  // Save back to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  
  return calculatePercentages(stats[questionId]);
};

export const calculatePercentages = (questionStats) => {
  if (!questionStats || questionStats.total === 0) return {};
  
  const percentages = {};
  Object.entries(questionStats.choices).forEach(([choiceId, count]) => {
    percentages[choiceId] = Math.round((count / questionStats.total) * 100);
  });
  
  return {
    total: questionStats.total,
    percentages
  };
};

export const getQuestionStatistics = (questionId) => {
  const stats = getStatistics();
  return stats[questionId] ? calculatePercentages(stats[questionId]) : null;
}; 