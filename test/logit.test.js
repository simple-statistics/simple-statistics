import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("logit", function () {
    it("throws on logit < 0", function () {
        assert.throws(() => {
            ss.logit(-1);
        });
    });

    it("computes the logit otherwise", function () {
        assert.equal(ss.logit(0.5), 0);
    });
});
