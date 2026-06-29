const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("min", function () {
    assert.throws(function () {
        ss.min([]);
    });
    it("can get the minimum of one number", function () {
        assert.equal(ss.min([1]), 1);
    });

    it("can get the minimum of three numbers", function () {
        assert.equal(ss.min([1, 7, -1000]), -1000);
    });
});

describe("max", function () {
    assert.throws(function () {
        ss.max([]);
    });
    it("can get the maximum of three numbers", function () {
        assert.equal(ss.max([1, 7, -1000]), 7);
    });
});

describe("extent", function () {
    assert.throws(function () {
        ss.extent([]);
    });
    it("can get the extent of one number", function () {
        assert.deepEqual(ss.extent([1]), [1, 1]);
        assert.equal(ss.extent([1])[0], ss.extent([1])[1]);
    });
    it("can get the extent of three numbers", function () {
        assert.deepEqual(ss.extent([1, 7, -1000]), [-1000, 7]);
    });
});

it("sorted", function () {
    assert.equal(ss.maxSorted([1, 7, 1000]), 1000, "maxSorted");
    assert.equal(ss.minSorted([1, 7, 1000]), 1, "minSorted");
    assert.deepEqual(ss.extentSorted([1, 7, 1000]), [1, 1000], "extentSorted");
});
