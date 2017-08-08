# putil-stringify

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][devdependencies-image]][devdependencies-url]

Alternate to native JSON.stringify. 
It offers more control in replacer callback, etc formatting dates with custom format. And also replacer callback can have 3 arguments which gives current object being serialized.

```js
const a = {a: 1, b: '2', c: {d: new Date()}};
let s = stringify(a, (k, v) => {
  if (v instanceof Date)
    return 'today';
  return v;
});
console.log(s);
```

```json
{"a":1,"b":"2","c":{"d":"today"}}
```

```js
const a = {a: {num: 5}};
const b = {a: a, b: 'Hello'};
let s = stringify(b, (o, k, v) => {
  if (o === a.a && k === 'num')
    return v+1;
  return v;
});
console.log(s);
```

```json
{"a":{"a":{"num":6}},"b":"Hello"}
```

## Installation

  - `$ npm install putil-stringify --save`

## Node Compatibility

  - node `>= 6.x`;
  
### License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/putil-stringify.svg
[npm-url]: https://npmjs.org/package/putil-stringify
[travis-image]: https://img.shields.io/travis/panates/putil-stringify/master.svg
[travis-url]: https://travis-ci.org/panates/putil-stringify
[coveralls-image]: https://img.shields.io/coveralls/panates/putil-stringify/master.svg
[coveralls-url]: https://coveralls.io/r/panates/putil-stringify
[downloads-image]: https://img.shields.io/npm/dm/putil-stringify.svg
[downloads-url]: https://npmjs.org/package/putil-stringify
[gitter-image]: https://badges.gitter.im/panates/putil-stringify.svg
[gitter-url]: https://gitter.im/panates/putil-stringify?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[dependencies-image]: https://david-dm.org/panates/putil-stringify/status.svg
[dependencies-url]:https://david-dm.org/panates/putil-stringify
[devdependencies-image]: https://david-dm.org/panates/putil-stringify/dev-status.svg
[devdependencies-url]:https://david-dm.org/panates/putil-stringify?type=dev
[quality-image]: http://npm.packagequality.com/shield/putil-stringify.png
[quality-url]: http://packagequality.com/#?package=putil-stringify
