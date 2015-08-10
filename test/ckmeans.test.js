/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var cK = require('../src/ckmeans');
var sum = require('../src/sum');

test('C k-means', function(t) {
    t.ok(cK, 'exports fn');

    t.throws(function() {
        cK([], 10);
    }, 'Cannot generate more values than input');

    t.deepEqual(cK([1], 1), {
        nClusters: 1,
        clusters: [[1]],
        centers: [1],
        withinss: [0],
        size: [1]
    }, 'single-value case');

    t.deepEqual(cK([1, 1, 1, 1], 1), {
        nClusters: 1,
        clusters: [[1, 1, 1, 1]],
        centers: [1],
        withinss: [0],
        size: [4]
    }, 'same-value case');

    var exampleInput = [-1, 2, -1, 2, 4, 5, 6, -1, 2, -1];
    var example = cK(exampleInput, 3);

    t.equal(sum(example.size), exampleInput.length, 'size should be ' + exampleInput.length);
    t.deepEqual(example, {
        nClusters: 3,
        withinss: [0, 0, 2],
        centers: [-1, 2, 5],
        size: [4, 3, 3],
        clusters: [[-1, -1, -1, -1], [2, 2, 2], [4, 5, 6]]
    });

    t.end();
});