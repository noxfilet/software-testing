import isEmpty from '../../src/isEmpty.js';

describe('isEmpty (self-designed tests)', () => {
  test('returns true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test('returns true for empty arrays', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('returns false for non-empty arrays', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  test('returns false for non-empty strings', () => {
    expect(isEmpty('abc')).toBe(false);
  });

  test('returns true for empty objects, false for objects with properties', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

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
