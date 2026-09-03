import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
    linearRegression,
    linearRegressionLine,
    weightedLinearRegression
} from "../index.js";

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

    it("keeps its precision when x values share a large offset", function () {
        // A perfect line y = 2x + 1, shifted so the x values are the size of
        // a millisecond timestamp. The naive sums lose every significant
        // digit of the variance to cancellation.
        const data = [];
        for (let i = 0; i < 5; i++) {
            data.push([1e11 + i, 2 * i + 1]);
        }
        const { m, b } = linearRegression(data);
        assert.equal(m, 2);
        assert.equal(b, 1 - 2 * 1e11);
    });

    it("agrees with weightedLinearRegression when the weights are equal", function () {
        const data = [];
        for (let i = 0; i < 5; i++) {
            data.push([1e9 + i, 2 * i + 1]);
        }
        const weights = data.map(function () {
            return 1;
        });
        assert.deepEqual(
            linearRegression(data),
            weightedLinearRegression(data, weights)
        );
    });
});
