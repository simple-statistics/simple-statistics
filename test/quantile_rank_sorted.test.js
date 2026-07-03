import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("quantileRankSorted", function () {
    // Data and results from
    // [Scipy](https://github.com/scipy/scipy/blob/master/scipy/stats/stats.py)
    it("can get proper quantile ranks", function () {
        assert.equal(ss.quantileRankSorted([1, 2, 3, 4], 3), 0.75);
        assert.equal(ss.quantileRankSorted([1, 2, 3, 3, 4], 3), 0.7);
        assert.equal(ss.quantileRankSorted([1, 2, 3, 4], 6), 1);
        assert.equal(ss.quantileRankSorted([1, 2, 3, 4], -3), 0);
        assert.equal(ss.quantileRankSorted([1, 2, 3, 3, 5], 4), 0.8);
    });
});
