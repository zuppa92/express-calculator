const { mean, median, mode } = require('./stats');

describe('Statistics functions', () => {
  test('mean calculates the average of numbers', () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
  });

  test('median calculates the midpoint of numbers', () => {
    expect(median([1, 2, 3, 4, 5])).toBe(3);
    expect(median([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test('mode calculates the most frequent number', () => {
    expect(mode([1, 2, 2, 3, 4])).toBe(2);
  });
});
