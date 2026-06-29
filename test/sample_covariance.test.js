const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("sample covariance", function () {
    it("can get perfect negative covariance", function () {
        const x = Object.freeze([1, 2, 3, 4, 5, 6]);
        const y = Object.freeze([6, 5, 4, 3, 2, 1]);
        assert.equal(rnd(ss.sampleCovariance(x, y)), -3.5);
    });

    it("covariance of something with itself is its variance", function () {
        const x = Object.freeze([1, 2, 3, 4, 5, 6]);
        assert.equal(rnd(ss.sampleCovariance(x, x)), 3.5);
    });

    it("covariance is zero for something with no correlation", function () {
        const x = Object.freeze([1, 2, 3, 4, 5, 6]);
        const y = Object.freeze([1, 1, 2, 2, 1, 1]);
        assert.equal(rnd(ss.sampleCovariance(x, y)), 0);
    });

    it("unequal-length corner case", function () {
        assert.throws(function () {
            ss.sampleCovariance([1], []);
        });
    });

    it("zero-length corner case", function () {
        assert.throws(function () {
            ss.sampleCovariance([], []);
        });
    });
});
