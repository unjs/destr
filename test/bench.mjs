import fs from "node:fs";
import sjson from "secure-json-parse";
import bourne from "@hapi/bourne";
import { bench, run, group, baseline } from "mitata";
import { destr, safeDestr } from "../dist/index.mjs";

function addBench(name, val) {
  group(name, () => {
    baseline("destr", () => {
      destr(val);
    });
    bench("JSON.parse", () => {
      JSON.parse(val);
    });
    bench("safeDestr", () => {
      safeDestr(val);
    });
    bench("sjson", () => {
      sjson.parse(val);
    });
    bench("@hapi/bourne", () => {
      bourne.parse(val);
    });
  });
}

function addTryCatchBench(name, val) {
  group(name, () => {
    baseline("destr", () => {
      try {
        destr(val);
      } catch {
        return val;
      }
    });
    bench("JSON.parse (try-catch)", () => {
      try {
        JSON.parse(val);
      } catch {
        return val;
      }
    });
    bench("safeDestr", () => {
      try {
        safeDestr(val);
      } catch {
        return val;
      }
    });
    bench("sjson (try-catch)", () => {
      try {
        sjson.parse(val);
      } catch {
        return val;
      }
    });
    bench("@hapi/bourne", () => {
      try {
        bourne.parse(val);
      } catch {
        return val;
      }
    });
  });
}

addBench("Non-string fallback", 3.141_592_653_59);
addBench("Known values", "true");

addTryCatchBench("plain string (short)", `"SALAM"`);

const longStr = fs.readFileSync("./pnpm-lock.yaml", "utf8");
addTryCatchBench("plain string (long)", longStr);

const pkg = fs.readFileSync("./package.json", "utf8");
addBench("package.json", pkg);
addTryCatchBench("broken object", pkg.slice(0, Math.max(0, pkg.length - 1)));

await run({
  percentiles: false,
});
