const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("factorial", function () {
    it("cannot calculate the factorial of a number lower than zero", function () {
        assert.throws(function () {
            ss.factorial(-1);
        });
    });
    it("rejects floating-point inputs", function () {
        assert.throws(function () {
            ss.factorial(0.5);
        });
    });
    it("can calculate 0! = 1", function () {
        assert.equal(ss.factorial(0), 1);
    });
    it("can calculate 1! = 1", function () {
        assert.equal(ss.factorial(1), 1);
    });
    it("can calculate 100! = 1", function () {
        assert.equal(ss.factorial(100), 9.33262154439441e157);
    });
});
