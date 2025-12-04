import keys from '../../src/keys.js';

describe('keys (self-designed tests)', () => {
  test('returns own enumerable keys of a plain object', () => {
    const obj = { a: 1, b: 2 };
    expect(keys(obj).sort()).toEqual(['a', 'b']);
  });

  test('ignores prototype properties', () => {
    function Foo() {
      this.x = 1;
    }
    Foo.prototype.y = 2;

    const result = keys(new Foo());
    expect(result).toEqual(['x']);  // Only own key
  });

  test('treats strings as array-like and returns indices', () => {
    const result = keys('hi');
    expect(result).toEqual(['0', '1']);
  });

  test('handles arrays by returning their indices', () => {
    const arr = ['a', 'b', 'c'];
    expect(keys(arr)).toEqual(['0', '1', '2']);
  });

  test('coerces non-object values to objects (ES spec)', () => {
    // Object(123) has no enumerable keys
    expect(keys(123)).toEqual([]);
  });

  test('returns empty array for null or undefined or boolean', () => {
    expect(keys(null)).toEqual([]);
    expect(keys(undefined)).toEqual([]);
    expect(keys(true)).toEqual([]);
  });
});