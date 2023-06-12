// https://github.com/fastify/secure-json-parse
// https://github.com/hapijs/bourne
const suspectProtoRx =
  /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx =
  /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;

const JsonSigRx = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;

function jsonParseTransform(key: string, value: any): any {
  if (key === "__proto__") {
    return;
  }
  if (
    key === "constructor" &&
    value &&
    typeof value === "object" &&
    "prototype" in value
  ) {
    // Has possible malicious prototype
    return;
  }
  return value;
}

export type Options = {
  strict?: boolean;
};

export default function destr(value: any, options: Options = {}): any {
  if (typeof value !== "string") {
    return value;
  }

  const _lval = value.toLowerCase().trim();
  if (_lval === "true") {
    return true;
  }
  if (_lval === "false") {
    return false;
  }
  // eslint-disable-next-line unicorn/no-null
  if (_lval === "null") {
    return null;
  }
  if (_lval === "nan") {
    return Number.NaN;
  }
  if (_lval === "infinity") {
    return Number.POSITIVE_INFINITY;
  }
  if (_lval === "undefined") {
    return undefined;
  }

  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("Invalid JSON");
    }
    return value;
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
    return value;
  }
}
