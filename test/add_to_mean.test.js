const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("addToMean", function () {
    it("can get add a single value to a mean", function () {
        const values = Object.freeze([13, 14, 15, 8, 20]);
        assert.equal(ss.addToMean(ss.mean(values), values.length, 53), 20.5);
        assert.equal(
            ss.addToMean(ss.mean(values), values.length, 53),
            ss.mean(values.concat(53))
        );
    });
});
