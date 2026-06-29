import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("quantile", function () {
    // Data and results from
    // [Wikipedia](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population),
    // Updated to use numpy linear interpolation method (type=7)
    it("can get proper quantiles of an even-length list", function () {
        const even = Object.freeze([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
        assert.equal(ss.quantile(even, 0.25), 7.25);
        assert.equal(ss.quantile(even, 0.5), 9);
        assert.equal(ss.quantile(even, 0.75), 14.5);
    });

    it("can get proper quantiles of an odd-length list", function () {
        const odd = Object.freeze([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]);
        assert.equal(ss.quantile(odd, 0.25), 7.5);
        assert.equal(ss.quantile(odd, 0.5), 9);
        assert.equal(ss.quantile(odd, 0.75), 14);
    });

    it("the median quantile is equal to the median", function () {
        const rand = Object.freeze([1, 4, 5, 8]);
        assert.equal(ss.quantile(rand, 0.5), ss.median(rand));
        const rand2 = Object.freeze([10, 50, 2, 4, 4, 5, 8]);
        assert.equal(ss.quantile(rand2, 0.5), ss.median(rand2));
    });

    assert.throws(function () {
        ss.quantile([], 0.5);
    });

    it("test odd-value case", function () {
        assert.equal(ss.quantile([0, 1, 2, 3, 4], 0.2), 0.8);
    });

    it("bad bounds throw an error", function () {
        assert.throws(function () {
            ss.quantile([1, 2, 3], 1.1);
        });
        assert.throws(function () {
            ss.quantile([1, 2, 3], -0.5);
        });
    });

    it("max quantile is equal to the max", function () {
        assert.equal(ss.quantile([1, 2, 3], 1), ss.max([1, 2, 3]));
    });

    it("min quantile is equal to the min", function () {
        assert.equal(ss.quantile([1, 2, 3], 0), ss.min([1, 2, 3]));
    });

    it("if quantile arg is an array, response is an array of quantiles", function () {
        const odd = Object.freeze([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]);
        assert.deepEqual(
            ss.quantile(odd, [0, 0.25, 0.5, 0.75, 1]),
            [3, 7.5, 9, 14, 20]
        );
        assert.deepEqual(ss.quantile(odd, [0.75, 0.5]), [14, 9]);
    });

    it("can get an array of quantiles on a small number of elements", function () {
        const input = Object.freeze([500, 468, 454, 469]);
        assert.deepEqual(
            ss.quantile(input, [0.25, 0.5, 0.75]),
            [464.5, 468.5, 476.75]
        );
        assert.deepEqual(
            ss.quantile(input, [0.05, 0.25, 0.5, 0.75, 0.95]),
            [456.1, 464.5, 468.5, 476.75, 495.34999999999997]
        );
    });
});
