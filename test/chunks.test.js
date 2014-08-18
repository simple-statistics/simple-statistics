var test = require('tape');
var ss = require('../');

test('chunks', function(t) {
    test('can get chunks of an array', function(t) {
        t.deepEqual(ss.chunks([1, 2], 2), [[1], [2]]);
        t.deepEqual(ss.chunks([1, 2], 1), [[1, 2]]);
        t.deepEqual(ss.chunks([1, 2, 3, 4], 1), [[1, 2, 3, 4]]);
        t.deepEqual(ss.chunks([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
        t.end();
    });
    t.end();
});
