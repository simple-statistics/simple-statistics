/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test("sample correlation", function (t) {
    t.test("can get the sample correlation of identical arrays", function (t) {
        const data = [1, 2, 3, 4, 5, 6];
        t.equal(rnd(ss.sampleCorrelation(data, data)), 1);
        t.end();
    });

    t.test("can get the sample correlation of different arrays", function (t) {
        const a = [1, 2, 3, 4, 5, 6];
        const b = [2, 2, 3, 4, 5, 60];
        t.equal(rnd(ss.sampleCorrelation(a, b)), 0.691);
        t.end();
    });

    t.test("zero-length corner case", function (t) {
        t.throws(function () {
            ss.sampleCorrelation([], []);
        });
        t.end();
    });

    t.end();
});
