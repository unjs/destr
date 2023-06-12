import fs from "node:fs";
import Benchmark from "benchmark";
import sjson from "secure-json-parse";
import bourne from "@hapi/bourne";
import { destr, safeDestr } from "destr";

const { log } = console;

function createSuite(name) {
  const suite = new Benchmark.Suite(name);

  log(`\n=== ${name} ==`);
  suite.on("cycle", (event) => {
    log(String(event.target));
  });
  suite.on("complete", function () {
    log("Fastest is " + this.filter("fastest").map("name"));
  });

  return suite;
}

function bench(name, val) {
  const suite = createSuite(name);
  suite.add("JSON.parse", () => {
    JSON.parse(val);
  });
  suite.add("destr", () => {
    destr(val);
  });
  suite.add("safeDestr", () => {
    safeDestr(val);
  });
  suite.add("sjson", () => {
    sjson.parse(val);
  });
  suite.add("@hapi/bourne", () => {
    bourne.parse(val);
  });
  suite.run();
}

function benchTryCatch(name, val) {
  const suite = createSuite(name);
  suite.add("JSON.parse (try-catch)", () => {
    try {
      JSON.parse(val);
    } catch (err) {
      return val;
    }
  });
  suite.add("destr", () => {
    destr(val);
  });
  suite.add("safeDestr", () => {
    safeDestr(val);
  });
  suite.add("sjson (try-catch)", () => {
    try {
      sjson.parse(val);
    } catch (err) {
      return val;
    }
  });
  suite.add("@hapi/bourne", () => {
    bourne.parse(val);
  });
  suite.run();
}

bench("Non-string fallback", 3.14159265359);
bench("Known values", "true");
benchTryCatch("plain string", `"SALAM"`);

const pkg = fs.readFileSync("./package.json", "utf-8");
bench("package.json", pkg);
benchTryCatch("broken object", pkg.substring(0, pkg.length - 1));
