const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("log average", function () {
    it("cannot calculate for empty lists", function () {
        assert.throws(function () {
            ss.logAverage([]);
        });
    });

    it("cannot calculate for lists with negative numbers", function () {
        assert.throws(function () {
            ss.logAverage([-1]);
        });
    });

    it("does not overflow for large products", function () {
        const value = 1000;
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(value);
        }
        if (!Number.isFinite(ss.logAverage(Object.freeze(array)))) {
            assert.fail("log average failed for large product");
        }
    });

    it("does not underflow for small products", function () {
        const value = 0.001;
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(value);
        }
        if (ss.logAverage(Object.freeze(array)) === 0) {
            assert.fail("log average failed for small product");
        }
    });

    it("agrees with geometricMean", function () {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(Math.exp(Math.random()));
        }
        if (
            Math.abs(
                ss.logAverage(Object.freeze(arr)) -
                    ss.geometricMean(Object.freeze(arr))
            ) > ss.epsilon
        ) {
            assert.fail("log average and geometric mean are not equal");
        }
    });

    it("equals zero if array contains zero", function () {
        if (ss.logAverage([0, 1, 2]) !== 0) {
            assert.fail("log average of array containing zero is not zero");
        }
    });
});
