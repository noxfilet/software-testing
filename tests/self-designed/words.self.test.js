import words from '../../src/words.js';

describe('words (self-designed tests)', () => {
  test('splits simple ASCII sentence into words using default pattern', () => {
    const input = 'fred, barney, & pebbles';

    const result = words(input);

    expect(result).toEqual(['fred', 'barney', 'pebbles']);
  });

  test('uses custom pattern when provided', () => {
    const input = 'fred, barney, & pebbles';

    const result = words(input, /[^, ]+/g);

    expect(result).toEqual(['fred', 'barney', '&', 'pebbles']);
  });

  test('handles alphanumeric words in default mode', () => {
    const input = 'item1 item2a 123abc';

    const result = words(input);

    // default behavior: each alphanumeric chunk is treated as a word
    expect(result).toEqual(['item1', 'item2a', '123abc']);
  });

  test('handles Unicode characters (falls back to unicodeWords)', () => {
    const input = 'café déjà vu';

    const result = words(input);

    // expectation based on lodash-style behavior: Unicode word segments
    expect(result).toEqual(['café', 'déjà', 'vu']);
  });

  test('returns empty array for empty string input', () => {
    expect(words('')).toEqual([]);
  });

  test('returns empty array when custom pattern matches nothing', () => {
    const input = 'no-digits-here';
    // match only digits
    const result = words(input, /\d+/g); 

    expect(result).toEqual([]);
  });

  test('returns empty array for null/undefined input', () => {
    expect(words(null)).toEqual([]);
    expect(words(undefined)).toEqual([]);
  });

  test('use default pattern for null or undefined pattern ', () => {
    const input = 'fred, barney, & pebbles';
    expect(words(input), null).toEqual([]);
    expect(words(input), undefined).toEqual([]);
  });
});