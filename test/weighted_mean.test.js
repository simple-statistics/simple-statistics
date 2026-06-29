const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("weightedMean", function () {
    it("can get a weighted mean", function () {
        assert.equal(ss.weightedMean([80, 90, 100], [1, 1, 2]), 92.5);
    });

    it("equal weights match mean", function () {
        assert.equal(
            ss.weightedMean([1, 2, 3, 4], [1, 1, 1, 1]),
            ss.mean([1, 2, 3, 4])
        );
    });

    it("zero weights are ignored", function () {
        assert.equal(ss.weightedMean([1, 100], [1, 0]), 1);
    });

    it("invalid inputs throw", function () {
        assert.throws(function () {
            ss.weightedMean([], []);
        });
        assert.throws(function () {
            ss.weightedMean([1, 2], [1]);
        });
        assert.throws(function () {
            ss.weightedMean([1, 2], [0, 0]);
        });
        assert.throws(function () {
            ss.weightedMean([1, 2], [1, -1]);
        });
    });
});
