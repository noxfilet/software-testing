// tests/keys.ai.test.js
import keys from '../../src/keys.js';

describe('keys (AI-assisted edge case tests)', () => {
  // ───────────────────────────────────────────────
  // Non-enumerable vs enumerable, symbols, etc.
  // ───────────────────────────────────────────────
  test('ignores non-enumerable properties defined via Object.defineProperty', () => {
    const obj = {};
    Object.defineProperty(obj, 'hidden', {
      value: 42,
      enumerable: false
    });
    obj.visible = 1;

    const result = keys(obj).sort();

    expect(result).toEqual(['visible']); // 'hidden' should not appear
  });

  test('ignores symbol keys and only returns string-keyed properties', () => {
    const sym = Symbol('secret');
    const obj = { visible: 1 };
    obj[sym] = 99;

    const result = keys(obj);

    expect(result).toEqual(['visible']); // symbol key should not be included
  });

  test('object with only symbol keys is reported as empty key list', () => {
    const sym1 = Symbol('a');
    const sym2 = Symbol('b');
    const obj = {};
    obj[sym1] = 1;
    obj[sym2] = 2;

    const result = keys(obj);

    expect(result).toEqual([]); // only symbol keys → no string keys returned
  });

  test('object with both string and symbol keys only includes string keys', () => {
    const sym = Symbol('id');
    const obj = { a: 1 };
    obj[sym] = 123;

    const result = keys(obj).sort();

    expect(result).toEqual(['a']);
  });

  test('object with getter/setter enumerable property includes that key', () => {
    const obj = {};
    let internal = 0;
    Object.defineProperty(obj, 'value', {
      enumerable: true,
      configurable: true,
      get() {
        return internal;
      },
      set(v) {
        internal = v;
      }
    });

    const result = keys(obj);

    expect(result).toEqual(['value']);
  });

  test('object with only non-enumerable properties is treated as having no keys', () => {
    const obj = {};
    Object.defineProperty(obj, 'hidden1', { value: 1, enumerable: false });
    Object.defineProperty(obj, 'hidden2', { value: 2, enumerable: false });

    const result = keys(obj);

    expect(result).toEqual([]);
  });

  // ───────────────────────────────────────────────
  // Prototypes & inheritance
  // ───────────────────────────────────────────────
  test('works with objects created via Object.create(null)', () => {
    const obj = Object.create(null);
    obj.a = 1;
    obj.b = 2;

    const result = keys(obj).sort();

    expect(result).toEqual(['a', 'b']); // no prototype, but keys should still work
  });

  test('treats object with only inherited enumerable properties as having no own keys', () => {
    const proto = { inherited: 1 };
    const obj = Object.create(proto);

    const result = keys(obj);

    expect(result).toEqual([]);
  });

  test('own properties override inherited ones but only own keys are returned', () => {
    const proto = { a: 1, b: 2 };
    const obj = Object.create(proto);
    obj.a = 10;
    obj.c = 3;

    const result = keys(obj).sort();

    expect(result).toEqual(['a', 'c']); // no 'b' (inherited), and 'a' is own
  });

  test('handles deep prototype chains (only top-level own keys)', () => {
    const grandparent = { a: 1 };
    const parent = Object.create(grandparent);
    parent.b = 2;
    const child = Object.create(parent);
    child.c = 3;

    const result = keys(child).sort();

    expect(result).toEqual(['c']); // only own keys, not parents
  });

  // ───────────────────────────────────────────────
  // Arrays, sparse arrays, and index-like keys
  // ───────────────────────────────────────────────
  test('handles sparse arrays and only returns indices that exist', () => {
    const arr = [];
    arr[2] = 'c'; // indices 0 and 1 are "holes"

    const result = keys(arr);

    // According to Object.keys, only index "2" should exist.
    // If implementation returns ["0","1","2"], this reveals a bug.
    expect(result).toEqual(['2']); // only index 2 is a real property
  });

  test('handles arrays with non-index keys as well', () => {
    const arr = ['a', 'b'];
    arr.foo = 'bar';

    const result = keys(arr).sort();

    // indices come first, then 'foo' as an own enumerable prop
    expect(result).toEqual(['0', '1', 'foo']);
  });

  test('handles negative index keys on arrays as normal string keys', () => {
    const arr = ['a', 'b'];
    arr[-1] = 'neg';

    const result = keys(arr).sort();

    expect(result).toEqual(['-1', '0', '1']);
  });

  test('handles large index on arrays where length grows but only real indices are keys', () => {
    const arr = [];
    arr[100] = 'x';

    const result = keys(arr);

    expect(result).toEqual(['100']); // length is 101, but only index '100' is an actual property
  });

  // ───────────────────────────────────────────────
  // Array-like objects & arguments
  // ───────────────────────────────────────────────
  test('returns parameter indices for the arguments object', () => {
    function gather() {
      return keys(arguments);
    }

    const result = gather('x', 'y');

    expect(result).toEqual(['0', '1']);
  });

  test('returns empty array for empty arguments object', () => {
    function gatherEmpty() {
      return keys(arguments);
    }

    const result = gatherEmpty();

    expect(result).toEqual([]);
  });

  test('treats objects that mimic arrays (0,1,length) as having those keys', () => {
    const obj = { 0: 'a', 1: 'b', length: 2 };

    const result = keys(obj).sort();

    // For non-true-array "array-like" objects, we still expect all own enumerable keys
    expect(result).toEqual(['0', '1', 'length']);
  });

  test('treats objects with length: 0 and indexed props as non-empty key list', () => {
    const obj = { 0: 'a', length: 0 };

    const result = keys(obj).sort();

    expect(result).toEqual(['0', 'length']);
  });

  test('treats objects with length: 0 and no indexed props as having only "length"', () => {
    const obj = { length: 0 };

    const result = keys(obj);

    // According to Object.keys({ length: 0 }) -> ['length']
    // If implementation treats array-like differently, this may fail.
    expect(result).toEqual(['length']);
  });

  // ───────────────────────────────────────────────
  // Primitive wrappers & boxed values
  // ───────────────────────────────────────────────
  test('handles String objects (wrapper) as array-like indices', () => {
    const s = new String('hi'); // eslint-disable-line no-new-wrappers
    const result = keys(s).sort();

    // String wrapper typically has indices '0', '1' and maybe 'length' as non-enumerable.
    expect(result).toEqual(['0', '1']);
  });

  test('Number object wrapper has no enumerable own string keys by default', () => {
    const n = new Number(123); // eslint-disable-line no-new-wrappers

    const result = keys(n);

    expect(result).toEqual([]);
  });

  test('Boolean object wrapper has no enumerable own string keys by default', () => {
    const b = new Boolean(true); // eslint-disable-line no-new-wrappers

    const result = keys(b);

    expect(result).toEqual([]);
  });

  test('primitive numbers have no keys (coerced Object(123) has none)', () => {
    const result = keys(123);

    expect(result).toEqual([]);
  });

  test('primitive booleans have no keys', () => {
    expect(keys(true)).toEqual([]);
    expect(keys(false)).toEqual([]);
  });

  test('primitive null/undefined produce empty key arrays', () => {
    expect(keys(null)).toEqual([]);
    expect(keys(undefined)).toEqual([]);
  });

  // ───────────────────────────────────────────────
  // Built-in objects: Date, RegExp, Map, Set, etc.
  // ───────────────────────────────────────────────
  test('returns empty array for Date instances without extra properties', () => {
    const d = new Date();

    const result = keys(d);

    expect(result).toEqual([]); // Date has no own enumerable string keys by default
  });

  test('includes added enumerable properties on Date instances', () => {
    const d = new Date();
    d.meta = 'x';

    const result = keys(d);

    expect(result).toEqual(['meta']);
  });

  test('returns empty array for RegExp instances without extra properties', () => {
    const re = /abc/;

    const result = keys(re);

    expect(result).toEqual([]);
  });

  test('includes added enumerable properties on RegExp instances', () => {
    const re = /abc/;
    re.flagged = true;

    const result = keys(re);

    expect(result).toEqual(['flagged']);
  });

  test('Map instance with entries still has no own enumerable string keys by default', () => {
    const m = new Map([['x', 1]]);

    const result = keys(m);

    expect(result).toEqual([]);
  });

  test('Set instance with entries still has no own enumerable string keys by default', () => {
    const s = new Set([1, 2, 3]);

    const result = keys(s);

    expect(result).toEqual([]);
  });

  test('ArrayBuffer has no enumerable own string keys', () => {
    const buf = new ArrayBuffer(8);

    const result = keys(buf);

    expect(result).toEqual([]);
  });

  // ───────────────────────────────────────────────
  // Functions
  // ───────────────────────────────────────────────
  test('plain functions with no own enumerable props have no keys', () => {
    function f() {}

    const result = keys(f);

    expect(result).toEqual([]);
  });

  test('functions with added enumerable props are keyed correctly', () => {
    function f() {}
    f.meta = 123;
    f.nameOverride = 'custom';

    const result = keys(f).sort();

    expect(result).toEqual(['meta', 'nameOverride']);
  });

  // ───────────────────────────────────────────────
  // Frozen / sealed objects
  // ───────────────────────────────────────────────
  test('Object.freeze does not affect which keys are returned', () => {
    const obj = Object.freeze({ a: 1, b: 2 });

    const result = keys(obj).sort();

    expect(result).toEqual(['a', 'b']);
  });

    test('Object.seal does not affect which keys are returned', () => {
    const obj = { a: 1 };

    const before = keys(obj).sort();

    Object.seal(obj);

    const after = keys(obj).sort();

    // Sealing should not change which own enumerable keys exist
    expect(before).toEqual(['a']);
    expect(after).toEqual(['a']);
    });
    
  // ───────────────────────────────────────────────
  // Nested / complex shapes
  // ───────────────────────────────────────────────
  test('only returns top-level keys for nested objects', () => {
    const obj = {
      a: { inner: 1 },
      b: [1, 2, 3],
      c: 'str'
    };

    const result = keys(obj).sort();

    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('handles mixture of numeric-like and normal string keys', () => {
    const obj = {
      '0': 'zero',
      '01': 'not-an-index',
      normal: true
    };

    const result = keys(obj).sort();

    expect(result).toEqual(['0', '01', 'normal']);
  });
});
