import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("subtractFromMean", function () {
    it("can remove a single value from a mean", function () {
        const values = Object.freeze([13, 14, 15, 8, 20, 54]);
        assert.equal(
            ss.subtractFromMean(ss.mean(values), values.length, 54),
            14
        );
        assert.equal(
            ss.subtractFromMean(ss.mean(values), values.length, 54),
            ss.mean(values.slice(0, -1))
        );
    });
});
