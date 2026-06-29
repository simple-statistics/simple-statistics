const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const linearRegression =
    require("../dist/simple-statistics.js").linearRegression;
const linearRegressionLine =
    require("../dist/simple-statistics.js").linearRegressionLine;

describe("linear regression", function () {
    it("correctly generates a line for a 0, 0 to 1, 1 dataset", function () {
        const l = linearRegressionLine(
            linearRegression([
                [0, 0],
                [1, 1]
            ])
        );
        assert.equal(l(0), 0);
        assert.equal(l(0.5), 0.5);
        assert.equal(l(1), 1);
    });

    it("correctly generates a line for a 0, 0 to 1, 0 dataset", function () {
        const l = linearRegressionLine(
            linearRegression([
                [0, 0],
                [1, 0]
            ])
        );
        assert.equal(l(0), 0);
        assert.equal(l(0.5), 0);
        assert.equal(l(1), 0);
    });

    it("handles a single-point sample", function () {
        const l = linearRegressionLine(linearRegression([[0, 0]]));
        assert.deepEqual(l(10), 0);
    });

    it("a straight line will have a slope of 0", function () {
        assert.deepEqual(
            linearRegression([
                [0, 0],
                [1, 0]
            ]),
            { m: 0, b: 0 }
        );
    });

    it("a line at 50% grade", function () {
        assert.deepEqual(
            linearRegression([
                [0, 0],
                [1, 0.5]
            ]),
            { m: 0.5, b: 0 }
        );
    });

    it("a line with a high y-intercept", function () {
        assert.deepEqual(
            linearRegression([
                [0, 20],
                [1, 10]
            ]),
            { m: -10, b: 20 }
        );
    });
});
