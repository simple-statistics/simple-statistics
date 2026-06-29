const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("t test", function () {
    it("can compare a known value to the mean of samples", function () {
        const res = ss.tTest([1, 2, 3, 4, 5, 6], 3.385);
        assert.equal(res, 0.1649415480881466);
    });
});
