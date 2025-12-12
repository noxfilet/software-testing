import capitalize from '../../src/capitalize.js';

describe('capitalize (self-designed tests)', () => {
  // test normal execution to convert to sentence case
  test('converts the first character to uppercase and the rest to lowercase', () => {
    expect(capitalize('FRED')).toBe('Fred');
    expect(capitalize('jOhN')).toBe('John');
  });

  // test if there is only one character
  test('works with single-character strings', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('Z')).toBe('Z');
  });

  // test if there is error for empty string
  test('returns empty string when given empty input', () => {
    expect(capitalize('')).toBe('');
  });

  // test if there is error working with non-string inputs
  // Note: capitalize() applied toString() before actually capitalizing
  test('handles non-string input by converting it to string first', () => {
    expect(capitalize(123)).toBe('123');      // toString(123) → "123"
    expect(capitalize(null)).toBe('');        // toString(null) → ""
    expect(capitalize(undefined)).toBe('');   // toString(undefined) → ""
    expect(capitalize(true)).toBe("True");    // toString(true) → "true"
    expect(capitalize(false)).toBe("False");  // toString(false) → "false"
  });

  // test if there is error for special characters
  test('handles strings starting with non-alphabetic characters', () => {
    expect(capitalize('-hello')).toBe('-hello');
    expect(capitalize('1world')).toBe('1world');
  });

  // test if whitespace affects capitalizing, expect no trimming
  test('trims nothing — preserves whitespace exactly as toString() provides', () => {
    expect(capitalize('  space')).toBe('  space');
  });
});
