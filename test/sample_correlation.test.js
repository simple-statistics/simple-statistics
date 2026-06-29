import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("sample correlation", function () {
    it("can get the sample correlation of identical arrays", function () {
        const data = Object.freeze([1, 2, 3, 4, 5, 6]);
        assert.equal(rnd(ss.sampleCorrelation(data, data)), 1);
    });

    it("can get the sample correlation of different arrays", function () {
        const a = Object.freeze([1, 2, 3, 4, 5, 6]);
        const b = Object.freeze([2, 2, 3, 4, 5, 60]);
        assert.equal(rnd(ss.sampleCorrelation(a, b)), 0.691);
    });

    it("zero-length corner case", function () {
        assert.throws(function () {
            ss.sampleCorrelation([], []);
        });
    });
});

describe("sample rank correlation", function () {
    it("absolute rank correlation for monotonic function equals one", function () {
        const x = Object.freeze([1, 2, 3, 4, 5, 6]);
        let y;
        for (const sign of [-1, 1]) {
            y = x.map((a) => sign * a * a);
            if (rnd(ss.sampleRankCorrelation(x, y)) !== sign * 1) {
                assert.fail("absolute rank correlation not equal to one");
            }
        }
    });

    it("rank correlation agrees with R calculation", function () {
        const x = Object.freeze([
            -0.008718749, -0.06111878, 0.067698537, -1.075537181, 0.041328545,
            0.56687373, 0.193619496, -2.057133298, -1.058808987, -0.173177955
        ]);
        const y = Object.freeze([
            -3.02455481, -1.30596109, 0.03873244, -1.27909938, -0.24630809,
            -0.18103793, -0.48281339, -2.78997293, -1.30551335, -1.63361636
        ]);
        const rankCorr = 0.6484848; // calculated using cor(x, y, method = "spearman") in R
        if (Math.abs(ss.sampleRankCorrelation(x, y) - rankCorr) > ss.epsilon) {
            console.log(ss.sampleRankCorrelation(x, y));
            assert.fail("rank correlation is incorrect for sample data");
        }
    });
});
