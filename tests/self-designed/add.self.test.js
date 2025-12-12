import add from '../../src/add.js';

describe('add (self-designed tests)', () => {
  test('basic addition - correct total for cart', () => {
    // 6 + 4 = 10
    expect(add(6, 4)).toBe(10);
  });

  test('handles zero values - free items', () => {
    // 0 + 22 = 22
    expect(add(0, 22)).toBe(22);
    expect(add(22, 0)).toBe(22);
  });

  test('adds negative numbers - discounts, returns', () => {
    // 28 + (-5) = 23
    expect(add(28, -5)).toBe(23);
  });

  test('works with large number', () => {
    expect(add(1000, 5200)).toBe(6200);
  });

  test('works with floating point values - sales tax precision', () => {
    // 0.1 + 0.2 is not exactly 0.3 in JS, so use toBeCloseTo
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10);
  });

  test('handles missing values (undefined) gracefully', () => {
    // with lodash-style createMathOperation, undefined acts like "use the other value"
    expect(add(undefined, 5)).toBe(5);
    expect(add(5, undefined)).toBe(5);
  });

  test('works with NaN/null input', () => {
    expect(add(NaN, 2)).toBe(NaN);  // return NaN if there is input as NaN
    expect(add(null, 2)).toBe(2);   // null  -> 0
  });

});