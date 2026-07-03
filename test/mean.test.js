import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("mean", function () {
    it("can get the mean of two numbers", function () {
        assert.equal(ss.mean([1, 2]), 1.5);
    });
    it("can get the mean of one number", function () {
        assert.equal(ss.mean([1]), 1);
    });
    it("an empty list has no average", function () {
        assert.throws(function () {
            ss.mean([]);
        });
    });
});
