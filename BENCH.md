```
cpu: Apple M2
runtime: node v20.11.1 (arm64-darwin)

benchmark                   time (avg)             (min … max)
--------------------------------------------------------------
• Non-string fallback
--------------------------------------------------------------
destr                     4.84 ns/iter      (3.78 ns … 326 ns)
JSON.parse                 174 ns/iter       (139 ns … 701 ns)
safeDestr                31.18 ns/iter     (18.41 ns … 337 ns)
sjson                   error: text.charCodeAt is not a function
TypeError: text.charCodeAt is not a function
@hapi/bourne               157 ns/iter       (144 ns … 314 ns)

summary for Non-string fallback
  destr
   6.44x faster than safeDestr
   32.41x faster than @hapi/bourne
   35.96x faster than JSON.parse

• Known values
--------------------------------------------------------------
destr                    22.56 ns/iter     (15.85 ns … 136 ns)
JSON.parse               95.87 ns/iter     (89.92 ns … 227 ns)
safeDestr                50.85 ns/iter     (30.92 ns … 537 ns)
sjson                      113 ns/iter       (109 ns … 266 ns)
@hapi/bourne               105 ns/iter     (98.02 ns … 112 ns)

summary for Known values
  destr
   2.25x faster than safeDestr
   4.25x faster than JSON.parse
   4.64x faster than @hapi/bourne
   5.02x faster than sjson

• plain string (short)
--------------------------------------------------------------
destr                    27.21 ns/iter     (26.14 ns … 107 ns)
JSON.parse (try-catch)     120 ns/iter       (115 ns … 292 ns)
safeDestr                62.07 ns/iter     (41.56 ns … 720 ns)
sjson (try-catch)          148 ns/iter       (135 ns … 475 ns)
@hapi/bourne               130 ns/iter       (125 ns … 308 ns)

summary for plain string (short)
  destr
   2.28x faster than safeDestr
   4.4x faster than JSON.parse (try-catch)
   4.79x faster than @hapi/bourne
   5.43x faster than sjson (try-catch)

• plain string (long)
--------------------------------------------------------------
destr                      567 ns/iter   (34.57 ns … 1'001 ns)
JSON.parse (try-catch)   4'900 ns/iter   (3'813 ns … 6'664 ns)
safeDestr                4'751 ns/iter   (4'284 ns … 5'953 ns)
sjson (try-catch)        2'895 ns/iter   (2'564 ns … 4'633 ns)
@hapi/bourne             6'528 ns/iter   (5'767 ns … 8'859 ns)

summary for plain string (long)
  destr
   5.11x faster than sjson (try-catch)
   8.38x faster than safeDestr
   8.64x faster than JSON.parse (try-catch)
   11.52x faster than @hapi/bourne

• package.json
--------------------------------------------------------------
destr                    3'900 ns/iter   (3'739 ns … 4'597 ns)
JSON.parse               3'426 ns/iter   (3'200 ns … 4'132 ns)
safeDestr                4'290 ns/iter   (3'795 ns … 6'540 ns)
sjson                    4'289 ns/iter   (3'716 ns … 6'109 ns)
@hapi/bourne             3'636 ns/iter   (3'464 ns … 4'400 ns)

summary for package.json
  destr
   1.14x slower than JSON.parse
   1.07x slower than @hapi/bourne
   1.1x faster than sjson
   1.1x faster than safeDestr

• broken object
--------------------------------------------------------------
destr                    3'978 ns/iter   (3'766 ns … 4'634 ns)
JSON.parse (try-catch)   3'478 ns/iter   (3'199 ns … 4'281 ns)
safeDestr                3'953 ns/iter   (3'800 ns … 5'057 ns)
sjson (try-catch)        3'930 ns/iter   (3'724 ns … 4'593 ns)
@hapi/bourne             3'655 ns/iter   (3'455 ns … 4'265 ns)

summary for broken object
  destr
   1.14x slower than JSON.parse (try-catch)
   1.09x slower than @hapi/bourne
   1.01x slower than sjson (try-catch)
   1.01x slower than safeDestr
```
