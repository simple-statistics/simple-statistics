import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("scaledRootMeanSquare", function () {
    it("agrees with rootMeanSquare on ordinary input", function () {
        const cases = [[-1, 1, -1, 1], [1, 2, 3, 4], [-3, 4], [7], [0, 0, 0]];
        for (const x of cases) {
            assert.equal(
                ss.scaledRootMeanSquare(x),
                ss.rootMeanSquare(x),
                JSON.stringify(x)
            );
        }
    });

    it("stays finite where the squares leave range", function () {
        // sqrt((1 + 4 + 9) / 3) * 1e200
        const expected = Math.sqrt(14 / 3) * 1e200;
        const actual = ss.scaledRootMeanSquare([1e200, 2e200, 3e200]);
        assert.equal(Math.abs(actual - expected) / expected < 1e-15, true);
        assert.equal(ss.rootMeanSquare([1e200, 2e200, 3e200]), Infinity);
    });

    it("stays nonzero where the squares underflow", function () {
        const expected = Math.sqrt(14 / 3) * 1e-200;
        const actual = ss.scaledRootMeanSquare([1e-200, 2e-200, 3e-200]);
        assert.equal(Math.abs(actual - expected) / expected < 1e-15, true);
        assert.equal(ss.rootMeanSquare([1e-200, 2e-200, 3e-200]), 0);
    });

    it("reports infinite and missing values as rootMeanSquare does", function () {
        assert.equal(
            ss.scaledRootMeanSquare([Number.POSITIVE_INFINITY, 1]),
            Number.POSITIVE_INFINITY
        );
        assert.equal(
            Number.isNaN(ss.scaledRootMeanSquare([Number.NaN, 1])),
            true
        );
    });

    it("throws on empty input", function () {
        assert.throws(function () {
            ss.scaledRootMeanSquare([]);
        }, /at least one data point/);
    });
});
