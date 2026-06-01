/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("weightedQuantile", function (t) {
    t.test("can get weighted quantiles", function (t) {
        t.equal(ss.weightedQuantile([1, 2, 3], [1, 1, 2], 0), 1);
        t.equal(ss.weightedQuantile([1, 2, 3], [1, 1, 2], 0.5), 2);
        t.equal(ss.weightedQuantile([1, 2, 3], [1, 1, 2], 0.75), 3);
        t.equal(ss.weightedQuantile([1, 2, 3], [1, 1, 2], 1), 3);
        t.end();
    });

    t.test("sorts values before calculating quantiles", function (t) {
        t.equal(ss.weightedQuantile([3, 1, 2], [2, 1, 1], 0.5), 2);
        t.end();
    });

    t.test("ignores zero weights", function (t) {
        t.equal(ss.weightedQuantile([1, 100], [1, 0], 1), 1);
        t.end();
    });

    t.test("can get an array of weighted quantiles", function (t) {
        t.same(
            ss.weightedQuantile([1, 2, 3], [1, 1, 2], [0, 0.5, 0.75, 1]),
            [1, 2, 3, 3]
        );
        t.end();
    });

    t.test("invalid inputs throw", function (t) {
        t.throws(function () {
            ss.weightedQuantile([], [], 0.5);
        });
        t.throws(function () {
            ss.weightedQuantile([1, 2], [1], 0.5);
        });
        t.throws(function () {
            ss.weightedQuantile([1, 2], [0, 0], 0.5);
        });
        t.throws(function () {
            ss.weightedQuantile([1, 2], [1, -1], 0.5);
        });
        t.throws(function () {
            ss.weightedQuantile([1, 2], [1, 1], -0.5);
        });
        t.throws(function () {
            ss.weightedQuantile([1, 2], [1, 1], 1.5);
        });
        t.end();
    });

    t.end();
});
