const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

const EPS = ss.epsilon;
const HALF_EPS = ss.epsilon / 2;
const TWO_EPS = ss.epsilon * 2;

describe("approximate strict equality", function () {
    it("handles equal values", function () {
        assert.ok(ss.approxEqual(14.5, 14.5));
    });

    it("handles values separated by less than epsilon", function () {
        assert.ok(ss.approxEqual(1, 1 + HALF_EPS));
    });

    it("handles values separated by more than epsilon", function () {
        assert.ok(!ss.approxEqual(1, 1 + TWO_EPS));
    });

    it("handles values separated by relatively less than epsilon", function () {
        assert.ok(ss.approxEqual(100, 100 + 99 * ss.epsilon));
    });

    it("handles values separated by relatively more than epsilon", function () {
        assert.ok(!ss.approxEqual(100, 100 + 101 * ss.epsilon));
    });

    it("handles negative values", function () {
        assert.ok(ss.approxEqual(-10, -10));
        assert.ok(ss.approxEqual(-10 - EPS, -10));
        assert.ok(!ss.approxEqual(-10 - 11 * EPS, -10));
        assert.ok(!ss.approxEqual(-10, 10));
    });

    it("handles larger tolerances", function () {
        assert.ok(!ss.approxEqual(1, 2));
        assert.ok(ss.approxEqual(1, 2, 1.5));
    });

    it("handles values near zero", function () {
        assert.ok(!ss.approxEqual(1, 0));
        assert.ok(!ss.approxEqual(0, 1));
    });
});
