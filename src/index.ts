// https://github.com/fastify/secure-json-parse
// https://github.com/hapijs/bourne
const suspectProtoRx =
  /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx =
  /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;

const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;

function jsonParseTransform(key: string, value: any): any {
  if (
    key === "__proto__" ||
    (key === "constructor" &&
      value &&
      typeof value === "object" &&
      "prototype" in value)
  ) {
    warnKeyDropped(key);
    return;
  }
  return value;
}

function warnKeyDropped(key: string): void {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}

export type Options = {
  strict?: boolean;
};

export function destr<T = unknown>(value: any, options: Options = {}): T {
  if (typeof value !== "string") {
    return value;
  }
  if (
    value[0] === '"' &&
    value[value.length - 1] === '"' &&
    value.indexOf("\\") === -1
  ) {
    return value.slice(1, -1) as T;
  }

  const _value = value.trim();

  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true as T;
      }
      case "false": {
        return false as T;
      }
      case "undefined": {
        return undefined as T;
      }
      case "null": {
        return null as T;
      }
      case "nan": {
        return Number.NaN as T;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY as T;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY as T;
      }
    }
  }

  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value as T;
  }

  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value as T;
  }
}

export function safeDestr<T = unknown>(value: any, options: Options = {}): T {
  return destr<T>(value, { ...options, strict: true });
}

export default destr;
