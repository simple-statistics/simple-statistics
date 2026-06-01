/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("weightedMean", function (t) {
    t.test("can get a weighted mean", function (t) {
        t.equal(ss.weightedMean([80, 90, 100], [1, 1, 2]), 92.5);
        t.end();
    });

    t.test("equal weights match mean", function (t) {
        t.equal(
            ss.weightedMean([1, 2, 3, 4], [1, 1, 1, 1]),
            ss.mean([1, 2, 3, 4])
        );
        t.end();
    });

    t.test("zero weights are ignored", function (t) {
        t.equal(ss.weightedMean([1, 100], [1, 0]), 1);
        t.end();
    });

    t.test("invalid inputs throw", function (t) {
        t.throws(function () {
            ss.weightedMean([], []);
        });
        t.throws(function () {
            ss.weightedMean([1, 2], [1]);
        });
        t.throws(function () {
            ss.weightedMean([1, 2], [0, 0]);
        });
        t.throws(function () {
            ss.weightedMean([1, 2], [1, -1]);
        });
        t.end();
    });

    t.end();
});
