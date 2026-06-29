const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("errorFunction", function () {
    it("symmetry", function () {
        assert.equal(ss.errorFunction(-1), -ss.errorFunction(1));
    });
    it("inverse", function () {
        for (let i = -1; i <= 1; i += 0.01) {
            assert.equal(
                Math.abs(ss.errorFunction(ss.inverseErrorFunction(i)) - i) <
                    4 * ss.epsilon,
                true
            );
        }
    });
});
