export type JSONObject = { [key: string]: JSONValue }
export type JSONValue = true | false | null | string | Number | JSONObject | JSONValue[]
export type DestrValue = JSONValue | undefined

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

export default function destr (val: string | any): DestrValue {
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

  return JSON.parse(val, jsonParseTransform)
}
