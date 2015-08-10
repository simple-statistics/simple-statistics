/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var cK = require('../src/ckmeans');

test('C k-means', function(t) {
    t.ok(cK, 'exports fn');

    t.throws(function() {
        cK([], 10);
    }, 'Cannot generate more values than input');

    t.deepEqual(cK([1], 1), [[1]], 'single-value case');

    t.deepEqual(cK([1, 1, 1, 1], 1), [[1, 1, 1, 1]], 'same-value case');

    var exampleInput = [-1, 2, -1, 2, 4, 5, 6, -1, 2, -1];
    var example = cK(exampleInput, 3);

    t.deepEqual(example, [[-1, -1, -1, -1], [2, 2, 2], [4, 5, 6]]);
    t.deepEqual(cK([1, 2, 3], 3), [[1], [2], [3]]);

    // is this right?
    t.deepEqual(cK([1, 2, 2, 3], 3), [[1, 2], [2], [3]]);
    t.deepEqual(cK([1, 2, 2, 3, 3], 3), [[1, 2], [2], [3, 3]]);
    t.deepEqual(cK([1, 2, 3, 2, 3], 3), [[1, 2], [2], [3, 3]]);
    t.deepEqual(cK([3, 2, 3, 2, 1], 3), [[1, 2], [2], [3, 3]]);
    t.deepEqual(cK([3, 2, 3, 5, 2, 1], 3), [[1, 2, 2], [3, 3], [5]]);

    t.deepEqual(cK([0, 1, 2, 100, 101, 103], 2), [[0, 1, 2], [100, 101, 103]]);
    t.deepEqual(cK([0, 1, 2, 50, 100, 101, 103], 3), [[0, 1, 2], [50], [100, 101, 103]]);

    t.end();
});
