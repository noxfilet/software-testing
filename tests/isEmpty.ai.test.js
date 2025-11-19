// tests/isEmpty.ai.test.js
import isEmpty from '../src/isEmpty.js';

describe('isEmpty (AI-assisted edge case tests)', () => {
  // ───────────────────────────────────────────────
  // Strings & string-like
  // ───────────────────────────────────────────────
  test('returns true for empty string literal', () => {
    expect(isEmpty('')).toBe(true);
  });

  test('returns false for whitespace-only strings (not treated as empty)', () => {
    expect(isEmpty('   ')).toBe(false);
    expect(isEmpty('\n\t')).toBe(false);
  });

  test('handles String objects (wrapper) similar to strings', () => {
    // Depending on implementation, this might be considered array-like or an object.
    // We assert that an empty String object is empty and non-empty is not.
    expect(isEmpty(new String(''))).toBe(true);
    expect(isEmpty(new String('x'))).toBe(false);
  });

  // ───────────────────────────────────────────────
  // Numbers, booleans, NaN
  // ───────────────────────────────────────────────
  test('returns false for primitive numbers (not collections)', () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(42)).toBe(false);
    expect(isEmpty(NaN)).toBe(false);
  });

  test('returns false for booleans', () => {
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });

  // ───────────────────────────────────────────────
  // Arguments object
  // ───────────────────────────────────────────────
  function getIsEmptyOfArguments() {
    return isEmpty(arguments);
  }

  function getIsEmptyOfNonEmptyArguments() {
    // eslint-disable-next-line prefer-rest-params
    return isEmpty(arguments);
  }

  test('returns true for empty arguments object', () => {
    expect(getIsEmptyOfArguments()).toBe(true);
  });

  test('returns false for non-empty arguments object', () => {
    expect(getIsEmptyOfNonEmptyArguments('a', 'b')).toBe(false);
  });

  // ───────────────────────────────────────────────
  // Typed arrays
  // ───────────────────────────────────────────────
  test('returns true for empty typed arrays', () => {
    expect(isEmpty(new Uint8Array())).toBe(true);
    expect(isEmpty(new Int16Array(0))).toBe(true);
  });

  test('returns false for non-empty typed arrays', () => {
    const ta = new Uint8Array(3);
    ta[0] = 1;
    expect(isEmpty(ta)).toBe(false);
  });

  // ───────────────────────────────────────────────
  // Objects with prototypes / no prototype
  // ───────────────────────────────────────────────
  test('treats object with only inherited enumerable properties as empty', () => {
    const proto = { inherited: 1 };
    const obj = Object.create(proto);

    expect(isEmpty(obj)).toBe(true); // no own enumerable props
  });

  test('treats object with symbol-keyed own property as non-empty', () => {
    const sym = Symbol('secret');
    const obj = {};
    obj[sym] = 123;

    // If implementation ignores symbols, this might fail and reveal a design choice / bug
    expect(isEmpty(obj)).toBe(false);
  });

  test('treats object with non-enumerable own property as empty', () => {
    const obj = {};
    Object.defineProperty(obj, 'hidden', {
      value: 1,
      enumerable: false
    });

    expect(isEmpty(obj)).toBe(true);
  });

  test('treats nested empty object as non-empty because top-level has a key', () => {
    const obj = { nested: {} };

    expect(isEmpty(obj)).toBe(false);
  });

  test('handles objects created via Object.create(null)', () => {
    const obj = Object.create(null);

    expect(isEmpty(obj)).toBe(true);
    obj.a = 1;
    expect(isEmpty(obj)).toBe(false);
  });

  // ───────────────────────────────────────────────
  // Array-likes & weird shapes
  // ───────────────────────────────────────────────
  test('treats objects with length: 0 and indexed props as non-empty', () => {
    const obj = { 0: 'a', length: 0 };

    // Depending on isArrayLike implementation, this may or may not be treated as array-like.
    // Here we assert that the presence of property "0" makes it non-empty.
    expect(isEmpty(obj)).toBe(false);
  });

  test('treats objects with length: 0 and no indexed props as empty', () => {
    const obj = { length: 0 };

    expect(isEmpty(obj)).toBe(true);
  });

  test('treats sparse arrays with a high last index as non-empty', () => {
    const arr = [];
    arr[3] = 'x'; // holes at 0,1,2

    expect(isEmpty(arr)).toBe(false);
  });

  // ───────────────────────────────────────────────
  // Built-in objects
  // ───────────────────────────────────────────────
  test('returns true for Date instances without extra props', () => {
    const d = new Date();
    expect(isEmpty(d)).toBe(true);
  });

  test('returns false for Date instances with added enumerable property', () => {
    const d = new Date();
    d.meta = 'x';
    expect(isEmpty(d)).toBe(false);
  });

  test('returns true for RegExp instances without extra props', () => {
    const re = /abc/;
    expect(isEmpty(re)).toBe(true);
  });

  test('returns false for RegExp instances with added enumerable property', () => {
    const re = /abc/;
    re.flagged = true;
    expect(isEmpty(re)).toBe(false);
  });

  // ───────────────────────────────────────────────
  // Functions
  // ───────────────────────────────────────────────
  test('returns true for plain functions with no own enumerable properties', () => {
    function f() {}
    expect(isEmpty(f)).toBe(true);
  });

  test('returns false for functions with added own enumerable properties', () => {
    function f() {}
    f.meta = 123;
    expect(isEmpty(f)).toBe(false);
  });

  // ───────────────────────────────────────────────
  // Map & Set edge cases
  // ───────────────────────────────────────────────
  test('treats Map with deleted entries as empty when size reaches 0', () => {
    const m = new Map([['x', 1]]);
    m.delete('x');
    expect(isEmpty(m)).toBe(true);
  });

  test('treats Set with multiple deletes correctly', () => {
    const s = new Set([1, 2]);
    s.delete(1);
    s.delete(2);
    expect(isEmpty(s)).toBe(true);
  });
});