const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("combineVariances", function () {
    it("can combine the variances of two lists", function () {
        const values1 = Object.freeze([8, 3, 4]);
        const values2 = Object.freeze([2, 6, 4]);

        assert.equal(
            +ss
                .combineVariances(
                    ss.variance(values1),
                    ss.mean(values1),
                    values1.length,
                    ss.variance(values2),
                    ss.mean(values2),
                    values2.length
                )
                .toPrecision(3),
            3.92
        );
        assert.equal(
            ss.combineVariances(
                ss.variance(values1),
                ss.mean(values1),
                values1.length,
                ss.variance(values2),
                ss.mean(values2),
                values2.length
            ),
            ss.variance(values1.concat(values2))
        );
    });
});
