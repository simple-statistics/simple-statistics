/* eslint no-shadow: 0 */

const test = require("tap").test;
const linearRegression = require("../index.js").linearRegression;
const linearRegressionLine = require("../index.js").linearRegressionLine;

test("linear regression", function (t) {
    t.test(
        "correctly generates a line for a 0, 0 to 1, 1 dataset",
        function (t) {
            const l = linearRegressionLine(
                linearRegression([
                    [0, 0],
                    [1, 1]
                ])
            );
            t.equal(l(0), 0);
            t.equal(l(0.5), 0.5);
            t.equal(l(1), 1);
            t.end();
        }
    );

    t.test(
        "correctly generates a line for a 0, 0 to 1, 0 dataset",
        function (t) {
            const l = linearRegressionLine(
                linearRegression([
                    [0, 0],
                    [1, 0]
                ])
            );
            t.equal(l(0), 0);
            t.equal(l(0.5), 0);
            t.equal(l(1), 0);
            t.end();
        }
    );

    t.test("handles a single-point sample", function (t) {
        const l = linearRegressionLine(linearRegression([[0, 0]]));
        t.same(l(10), 0);
        t.end();
    });

    t.test("a straight line will have a slope of 0", function (t) {
        t.same(
            linearRegression([
                [0, 0],
                [1, 0]
            ]),
            { m: 0, b: 0 }
        );
        t.end();
    });

    t.test("a line at 50% grade", function (t) {
        t.same(
            linearRegression([
                [0, 0],
                [1, 0.5]
            ]),
            { m: 0.5, b: 0 }
        );
        t.end();
    });

    t.test("a line with a high y-intercept", function (t) {
        t.same(
            linearRegression([
                [0, 20],
                [1, 10]
            ]),
            { m: -10, b: 20 }
        );
        t.end();
    });
    t.end();
});
