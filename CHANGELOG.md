# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v2.0.4

[compare changes](https://github.com/unjs/destr/compare/v2.0.3...v2.0.4)

### 🔥 Performance

- Faster plain string and known value checks ([#136](https://github.com/unjs/destr/pull/136))

### 📦 Build

- Add `sideEffects` to package.json ([#137](https://github.com/unjs/destr/pull/137))

### 🏡 Chore

- Update lock ([6a75e33](https://github.com/unjs/destr/commit/6a75e33))
- Update deps ([0f07d2d](https://github.com/unjs/destr/commit/0f07d2d))
- Update ci ([adb700a](https://github.com/unjs/destr/commit/adb700a))
- Update eslint ([7b506be](https://github.com/unjs/destr/commit/7b506be))
- Update deps ([f932569](https://github.com/unjs/destr/commit/f932569))

### ❤️ Contributors

- Pooya Parsa ([@pi0](https://github.com/pi0))
- Balázs Németh ([@zsilbi](https://github.com/zsilbi))
- Denisx ([@denisx](https://github.com/denisx))

## v2.0.3

[compare changes](https://github.com/unjs/destr/compare/v2.0.2...v2.0.3)

### 🩹 Fixes

- Improve compatibility with runtimes not supporting `String.prototype.at()` ([#102](https://github.com/unjs/destr/pull/102))

### 🏡 Chore

- Update lockfile ([930fe7b](https://github.com/unjs/destr/commit/930fe7b))
- Update bench ([d0a83f9](https://github.com/unjs/destr/commit/d0a83f9))
- Update readme ([72a5c5c](https://github.com/unjs/destr/commit/72a5c5c))
- Lint ([ae61652](https://github.com/unjs/destr/commit/ae61652))

### ✅ Tests

- Test with node 20 ([a33a2e1](https://github.com/unjs/destr/commit/a33a2e1))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Allenyu ([@AllenYu0118](http://github.com/AllenYu0118))

## v2.0.2

[compare changes](https://github.com/unjs/destr/compare/v2.0.1...v2.0.2)

### 🩹 Fixes

- Parsing decimals and scientific notation ([#94](https://github.com/unjs/destr/pull/94))
- Avoid fast path with possible escape chars ([#89](https://github.com/unjs/destr/pull/89))

### 📖 Documentation

- Fix typos ([#82](https://github.com/unjs/destr/pull/82))
- Fix typo ([#86](https://github.com/unjs/destr/pull/86))

### 🏡 Chore

- Update benchmarks ([eb60af1](https://github.com/unjs/destr/commit/eb60af1))
- Update lockfile ([4dbb707](https://github.com/unjs/destr/commit/4dbb707))
- Update benchmarks ([4f92188](https://github.com/unjs/destr/commit/4f92188))
- Add bun to the bench results ([523f3f1](https://github.com/unjs/destr/commit/523f3f1))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Kricsleo 
- Nobkd 
- Alexander Lichter ([@manniL](http://github.com/manniL))

## v2.0.1

[compare changes](https://github.com/unjs/destr/compare/v2.0.0...v2.0.1)

### 🔥 Performance

- Avoid lowercasing long strings ([#81](https://github.com/unjs/destr/pull/81))

### 📖 Documentation

- Correct `safeDestr` example usage and tests ([#75](https://github.com/unjs/destr/pull/75))

### 🏡 Chore

- Update dependencies ([46c3915](https://github.com/unjs/destr/commit/46c3915))
- Add autofix ci ([ad69b83](https://github.com/unjs/destr/commit/ad69b83))

### 🎨 Styles

- Format code ([5e014f9](https://github.com/unjs/destr/commit/5e014f9))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Webstrand <webstrand@gmail.com>
- Frenco <hey@frenco.dev>

## v2.0.0

[compare changes](https://github.com/unjs/destr/compare/v1.2.2...v2.0.0)


### 🚀 Enhancements

  - ⚠️  Support generic type with `unkown` default ([#68](https://github.com/unjs/destr/pull/68))
  - Show warning when dropping unsafe keys ([#57](https://github.com/unjs/destr/pull/57))
  - Support minus infinity ([#67](https://github.com/unjs/destr/pull/67))
  - Support `safeDestr` ([#70](https://github.com/unjs/destr/pull/70))
  - Parse double-quoted string with fast path ([#71](https://github.com/unjs/destr/pull/71))

### 🔥 Performance

  - Move common check earlier ([5be5732](https://github.com/unjs/destr/commit/5be5732))

### 💅 Refactors

  - ⚠️  Use named `destr` export ([#69](https://github.com/unjs/destr/pull/69))

### 🏡 Chore

  - **readme:** Badges update ([6544804](https://github.com/unjs/destr/commit/6544804))
  - Update dev dependencies ([4aa3592](https://github.com/unjs/destr/commit/4aa3592))
  - Lint with prettier ([6aa42c6](https://github.com/unjs/destr/commit/6aa42c6))
  - Fix lint issue ([cb4c0d6](https://github.com/unjs/destr/commit/cb4c0d6))
  - Update coverage package ([a73b0ff](https://github.com/unjs/destr/commit/a73b0ff))
  - Use `changelogen` for release ([75989d3](https://github.com/unjs/destr/commit/75989d3))
  - Run ci with node 18 ([80554b8](https://github.com/unjs/destr/commit/80554b8))
  - Update benchmark script ([4138ebf](https://github.com/unjs/destr/commit/4138ebf))
  - Add `codecov.yml` ([fa4d366](https://github.com/unjs/destr/commit/fa4d366))
  - Update readme ([ecf2029](https://github.com/unjs/destr/commit/ecf2029))
  - Update readme ([60b3f81](https://github.com/unjs/destr/commit/60b3f81))

#### ⚠️  Breaking Changes

  - ⚠️  Support generic type with `unkown` default ([#68](https://github.com/unjs/destr/pull/68))
  - ⚠️  Use named `destr` export ([#69](https://github.com/unjs/destr/pull/69))

### ❤️  Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Zuixinwang 
- Nozomu Ikuta 
- Sébastien Chopin <seb@nuxtlabs.com>

### [1.2.2](https://github.com/unjs/destr/compare/v1.2.1...v1.2.2) (2022-12-05)


### Bug Fixes

* only purge `constructor.prototype` keys ([#26](https://github.com/unjs/destr/issues/26)) ([87918d5](https://github.com/unjs/destr/commit/87918d56fb35acf09ef6f33b908ad88dab288879))
* support surrounding whitespaces (resolves [#21](https://github.com/unjs/destr/issues/21)) ([639a5df](https://github.com/unjs/destr/commit/639a5df5321d9dccc05ccc1489f75ff8c4c57981))

### [1.2.1](https://github.com/unjs/destr/compare/v1.2.0...v1.2.1) (2022-11-14)

## [1.2.0](https://github.com/unjs/destr/compare/v1.1.1...v1.2.0) (2022-10-19)


### Features

* add option `strict` that throws an error if the input is not valid JSON ([#11](https://github.com/unjs/destr/issues/11)) ([36c7121](https://github.com/unjs/destr/commit/36c712171dc3eac6f720a64b449d3e661d2e511b))

### [1.1.1](https://github.com/unjs/destr/compare/v1.1.0...v1.1.1) (2022-04-07)

## [1.1.0](https://github.com/unjs/destr/compare/v1.0.1...v1.1.0) (2021-01-21)


### Features

* **pkg:** expose mjs format ([104fe6c](https://github.com/unjs/destr/commit/104fe6c2ae4e602cadfb1b66271f2352c1e2acf4))

### [1.0.1](https://github.com/unjs/destr/compare/v1.0.0...v1.0.1) (2020-11-08)


### Bug Fixes

* don't parse numbers if potential to exceed 15 digits ([bc8c596](https://github.com/unjs/destr/commit/bc8c5962747a9fff189e17bbdc02f760d157fdbd))

## [1.0.0](https://github.com/unjs/destr/compare/v0.1.9...v1.0.0) (2020-06-16)

### [0.1.9](https://github.com/unjs/destr/compare/v0.1.8...v0.1.9) (2020-05-28)


### Bug Fixes

* fix number regex ([886c143](https://github.com/unjs/destr/commit/886c1433b388907072528aabaacfd36512a1d6f4))

### [0.1.8](https://github.com/unjs/destr/compare/v0.1.7...v0.1.8) (2020-05-28)


### Bug Fixes

* **types:** remove strict types ([1513a48](https://github.com/unjs/destr/commit/1513a4809367a4389f2c2f13b79d40f9810aac19))

### [0.1.7](https://github.com/unjs/destr/compare/v0.1.6...v0.1.7) (2020-05-27)


### Bug Fixes

* don't throw error on parse fail ([65e22c6](https://github.com/unjs/destr/commit/65e22c631ef2757d0b25d77e1270f4656bca7ef8))

### [0.1.6](https://github.com/unjs/destr/compare/v0.1.5...v0.1.6) (2020-05-27)

### [0.1.5](https://github.com/unjs/destr/compare/v0.1.4...v0.1.5) (2020-05-27)


### Bug Fixes

* use JsonSigRx to also match numbers ([3023552](https://github.com/unjs/destr/commit/3023552f98823699ff12382a2c4c510c34bfc60a))

### [0.1.4](https://github.com/unjs/destr/compare/v0.1.3...v0.1.4) (2020-05-22)

### [0.1.3](https://github.com/unjs/destr/compare/v0.1.2...v0.1.3) (2020-05-20)


### Bug Fixes

* remove unused code ([10ef37d](https://github.com/unjs/destr/commit/10ef37d2854ce41534abbcff955c658fa727c459))

### [0.1.2](https://github.com/unjs/destr/compare/v0.1.1...v0.1.2) (2020-05-20)

### 0.1.1 (2020-05-20)
