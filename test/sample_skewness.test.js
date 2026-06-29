const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

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
});
