'use strict';

var test = require('tap').test;
var quickselect = require('../src/quickselect');

test('quickselect', function (t) {
    var arr = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
    quickselect(arr, 8);
    t.deepEqual(arr, [39, 28, 28, 33, 21, 12, 22, 50, 53, 56, 59, 65, 90, 77, 95]);
    t.end();
});

test('quickselect long arrays', function (t) {
    var arr = [];
    for (var i = 1000; i >= 0; i--) arr.push(i);
    quickselect(arr, 300);
    t.equal(arr[300], 300);
    t.end();
});

test('quickselect long arrays L35 coverage', function (t) {
    var arr = [];
    for (var i = 1000; i >= 0; i--) arr.push(i);
    quickselect(arr, 500, 10, 620);
    t.equal(arr[300], 700);
    t.end();
});
