const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("standardNormalTable", function () {
    it("all entries are numeric", function () {
        for (let i = 0; i < ss.standardNormalTable.length; i++) {
            if (
                typeof ss.standardNormalTable[i] !== "number" ||
                ss.standardNormalTable[i] < 0 ||
                ss.standardNormalTable[i] > 1
            ) {
                assert.fail("standard normal table value invalid");
            }
        }
    });
});
