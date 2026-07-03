import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("sample kurtosis", function () {
    it("the kurtosis of an empty sample is null", function () {
        const data = Object.freeze([]);
        assert.throws(function () {
            ss.sampleKurtosis(data);
        });
    });

    it("the kurtosis of an sample with one number is null", function () {
        const data = Object.freeze([1]);
        assert.throws(function () {
            ss.sampleKurtosis(data);
        });
    });

    it("the kurtosis of an sample with two numbers is null", function () {
        const data = Object.freeze([1, 2]);
        assert.throws(function () {
            ss.sampleKurtosis(data);
        });
    });

    it("the kurtosis of an sample with three numbers is null", function () {
        const data = Object.freeze([1, 2, 3]);
        assert.throws(function () {
            ss.sampleKurtosis(data);
        });
    });

    it("can calculate the kurtosis of SAS example 1", function () {
        // Data and answer taken from KURTOSIS function documentation at
        // https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a000245906.htm
        const data = Object.freeze([5, 9, 3, 6]);
        assert.equal(+ss.sampleKurtosis(data).toPrecision(10), 0.928);
    });

    it("can calculate the kurtosis of SAS example 2", function () {
        // Data and answer taken from KURTOSIS function documentation at
        // https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a000245906.htm
        const data = Object.freeze([5, 8, 9, 6]);
        assert.equal(+ss.sampleKurtosis(data).toPrecision(10), -3.3);
    });

    it("can calculate the kurtosis of SAS example 3", function () {
        // Data and answer taken from KURTOSIS function documentation at
        // https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a000245906.htm
        const data = Object.freeze([8, 9, 6, 1]);
        assert.equal(+ss.sampleKurtosis(data).toPrecision(10), 1.5);
    });

    it("can calculate the kurtosis of SAS example 4", function () {
        // Data and answer taken from KURTOSIS function documentation at
        // https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a000245906.htm
        const data = Object.freeze([8, 1, 6, 1]);
        assert.equal(+ss.sampleKurtosis(data).toPrecision(10), -4.483379501);
    });
});
