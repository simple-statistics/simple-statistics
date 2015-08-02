/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var cK = require('../src/ckmeans.js');

test('C k-means', function(t) {
    t.ok(cK, 'exports fn');

    t.throws(function() {
        cK([], 10);
    }, 'Cannot generate more values than input');

    t.deepEqual(cK([1]), {
        clusters: [0],
        centers: [1],
        withinss: [0],
        size: [1]
    }, 'single-value case');

    t.deepEqual(cK([1, 1, 1, 1]), {
        clusters: [0, 1, 2, 3],
        centers: [1],
        withinss: [0],
        size: [4]
    }, 'same-value case');

    t.deepEqual(cK([1, 2, 3]), {
        clusters: [0, 1, 2, 3],
        centers: [1],
        withinss: [0],
        size: [4]
    }, 'same-value case');

    t.end();
});
