# destr

A faster, secure and convenient alternative for [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse):

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

**Avoid Prototype Pollution:**

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
export declare type JSONObject = {
    [key: string]: JSONValue;
};
export declare type JSONValue = true | false | null | string | JSONObject | JSONValue[];
export declare type DestrValue = JSONValue | JSONValue[] | undefined;
export default function destr(val: any): DestrValue;
```

## License

MIT
