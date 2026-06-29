import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("tTestTwoSample", function () {
    it("can test independency of two samples", function () {
        const res = ss.tTestTwoSample([1, 2, 3, 4], [3, 4, 5, 6], 0);
        assert.equal(res, -2.1908902300206643);
    });

    it("can test independency of two samples (mu == -2)", function () {
        const res = ss.tTestTwoSample([1, 2, 3, 4], [3, 4, 5, 6], -2);
        assert.equal(res, 0);
    });

    it("can test independency of two samples of different lengths", function () {
        const res = ss.tTestTwoSample([1, 2, 3, 4], [3, 4, 5, 6, 1, 2, 0]);
        assert.equal(res, -0.4165977904505309);
    });

    it("has an edge case for one sample being of size zero", function () {
        assert.equal(ss.tTestTwoSample([1, 2, 3, 4], []), null);
        assert.equal(ss.tTestTwoSample([], [1, 2, 3, 4]), null);
        assert.equal(ss.tTestTwoSample([], []), null);
    });
});
