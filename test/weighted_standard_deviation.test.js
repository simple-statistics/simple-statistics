/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test("weightedStandardDeviation", function (t) {
    t.test("equal weights match standard deviation", function (t) {
        const input = [2, 4, 4, 4, 5, 5, 7, 9];
        const weights = [1, 1, 1, 1, 1, 1, 1, 1];

        t.equal(
            ss.weightedStandardDeviation(input, weights),
            ss.standardDeviation(input)
        );
        t.end();
    });

    t.test("can get a weighted standard deviation", function (t) {
        t.equal(rnd(ss.weightedStandardDeviation([1, 2, 3], [1, 1, 2])), 0.829);
        t.end();
    });

    t.test("invalid inputs throw", function (t) {
        t.throws(function () {
            ss.weightedStandardDeviation([], []);
        });
        t.throws(function () {
            ss.weightedStandardDeviation([1, 2], [1]);
        });
        t.throws(function () {
            ss.weightedStandardDeviation([1, 2], [0, 0]);
        });
        t.throws(function () {
            ss.weightedStandardDeviation([1, 2], [1, -1]);
        });
        t.end();
    });

    t.end();
});
