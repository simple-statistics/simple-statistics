const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("logit", function () {
    it("throws on logit < 0", function () {
        assert.throws(() => {
            ss.logit(-1);
        });
    });

    it("computes the logit otherwise", function () {
        assert.equal(ss.logit(0.5), 0);
    });
});
