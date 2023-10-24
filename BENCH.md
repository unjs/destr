=== Non-string fallback ==
JSON.parse x 9,795,965 ops/sec ±1.05% (99 runs sampled)
destr x 251,242,150 ops/sec ±0.16% (97 runs sampled)
safeDestr x 71,403,846 ops/sec ±0.30% (98 runs sampled)
sjson:
@hapi/bourne x 9,398,223 ops/sec ±0.20% (94 runs sampled)
Fastest is destr

=== Known values ==
JSON.parse x 24,819,945 ops/sec ±0.67% (98 runs sampled)
destr x 64,177,771 ops/sec ±0.23% (98 runs sampled)
safeDestr x 35,102,427 ops/sec ±0.50% (95 runs sampled)
sjson x 13,214,663 ops/sec ±1.16% (96 runs sampled)
@hapi/bourne x 22,661,470 ops/sec ±0.38% (100 runs sampled)
Fastest is destr

=== plain string (short) ==
JSON.parse (try-catch) x 13,619,068 ops/sec ±0.96% (95 runs sampled)
destr x 69,967,512 ops/sec ±0.45% (95 runs sampled)
safeDestr x 36,915,513 ops/sec ±2.45% (92 runs sampled)
sjson (try-catch) x 9,223,733 ops/sec ±0.31% (98 runs sampled)
@hapi/bourne x 12,190,344 ops/sec ±0.80% (94 runs sampled)
Fastest is destr

=== plain string (long) ==
JSON.parse (try-catch) x 153,349 ops/sec ±0.55% (99 runs sampled)
destr x 36,427,741 ops/sec ±0.34% (97 runs sampled)
safeDestr:
sjson (try-catch) x 325,713 ops/sec ±0.88% (93 runs sampled)
@hapi/bourne:
Fastest is destr

=== package.json ==
JSON.parse x 324,505 ops/sec ±0.12% (94 runs sampled)
destr x 274,520 ops/sec ±0.15% (97 runs sampled)
safeDestr x 271,451 ops/sec ±0.16% (95 runs sampled)
sjson x 264,515 ops/sec ±1.73% (93 runs sampled)
@hapi/bourne x 294,835 ops/sec ±0.19% (97 runs sampled)
Fastest is JSON.parse

=== broken object ==
JSON.parse (try-catch) x 99,745 ops/sec ±0.53% (96 runs sampled)
destr x 86,757 ops/sec ±0.55% (98 runs sampled)
safeDestr:
sjson (try-catch) x 154,320 ops/sec ±0.37% (97 runs sampled)
@hapi/bourne:
Fastest is sjson (try-catch)
