/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("sample kurtosis", function (t) {
    t.test("the kurtosis of an empty sample is null", function (t) {
        const data = [];
        t.throws(function () {
            ss.sampleKurtosis(data);
        });
        t.end();
    });

    t.test("the kurtosis of an sample with one number is null", function (t) {
        const data = [1];
        t.throws(function () {
            ss.sampleKurtosis(data);
        });
        t.end();
    });

    t.test("the kurtosis of an sample with two numbers is null", function (t) {
        const data = [1, 2];
        t.throws(function () {
            ss.sampleKurtosis(data);
        });
        t.end();
    });

    t.test(
        "the kurtosis of an sample with three numbers is null",
        function (t) {
            const data = [1, 2, 3];
            t.throws(function () {
                ss.sampleKurtosis(data);
            });
            t.end();
        },
    );

    t.test("can calculate the kurtosis of SAS example 1", function (t) {
        // Data and answer taken from KURTOSIS function documentation at
        // https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a000245906.htm
        const data = [5, 9, 3, 6];
        t.equal(+ss.sampleKurtosis(data).toPrecision(10), 0.928);
        t.end();
    });

    t.test("can calculate the kurtosis of SAS example 2", function (t) {
        // Data and answer taken from KURTOSIS function documentation at
        // https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a000245906.htm
        const data = [5, 8, 9, 6];
        t.equal(+ss.sampleKurtosis(data).toPrecision(10), -3.3);
        t.end();
    });

    t.test("can calculate the kurtosis of SAS example 3", function (t) {
        // Data and answer taken from KURTOSIS function documentation at
        // https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a000245906.htm
        const data = [8, 9, 6, 1];
        t.equal(+ss.sampleKurtosis(data).toPrecision(10), 1.5);
        t.end();
    });

    t.test("can calculate the kurtosis of SAS example 4", function (t) {
        // Data and answer taken from KURTOSIS function documentation at
        // https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a000245906.htm
        const data = [8, 1, 6, 1];
        t.equal(+ss.sampleKurtosis(data).toPrecision(10), -4.483379501);
        t.end();
    });
    t.end();
});
