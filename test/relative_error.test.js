const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("relative error", function () {
    it("equal values", function () {
        assert.equal(ss.relativeError(14.5, 14.5), 0.0);
    });

    it("negative values", function () {
        assert.equal(ss.relativeError(-4, -5), 0.2);
    });

    it("correct handling of zero", function () {
        assert.equal(ss.relativeError(10101, 0), Number.POSITIVE_INFINITY);
    });

    it("correct handling of double zero", function () {
        assert.equal(ss.relativeError(0, 0), 0);
    });
});
