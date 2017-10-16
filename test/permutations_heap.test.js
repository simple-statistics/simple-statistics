/* eslint no-shadow: 0 */


var test = require('tap').test;
var ss = require('../');

test('permutationsHeap', function(t) {
    t.test('generates 1 permutation', function(t) {
        t.deepEqual(ss.permutationsHeap([1]), [[1]]);
        t.end();
    });
    t.test('generates 1, 2, 3 permutations', function(t) {
        t.deepEqual(ss.permutationsHeap([1, 2, 3]), [
            [1, 2, 3],
            [2, 1, 3],
            [3, 1, 2],
            [1, 3, 2],
            [2, 3, 1],
            [3, 2, 1]
        ]);
        t.end();
    });
    t.end();
});
