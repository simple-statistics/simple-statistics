var test = require('tape');
var ss = require('../');

test('chunks', function(t) {
    test('can get chunks of an array', function(t) {
        t.deepEqual(ss.chunk([1, 2], 1), [[1], [2]]);
        t.deepEqual(ss.chunk([1, 2], 2), [[1, 2]]);
        t.deepEqual(ss.chunk([1, 2, 3, 4], 4), [[1, 2, 3, 4]]);
        t.deepEqual(ss.chunk([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
        t.deepEqual(ss.chunk([1, 2, 3, 4], 3), [[1, 2, 3], [4]]);
        t.deepEqual(ss.chunk([1, 2, 3, 4, 5, 6, 7], 2), [[1, 2], [3, 4], [5, 6], [7]]);
        t.deepEqual(ss.chunk([], 2), []);
        t.deepEqual(ss.chunk([], 0), null);
        t.deepEqual(ss.chunk([1, 2], 0), null);
        t.end();
    });
    t.end();
});
