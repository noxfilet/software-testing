import drop from '../src/drop.js';

describe('drop (self-designed tests)', () => {
  test('default behaviour: drops one item when n is not given', () => {
    const input = [1, 2, 3];

    const result = drop(input);

    expect(result).toEqual([2, 3]);
  });

  test('drops n items when n is given', () => {
    const input = [1, 2, 3];

    const result = drop(input, 2);

    expect(result).toEqual([3]);
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

  test('handles null/undefined array input gracefully', () => {
    const resultNull = drop(null, 2);
    const resultUndefined = drop(undefined, 2);

    expect(resultNull).toEqual([]);
    expect(resultUndefined).toEqual([]);
  });

  test('negative n is treated as 0 (boundary rule)', () => {
    const input = [1, 2, 3];

    const result = drop(input, -2);

    // Implementation uses n < 0 ? 0 : toInteger(n), so this should drop nothing
    expect(result).toEqual([1, 2, 3]);
  });
});
