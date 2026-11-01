import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

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
    it("interpolates finite extreme values when their difference overflows", function () {
        const maximum = Number.MAX_VALUE;
        const tolerance = Number.EPSILON * maximum;
        const extremes = [-maximum, maximum];
        assert.ok(
            Math.abs(ss.quantileSorted(extremes, 0.25) + maximum / 2) <=
                tolerance
        );
        assert.equal(ss.quantileSorted(extremes, 0.5), 0);
        assert.ok(
            Math.abs(ss.quantileSorted(extremes, 0.75) - maximum / 2) <=
                tolerance
        );
        assert.equal(ss.quantile([-maximum, maximum], 0.5), 0);
        const quartiles = ss.quantile([-maximum, maximum], [0.25, 0.5, 0.75]);
        assert.ok(Math.abs(quartiles[0] + maximum / 2) <= tolerance);
        assert.equal(quartiles[1], 0);
        assert.ok(Math.abs(quartiles[2] - maximum / 2) <= tolerance);

        const threeValues = [-maximum, 0, maximum];
        assert.equal(ss.quantileSorted(threeValues, 0.25), -maximum / 2);
        assert.equal(ss.quantileSorted(threeValues, 0.75), maximum / 2);
    });
    it("preserves ordinary interpolation and non-finite and signed-zero behavior", function () {
        assert.equal(ss.quantileSorted([1, 5], 0.25), 2);
        assert.ok(Number.isNaN(ss.quantileSorted([-Infinity, Infinity], 0.5)));
        assert.ok(Number.isNaN(ss.quantileSorted([NaN, 1], 0.5)));
        assert.ok(Object.is(ss.quantileSorted([-0, 0], 0), -0));
        assert.ok(Object.is(ss.quantileSorted([-0, 0], 1), 0));
        assert.ok(Object.is(ss.quantileSorted([-0, 0], 0.5), 0));
    });
});
