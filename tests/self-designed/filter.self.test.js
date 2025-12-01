import filter from '../../src/filter.js';

describe('filter (self-designed tests)', () => {
  test('filters truthy values from an array of objects', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false }
    ];

    const result = filter(users, u => u.active);

    expect(result).toEqual([{ user: 'barney', active: true }]);
  });

  test('filters numbers greater than 10', () => {
    const nums = [5, 12, 8, 21];

    const result = filter(nums, n => n > 10);

    expect(result).toEqual([12, 21]);
  });

  test('returns empty array when no elements match predicate', () => {
    const nums = [1, 2, 3];

    const result = filter(nums, n => n > 100);

    expect(result).toEqual([]);
  });


  test('handles null or undefined array input', () => {
    const result1 = filter(null, () => true);
    const result2 = filter(undefined, () => true);

    expect(result1).toEqual([]);
    expect(result2).toEqual([]);
  });
});