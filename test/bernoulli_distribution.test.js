import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("bernoulliDistribution", function () {
    it("can return generate probability and cumulative probability distributions for p = 0.3", function () {
        assert.ok(Array.isArray(ss.bernoulliDistribution(0.3)));
        assert.equal(ss.bernoulliDistribution(0.3)[0], 0.7, ss.epsilon);
        assert.equal(ss.bernoulliDistribution(0.3)[1], 0.3, ss.epsilon);
    });
    it("can return null when p is not a valid probability", function () {
        assert.throws(function () {
            ss.bernoulliDistribution(-0.01);
        });
        assert.throws(function () {
            ss.bernoulliDistribution(1.5);
        });
    });
});
