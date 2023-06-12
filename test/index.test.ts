import { expect, it, describe, vi } from "vitest";
import { destr } from "../src";

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

  it("parses string 'undefined' as `undefined` case-insensitively", () => {
    expect(destr("undefined")).toBeUndefined();
    expect(destr("UNDEFINED")).toBeUndefined();
  });

  it("parses with surrounding spaces", () => {
    expect(destr("  true ")).toBe(true);
    expect(destr(" -123 ")).toStrictEqual(-123);
    expect(destr(' { "test": 123 }  ')).toStrictEqual({ test: 123 });
  });

  it("parses valid JSON texts", () => {
    const testCases = [
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

  it("returns the passed string if it's a invalid JSON text and `strict` option is set `false`", () => {
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

  it("throws an error if it's a invalid JSON texts and `strict` option is set `true`", () => {
    const testCases = [
      { input: "{     ", output: "Unexpected end of JSON input" },
      { input: "[     ", output: "Unexpected end of JSON input" },
      { input: '"     ', output: "Unexpected end of JSON input" },
      { input: "[1,2,3]?", output: "Unexpected token" },
      { input: "invalid JSON text", output: "Invalid JSON" },
    ];

    for (const testCase of testCases) {
      expect(() => destr(testCase.input, { strict: true })).toThrowError(
        testCase.output || ""
      );
    }
  });
});
