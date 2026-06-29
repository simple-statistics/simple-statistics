const { it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

// The zScore method is also tested in the normal distribution tests.
it("zScore", function () {
    assert.equal(ss.zScore(78, 80, 5), -0.4);
    assert.equal(ss.zScore(78, 90, 5), -2.4);
    assert.equal(ss.zScore(78, 90, 2), -6);
});
