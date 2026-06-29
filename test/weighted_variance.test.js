const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("weightedVariance", function () {
    it("equal weights match variance", function () {
        const input = [2, 4, 4, 4, 5, 5, 7, 9];
        const weights = [1, 1, 1, 1, 1, 1, 1, 1];

        assert.equal(ss.weightedVariance(input, weights), ss.variance(input));
    });

    it("can get a weighted variance", function () {
        assert.equal(rnd(ss.weightedVariance([1, 2, 3], [1, 1, 2])), 0.688);
    });

    it("zero weights are ignored", function () {
        assert.equal(ss.weightedVariance([2, 100], [1, 0]), 0);
    });

    it("invalid inputs throw", function () {
        assert.throws(function () {
            ss.weightedVariance([], []);
        });
        assert.throws(function () {
            ss.weightedVariance([1, 2], [1]);
        });
        assert.throws(function () {
            ss.weightedVariance([1, 2], [0, 0]);
        });
        assert.throws(function () {
            ss.weightedVariance([1, 2], [1, -1]);
        });
    });
});
