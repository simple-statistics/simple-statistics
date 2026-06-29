import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("coefficient_of_variation", function () {
    it("can get the coefficientOfVariation of a six-sided die", function () {
        assert.equal(rnd(ss.coefficientOfVariation([1, 2, 3, 4])), 0.516);
    });
});
