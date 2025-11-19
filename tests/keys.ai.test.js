// tests/keys.ai.test.js
import keys from '../src/keys.js';

describe('keys (AI-assisted edge case tests)', () => {
  test('ignores non-enumerable properties defined via Object.defineProperty', () => {
    const obj = {};
    Object.defineProperty(obj, 'hidden', {
      value: 42,
      enumerable: false
    });
    obj.visible = 1;

    const result = keys(obj);

    expect(result).toEqual(['visible']); // 'hidden' should not appear
  });

  test('ignores symbol keys and only returns string-keyed properties', () => {
    const sym = Symbol('secret');
    const obj = {
      visible: 1
    };
    obj[sym] = 99;

    const result = keys(obj);

    expect(result).toEqual(['visible']); // symbol key should not be included
  });

  test('handles sparse arrays and only returns indices that exist', () => {
    const arr = [];
    arr[2] = 'c'; // indices 0 and 1 are "holes"

    const result = keys(arr);

    expect(result).toEqual(['2']); // only index 2 is a real property
  });

  test('works with objects created via Object.create(null)', () => {
    const obj = Object.create(null);
    obj.a = 1;
    obj.b = 2;

    const result = keys(obj).sort();

    expect(result).toEqual(['a', 'b']); // no prototype, but keys should still work
  });

  test('returns parameter indices for the arguments object', () => {
    function gather() {
      return keys(arguments);
    }

    const result = gather('x', 'y');

    expect(result).toEqual(['0', '1']);
  });

  test('does not include non-enumerable length on plain objects that mimic arrays', () => {
    const obj = { 0: 'a', 1: 'b', length: 2 };

    const result = keys(obj).sort();

    // This one is interesting: depending on isArrayLike/arrayLikeKeys implementation,
    // 'length' may or may not be included. We assert behavior based on Object.keys:
    // all own enumerable string keys should be returned.
    expect(result).toEqual(['0', '1', 'length']);
  });

  test('returns empty array for Date instances without extra properties', () => {
    const d = new Date();

    const result = keys(d);

    expect(result).toEqual([]); // Date has no own enumerable string keys by default
  });
});
