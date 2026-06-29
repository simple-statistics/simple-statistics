const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("combineMeans", function () {
    it("can combine the means of two lists", function () {
        const values1 = Object.freeze([8, 3, 4]);
        const values2 = Object.freeze([2, 6, 4]);
        assert.equal(
            ss.combineMeans(
                ss.mean(values1),
                values1.length,
                ss.mean(values2),
                values2.length
            ),
            4.5
        );
        assert.equal(
            ss.combineMeans(
                ss.mean(values1),
                values1.length,
                ss.mean(values2),
                values2.length
            ),
            ss.mean(values1.concat(values2))
        );
    });
});
