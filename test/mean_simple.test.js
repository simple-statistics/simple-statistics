import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("meanSimple", function () {
    it("can get the mean of two numbers", function () {
        assert.equal(ss.meanSimple([1, 2]), 1.5);
    });
    it("can get the mean of one number", function () {
        assert.equal(ss.meanSimple([1]), 1);
    });
    it("an empty list has no average", function () {
        assert.throws(function () {
            ss.meanSimple([]);
        });
    });
});
