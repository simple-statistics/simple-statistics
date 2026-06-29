const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("root_mean_square", function () {
    // From http://en.wikipedia.org/wiki/Root_mean_square
    it("can get the RMS of two or more numbers", function () {
        assert.equal(ss.rootMeanSquare([1, 1]), 1);
        assert.equal(rnd(ss.rootMeanSquare([3, 4, 5])), 4.082);
        assert.equal(rnd(ss.rootMeanSquare([-0.1, 5, -2, 10])), 5.679);
    });

    it("returns null for empty lists", function () {
        assert.throws(function () {
            ss.rootMeanSquare([]);
        });
    });
});
