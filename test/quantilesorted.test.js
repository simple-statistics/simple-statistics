const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("quantileSorted", function () {
    // Data and results from
    // [Wikipedia](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population),
    // Updated to use numpy linear interpolation method (type=7)
    it("can get proper quantiles of an even-length list", function () {
        const even = Object.freeze([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
        assert.equal(ss.quantileSorted(even, 0.25), 7.25);
        assert.equal(ss.quantileSorted(even, 0.5), 9);
        assert.equal(ss.quantileSorted(even, 0.75), 14.5);
    });

    it("can get proper quantiles of an odd-length list", function () {
        const odd = Object.freeze([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]);
        assert.equal(ss.quantileSorted(odd, 0.25), 7.5);
        assert.equal(ss.quantileSorted(odd, 0.5), 9);
        assert.equal(ss.quantileSorted(odd, 0.75), 14);
    });
});
