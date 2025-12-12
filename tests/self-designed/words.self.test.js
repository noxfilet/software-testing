import words from '../../src/words.js';

describe('words (self-designed tests)', () => {
  // Test: default behavior: split ASCII text into word tokens using the built-in default pattern.
  test('splits simple ASCII sentence into words using default pattern', () => {
    const input = 'fred, barney, & pebbles';

    const result = words(input);

    expect(result).toEqual(['fred', 'barney', 'pebbles']);
  });

  // Test: Custom pattern: when a regex is provided, it is used instead of the default
  test('uses custom pattern when provided', () => {
    const input = 'fred, barney, & pebbles';

    const result = words(input, /[^, ]+/g);

    expect(result).toEqual(['fred', 'barney', '&', 'pebbles']);
  });

  // Test: Alphanumeric handling with default pattern
  test('handles alphanumeric words in default mode', () => {
    const input = 'item1 item2a 123abc';

    const result = words(input);

    // default behavior: each alphanumeric chunk is treated as a word
    expect(result).toEqual(['item1', 'item2a', '123abc']);
  });

  // Test: Unicode handling: when Unicode letters are present, default should fall back to unicodeWords
  test('handles Unicode characters (falls back to unicodeWords)', () => {
    const input = 'café déjà vu';

    const result = words(input);

    // expectation based on lodash-style behavior: Unicode word segments
    expect(result).toEqual(['café', 'déjà', 'vu']);
  });

  // Test: empty input should return an empty list
  test('returns empty array for empty string input', () => {
    expect(words('')).toEqual([]);
  });

  // Test: Custom pattern that matches nothing: should return an empty array
  test('returns empty array when custom pattern matches nothing', () => {
    const input = 'no-digits-here';
    // match only digits
    const result = words(input, /\d+/g); 

    expect(result).toEqual([]);
  });

  // Edge case: Handle null/undefined input and return empty array
  test('returns empty array for null/undefined input', () => {
    expect(words(null)).toEqual([]);
    expect(words(undefined)).toEqual([]);
  });

  // Test: Undefined pattern: should use default pattern instead
  test('use default pattern for undefined pattern', () => {
    const input = 'fred, barney, & pebbles';
    expect(words(input, undefined)).toEqual(['fred', 'barney', 'pebbles']);
  });

  // Test: Null pattern, expect to coerces null to a RegExp
  test('find "null" if pattern is given as null', () => {
    const input = 'fred, barney, & pebbles';
    expect(words(input, null)).toEqual([]);   // creates RegExp("null")
  });
});