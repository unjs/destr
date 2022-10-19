# destr

> A faster, secure and convenient alternative for [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse):

[![npm version][npm-v-src]][npm-v-href]
[![npm downloads][npm-d-src]][npm-d-href]
[![bundle phobia][bundlephobia-src]][bundlephobia-href]

## Usage

### Node.js

Install using npm or yarn:

```bash
npm i destr
# or
yarn add destr
```

Import into your Node.js project:

```js
// CommonJS
const destr = require('destr')

// ESM
import destr from 'destr'
```

### Deno

```js
import destr from 'https://deno.land/x/destr/src/index.ts'

console.log(destr('{ "deno": "yay" }'))
```


## Why?

**Fast fallback to input if is not string:**

```js
// Uncaught SyntaxError: Unexpected token u in JSON at position 0
JSON.parse()

// undefined
destr()
```

**Fast lookup for known string values:**

```js
// Uncaught SyntaxError: Unexpected token T in JSON at position 0
JSON.parse('TRUE')

// true
destr('TRUE')
```

**Fallback to original value if parse fails (empty or any plain string):**

```js
// Uncaught SyntaxError: Unexpected token s in JSON at position 0
JSON.parse('salam')

// "salam"
destr('salam')
```

**Avoid prototype pollution:**

```js
const input = '{ "user": { "__proto__": { "isAdmin": true } } }'

// { user: { __proto__: { isAdmin: true } } }
JSON.parse(input)

// { user: {} }
destr(input)
```

### Strict Mode

If `{ strict: true }` passed as second argument, `destr` will throw an error if the input is not a valid JSON string or parsing fails. (non string values and built-ins will be still returned as-is)

```js
// Returns "[foo"
destr('[foo')

// Throws an error
destr('[foo', { strict: true })
```

## Benchmarks

Locally try with `pnpm benchmark`. Below are esults on Node.js 18.11.0 with MBA M2.

**Note** `destr` is sometimes little bit slower than `JSON.parse` when parsing a valid JSON string mainly because of transform to avoid [prototype pollution](https://learn.snyk.io/lessons/prototype-pollution/javascript/) which can lead to serious security issues if not being sanitized. In the other words, `destr` is better when input is not always a json string or from untrusted source like request body.

```
=== Non-string fallback ==
JSON.parse x 10,323,718 ops/sec ±0.45% (96 runs sampled)
destr x 1,057,268,114 ops/sec ±1.71% (90 runs sampled)
destr (strict) x 977,215,995 ops/sec ±1.43% (97 runs sampled)
sjson:
@hapi/bourne x 10,151,985 ops/sec ±0.76% (96 runs sampled)
Fastest is destr

=== Known values ==
JSON.parse x 16,359,358 ops/sec ±0.90% (92 runs sampled)
destr x 107,849,085 ops/sec ±0.34% (97 runs sampled)
destr (strict) x 107,891,427 ops/sec ±0.34% (99 runs sampled)
sjson x 14,216,957 ops/sec ±0.98% (89 runs sampled)
@hapi/bourne x 15,209,152 ops/sec ±1.08% (88 runs sampled)
Fastest is destr (strict),destr

=== Plain string ==
JSON.parse (try-catch) x 211,560 ops/sec ±0.84% (92 runs sampled)
destr x 60,315,113 ops/sec ±0.46% (98 runs sampled)
destr (strict):
sjson (try-catch) x 186,492 ops/sec ±0.70% (97 runs sampled)
@hapi/bourne:
Fastest is destr

=== standard object ==
JSON.parse x 492,180 ops/sec ±0.98% (98 runs sampled)
destr x 356,819 ops/sec ±0.40% (98 runs sampled)
destr (strict) x 412,955 ops/sec ±0.88% (94 runs sampled)
sjson x 437,376 ops/sec ±0.42% (102 runs sampled)
@hapi/bourne x 457,020 ops/sec ±0.81% (99 runs sampled)
Fastest is JSON.parse

=== invalid syntax ==
JSON.parse (try-catch) x 493,739 ops/sec ±0.51% (98 runs sampled)
destr x 405,848 ops/sec ±0.56% (100 runs sampled)
destr (strict) x 409,514 ops/sec ±0.57% (101 runs sampled)
sjson (try-catch) x 435,406 ops/sec ±0.41% (100 runs sampled)
@hapi/bourne x 467,163 ops/sec ±0.42% (99 runs sampled)
Fastest is JSON.parse (try-catch)
```

## License

MIT. Made with 💖

<!-- Refs -->
[npm-v-src]: https://img.shields.io/npm/v/destr?style=flat-square
[npm-v-href]: https://npmjs.com/package/destr

[npm-d-src]: https://img.shields.io/npm/dm/destr?style=flat-square
[npm-d-href]: https://npmjs.com/package/destr

[github-actions-src]: https://img.shields.io/github/workflow/status/unjs/destr/ci/master?style=flat-square
[github-actions-href]: https://github.com/unjs/destr/actions?query=workflow%3Aci

[bundlephobia-src]: https://img.shields.io/bundlephobia/min/destr?style=flat-square
[bundlephobia-href]: https://bundlephobia.com/result?p=destr
