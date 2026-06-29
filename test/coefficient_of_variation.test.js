const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("coefficient_of_variation", function () {
    it("can get the coefficientOfVariation of a six-sided die", function () {
        assert.equal(rnd(ss.coefficientOfVariation([1, 2, 3, 4])), 0.516);
    });
});
