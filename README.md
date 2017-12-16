<div align="center">

## CustomTSLintRules

**Custom TSLint rules .**

[![GitHub issues](https://img.shields.io/github/issues/thundernet8/CustomTSLintRules.svg)](https://github.com/thundernet8/CustomTSLintRules/issues)
[![GitHub forks](https://img.shields.io/github/forks/thundernet8/CustomTSLintRules.svg)](https://github.com/thundernet8/CustomTSLintRules/network)
[![GitHub stars](https://img.shields.io/github/stars/thundernet8/CustomTSLintRules.svg)](https://github.com/thundernet8/CustomTSLintRules/stargazers)
[![dependency status](https://img.shields.io/david/thundernet8/CustomTSLintRules.svg?maxAge=3600&style=flat)](https://david-dm.org/thundernet8/CustomTSLintRules)
[![Build Status](https://travis-ci.org/thundernet8/CustomTSLintRules.svg?branch=master)](https://travis-ci.org/thundernet8/CustomTSLintRules)
[![GitHub license](https://img.shields.io/github/license/thundernet8/CustomTSLintRules.svg)](https://github.com/thundernet8/CustomTSLintRules/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

</div>

<br>

## Install

`npm install custom-tslint-rules-collection --save-dev`

or

`yarn add custom-tslint-rules-collection --dev`

## Usage

custom-tslint-rules has peer dependencies on TSLint and TypeScript.

To use these lint rules with the default preset, use configuration inheritance via the extends keyword. Here's a sample configuration where tslint.json lives adjacent to your node_modules folder:

```
{
  "extends": ["tslint:latest", "custom-tslint-rules-collection"],
  "rules": {
    // override custom-tslint-rules rules here
    "tsx-no-any-props": false
  }
}
```

To lint your .ts and .tsx files you can simply run tslint -c tslint.json 'src/\*_/_.{ts,tsx}'.

## Rules

* [x] `tsx-no-any-props`
* [x] `tsx-no-any-state`

## License

CustomTSLintRules is freely distributable under the terms of the
[MIT license](https://github.com/thundernet8/CustomTSLintRules/blob/master/LICENSE).
