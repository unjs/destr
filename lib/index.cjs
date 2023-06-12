const { destr } = require("../dist/index.cjs");

// Allow mixed default and named exports
destr.destr = destr;

module.exports = destr;
