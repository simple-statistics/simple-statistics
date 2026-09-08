import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("t test", function () {
    it("can compare a known value to the mean of samples", function () {
        const res = ss.tTest([1, 2, 3, 4, 5, 6], 3.385);
        assert.equal(res, 0.15057034426283503);
    });

    it("matches the closed-form statistic for a reference sample", function () {
        // Worked example from Wikipedia's Standard deviation article:
        // mean 5, sum of squared deviations 32, so sample variance is
        // 32 / 7 and t = (5 - 4) / (sqrt(32/7) / sqrt(8)) = sqrt(7) / 2.
        const res = ss.tTest([2, 4, 4, 4, 5, 5, 7, 9], 4);
        assert.equal(res, Math.sqrt(7) / 2);
    });

    it("throws for a sample with fewer than two data points", function () {
        assert.throws(function () {
            ss.tTest([5], 3);
        }, /at least two data points/);
    });
});
