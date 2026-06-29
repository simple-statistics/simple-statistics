import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("median", function () {
    it("can get the median of three numbers", function () {
        assert.equal(ss.median([1, 2, 3]), 2);
    });

    it("can get the median of two numbers", function () {
        assert.equal(ss.median([1, 2]), 1.5);
        assert.equal(ss.medianSorted([1, 2]), 1.5);
    });

    it("can get the median of four numbers", function () {
        assert.equal(ss.median([1, 2, 3, 4]), 2.5);
    });

    it("cannot calculate the median of an empty list", function () {
        assert.throws(function () {
            ss.median([]);
        });
    });

    it("sorts numbers numerically", function () {
        assert.equal(ss.median([8, 9, 10]), 9);
    });

    it("does not change the sorting order of its input", function () {
        const x = Object.freeze([1, 0]);
        assert.equal(ss.median(x), 0.5);
        assert.equal(x[0], 1);
        assert.equal(x[1], 0);
    });
});
