/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("r-squared", function (t) {
    t.test(
        "says that the r squared of a two-point line is perfect",
        function (t) {
            const d = [
                [0, 0],
                [1, 1]
            ];
            const l = ss.linearRegressionLine(ss.linearRegression(d));
            t.equal(ss.rSquared(d, l), 1);
            t.end();
        }
    );

    t.test(
        "says that the r squared of a three-point line is not perfect",
        function (t) {
            const d = [
                [0, 0],
                [0.5, 0.2],
                [1, 1]
            ];
            const l = ss.linearRegressionLine(ss.linearRegression(d));
            t.not(ss.rSquared(d, l), 1);
            t.end();
        }
    );

    t.test("r-squared of single sample is 1", function (t) {
        const d = [[0, 0]];
        const l = ss.linearRegressionLine(ss.linearRegression(d));
        t.equal(ss.rSquared(d, l), 1);
        t.end();
    });
    t.end();
});
