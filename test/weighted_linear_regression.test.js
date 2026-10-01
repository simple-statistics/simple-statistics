import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("weightedLinearRegression", function () {
    it("equals linearRegression when the weights are equal", function () {
        const data = [
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 5]
        ];
        const plain = ss.linearRegression(data);
        for (const w of [1, 4, 0.25]) {
            const weighted = ss.weightedLinearRegression(
                data,
                data.map(() => w)
            );
            assert.equal(weighted.m, plain.m);
            assert.equal(weighted.b, plain.b);
        }
    });

    it("matches a weighted least squares reference", function () {
        // Expected values from statsmodels.api.WLS.
        const data = [
            [1, 2],
            [2, 3],
            [3, 5],
            [4, 4],
            [5, 8]
        ];
        const { m, b } = ss.weightedLinearRegression(data, [5, 1, 1, 1, 5]);
        assert.equal(Math.abs(m - 1.4523809523809523) < 1e-12, true);
        assert.equal(Math.abs(b - 0.4120879120879124) < 1e-12, true);
    });

    it("a zero weight drops its observation", function () {
        const data = [
            [0, 1],
            [1, 3],
            [2, 4],
            [3, 8],
            [4, 9]
        ];
        const dropped = ss.weightedLinearRegression(data, [0, 1, 1, 1, 1]);
        const without = ss.linearRegression(data.slice(1));
        assert.equal(dropped.m, without.m);
        assert.equal(dropped.b, without.b);
    });

    it("integer weights match repeating the observations", function () {
        const weighted = ss.weightedLinearRegression(
            [
                [1, 2],
                [2, 3],
                [3, 5]
            ],
            [1, 2, 1]
        );
        const repeated = ss.linearRegression([
            [1, 2],
            [2, 3],
            [2, 3],
            [3, 5]
        ]);
        assert.equal(weighted.m, repeated.m);
        assert.equal(weighted.b, repeated.b);
    });

    it("is unchanged when every weight is scaled", function () {
        const data = [
            [0, 1],
            [1, 3],
            [2, 4],
            [3, 8],
            [4, 9]
        ];
        const small = ss.weightedLinearRegression(data, [1, 2, 3, 4, 5]);
        const large = ss.weightedLinearRegression(data, [10, 20, 30, 40, 50]);
        assert.equal(Math.abs(small.m - large.m) < 1e-12, true);
        assert.equal(Math.abs(small.b - large.b) < 1e-12, true);
    });

    it("takes the horizontal line through a single point", function () {
        assert.deepEqual(ss.weightedLinearRegression([[5, 7]], [3]), {
            m: 0,
            b: 7
        });
    });

    it("rejects invalid input", function () {
        assert.throws(function () {
            ss.weightedLinearRegression([], []);
        }, /at least one data point/);
        assert.throws(function () {
            ss.weightedLinearRegression(
                [
                    [0, 0],
                    [1, 1]
                ],
                [1]
            );
        }, /same length/);
        assert.throws(function () {
            ss.weightedLinearRegression(
                [
                    [0, 0],
                    [1, 1]
                ],
                [-1, 2]
            );
        }, /non-negative/);
        assert.throws(function () {
            ss.weightedLinearRegression(
                [
                    [0, 0],
                    [1, 1]
                ],
                [0, 0]
            );
        }, /positive weight/);
    });
});
