import assert from "node:assert/strict";
import { it } from "node:test";
import * as ss from "../index.js";

// The zScore method is also tested in the normal distribution tests.
it("zScore", function () {
    assert.equal(ss.zScore(78, 80, 5), -0.4);
    assert.equal(ss.zScore(78, 90, 5), -2.4);
    assert.equal(ss.zScore(78, 90, 2), -6);
});
