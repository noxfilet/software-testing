import drop from '../../src/drop.js';

describe('drop (self-designed tests)', () => {
  test('default behaviour: drops one item when n is not given', () => {
    const input = [1, 2, 3];

    const result = drop(input);

    expect(result).toEqual([2, 3]);
  });

  test('drops n items when n is given', () => {
    const input = [1, 2, 3];

    expect(drop(input, 2)).toEqual([3]);
    expect(drop(input, 1)).toEqual([2, 3]);
  });

  test('dropping more items than array length returns empty array', () => {
    const input = [1, 2, 3];

    const result = drop(input, 4);

    expect(result).toEqual([]);
  });

  test('dropping zero items returns the original array', () => {
    const input = [1, 2, 3];

    const result = drop(input, 0);

    expect(result).toEqual([1, 2, 3]);
  });

  test('handles null/undefined/empty array input gracefully', () => {
    const resultNull = drop(null, 2);
    const resultUndefined = drop(undefined, 2);
    const resultEmpty = drop([], 2)

    expect(resultNull).toEqual([]);
    expect(resultUndefined).toEqual([]);
    expect(resultEmpty).toEqual([]);
  });

  test('negative n is treated as 0 (boundary rule)', () => {
    const input = [1, 2, 3];

    const result = drop(input, -2);

    // Implementation uses n < 0 ? 0 : toInteger(n), so this should drop nothing
    expect(result).toEqual([1, 2, 3]);
  });

  test('non-integer n is rounds down', () => {
      const input = [1, 2, 3];
      expect(drop(input, 1.5)).toEqual([2, 3]);
  });

  test('dropping null/undefined/NaN element is treated as 0', () => {
    const input = [1, 2, 3];
    expect(drop(input, null)).toEqual([1, 2, 3]);       // null = 0
    expect(drop(input, undefined)).toEqual([2, 3]);     // undefined -> default
    expect(drop(input, NaN)).toEqual([1, 2, 3]);
  });

  test('string is treated as array-like and drop n elements', () => {
      expect(drop('input', 2)).toEqual(["p", "u", "t"]);
  });
});
