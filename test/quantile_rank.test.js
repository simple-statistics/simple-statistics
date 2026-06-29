import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("quantileRank", function () {
    // Data and results from
    // [Scipy](https://github.com/scipy/scipy/blob/master/scipy/stats/stats.py)
    it("can get proper quantile ranks", function () {
        assert.equal(ss.quantileRank([3, 2, 4, 1], 3), 0.75);
        assert.equal(ss.quantileRank([4, 3, 2, 1, 3], 3), 0.7);
        assert.equal(ss.quantileRank([2, 1, 3, 4], 6), 1);
        assert.equal(ss.quantileRank([4, 1, 2, 3], -3), 0);
        assert.equal(ss.quantileRank([5, 2, 1, 3, 3], 4), 0.8);
        assert.equal(
            ss.quantileRank([5, 567, 1, 11, 2, 22, 4, 45, 3, 34], 5),
            0.5
        );
    });
});
