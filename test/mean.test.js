const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("mean", function () {
    it("can get the mean of two numbers", function () {
        assert.equal(ss.mean([1, 2]), 1.5);
    });
    it("can get the mean of one number", function () {
        assert.equal(ss.mean([1]), 1);
    });
    it("an empty list has no average", function () {
        assert.throws(function () {
            ss.mean([]);
        });
    });
});
