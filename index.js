/* eslint-disable prefer-rest-params */

/* putil-stringify
 ------------------------
 (c) 2017-present Panates
 SQB may be freely distributed under the MIT license.
 For details and documentation:
 https://panates.github.io/putil-stringify/
 */
/**
 *
 * @param obj
 * @param {Function} [replacer]
 * @param {Number|String} [space]
 * @return {string}
 */

function stringify(obj, replacer, space) {

  if (typeof replacer === 'string' || typeof replacer === 'number') {
    // noinspection JSValidateTypes
    space = replacer;
    // noinspection JSValidateTypes
    replacer = undefined;
  }
  const replacerArgs = replacer ? replacer.length : 0;
  if (space && typeof space === 'number') {
    var i = space;
    space = ' ';
    while (i-- > 1)
      space += ' ';
  }

  const toString = function(o, k, v) {
    var z;
    if (replacerArgs === 2) {
      z = replacer(k, v);
      return z === undefined ? z : JSON.stringify(z);
    }
    if (replacerArgs === 3) {
      z = replacer(o, k, v);
      return z === undefined ? z : JSON.stringify(z);
    }
    return JSON.stringify(v);
  };

  var result = '';
  var indent = 0;
  const refs = [];
  const doStringify = function(obj, key, value) {
    // Check circular references
    const arrayOfObject = Array.isArray(value) || isPlainObject(value);
    if (arrayOfObject && refs.indexOf(value) >= 0) {
      result += '"[Circular]"';
      return;
    }
    const getIndent = function(n) {
      if (!space) return '';
      indent += (n || 0);
      var s = '\n';
      var k = indent;
      while (k-- > 0)
        s += space;
      return s;
    };

    var i;
    // serialize array
    if (Array.isArray(value)) {
      refs.push(value);
      result += '[' + getIndent(1);
      i = 0;
      value.forEach(function(v, k) {
        if (Array.isArray(v) || isPlainObject(v)) {
          result += (i ? ',' + getIndent() : '');
          doStringify(value, k, v);
          i++;
        } else {
          const s = toString(value, k, v);
          if (s !== undefined) {
            result += (i ? ',' + getIndent() : '') + s;
            i++;
          }
        }
      });
      result += getIndent(-1) + ']';
      refs[refs.indexOf(value)] = undefined;
      return;
    }
    // serialize object
    if (isPlainObject(value)) {
      refs.push(value);
      result += '{' + getIndent(1);
      i = 0;
      Object.getOwnPropertyNames(value).forEach(function(k) {
        const v = value[k];
        if (Array.isArray(v) || isPlainObject(v)) {
          result += (i ? ',' + getIndent() : '') +
              JSON.stringify(k) + ':' + (space ? ' ' : '');
          doStringify(value, k, v);
          i++;
        } else {
          const s = toString(value, k, v);
          if (s !== undefined) {
            result += (i ? ',' + getIndent() : '') +
                JSON.stringify(k) + ':' + (space ? ' ' : '') + s;
            i++;
          }
        }
      });
      result += getIndent(-1) + '}';
      refs[refs.indexOf(value)] = undefined;
      return;
    }
    // serialize values
    result += toString(obj, key, value);
  };
  doStringify(undefined, undefined, obj);
  return result;
}

const objCtorStr = Function.prototype.toString.call(Object);

function isPlainObject(obj) {
  if (typeof obj === 'object' &&
      Object.prototype.toString.call(obj) === '[object Object]') {
    const proto = Object.getPrototypeOf(obj);
    if (proto) {
      const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
          proto.constructor;
      return typeof ctor === 'function' && (ctor instanceof ctor) &&
          Function.prototype.toString.call(ctor) === objCtorStr;
    } else return true;
  }
  return false;
}

module.exports = stringify;
