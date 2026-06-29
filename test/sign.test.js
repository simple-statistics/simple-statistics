import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sign } from "../index.js";

describe("bisect", function () {
    it("can find sign of number", function () {
        assert.equal(sign(2), 1);
        assert.equal(sign(0), 0);
        assert.equal(sign(-0), 0);
        assert.equal(sign(-2), -1);
        assert.equal(sign(-0.000001), -1);
        assert.equal(sign(0.000001), 1);
        assert.throws(function () {
            sign("hello world!");
        });
    });
});
