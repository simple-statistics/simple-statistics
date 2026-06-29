const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("weightedQuantile", function () {
    it("can get weighted quantiles", function () {
        assert.equal(ss.weightedQuantile([1, 2, 3], [1, 1, 2], 0), 1);
        assert.equal(ss.weightedQuantile([1, 2, 3], [1, 1, 2], 0.5), 2);
        assert.equal(ss.weightedQuantile([1, 2, 3], [1, 1, 2], 0.75), 3);
        assert.equal(ss.weightedQuantile([1, 2, 3], [1, 1, 2], 1), 3);
    });

    it("sorts values before calculating quantiles", function () {
        assert.equal(ss.weightedQuantile([3, 1, 2], [2, 1, 1], 0.5), 2);
    });

    it("handles floating point weight totals after sorting", function () {
        assert.equal(ss.weightedQuantile([3, 2, 1], [0.1, 0.2, 0.3], 1), 3);
    });

    it("ignores zero weights", function () {
        assert.equal(ss.weightedQuantile([1, 100], [1, 0], 1), 1);
    });

    it("can get an array of weighted quantiles", function () {
        assert.deepEqual(
            ss.weightedQuantile([1, 2, 3], [1, 1, 2], [0, 0.5, 0.75, 1]),
            [1, 2, 3, 3]
        );
    });

    it("invalid inputs throw", function () {
        assert.throws(function () {
            ss.weightedQuantile([], [], 0.5);
        });
        assert.throws(function () {
            ss.weightedQuantile([1, 2], [1], 0.5);
        });
        assert.throws(function () {
            ss.weightedQuantile([1, 2], [0, 0], 0.5);
        });
        assert.throws(function () {
            ss.weightedQuantile([1, 2], [1, -1], 0.5);
        });
        assert.throws(function () {
            ss.weightedQuantile([1, 2], [1, 1], -0.5);
        });
        assert.throws(function () {
            ss.weightedQuantile([1, 2], [1, 1], 1.5);
        });
    });
});
