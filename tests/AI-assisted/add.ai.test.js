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
});
