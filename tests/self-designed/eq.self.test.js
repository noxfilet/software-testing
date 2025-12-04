import eq from '../../src/eq.js';

describe('eq (self-designed test)', () => {
  test('returns true when comparing the same object reference', () => {
    const obj = { a: 1 };
    expect(eq(obj, obj)).toBe(true);
  });

  test('returns false when comparing two different but identical objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    expect(eq(obj1, obj2)).toBe(false);
  });

  test('returns correctly for primitive string equality', () => {
    expect(eq('a', 'a')).toBe(true);
    expect(eq('a', 'b')).toBe(false);
  });

  test('returns false for string primitive vs String object wrapper', () => {
    expect(eq('a', Object('a'))).toBe(false);
  });

  test('returns true when both values are NaN (SameValueZero behavior)', () => {
    expect(eq(NaN, NaN)).toBe(true);
  });

  test('returns false for clearly different primitives', () => {
    expect(eq(1, 2)).toBe(false);
  });

  test('returns correctly when comparing two array', () => {
    expect(eq([], [])).toBe(true);
    expect(eq([1, 2], [1, 2])).toBe(true);
    expect(eq([1, 2], [2, 1])).toBe(false);
  });
  
  test('returns correctly when comparing special values', () => {
    expect(eq(null, undefined)).toBe(false);
    expect(eq(null, NaN)).toBe(false);
    expect(eq(NaN, undefined)).toBe(false);
    expect(eq(true, false)).toBe(false);
    expect(eq(true, true)).toBe(true);
  });

});
