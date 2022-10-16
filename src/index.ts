// https://github.com/fastify/secure-json-parse
// https://github.com/hapijs/bourne
const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/

const JsonSigRx = /^["{[]|^-?[0-9][0-9.]{0,14}$/

function jsonParseTransform (key: string, value: any): any {
  if (key === '__proto__' || key === 'constructor') {
    return
  }
  return value
}

export default function destr (val: any): any {
  if (typeof val !== 'string') {
    return val
  }
  if(val === '') { return {} }

  const _lval = val.toLowerCase()
  if (_lval === 'true') { return true }
  if (_lval === 'false') { return false }
  if (_lval === 'null') { return null }
  if (_lval === 'nan') { return NaN }
  if (_lval === 'infinity') { return Infinity }
  if (_lval === 'undefined') { return undefined }

  if (!JsonSigRx.test(val)) {
    return val
  }

  try {
    if (suspectProtoRx.test(val) || suspectConstructorRx.test(val)) {
      return JSON.parse(val, jsonParseTransform)
    }
    return JSON.parse(val)
  } catch (_e) {
    return val
  }
}
