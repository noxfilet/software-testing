import eq from '../../src/eq.js';

describe('eq (self-designed test)', () => {
  // Normal execution: identical object reference should be equal
  test('returns true when comparing the same object reference', () => {
    const obj = { a: 1 };
    expect(eq(obj, obj)).toBe(true);
  });

  // Normal execution: two separately created but structurally identical objects are NOT equal
  test('returns false when comparing two different but identical objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    expect(eq(obj1, obj2)).toBe(false);
  });

  // Validates strict primitive comparison for strings
  test('returns correctly for primitive string equality', () => {
    expect(eq('a', 'a')).toBe(true);
    expect(eq('a', 'b')).toBe(false);
  });

  // Normal execution: Ensures eq distinguishes between primitive and boxed objects
  test('returns false for string primitive vs String object wrapper', () => {
    expect(eq('a', Object('a'))).toBe(false);
  });

  // NaN should be equal to NaN
  test('returns true when both values are NaN (SameValueZero behavior)', () => {
    expect(eq(NaN, NaN)).toBe(true);
  });

  // Test clearly different numeric primitives are not equal
  test('returns false for clearly different primitives', () => {
    expect(eq(1, 2)).toBe(false);
  });

  // Test array inputs
  test('returns correctly when comparing two array', () => {
    expect(eq([], [])).toBe(false);            // arrays have different references
    const arr = [1, 2];
    expect(eq(arr, arr)).toBe(true);           // same references
    expect(eq([1, 2], [2, 1])).toBe(false);    // different contents and references
  });
  
  // Edge case: unexpected inputs
  test('returns correctly when comparing special values', () => {
    expect(eq(null, undefined)).toBe(true);
    expect(eq(null, NaN)).toBe(false);
    expect(eq(NaN, undefined)).toBe(false);
    expect(eq(true, false)).toBe(false);
    expect(eq(true, true)).toBe(true);
  });

});
