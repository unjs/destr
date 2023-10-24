=== Non-string fallback ==
JSON.parse x 9,918,339 ops/sec ±0.19% (100 runs sampled)
destr x 251,332,455 ops/sec ±0.11% (96 runs sampled)
safeDestr x 69,678,071 ops/sec ±0.26% (98 runs sampled)
sjson:
@hapi/bourne x 9,421,906 ops/sec ±0.19% (98 runs sampled)
Fastest is destr

=== Known values ==
JSON.parse x 25,309,285 ops/sec ±0.17% (98 runs sampled)
destr x 64,017,380 ops/sec ±0.25% (98 runs sampled)
safeDestr x 35,059,475 ops/sec ±0.44% (97 runs sampled)
sjson x 13,417,836 ops/sec ±0.24% (96 runs sampled)
@hapi/bourne x 22,905,370 ops/sec ±0.75% (96 runs sampled)
Fastest is destr

=== plain string (short) ==
JSON.parse (try-catch) x 12,288,397 ops/sec ±1.06% (90 runs sampled)
destr x 35,313,868 ops/sec ±0.31% (93 runs sampled)
safeDestr x 23,935,624 ops/sec ±0.36% (94 runs sampled)
sjson (try-catch) x 9,609,603 ops/sec ±0.49% (98 runs sampled)
@hapi/bourne x 13,740,706 ops/sec ±0.36% (93 runs sampled)
Fastest is destr

=== plain string (long) ==
JSON.parse (try-catch) x 153,418 ops/sec ±0.51% (97 runs sampled)
destr x 35,035,853 ops/sec ±1.48% (94 runs sampled)
safeDestr:
sjson (try-catch) x 328,793 ops/sec ±0.93% (95 runs sampled)
@hapi/bourne:
Fastest is destr

=== package.json ==
JSON.parse x 323,024 ops/sec ±0.15% (98 runs sampled)
destr x 271,330 ops/sec ±0.23% (98 runs sampled)
safeDestr x 270,665 ops/sec ±0.16% (95 runs sampled)
sjson x 273,199 ops/sec ±0.30% (96 runs sampled)
@hapi/bourne x 298,936 ops/sec ±0.20% (98 runs sampled)
Fastest is JSON.parse

=== broken object ==
JSON.parse (try-catch) x 99,691 ops/sec ±0.44% (93 runs sampled)
destr x 86,265 ops/sec ±0.45% (97 runs sampled)
safeDestr:
sjson (try-catch) x 152,432 ops/sec ±0.51% (96 runs sampled)
@hapi/bourne:
Fastest is sjson (try-catch)
