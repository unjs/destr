// https://github.com/fastify/secure-json-parse
// https://github.com/hapijs/bourne
const suspectProtoRx =
  /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx =
  /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const bigIntRx =
  /(?<=[^\\]":\[?|[^\\]":\[.*[^\d*.])(-?\d{17,}|-?9(?:[1-9]07199254740991|0[1-9]7199254740991|00[89]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[89]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9]))(?=,|}[^"]|][^"])/g;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;

/* 
  Function to parse JSON
  If JSON has values presented in a lib's custom format (strings with digits and "n" character at the end), we just parse them to BigInt values (for backward compatibility with previous versions of the lib)
  If JSON has values greater than Number.MAX_SAFE_INTEGER, we convert those values to our custom format, then parse them to BigInt values.
  Other types of values are not affected and parsed as native JSON.parse() would parse them.

  Big numbers are found and marked using RegEx with these conditions:
    - Before the match there is no . and there is ": OR ":[ OR ":[anyNumberOf(anyCharacters) with no \ before them
    - The match itself has more than 16 digits OR (16 digits and any digit of the number is greater than that of the Number.MAX_SAFE_INTEGER). And it may have a - sign at the start
    - After the match there is , OR } without " after it OR ] without " after it
*/
const JSONParse = (json: string) => {
  const serializedData = json.replace(bigIntRx, `"$1n"`);

  return JSON.parse(serializedData, (_, value) => {
    const isCustomFormatBigInt =
      typeof value === "string" && Boolean(/^-?\d+n$/.test(value));

    if (isCustomFormatBigInt) {
      return BigInt(value.slice(0, -1));
    }

    return value;
  });
};

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
    return JSONParse(value);
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
