import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

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

    it("returns NaN when any value is NaN, wherever it appears", function () {
        const cases = [
            [Number.NaN, 1, 2],
            [1, Number.NaN, 2],
            [1, 2, Number.NaN]
        ];
        for (const x of cases) {
            assert.equal(Number.isNaN(ss.min(x)), true);
        }
    });
});

describe("max", function () {
    assert.throws(function () {
        ss.max([]);
    });
    it("can get the maximum of three numbers", function () {
        assert.equal(ss.max([1, 7, -1000]), 7);
    });

    it("returns NaN when any value is NaN, wherever it appears", function () {
        const cases = [
            [Number.NaN, 1, 2],
            [1, Number.NaN, 2],
            [1, 2, Number.NaN]
        ];
        for (const x of cases) {
            assert.equal(Number.isNaN(ss.max(x)), true);
        }
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

    it("returns NaN bounds when any value is NaN, wherever it appears", function () {
        const cases = [
            [Number.NaN, 1, 2],
            [1, Number.NaN, 2],
            [1, 2, Number.NaN]
        ];
        for (const x of cases) {
            assert.deepEqual(ss.extent(x), [Number.NaN, Number.NaN]);
        }
    });
});

it("sorted", function () {
    assert.equal(ss.maxSorted([1, 7, 1000]), 1000, "maxSorted");
    assert.equal(ss.minSorted([1, 7, 1000]), 1, "minSorted");
    assert.deepEqual(ss.extentSorted([1, 7, 1000]), [1, 1000], "extentSorted");
});
