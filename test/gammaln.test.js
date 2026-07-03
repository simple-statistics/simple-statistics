import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("gammaln", function () {
    it("gammaln for positive real float should be correct", function () {
        assert.equal(ss.gammaln(11.54), 16.388002631263966);
    });
    it("exp(gammaln(n)) for n should equal gamma(n)", function () {
        assert.equal(
            Math.round(Math.exp(ss.gammaln(8.2))),
            Math.round(ss.gamma(8.2))
        );
    });
    it("gammaln for negative n should be Infinity", function () {
        assert.equal(ss.gammaln(-42.5), Number.POSITIVE_INFINITY);
    });
    it("gammaln for n === 0 should return NaN", function () {
        assert.equal(ss.gammaln(0), Number.POSITIVE_INFINITY);
    });
});
