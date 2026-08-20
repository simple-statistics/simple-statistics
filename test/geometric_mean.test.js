import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("geometric mean", function () {
    // From http://en.wikipedia.org/wiki/Geometric_mean
    it("can get the mean of two numbers", function () {
        assert.equal(ss.geometricMean([2, 8]), 4);
        assert.equal(ss.geometricMean([4, 1, 1 / 32]), 0.5);
        assert.equal(Math.round(ss.geometricMean([2, 32, 1])), 4);
    });

    it("cannot calculate for empty lists", function () {
        assert.throws(function () {
            ss.geometricMean([]);
        });
    });

    it("cannot calculate for lists with negative numbers", function () {
        assert.throws(function () {
            ss.geometricMean([-1]);
        });
    });

    it("equals zero if array contains zero", function () {
        if (ss.geometricMean([0, 1, 2]) !== 0) {
            assert.fail("geometric mean of array containing zero is not zero");
        }
    });

    it("is unaffected when the running product leaves range", function () {
        // The mean stays representable long after the product does not:
        // 500 copies of 1e10 give a product of 1e5000, but a mean of 1e10.
        const big = ss.geometricMean(new Array(500).fill(1e10));
        assert.ok(
            Math.abs(big - 1e10) <= 1e10 * 1e-9,
            "expected about 1e10, got " + big
        );

        const small = ss.geometricMean(new Array(500).fill(1e-10));
        assert.ok(
            Math.abs(small - 1e-10) <= 1e-10 * 1e-9,
            "expected about 1e-10, got " + small
        );
    });
});
