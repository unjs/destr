## Node.js

Running on Node.js `v20.9.0`

=== Non-string fallback ==
JSON.parse x 9,464,387 ops/sec ±0.19% (97 runs sampled)
destr x 255,562,708 ops/sec ±0.23% (98 runs sampled)
safeDestr x 74,229,966 ops/sec ±0.42% (93 runs sampled)
sjson:
@hapi/bourne x 9,019,413 ops/sec ±0.32% (96 runs sampled)
Fastest is destr

=== Known values ==
JSON.parse x 23,600,894 ops/sec ±0.44% (92 runs sampled)
destr x 78,297,469 ops/sec ±0.27% (98 runs sampled)
safeDestr x 40,300,751 ops/sec ±0.46% (98 runs sampled)
sjson x 16,228,475 ops/sec ±1.08% (94 runs sampled)
@hapi/bourne x 20,756,877 ops/sec ±0.56% (97 runs sampled)
Fastest is destr

=== plain string (short) ==
JSON.parse (try-catch) x 14,024,616 ops/sec ±0.37% (97 runs sampled)
destr x 47,234,367 ops/sec ±2.82% (90 runs sampled)
safeDestr x 32,067,177 ops/sec ±0.29% (97 runs sampled)
sjson (try-catch) x 10,652,731 ops/sec ±0.33% (97 runs sampled)
@hapi/bourne x 11,778,015 ops/sec ±1.12% (89 runs sampled)
Fastest is destr

=== plain string (long) ==
JSON.parse (try-catch) x 156,139 ops/sec ±0.88% (93 runs sampled)
destr x 38,673,125 ops/sec ±0.35% (94 runs sampled)
safeDestr:
sjson (try-catch) x 323,817 ops/sec ±0.80% (96 runs sampled)
@hapi/bourne:
Fastest is destr

=== package.json ==
JSON.parse x 357,325 ops/sec ±0.32% (98 runs sampled)
destr x 295,762 ops/sec ±0.32% (98 runs sampled)
safeDestr x 295,847 ops/sec ±0.13% (97 runs sampled)
sjson x 297,089 ops/sec ±0.35% (97 runs sampled)
@hapi/bourne x 323,762 ops/sec ±0.19% (97 runs sampled)
Fastest is JSON.parse

=== broken object ==
JSON.parse (try-catch) x 95,513 ops/sec ±0.50% (93 runs sampled)
destr x 84,278 ops/sec ±0.37% (95 runs sampled)
safeDestr:
sjson (try-catch) x 163,887 ops/sec ±0.69% (95 runs sampled)
@hapi/bourne:
Fastest is sjson (try-catch)

## Bun

Runnin on Bun `v1.0.7`

```
=== Non-string fallback ==
JSON.parse x 17,172,248 ops/sec ±2.51% (80 runs sampled)
destr x 70,028,734 ops/sec ±10.62% (50 runs sampled)
safeDestr x 26,543,362 ops/sec ±4.69% (70 runs sampled)
sjson:
@hapi/bourne x 14,412,494 ops/sec ±2.21% (82 runs sampled)
Fastest is destr

=== Known values ==
JSON.parse x 37,889,947 ops/sec ±6.42% (63 runs sampled)
destr x 31,602,584 ops/sec ±4.29% (72 runs sampled)
safeDestr x 17,022,901 ops/sec ±3.09% (80 runs sampled)
sjson x 16,439,558 ops/sec ±2.63% (82 runs sampled)
@hapi/bourne x 25,914,930 ops/sec ±4.35% (69 runs sampled)
Fastest is JSON.parse

=== plain string (short) ==
JSON.parse (try-catch) x 18,661,059 ops/sec ±2.92% (73 runs sampled)
destr x 15,789,374 ops/sec ±2.66% (80 runs sampled)
safeDestr x 10,512,090 ops/sec ±1.98% (83 runs sampled)
sjson (try-catch) x 10,938,015 ops/sec ±1.68% (87 runs sampled)
@hapi/bourne x 14,817,736 ops/sec ±2.66% (79 runs sampled)
Fastest is JSON.parse (try-catch)

=== plain string (long) ==
JSON.parse (try-catch) x 688,257 ops/sec ±0.39% (92 runs sampled)
destr x 14,458,797 ops/sec ±2.54% (82 runs sampled)
safeDestr:
sjson (try-catch) x 531,925 ops/sec ±1.27% (94 runs sampled)
@hapi/bourne:
Fastest is destr

=== package.json ==
JSON.parse x 405,237 ops/sec ±0.41% (96 runs sampled)
destr x 58,580 ops/sec ±0.21% (97 runs sampled)
safeDestr x 58,269 ops/sec ±0.21% (95 runs sampled)
sjson x 316,115 ops/sec ±0.38% (94 runs sampled)
@hapi/bourne x 351,669 ops/sec ±0.33% (98 runs sampled)
Fastest is JSON.parse

=== broken object ==
JSON.parse (try-catch) x 240,053 ops/sec ±0.56% (96 runs sampled)
destr x 52,153 ops/sec ±0.40% (93 runs sampled)
safeDestr:
sjson (try-catch) x 210,145 ops/sec ±0.39% (96 runs sampled)
@hapi/bourne:
Fastest is JSON.parse (try-catch)
```
