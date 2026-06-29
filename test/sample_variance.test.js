const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("sample variance", function () {
    it("can get the sample variance of a six-sided die", function () {
        assert.equal(rnd(ss.sampleVariance([1, 2, 3, 4, 5, 6])), 3.5);
    });

    // confirmed in R
    //
    // > var(1:10)
    // [1] 9.166667
    it("can get the sample variance of numbers 1-10", function () {
        assert.equal(
            rnd(ss.sampleVariance([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])),
            9.167
        );
    });

    it("the sample variance of two numbers that are the same is 0", function () {
        assert.equal(rnd(ss.sampleVariance([1, 1])), 0);
    });

    assert.throws(function () {
        ss.sampleVariance([1]);
    });

    assert.throws(function () {
        ss.sampleVariance([]);
    });
});
