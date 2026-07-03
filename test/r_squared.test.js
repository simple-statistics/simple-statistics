import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("r-squared", function () {
    it("says that the r squared of a two-point line is perfect", function () {
        const d = Object.freeze([
            [0, 0],
            [1, 1]
        ]);
        const l = ss.linearRegressionLine(ss.linearRegression(d));
        assert.equal(ss.rSquared(d, l), 1);
    });

    it("says that the r squared of a three-point line is not perfect", function () {
        const d = Object.freeze([
            [0, 0],
            [0.5, 0.2],
            [1, 1]
        ]);
        const l = ss.linearRegressionLine(ss.linearRegression(d));
        assert.notEqual(ss.rSquared(d, l), 1);
    });

    it("r-squared of single sample is 1", function () {
        const d = Object.freeze([[0, 0]]);
        const l = ss.linearRegressionLine(ss.linearRegression(d));
        assert.equal(ss.rSquared(d, l), 1);
    });
});
