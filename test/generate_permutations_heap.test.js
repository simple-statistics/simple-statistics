/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

test("generatePermutationsHeap", function(t) {
    t.test("generates 1 permutation", function(t) {
        t.deepEqual([...ss.generatePermutationsHeap([1])], [[1]]);
        t.end();
    });
    t.test("generates 1, 2, 3 permutations", function(t) {
        t.deepEqual(
            [...ss.generatePermutationsHeap([1, 2, 3])],
            [[1, 2, 3], [2, 1, 3], [3, 1, 2], [1, 3, 2], [2, 3, 1], [3, 2, 1]]
        );
        t.end();
    });
    t.end();
});
