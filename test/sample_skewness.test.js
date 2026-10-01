import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("sample skewness", function () {
    it("the skewness of an empty sample is null", function () {
        const data = Object.freeze([]);
        assert.throws(function () {
            ss.sampleSkewness(data);
        });
    });

    it("the skewness of an sample with one number is null", function () {
        const data = Object.freeze([1]);
        assert.throws(function () {
            ss.sampleSkewness(data);
        });
    });

    it("the skewness of an sample with two numbers is null", function () {
        const data = Object.freeze([1, 2]);
        assert.throws(function () {
            ss.sampleSkewness(data);
        });
    });

    it("can calculate the skewness of SAS example 1", function () {
        // Data and answer taken from SKEWNESS function documentation at
        // http://support.sas.com/documentation/c../lrdict/64316/HTML/default/viewer.htm#a000245947.htm
        const data = Object.freeze([0, 1, 1]);
        assert.equal(+ss.sampleSkewness(data).toPrecision(10), -1.732050808);
    });

    it("can calculate the skewness of SAS example 2", function () {
        // Data and answer taken from SKEWNESS function documentation at
        // http://support.sas.com/documentation/c../lrdict/64316/HTML/default/viewer.htm#a000245947.htm
        const data = Object.freeze([2, 4, 6, 3, 1]);
        assert.equal(+ss.sampleSkewness(data).toPrecision(10), 0.5901286564);
    });

    it("can calculate the skewness of SAS example 3", function () {
        // Data and answer taken from SKEWNESS function documentation at
        // http://support.sas.com/documentation/c../lrdict/64316/HTML/default/viewer.htm#a000245947.htm
        const data = Object.freeze([2, 0, 0]);
        assert.equal(+ss.sampleSkewness(data).toPrecision(10), 1.732050808);
    });

    it("can calculate the biased skewness", function () {
        // Expected values from scipy.stats.skew(data, bias=True), which is
        // also what R reports. The unadjusted values above are the same
        // call with bias=False.
        const cases = [
            [[2, 4, 6, 3, 1], 0.3958703373438167],
            [[1, 1, 2, 3, 8], 1.2181208646399415],
            [[2, 4, 4, 4, 5, 5, 7, 9], 0.65625],
            [[10, 20, 30, 40, 100], 1.1384199576606167]
        ];
        for (const [data, expected] of cases) {
            assert.equal(
                Math.abs(ss.sampleSkewness(data, true) - expected) < 1e-14,
                true,
                JSON.stringify(data)
            );
        }
    });

    it("biased and unadjusted skewness differ by the known factor", function () {
        // G1 = g1 * sqrt(n * (n - 1)) / (n - 2)
        const data = Object.freeze([1, 1, 2, 3, 8, 13, 21]);
        const n = data.length;
        const factor = Math.sqrt(n * (n - 1)) / (n - 2);
        assert.equal(
            Math.abs(
                ss.sampleSkewness(data) - ss.sampleSkewness(data, true) * factor
            ) < 1e-14,
            true
        );
    });

    it("defaults to the unadjusted coefficient", function () {
        const data = Object.freeze([2, 4, 6, 3, 1]);
        assert.equal(ss.sampleSkewness(data), ss.sampleSkewness(data, false));
    });
});
