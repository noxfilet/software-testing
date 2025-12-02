import add from '../../src/add.js';

describe("add()", () => {
  test("should add two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("should add negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test("should handle mixing positive and negative numbers", () => {
    expect(add(5, -2)).toBe(3);
  });

  test("should handle zero", () => {
    expect(add(0, 5)).toBe(5);
    expect(add(5, 0)).toBe(5);
  });
  
// Unhappy cases
  test('returns NaN when one argument is NaN', () => {
    expect(add(NaN, 5)).toBeNaN();
    expect(add(5, NaN)).toBeNaN();
  });

  test('handles null values', () => {
    expect(add(null, 5)).toBe(5); // if null coerces to 0
    expect(add(5, null)).toBe(5);
  });

  test('handles boolean values', () => {
    expect(add(true, 5)).toBe(6); // true coerces to 1
    expect(add(false, 5)).toBe(5);
  });

  test('handles string inputs', () => {
    expect(add('3', 5)).toBe(8); // if coercion happens
    expect(add(5, '3')).toBe(8);
  });

  test('handles object inputs', () => {
    expect(add({}, 5)).toBeNaN(); // {} cannot be coerced to number
    expect(add(5, {})).toBeNaN();
  });

  test('handles both arguments missing', () => {
    expect(add(undefined, undefined)).toBe(0); // if default is 0
  });

});
