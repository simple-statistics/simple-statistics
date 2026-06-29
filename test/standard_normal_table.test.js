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
});
