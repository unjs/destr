export type JSONObject = { [key: string]: JSONValue }
export type JSONValue = true | false | null | string | Number | JSONObject | JSONValue[]

// https://github.com/fastify/secure-json-parse
// https://github.com/hapijs/bourne
const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/

const STR_MAP = {
  true: true,
  false: false,
  null: null,
  nan: NaN,
  infinity: Infinity,
  undefined
}

function jsonParseTransform (key: string, value: any): any {
  if (key === '__proto__' || key === 'prototype' || key === 'constructor') {
    return
  }
  return value
}

export default function destr (val: string | any): JSONValue | undefined {
  if (typeof val !== 'string') {
    return val
  }

  const _lval = val.toLowerCase()
  if (_lval in STR_MAP) {
    // @ts-ignore
    return STR_MAP[_lval]
  }

  if (val[0] !== '"' && val[0] !== '{' && val[0] !== '[') {
    return val
  }

  if (suspectProtoRx.test(val) || suspectConstructorRx.test(val)) {
    return JSON.parse(val, jsonParseTransform)
  }

  return JSON.parse(val)
}
