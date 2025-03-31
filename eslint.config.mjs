import unjs from "eslint-config-unjs";

// https://github.com/unjs/eslint-config
export default unjs({
  ignores: [],
  rules: {
    quotes: "off",
    "@typescript-eslint/no-require-imports": "off",
    "unicorn/prefer-at": "off",
    "unicorn/no-null": "off",
    "unicorn/prefer-string-raw": "off",
    "unicorn/prefer-includes": "off",
  },
});
