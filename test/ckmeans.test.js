/* eslint no-shadow: 0 */

const test = require("tap").test;
const cK = require("../dist/simple-statistics.js").ckmeans;

test("C k-means", function (t) {
    t.ok(cK, "exports fn");

    t.throws(function () {
        cK([], 10);
    }, "Cannot generate more values than input");

    t.same(cK([1], 1), [[1]], "single-value case");

    t.same(cK([1, 1, 1, 1], 1), [[1, 1, 1, 1]], "same-value case");

    const exampleInput = [-1, 2, -1, 2, 4, 5, 6, -1, 2, -1];
    const example = cK(exampleInput, 3);

    t.same(example, [
        [-1, -1, -1, -1],
        [2, 2, 2],
        [4, 5, 6],
    ]);
    t.same(cK([1, 2, 3], 3), [[1], [2], [3]]);

    t.same(cK([0, 3, 4], 2), [[0], [3, 4]]);
    t.same(cK([-3, 0, 4], 2), [[-3, 0], [4]]);

    t.same(cK([1, 2, 2, 3], 3), [[1], [2, 2], [3]]);
    t.same(cK([1, 2, 2, 3, 3], 3), [[1], [2, 2], [3, 3]]);
    t.same(cK([1, 2, 3, 2, 3], 3), [[1], [2, 2], [3, 3]]);
    t.same(cK([3, 2, 3, 2, 1], 3), [[1], [2, 2], [3, 3]]);
    t.same(cK([3, 2, 3, 5, 2, 1], 3), [[1, 2, 2], [3, 3], [5]]);

    t.same(cK([0, 1, 2, 100, 101, 103], 2), [
        [0, 1, 2],
        [100, 101, 103],
    ]);
    t.same(cK([0, 1, 2, 50, 100, 101, 103], 3), [
        [0, 1, 2],
        [50],
        [100, 101, 103],
    ]);

    // Covers a floating point imprecision edge case
    t.same(cK([64.64249127327881, 64.64249127328245, 57.79216426169771], 2), [
        [57.79216426169771],
        [64.64249127327881, 64.64249127328245],
    ]);

    t.end();
});
