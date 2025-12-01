import capitalize from '../../src/capitalize.js';

describe('capitalize (self-designed tests)', () => {
  test('converts the first character to uppercase and the rest to lowercase', () => {
    expect(capitalize('FRED')).toBe('Fred');
    expect(capitalize('jOhN')).toBe('John');
  });

  test('works with single-character strings', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('Z')).toBe('Z');
  });

  test('returns empty string when given empty input', () => {
    expect(capitalize('')).toBe('');
  });

  test('handles non-string input by converting it to string first', () => {
    expect(capitalize(123)).toBe('123');      // toString(123) → "123"
    expect(capitalize(null)).toBe('');        // toString(null) → ""
    expect(capitalize(undefined)).toBe('');   // toString(undefined) → ""
  });

  test('handles strings starting with non-alphabetic characters', () => {
    expect(capitalize('-hello')).toBe('-hello');
    expect(capitalize('1world')).toBe('1world');
  });

  test('trims nothing — preserves whitespace exactly as toString() provides', () => {
    expect(capitalize('  space')).toBe('  space');  // no trimming
  });
});
