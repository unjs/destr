// https://github.com/fastify/secure-json-parse
// https://github.com/hapijs/bourne
const suspectProtoRx =
  /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx =
  /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;

const JsonSigRx = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;

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

export default function destr<T = unknown>(
  value: any,
  options: Options = {}
): T {
  if (typeof value !== "string") {
    return value;
  }

  const _lval = value.toLowerCase().trim();
  if (_lval === "true") {
    return true as T;
  }
  if (_lval === "false") {
    return false as T;
  }
  if (_lval === "undefined") {
    return undefined as T;
  }
  if (_lval === "null") {
    // eslint-disable-next-line unicorn/no-null
    return null as T;
  }
  if (_lval === "nan") {
    return Number.NaN as T;
  }
  if (_lval === "infinity") {
    return Number.POSITIVE_INFINITY as T;
  }
  if (_lval === "-infinity") {
    return Number.NEGATIVE_INFINITY as T;
  }

  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("Invalid JSON");
    }
    return value as T;
  }

  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
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
