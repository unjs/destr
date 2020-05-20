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
import destr from 'https://cdn.jsdelivr.net/gh/nuxt-contrib/destr/src/index.ts'

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

```js
// JSON.parse x 5,363,773 ops/sec ±0.31% (96 runs sampled
JSON.parse(3.14159265359)

// destr x 660,537,795 ops/sec ±0.06% (86 runs sampled)
destr(3.14159265359)
```

**Fast lookup for known string values:**

```js
// Uncaught SyntaxError: Unexpected token T in JSON at position 0
JSON.parse('TRUE')

// true
destr('TRUE')
```

```js
// JSON.parse x 10,432,994 ops/sec ±0.23% (94 runs sampled)
JSON.parse('true')

// destr x 652,107,152 ops/sec ±0.11% (94 runs sampled
destr('true')
```

**Fallback to original value if parse fails (empty or any plain string):**

```js
// Uncaught SyntaxError: Unexpected token s in JSON at position 0
// JSON.parse (try-catch) x 248,749 ops/sec ±1.66% (93 runs sampled)
JSON.parse('salam')

// destr x 32,415,523 ops/sec ±0.57% (94 runs sampled)
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

**Better types:**

```ts
interface JSON {
  parse(text: string, reviver?: (this: any, key: string, value: any) => any): any
}
```

```ts
function destr(val: string | any): DestrValue
```

## License

MIT. Made with 💖

<!-- Refs -->
[npm-v-src]: https://img.shields.io/npm/v/destr?style=flat-square
[npm-v-href]: https://npmjs.com/package/destr

[npm-d-src]: https://img.shields.io/npm/dm/destr?style=flat-square
[npm-d-href]: https://npmjs.com/package/destr

[github-actions-src]: https://img.shields.io/github/workflow/status/nuxt-contrib/destr/ci/master?style=flat-square
[github-actions-href]: https://github.com/nuxt-contrib/destr/actions?query=workflow%3Aci

[bundlephobia-src]: https://img.shields.io/bundlephobia/min/destr?style=flat-square
[bundlephobia-href]: https://bundlephobia.com/result?p=destr
