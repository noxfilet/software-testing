import keys from '../../src/keys.js';

describe('keys (self-designed tests)', () => {
  // Test: Plain objects should return only own enumerable property name
  test('returns own enumerable keys of a plain object', () => {
    const obj = { a: 1, b: 2 };
    expect(keys(obj).sort()).toEqual(['a', 'b']);
  });

  // Test: must not include inherited (prototype) properties
  test('ignores prototype properties', () => {
    function Foo() {
      this.x = 1;
    }
    Foo.prototype.y = 2;

    const result = keys(new Foo());
    expect(result).toEqual(['x']);  // Only own key
  });

  // Test: treat string as array-like, their indices are enumerable own properties
  test('treats strings as array-like and returns indices', () => {
    const result = keys('hi');
    expect(result).toEqual(['0', '1']);
  });

  // Test: array, their indices are enumerable own properties
  test('handles arrays by returning their indices', () => {
    const arr = ['a', 'b', 'c'];
    expect(keys(arr)).toEqual(['0', '1', '2']);
  });

  // Test: primitives, coerced to objects with no own enumerable keys
  test('coerces non-object values to objects (ES spec)', () => {
    // Object(123) has no enumerable keys
    expect(keys(123)).toEqual([]);
  });

  // Edge case: null & undefined cannot be object-coerced and return empty array
  test('returns empty array for null or undefined or boolean', () => {
    expect(keys(null)).toEqual([]);
    expect(keys(undefined)).toEqual([]);
    expect(keys(true)).toEqual([]);
  });
});