import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("harmonicMean", function () {
    // From http://en.wikipedia.org/wiki/Harmonic_mean
    it("can get the mean of two or more numbers", function () {
        assert.equal(ss.harmonicMean([1, 1]), 1);
        assert.equal(rnd(ss.harmonicMean([2, 3])), 2.4);
        assert.equal(ss.harmonicMean([1, 2, 4]), 12 / 7);
    });

    it("cannot calculate for empty lists", function () {
        assert.throws(function () {
            ss.harmonicMean([]);
        });
    });

    it("cannot calculate for lists with negative numbers", function () {
        assert.throws(function () {
            ss.harmonicMean([-1]);
        });
    });
});
