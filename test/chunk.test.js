/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

test("chunk", function(t) {
    t.test("can get chunks of an array", function(t) {
        t.deepEqual(ss.chunk([1, 2], 1), [[1], [2]]);
        t.deepEqual(ss.chunk([1, 2], 2), [[1, 2]]);
        t.deepEqual(ss.chunk([1, 2, 3, 4], 4), [[1, 2, 3, 4]]);
        t.deepEqual(ss.chunk([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
        t.deepEqual(ss.chunk([1, 2, 3, 4], 3), [[1, 2, 3], [4]]);
        t.deepEqual(ss.chunk([1, 2, 3, 4, 5, 6, 7], 2), [
            [1, 2],
            [3, 4],
            [5, 6],
            [7]
        ]);
        t.deepEqual(ss.chunk([], 2), []);
        t.throws(function() {
            ss.chunk([1, 2], 0);
        }, "Throws with zero chunk size");

        t.throws(function() {
            ss.chunk([1, 2], 1.5);
        }, "Throws with non-integer chunk size");
        t.end();
    });
    t.end();
});
