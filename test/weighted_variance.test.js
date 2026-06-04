/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test("weightedVariance", function (t) {
    t.test("equal weights match variance", function (t) {
        const input = [2, 4, 4, 4, 5, 5, 7, 9];
        const weights = [1, 1, 1, 1, 1, 1, 1, 1];

        t.equal(ss.weightedVariance(input, weights), ss.variance(input));
        t.end();
    });

    t.test("can get a weighted variance", function (t) {
        t.equal(rnd(ss.weightedVariance([1, 2, 3], [1, 1, 2])), 0.688);
        t.end();
    });

    t.test("zero weights are ignored", function (t) {
        t.equal(ss.weightedVariance([2, 100], [1, 0]), 0);
        t.end();
    });

    t.test("invalid inputs throw", function (t) {
        t.throws(function () {
            ss.weightedVariance([], []);
        });
        t.throws(function () {
            ss.weightedVariance([1, 2], [1]);
        });
        t.throws(function () {
            ss.weightedVariance([1, 2], [0, 0]);
        });
        t.throws(function () {
            ss.weightedVariance([1, 2], [1, -1]);
        });
        t.end();
    });

    t.end();
});
