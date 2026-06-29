import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("weightedStandardDeviation", function () {
    it("equal weights match standard deviation", function () {
        const input = [2, 4, 4, 4, 5, 5, 7, 9];
        const weights = [1, 1, 1, 1, 1, 1, 1, 1];

        assert.equal(
            ss.weightedStandardDeviation(input, weights),
            ss.standardDeviation(input)
        );
    });

    it("can get a weighted standard deviation", function () {
        assert.equal(
            rnd(ss.weightedStandardDeviation([1, 2, 3], [1, 1, 2])),
            0.829
        );
    });

    it("invalid inputs throw", function () {
        assert.throws(function () {
            ss.weightedStandardDeviation([], []);
        });
        assert.throws(function () {
            ss.weightedStandardDeviation([1, 2], [1]);
        });
        assert.throws(function () {
            ss.weightedStandardDeviation([1, 2], [0, 0]);
        });
        assert.throws(function () {
            ss.weightedStandardDeviation([1, 2], [1, -1]);
        });
    });
});
