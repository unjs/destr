// https://github.com/fastify/secure-json-parse
// https://github.com/hapijs/bourne
const suspectProtoRx =
  /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx =
  /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;

const JsonSigRx = /^\s*["[{]|^\s*-?\d+(\.\d+)?([Ee][+-]?\d+)?\s*$/;

function warnKeyDropped(key: string): void {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}

export type Options = {
  strict?: boolean;
  reviver?: (this: any, key: string, value: any) => any;
};

export function destr<T = unknown>(
  value: any,
  optionsOrReviver?: Options | ((this: any, key: string, value: any) => any),
): T {
  if (typeof value !== "string") {
    return value;
  }

  const options =
    typeof optionsOrReviver === "function"
      ? { reviver: optionsOrReviver }
      : optionsOrReviver || {};

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
      return JSON.parse(value, (key, val) => {
        if (
          key === "__proto__" ||
          (key === "constructor" &&
            val &&
            typeof val === "object" &&
            "prototype" in val)
        ) {
          warnKeyDropped(key);
          return;
        }
        if (options.reviver) {
          return options.reviver(key, val);
        }
        return val;
      });
    }
    return JSON.parse(value, options.reviver);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value as T;
  }
}

export function safeDestr<T = unknown>(
  value: any,
  optionsOrReviver?: Options | ((this: any, key: string, value: any) => any),
): T {
  const options =
    typeof optionsOrReviver === "function"
      ? { reviver: optionsOrReviver }
      : optionsOrReviver || {};
  return destr<T>(value, { ...options, strict: true });
}

export default destr;
