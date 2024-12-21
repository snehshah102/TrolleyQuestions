import { getStatistics, recordAnswer, calculatePercentages, getQuestionStatistics } from '../statistics';

describe('Statistics Utility', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('getStatistics', () => {
    it('returns empty object when no statistics exist', () => {
      expect(getStatistics()).toEqual({});
    });

    it('returns parsed statistics from localStorage', () => {
      const mockStats = { '1': { total: 10, choices: { a: 6, b: 4 } } };
      localStorage.getItem.mockReturnValue(JSON.stringify(mockStats));
      
      expect(getStatistics()).toEqual(mockStats);
    });
  });

  describe('recordAnswer', () => {
    it('initializes new question statistics', () => {
      const result = recordAnswer(1, 'a');
      
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'trolley_statistics',
        expect.any(String)
      );
      expect(result).toEqual({
        total: 1,
        percentages: { a: 100 }
      });
    });

    it('updates existing question statistics', () => {
      const existingStats = {
        '1': {
          total: 10,
          choices: { a: 6, b: 4 }
        }
      };
      localStorage.getItem.mockReturnValue(JSON.stringify(existingStats));

      const result = recordAnswer(1, 'a');
      
      expect(result).toEqual({
        total: 11,
        percentages: {
          a: Math.round((7 / 11) * 100),
          b: Math.round((4 / 11) * 100)
        }
      });
    });

    it('handles multiple questions', () => {
      recordAnswer(1, 'a');
      recordAnswer(2, 'b');
      
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });
  });

  describe('calculatePercentages', () => {
    it('returns empty object for null or empty stats', () => {
      expect(calculatePercentages(null)).toEqual({});
      expect(calculatePercentages({ total: 0, choices: {} })).toEqual({});
    });

    it('calculates correct percentages', () => {
      const stats = {
        total: 100,
        choices: {
          a: 60,
          b: 40
        }
      };

      expect(calculatePercentages(stats)).toEqual({
        total: 100,
        percentages: {
          a: 60,
          b: 40
        }
      });
    });

    it('rounds percentages to nearest integer', () => {
      const stats = {
        total: 3,
        choices: {
          a: 1,
          b: 2
        }
      };

      expect(calculatePercentages(stats)).toEqual({
        total: 3,
        percentages: {
          a: 33,
          b: 67
        }
      });
    });
  });

  describe('getQuestionStatistics', () => {
    it('returns null for non-existent question', () => {
      expect(getQuestionStatistics(1)).toBeNull();
    });

    it('returns formatted statistics for existing question', () => {
      const mockStats = {
        '1': {
          total: 100,
          choices: { a: 60, b: 40 }
        }
      };
      localStorage.getItem.mockReturnValue(JSON.stringify(mockStats));

      expect(getQuestionStatistics(1)).toEqual({
        total: 100,
        percentages: {
          a: 60,
          b: 40
        }
      });
    });
  });

  describe('Error Handling', () => {
    it('handles localStorage errors gracefully', () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      expect(getStatistics()).toEqual({});
    });

    it('handles invalid JSON in localStorage', () => {
      localStorage.getItem.mockReturnValue('invalid json');
      
      expect(getStatistics()).toEqual({});
    });
  });

  describe('Performance', () => {
    it('handles large numbers of statistics efficiently', () => {
      const largeStats = {};
      for (let i = 0; i < 1000; i++) {
        largeStats[i] = {
          total: 1000,
          choices: { a: 500, b: 500 }
        };
      }
      localStorage.getItem.mockReturnValue(JSON.stringify(largeStats));

      const start = performance.now();
      getStatistics();
      const end = performance.now();

      expect(end - start).toBeLessThan(100); // Should complete in under 100ms
    });
  });
}); 