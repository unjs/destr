# destr

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

A faster, secure and convenient alternative for [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).

## Choosing the right tool

These libraries overlap in places, but they do not all solve the same problem. `destr` and `fast-json-parse` are direct string-parsing alternatives; the others serialize values and parse their own output for a round trip.

### String parsers

| Library                                                          | Main API                            | Distinctive behavior                                                                                                         | Choose when                                                                                       |
| ---------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`destr`](https://github.com/unjs/destr)                         | `destr(value)` / `safeDestr(value)` | Returns invalid input unchanged by default, offers a strict mode, and filters prototype-pollution keys; no serialization API | Parsing untrusted or mixed string input with either fallback or strict failure behavior           |
| [`fast-json-parse`](https://github.com/mcollina/fast-json-parse) | `parse(value)` → `{ value, err }`   | Legacy API that reports a parse error in the result object instead of throwing; no serialization API                         | Maintaining older code that expects this result shape; its optimization is unnecessary on Node 7+ |

### Serialization round trips

| Library                                                     | Main APIs                                                                       | Distinctive behavior                                                                                                          | Choose when                                                                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`devalue`](https://github.com/sveltejs/devalue)            | `stringify(value)` ↔ `parse(text)`                                              | Preserves circular and repeated references plus rich JavaScript types; escapes markup-sensitive characters in rendered output | Serializing server-to-client application state, including server-rendered state, for a matching `parse` call |
| [`superjson`](https://github.com/flightcontrolhq/superjson) | `stringify(value)` ↔ `parse(text)`; `serialize(value)` ↔ `deserialize(payload)` | Preserves rich JavaScript types through a JSON-compatible value and metadata envelope                                         | Transporting `Date`, `Map`, `Set`, or `BigInt` through JSON-oriented frameworks such as tRPC                 |
| [`flatted`](https://github.com/WebReflection/flatted)       | `stringify(value)` ↔ `parse(text)`                                              | Preserves circular references while limiting values to JSON-compatible data                                                   | Serializing circular JSON data without broader rich-type handling                                            |

`devalue`'s XSS mitigation applies when trusted server code serializes state for the client. Do not use its `uneval` format to accept untrusted client-to-server data.

## Usage

### Node.js

Install dependency:

```bash
# npm
npm i destr

# yarn
yarn add destr

# pnpm
pnpm i destr
```

Import into your Node.js project:

```js
// ESM
import { destr, safeDestr } from "destr";

// CommonJS
const { destr, safeDestr } = require("destr");
```

### Deno

```js
import { destr, safeDestr } from "https://deno.land/x/destr/src/index.ts";

console.log(destr('{ "deno": "yay" }'));
```

## Why?

### ✅ Type Safe

```ts
const obj = JSON.parse("{}"); // obj type is any

const obj = destr("{}"); // obj type is unknown by default

const obj = destr<MyInterface>("{}"); // obj is well-typed
```

### ✅ Fast fallback to input if is not string

```js
// Uncaught SyntaxError: Unexpected token u in JSON at position 0
JSON.parse();

// undefined
destr();
```

### ✅ Fast lookup for known string values

```js
// Uncaught SyntaxError: Unexpected token T in JSON at position 0
JSON.parse("TRUE");

// true
destr("TRUE");
```

### ✅ Fallback to original value if parse fails (empty or any plain string)

```js
// Uncaught SyntaxError: Unexpected token s in JSON at position 0
JSON.parse("salam");

// "salam"
destr("salam");
```

**Note:** This fails in safe/strict mode with `safeDestr`.

### ✅ Avoid prototype pollution

```js
const input = '{ "user": { "__proto__": { "isAdmin": true } } }';

// { user: { __proto__: { isAdmin: true } } }
JSON.parse(input);

// { user: {} }
destr(input);
```

### ✅ Strict Mode

When using `safeDestr` it will throw an error if the input is not a valid JSON string or parsing fails. (non string values and built-ins will be still returned as-is)

```js
// Returns "[foo"
destr("[foo");

// Throws an error
safeDestr("[foo");
```

## Benchmarks

`destr` is faster generally for arbitrary inputs but also sometimes little bit slower than `JSON.parse` when parsing a valid JSON string mainly because of transform to avoid [prototype pollution](https://learn.snyk.io/lessons/prototype-pollution/javascript/) which can lead to serious security issues if not being sanitized. In the other words, `destr` is better when input is not always a JSON string or from untrusted source like request body.

Check [Benchmark Results](./BENCH.md) or run with `pnpm run bench:node` or `pnpm run bench:bun` yourself!

## License

MIT. Made with 💖

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/destr?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/destr
[npm-downloads-src]: https://img.shields.io/npm/dm/destr?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/destr
[bundle-src]: https://img.shields.io/bundlephobia/minzip/destr?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=destr
[license-src]: https://img.shields.io/github/license/unjs/destr.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/unjs/destr/blob/main/LICENSE
