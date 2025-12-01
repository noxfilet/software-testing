import capitalize from '../../src/capitalize.js';

describe("capitalize()", () => {

  test("should capitalize a normal word", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("should lowercase remaining characters", () => {
    expect(capitalize("hELLO")).toBe("Hello");
  });

  test("should handle a single character", () => {
    expect(capitalize("h")).toBe("H");
  });

  test("should handle empty string", () => {
    expect(capitalize("")).toBe("");
  });

  test("should convert non-string input to string first", () => {
    expect(capitalize(123)).toBe("123");
    expect(capitalize(true)).toBe("True");
    expect(capitalize(false)).toBe("False");
    expect(capitalize(null)).toBe("Null");
    expect(capitalize(undefined)).toBe("Undefined");
  });

  test("should handle strings that already begin uppercase", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  test("should not trim whitespace", () => {
    expect(capitalize(" hello")).toBe(" hello");
  });

  test("should handle mixed alphanumeric input", () => {
    expect(capitalize("jAvA123script")).toBe("Java123script");
  });

});
