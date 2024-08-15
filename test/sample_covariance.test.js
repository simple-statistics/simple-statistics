/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test("sample covariance", function (t) {
    t.test("can get perfect negative covariance", function (t) {
        const x = [1, 2, 3, 4, 5, 6];
        const y = [6, 5, 4, 3, 2, 1];
        t.equal(rnd(ss.sampleCovariance(x, y)), -3.5);
        t.end();
    });

    t.test("covariance of something with itself is its variance", function (t) {
        const x = [1, 2, 3, 4, 5, 6];
        t.equal(rnd(ss.sampleCovariance(x, x)), 3.5);
        t.end();
    });

    t.test(
        "covariance is zero for something with no correlation",
        function (t) {
            const x = [1, 2, 3, 4, 5, 6];
            const y = [1, 1, 2, 2, 1, 1];
            t.equal(rnd(ss.sampleCovariance(x, y)), 0);
            t.end();
        },
    );

    t.test("unequal-length corner case", function (t) {
        t.throws(function () {
            ss.sampleCovariance([1], []);
        });
        t.end();
    });

    t.test("zero-length corner case", function (t) {
        t.throws(function () {
            ss.sampleCovariance([], []);
        });
        t.end();
    });
    t.end();
});
