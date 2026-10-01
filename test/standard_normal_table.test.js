import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

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

    it("matches published values where the series converges slowest", function () {
        // Four-decimal values from a published standard normal table. The
        // series behind the table converges more slowly as z grows, so the
        // top of its domain is where truncation shows up first.
        const published = [
            [2.94, 0.9984],
            [2.96, 0.9985],
            [2.98, 0.9986],
            [3, 0.9987],
            [3.05, 0.9989],
            [3.08, 0.999]
        ];
        for (const [z, phi] of published) {
            assert.equal(ss.cumulativeStdNormalProbability(z), phi);
        }
    });

    it("negative z stays the complement of positive z", function () {
        assert.equal(ss.cumulativeStdNormalProbability(-3), 0.0013);
    });
});
