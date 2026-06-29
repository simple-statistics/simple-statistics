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
});
