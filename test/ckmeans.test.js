/* eslint no-shadow: 0 */

var test = require("tap").test;
var cK = require("../").ckmeans;

test("C k-means", function(t) {
    t.ok(cK, "exports fn");

    t.throws(function() {
        cK([], 10);
    }, "Cannot generate more values than input");

    t.deepEqual(cK([1], 1), [[1]], "single-value case");

    t.deepEqual(cK([1, 1, 1, 1], 1), [[1, 1, 1, 1]], "same-value case");

    var exampleInput = [-1, 2, -1, 2, 4, 5, 6, -1, 2, -1];
    var example = cK(exampleInput, 3);

    t.deepEqual(example, [[-1, -1, -1, -1], [2, 2, 2], [4, 5, 6]]);
    t.deepEqual(cK([1, 2, 3], 3), [[1], [2], [3]]);

    t.deepEqual(cK([0, 3, 4], 2), [[0], [3, 4]]);
    t.deepEqual(cK([-3, 0, 4], 2), [[-3, 0], [4]]);

    t.deepEqual(cK([1, 2, 2, 3], 3), [[1], [2, 2], [3]]);
    t.deepEqual(cK([1, 2, 2, 3, 3], 3), [[1], [2, 2], [3, 3]]);
    t.deepEqual(cK([1, 2, 3, 2, 3], 3), [[1], [2, 2], [3, 3]]);
    t.deepEqual(cK([3, 2, 3, 2, 1], 3), [[1], [2, 2], [3, 3]]);
    t.deepEqual(cK([3, 2, 3, 5, 2, 1], 3), [[1, 2, 2], [3, 3], [5]]);

    t.deepEqual(cK([0, 1, 2, 100, 101, 103], 2), [[0, 1, 2], [100, 101, 103]]);
    t.deepEqual(cK([0, 1, 2, 50, 100, 101, 103], 3), [
        [0, 1, 2],
        [50],
        [100, 101, 103]
    ]);

    // Covers a floating point imprecision edge case
    t.deepEqual(
        cK([64.64249127327881, 64.64249127328245, 57.79216426169771], 2),
        [[57.79216426169771], [64.64249127327881, 64.64249127328245]]
    );

    t.end();
});
