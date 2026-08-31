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

    it("has the published upper-tail critical value at 7 degrees of freedom", function () {
        // The exact value with an upper tail of 0.99 is 1.23904, which rounds
        // to 1.24. The neighbouring rows already agree, 0.87 at 6 degrees of
        // freedom and 1.65 at 8.
        assert.equal(ss.chiSquaredDistributionTable[7][0.99], 1.24);
    });
});
