/* eslint-disable */
const assert = require('assert');
const stringify = require('../');

describe('stringify', function() {

  it('serialize object to string', function(done) {
    const a = {a: 1, b: '2', c: {d: new Date('2017-08-08T09:12:00.777Z')}};
    let s = stringify(a);
    JSON.parse(s);
    assert.equal(s, '{"a":1,"b":"2","c":{"d":"2017-08-08T09:12:00.777Z"}}');
    done();
  });

  it('serialize array to string', function(done) {
    const a = [1, '2', [new Date('2017-08-08T09:12:00.777Z')]];
    let s = stringify(a);
    JSON.parse(s);
    assert.equal(s, '[1,"2",["2017-08-08T09:12:00.777Z"]]');
    done();
  });

  it('serialize catch circular references', function(done) {
    const a = {};
    const b = [a];
    a.b = b;
    let s = stringify(a);
    JSON.parse(s);
    assert.equal(s, '{"b":["[Circular]"]}');
    done();
  });

  it('should replacer method work', function(done) {
    const a = {a: 1, b: '2', c: {d: new Date('2017-08-08T09:12:00.777Z')}};
    let s = stringify(a, (k, v) => {
      if (v instanceof Date)
        return 'today';
      return v;
    });
    JSON.parse(s);
    assert.equal(s, '{"a":1,"b":"2","c":{"d":"today"}}');
    done();
  });

  it('should pretty print with number "space" argument', function(done) {
    const a = {a: 1, b: '2', c: {d: new Date('2017-08-08T09:12:00.777Z')}};
    let s = stringify(a, (k, v) => {
      if (v instanceof Date)
        return 'today';
      return v;
    }, 2);
    JSON.parse(s);
    assert.equal(s, '{\n  "a": 1,\n  "b": "2",\n  "c": {\n    "d": "today"\n  }\n}');
    done();
  });

  it('should pretty print with string "space" argument', function(done) {
    const a = {a: 1, b: '2', c: {d: new Date('2017-08-08T09:12:00.777Z')}};
    let s = stringify(a, (k, v) => {
      if (v instanceof Date)
        return 'today';
      return v;
    }, '  ');
    JSON.parse(s);
    assert.equal(s, '{\n  "a": 1,\n  "b": "2",\n  "c": {\n    "d": "today"\n  }\n}');
    done();
  });

});