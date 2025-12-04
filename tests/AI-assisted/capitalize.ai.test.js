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
    expect(capitalize(null)).toBe("");        // toString(null) → ""
    expect(capitalize(undefined)).toBe("");   // toString(undefined) → ""
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
  
// Unhappy / edge cases
  test("should handle numeric strings", () => {
    expect(capitalize("123abc")).toBe("123abc"); // first char is not a letter
  });

  test("should handle special characters at start", () => {
    expect(capitalize("!hello")).toBe("!hello"); // no change
    expect(capitalize("@WORLD")).toBe("@world"); // only lowercase rest
  });

  test("should handle whitespace-only string", () => {
    expect(capitalize("   ")).toBe("   "); // no trimming
  });

  test("should handle emoji or non-Latin characters", () => {
    expect(capitalize("😀smile")).toBe("😀smile"); // emoji stays
    expect(capitalize("ñandú")).toBe("Ñandú"); // works with accented letters
  });

  test("should handle array input (coerced to string)", () => {
    expect(capitalize(["hello"])).toBe("Hello"); // array becomes "hello"
    expect(capitalize(["HELLO", "WORLD"])).toBe("Hello,world"); // coerced string
  });

  test("should handle object input", () => {
    expect(capitalize({ key: "value" })).toBe("[object object]"); // JS default coercion
  });

  test("should handle very long string", () => {
    const longStr = "a".repeat(1000);
    expect(capitalize(longStr)).toBe("A" + "a".repeat(999));
  });

});
