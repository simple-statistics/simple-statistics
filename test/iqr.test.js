const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("interquartile range (iqr)", function () {
    // Data and results from
    // [Wikipedia](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
    it("can get proper iqr of an even-length list", function () {
        const even = Object.freeze([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
        assert.equal(
            ss.quantile(even, 0.75) - ss.quantile(even, 0.25),
            ss.iqr(even)
        );
    });

    it("can get proper iqr of an odd-length list", function () {
        const odd = Object.freeze([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]);
        assert.equal(
            ss.quantile(odd, 0.75) - ss.quantile(odd, 0.25),
            ss.iqr(odd)
        );
    });

    it("an iqr of a zero-length list cannot be calculated", function () {
        assert.throws(function () {
            ss.iqr([]);
        });
    });
});
