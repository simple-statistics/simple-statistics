import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("median absolute deviation (mad)", function () {
    it("median absolute deviation of an example on wikipedia", function () {
        assert.equal(ss.mad([1, 1, 2, 2, 4, 6, 9]), 1);
    });

    // wolfram alpha: median absolute deviation {0,1,2,3,4,5,6,7,8,9,10}
    it("median absolute deviation of 0-10", function () {
        assert.equal(ss.mad([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 3);
    });

    it("median absolute deviation of one number is zero", function () {
        assert.equal(ss.mad([1]), 0);
    });

    it("zero-length corner case", function () {
        assert.throws(function () {
            ss.mad([]);
        });
    });
});
