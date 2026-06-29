const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("sum", function () {
    it("can get the sum of two numbers", function () {
        assert.equal(ss.sum([1, 2]), 3);
    });

    it("the sum of no numbers is zero", function () {
        assert.equal(ss.sum([]), 0);
    });

    it("returns NaN if a non-number is given", function () {
        assert.ok(Number.isNaN(ss.sum([1, null])));
        assert.ok(Number.isNaN(ss.sum([null, 1])));
        assert.ok(Number.isNaN(ss.sum([1, 2, null])));
        assert.ok(Number.isNaN(ss.sum([1, 2, true])));
    });
});

describe("sumSimple", function () {
    it("can get the sum of two numbers", function () {
        assert.equal(ss.sumSimple([1, 2]), 3);
    });

    it("can get the sum of two numbers", function () {
        assert.equal(
            ss.sumSimple([
                0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
                1.4, 1.5, 1.6, 1.7
            ]),
            15.299999999999999
        );
        assert.equal(
            ss.sum([
                0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
                1.4, 1.5, 1.6, 1.7
            ]),
            15.3
        );
    });

    it("the sum of no numbers is zero", function () {
        assert.equal(ss.sumSimple([]), 0);
    });

    it("same NaN behavior as sum", function () {
        assert.ok(Number.isNaN(ss.sumSimple([null])));
        assert.ok(Number.isNaN(ss.sumSimple([1, 2, null])));
    });
});
