# destr

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

A faster, secure and convenient alternative for [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).

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

> 🚀 Up to 500 times faster than `JSON.parse`!

```js
// Uncaught SyntaxError: Unexpected token u in JSON at position 0
JSON.parse();

// undefined
destr();
```

### ✅ Fast lookup for known string values

> 🚀 Up to 900 times faster than `JSON.parse`!

```js
// Uncaught SyntaxError: Unexpected token T in JSON at position 0
JSON.parse("TRUE");

// true
destr("TRUE");
```

### ✅ Fallback to original value if parse fails (empty or any plain string)

> 🚀 Up to 900 times faster than `JSON.parse`!

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

Locally try with `pnpm benchmark`. Below are results on Node.js **v20.5.0** with MBA M2.

**Note** `destr` is sometimes little bit slower than `JSON.parse` when parsing a valid JSON string mainly because of transform to avoid [prototype pollution](https://learn.snyk.io/lessons/prototype-pollution/javascript/) which can lead to serious security issues if not being sanitized. In the other words, `destr` is better when input is not always a JSON string or from untrusted source like request body.

```
=== Non-string fallback ==
JSON.parse x 9,506,702 ops/sec ±1.68% (92 runs sampled)
destr x 159,565,446 ops/sec ±0.24% (98 runs sampled)
safeDestr x 73,624,106 ops/sec ±0.39% (95 runs sampled)
sjson:
@hapi/bourne x 9,404,463 ops/sec ±0.62% (96 runs sampled)
Fastest is destr

=== Known values ==
JSON.parse x 15,000,474 ops/sec ±0.82% (93 runs sampled)
destr x 96,977,026 ops/sec ±0.13% (101 runs sampled)
safeDestr x 47,618,310 ops/sec ±0.15% (98 runs sampled)
sjson x 11,176,069 ops/sec ±0.47% (93 runs sampled)
@hapi/bourne x 14,650,782 ops/sec ±0.64% (93 runs sampled)
Fastest is destr

=== plain string ==
JSON.parse (try-catch) x 11,775,641 ops/sec ±0.64% (95 runs sampled)
destr x 111,118,106 ops/sec ±0.53% (101 runs sampled)
safeDestr x 52,455,654 ops/sec ±0.21% (97 runs sampled)
sjson (try-catch) x 9,282,956 ops/sec ±0.47% (96 runs sampled)
@hapi/bourne x 11,547,144 ops/sec ±0.68% (96 runs sampled)
Fastest is destr

=== package.json ==
JSON.parse x 420,496 ops/sec ±0.20% (98 runs sampled)
destr x 358,257 ops/sec ±0.58% (98 runs sampled)
safeDestr x 351,278 ops/sec ±1.10% (98 runs sampled)
sjson x 358,003 ops/sec ±0.14% (102 runs sampled)
@hapi/bourne x 398,852 ops/sec ±0.32% (99 runs sampled)
Fastest is JSON.parse

=== broken object ==
JSON.parse (try-catch) x 137,788 ops/sec ±0.68% (98 runs sampled)
destr x 111,878 ops/sec ±0.50% (98 runs sampled)
safeDestr:
sjson (try-catch) x 219,924 ops/sec ±0.62% (98 runs sampled)
@hapi/bourne:
Fastest is sjson (try-catch)
```

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
