/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("sample skewness", function (t) {
    t.test("the skewness of an empty sample is null", function (t) {
        const data = [];
        t.throws(function () {
            ss.sampleSkewness(data);
        });
        t.end();
    });

    t.test("the skewness of an sample with one number is null", function (t) {
        const data = [1];
        t.throws(function () {
            ss.sampleSkewness(data);
        });
        t.end();
    });

    t.test("the skewness of an sample with two numbers is null", function (t) {
        const data = [1, 2];
        t.throws(function () {
            ss.sampleSkewness(data);
        });
        t.end();
    });

    t.test("can calculate the skewness of SAS example 1", function (t) {
        // Data and answer taken from SKEWNESS function documentation at
        // http://support.sas.com/documentation/c../lrdict/64316/HTML/default/viewer.htm#a000245947.htm
        const data = [0, 1, 1];
        t.equal(+ss.sampleSkewness(data).toPrecision(10), -1.732050808);
        t.end();
    });

    t.test("can calculate the skewness of SAS example 2", function (t) {
        // Data and answer taken from SKEWNESS function documentation at
        // http://support.sas.com/documentation/c../lrdict/64316/HTML/default/viewer.htm#a000245947.htm
        const data = [2, 4, 6, 3, 1];
        t.equal(+ss.sampleSkewness(data).toPrecision(10), 0.5901286564);
        t.end();
    });

    t.test("can calculate the skewness of SAS example 3", function (t) {
        // Data and answer taken from SKEWNESS function documentation at
        // http://support.sas.com/documentation/c../lrdict/64316/HTML/default/viewer.htm#a000245947.htm
        const data = [2, 0, 0];
        t.equal(+ss.sampleSkewness(data).toPrecision(10), 1.732050808);
        t.end();
    });
    t.end();
});
