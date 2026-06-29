const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("sampleStandardDeviation", function () {
    it("can get the standard deviation of an example on wikipedia", function () {
        assert.equal(
            rnd(ss.sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9])),
            2.138
        );
    });

    assert.throws(function () {
        ss.sampleStandardDeviation([]);
    });
});
