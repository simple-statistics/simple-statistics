import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("chiSquaredDistributionTable", function () {
    it("has the published upper-tail critical value at 25 degrees of freedom", function () {
        // The exact upper 10% quantile of the chi-squared distribution with 25
        // degrees of freedom is 34.3816, which rounds to 34.38 at the two
        // decimal places this table carries. The neighbouring rows already
        // agree with the published values, 33.20 at 24 degrees of freedom and
        // 35.56 at 26.
        assert.equal(ss.chiSquaredDistributionTable[25][0.1], 34.38);
    });
});
