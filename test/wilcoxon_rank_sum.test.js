const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("wilcoxonRankSum", function () {
    it("x is dominated by y", function () {
        const x = Object.freeze([1, 2, 3]);
        const y = Object.freeze([4, 5, 6]);
        const res = ss.wilcoxonRankSum(x, y);
        assert.equal(res, 6);
    });

    it("y is dominated by x", function () {
        const x = Object.freeze([4, 5, 6]);
        const y = Object.freeze([1, 2, 3]);
        const res = ss.wilcoxonRankSum(x, y);
        assert.equal(res, 15);
    });

    it("x and y are interleaved", function () {
        const x = Object.freeze([1, 3, 5]);
        const y = Object.freeze([2, 4, 6]);
        const res = ss.wilcoxonRankSum(x, y);
        assert.equal(res, 9);
    });

    it("x and y overlap at one value", function () {
        const x = Object.freeze([1, 2, 3]);
        const y = Object.freeze([3, 4, 5]);
        const res = ss.wilcoxonRankSum(x, y);
        assert.equal(res, 6.5);
    });

    it("trailing tied ranks are handled correctly", function () {
        const x = Object.freeze([1, 2, 3]);
        const y = Object.freeze([3]);
        const res = ss.wilcoxonRankSum(x, y);
        assert.equal(res, 6.5);
    });

    it("empty input throws", function () {
        const message = /Neither sample can be empty/;
        assert.throws(function () {
            ss.wilcoxonRankSum([], []);
        }, message);
        assert.throws(function () {
            ss.wilcoxonRankSum([1, 2, 3], []);
        }, message);
        assert.throws(function () {
            ss.wilcoxonRankSum([], [1, 2, 3]);
        }, message);
    });
});
