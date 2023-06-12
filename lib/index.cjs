const { destr, destrSafe } = require("../dist/index.cjs");

// Allow mixed default and named exports
destr.destr = destr;
destr.destrSafe = destrSafe;

module.exports = destr;
