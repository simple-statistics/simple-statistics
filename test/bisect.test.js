import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bisect } from "../index.js";

describe("bisect", function () {
    it("can find root of sin and cos", function () {
        assert.equal(
            Number(bisect(Math.sin, 1, 4, 100, 0.003).toFixed(4)),
            3.1416
        );
        assert.equal(
            Number(bisect(Math.cos, 0, 4, 100, 0.003).toFixed(4)),
            1.5723
        );
        assert.throws(function () {
            assert.equal(
                Number(bisect(Math.cos, 0, 4, 1, 0.003).toFixed(4)),
                1.5723
            );
        });
        assert.throws(function () {
            bisect(0);
        });
    });
});
