import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("t test p value", function () {
    it("gives the two-sided p value for a one-sample test", function () {
        assert.equal(
            ss.tTestPValue([1, 2, 3, 4, 5, 6], 3.385),
            0.8754511211713634
        );
        assert.equal(
            ss.tTestPValue([12, 11, 14, 15, 10, 13, 12, 11], 12),
            0.6643173263884273
        );
    });

    it("is exactly 1 when the sample mean is the expected value", function () {
        assert.equal(ss.tTest([1, 2, 3], 2), 0);
        assert.equal(ss.tTestPValue([1, 2, 3], 2), 1);
    });

    it("is symmetric about the sample mean", function () {
        assert.equal(
            ss.tTestPValue([1, 2, 3, 4, 5, 6], 4.5),
            ss.tTestPValue([1, 2, 3, 4, 5, 6], 2.5)
        );
    });

    it("decreases as the expected value moves away from the sample mean", function () {
        const values = [3.5, 4, 5, 6, 8].map((expected) =>
            ss.tTestPValue([1, 2, 3, 4, 5, 6], expected)
        );
        for (let i = 1; i < values.length; i++) {
            assert.ok(
                values[i] < values[i - 1],
                `p should fall as the expected value moves away: ${values[i]} < ${values[i - 1]}`
            );
        }
    });

    it("returns null when there are no degrees of freedom", function () {
        assert.equal(ss.tTestPValue([5], 3), null);
        assert.equal(ss.tTestPValue([], 3), null);
    });
});

describe("t test two sample p value", function () {
    it("gives the two-sided p value for a two-sample test", function () {
        assert.equal(
            ss.tTestTwoSamplePValue([1, 2, 3, 4], [3, 4, 5, 6], 0),
            0.07098765432098261
        );
    });

    it("defaults the difference to zero", function () {
        assert.equal(
            ss.tTestTwoSamplePValue([1, 2, 3, 4], [3, 4, 5, 6]),
            ss.tTestTwoSamplePValue([1, 2, 3, 4], [3, 4, 5, 6], 0)
        );
    });

    it("does not depend on the order of the two samples", function () {
        assert.equal(
            ss.tTestTwoSamplePValue([3, 4, 5, 6], [1, 2, 3, 4], 0),
            ss.tTestTwoSamplePValue([1, 2, 3, 4], [3, 4, 5, 6], 0)
        );
    });

    it("is exactly 1 for two identical samples", function () {
        assert.equal(ss.tTestTwoSample([1, 2, 3, 4], [1, 2, 3, 4], 0), 0);
        assert.equal(ss.tTestTwoSamplePValue([1, 2, 3, 4], [1, 2, 3, 4], 0), 1);
    });

    it("returns null when a sample is empty or there are no degrees of freedom", function () {
        assert.equal(ss.tTestTwoSamplePValue([], [1, 2], 0), null);
        assert.equal(ss.tTestTwoSamplePValue([1, 2], [], 0), null);
        assert.equal(ss.tTestTwoSamplePValue([1], [2], 0), null);
    });
});
