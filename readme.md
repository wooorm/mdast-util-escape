# mdast-util-escape [![Build Status](https://img.shields.io/travis/wooorm/mdast-util-escape.svg)](https://travis-ci.org/wooorm/mdast-util-escape) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/mdast-util-escape.svg)](https://codecov.io/github/wooorm/mdast-util-escape)

[**mdast**](https://github.com/wooorm/mdast) utility to escape text to be
inserted into mdast.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install mdast-util-escape
```

**mdast-util-escape** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](mdast-util-escape.js) and
[compressed](mdast-util-escape.min.js).

## Usage

```js
var escape = require('mdast-util-escape');

console.log(escape('Foo ~delete~ and *emphasis*', {
    'gfm': true
}));
```

Yields:

```json
[ { "type": "text", "value": "Foo " },
  { "type": "escape", "value": "~" },
  { "type": "text", "value": "delete" },
  { "type": "escape", "value": "~" },
  { "type": "text", "value": " and " },
  { "type": "escape", "value": "*" },
  { "type": "text", "value": "emphasis" },
  { "type": "escape", "value": "*" } ]
```

## API

### escape(value\[, options\])

Parameters:

*   `value` (`string`)
    — Value to escape;

*   `options` (`Object`, optional)
    — Configuration:

    *   `gfm` (`boolean`, optional)
        — Escape for GitHub Flavoured Markdown;

    *   `commonmark` (`boolean`, optional)
        — Escape for CommonMark Markdown.

Returns: `Array.<Node>`, list of
[`text`](https://github.com/wooorm/mdast/blob/master/doc/mdastnode.7.md#textnode)
and
[`escape`](https://github.com/wooorm/mdast/blob/master/doc/mdastnode.7.md#escape)
nodes.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
