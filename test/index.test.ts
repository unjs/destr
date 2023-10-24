import { expect, it, describe, vi } from "vitest";
import { destr, safeDestr } from "../src";

describe("destr", () => {
  it("returns the passed value if it's not a string", () => {
    const testCases = [
      { input: {} },
      { input: [] },
      { input: 123 },
      { input: true },
      { input: false },
      /* eslint-disable-next-line unicorn/no-null */
      { input: null },
      { input: Number.POSITIVE_INFINITY },
      { input: Number.NEGATIVE_INFINITY },
      { input: undefined },
    ];

    for (const testCase of testCases) {
      expect(destr(testCase.input)).toStrictEqual(testCase.input);
    }
  });

  it("parses string 'true' as boolean `true` case-insensitively", () => {
    expect(destr("true")).toStrictEqual(true);
    expect(destr("TRUE")).toStrictEqual(true);
  });

  it("parses string 'false' as boolean `false` case-insensitively", () => {
    expect(destr("false")).toStrictEqual(false);
    expect(destr("FALSE")).toStrictEqual(false);
  });

  it("parses string 'null' as `null`", () => {
    /* eslint-disable unicorn/no-null */
    expect(destr("null")).toBeNull();
    expect(destr("NULL")).toBeNull();
    /* eslint-enable unicorn/no-null */
  });

  it("parses string 'NaN' as `Number.NaN` case-insensitively", () => {
    expect(destr("nan")).toBeNaN();
    expect(destr("Nan")).toBeNaN();
  });

  it("parses string 'infinity' as `Number.POSITIVE_INFINITY` case-insensitively", () => {
    expect(destr("infinity")).toStrictEqual(Number.POSITIVE_INFINITY);
    expect(destr("Infinity")).toStrictEqual(Number.POSITIVE_INFINITY);
  });

  it("parses string '-infinity' as `Number.NEGATIVE_INFINITY` case-insensitively", () => {
    expect(destr("-infinity")).toStrictEqual(Number.NEGATIVE_INFINITY);
    expect(destr("-Infinity")).toStrictEqual(Number.NEGATIVE_INFINITY);
  });

  it("parses string 'undefined' as `undefined` case-insensitively", () => {
    expect(destr("undefined")).toBeUndefined();
    expect(destr("UNDEFINED")).toBeUndefined();
  });

  it("parses with surrounding spaces", () => {
    expect(destr("  true ")).toBe(true);
    expect(destr(" -123 ")).toStrictEqual(-123);
    expect(destr(' { "test": 123 }  ')).toStrictEqual({ test: 123 });
  });

  it("parses string with escape characters", () => {
    expect(destr('"a\\nb"')).toBe("a\nb");
  });

  it("parses valid JSON texts", () => {
    const testCases: Array<{ input: string; output: unknown }> = [
      { input: "{}", output: {} },
      { input: "[]", output: [] },
      { input: '{ "key": "value" }', output: { key: "value" } },
      { input: '{ "constructor": "value" }', output: { constructor: "value" } },
      // eslint-disable-next-line unicorn/no-null
      { input: '{ "constructor": null }', output: { constructor: null } },
      { input: "[1,2,3]", output: [1, 2, 3] },
    ];

    for (const testCase of testCases) {
      expect(destr(testCase.input)).toStrictEqual(testCase.output);
    }
  });

  it("prevents prototype pollution", () => {
    const spy = vi
      .spyOn(console, "warn")
      .mockImplementation((message: string) => console.log(message));

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const warnMessage = (key: string) =>
      `[destr] Dropping "${key}" key to prevent prototype pollution.`;

    const testCases = [
      {
        input: '{ "__proto__": {} }',
        output: {},
        warning: warnMessage("__proto__"),
      },
      {
        input: '{ "constructor": { "prototype": {} } }',
        output: {},
        warning: warnMessage("constructor"),
      },
      {
        input: '{ "constructor": { "prototype": null } }',
        output: {},
        warning: warnMessage("constructor"),
      },
    ];

    for (const testCase of testCases) {
      expect(destr(testCase.input)).toStrictEqual(testCase.output);
      expect(spy).toHaveBeenCalledWith(testCase.warning);
    }
  });

  it("returns the passed string if it's a invalid JSON text by default", () => {
    const testCases = [
      { input: "{     " },
      { input: "[     " },
      { input: '"     ' },
      { input: "[1,2,3]?" },
      { input: "invalid JSON text" },
    ];

    for (const testCase of testCases) {
      expect(destr(testCase.input)).toStrictEqual(testCase.input);
    }
  });

  it("parses valid string as is with fast path", () => {
    const testCases = [
      { input: '"Hello"', output: "Hello" },
      { input: ' "Hello" ', output: "Hello" },
      { input: ' "Invalid', output: ' "Invalid' },
    ];

    for (const testCase of testCases) {
      expect(destr(testCase.input)).toStrictEqual(testCase.output);
    }
  });

  it("throws an error if it's a invalid JSON texts with safeDestr", () => {
    const testCases = [
      { input: "{     ", output: "Unexpected end of JSON input" },
      { input: "[     ", output: "Unexpected end of JSON input" },
      { input: '"     ', output: "Unexpected end of JSON input" },
      { input: "[1,2,3]?", output: "Unexpected token" },
      { input: "invalid JSON text", output: "Invalid JSON" },
      { input: ' "Invalid', output: "Unexpected end of JSON input" },
    ];

    for (const testCase of testCases) {
      expect(() => safeDestr(testCase.input)).toThrowError(
        testCase.output || "",
      );
    }
  });

  it("throws an error on possible prototype pollution with safeDestr", () => {
    const testCases = [
      {
        input: '{ "__proto__": {} }',
        output: {},
      },
      {
        input: '{ "constructor": { "prototype": {} } }',
        output: {},
      },
      {
        input: '{ "constructor": { "prototype": null } }',
        output: {},
      },
    ];

    for (const testCase of testCases) {
      expect(() => safeDestr(testCase.input)).toThrowError(
        "[destr] Possible prototype pollution",
      );
    }
  });

  it("parses number", () => {
    const testCases: Array<{ input: string; output: unknown }> = [
      { input: "9", output: 9 },
      { input: "-9", output: -9 },
      { input: "0.30000000000000004", output: 0.300_000_000_000_000_04 },
      { input: "9007199254740991", output: 9_007_199_254_740_991 },
      { input: "9e2", output: 900 },
      { input: "9e+2", output: 900 },
      { input: "9e-2", output: 0.09 },
      { input: "9.9e10000", output: Number.POSITIVE_INFINITY },
      { input: "9.9e-10000", output: 0 },
    ];

    for (const testCase of testCases) {
      expect(destr(testCase.input)).toStrictEqual(testCase.output);
    }
  });
});
