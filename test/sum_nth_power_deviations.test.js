const { it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

it("sumNthPowerDeviations", function () {
    assert.equal(ss.sumNthPowerDeviations([0, 0, 0], 2), 0);
    assert.equal(ss.sumNthPowerDeviations([0, 1], 2), 0.5);
    assert.equal(ss.sumNthPowerDeviations([0, 1], 3), 0);
    assert.equal(ss.sumNthPowerDeviations([0, 1, 2], 2), 2);
});
