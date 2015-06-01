'use strict';

var test = require('tape'),
    vm = require('vm'),
    fs = require('fs');

var src = fs.readFileSync('./src/simple_statistics.js', 'utf8');

test('uses window', function(t) {
  var glob = {};
  vm.runInNewContext(src, {window: glob});
  t.ok(glob.ss);
  t.end();
});

test('supports node', function(t) {
  var module = { exports: {} };
  vm.runInNewContext(src, { module: module, exports: module.exports });
  t.ok(module.exports);
  t.end();
});
