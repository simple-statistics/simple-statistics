const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("product", function () {
    it("can get the product of one number", function () {
        assert.equal(ss.product([2]), 2);
    });

    it("can get the product of two numbers", function () {
        assert.equal(ss.product([2, 3]), 6);
    });

    it("can get the product of a negative number", function () {
        assert.equal(ss.product([-1, 2, 3, 4]), -24);
    });

    it("the product of no numbers is one - the multiplicative identity", function () {
        assert.equal(ss.product([]), 1);
    });
});
