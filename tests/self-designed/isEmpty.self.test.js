import isEmpty from '../../src/isEmpty.js';

describe('isEmpty (self-designed tests)', () => {
  test('returns false for null and undefined or non-object non-collection values', () => {
    // only collections can be empty, others should be treated as not collections
    expect(isEmpty(null)).toBe(false);
    expect(isEmpty(undefined)).toBe(false);
    expect(isEmpty(50)).toBe(false);
    expect(isEmpty(true)).toBe(false);
  });

  // Test: empty arrays should return true
  test('returns true for empty arrays', () => {
    expect(isEmpty([])).toBe(true);
  });

  // Test: non-empty arrays should return false, should be treated as not collections
  test('returns false for non-empty arrays', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  // Test: non-empty strings should return false, should be treated as not collections
  test('returns false for non-empty strings', () => {
    expect(isEmpty('abc')).toBe(false);
  });

  // Test: normal execution for object
  test('returns true for empty objects, false for objects with properties', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  // Test: normal execution for map and set
  test('correctly handles Map and Set emptiness', () => {
    const m = new Map();
    const s = new Set();
    expect(isEmpty(m)).toBe(true);
    expect(isEmpty(s)).toBe(true);

    m.set('x', 1);
    s.add(1);

    expect(isEmpty(m)).toBe(false);
    expect(isEmpty(s)).toBe(false);
  });
});
