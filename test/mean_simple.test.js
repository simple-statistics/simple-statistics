/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("meanSimple", function (t) {
    t.test("can get the mean of two numbers", function (t) {
        t.equal(ss.meanSimple([1, 2]), 1.5);
        t.end();
    });
    t.test("can get the mean of one number", function (t) {
        t.equal(ss.meanSimple([1]), 1);
        t.end();
    });
    t.test("an empty list has no average", function (t) {
        t.throws(function () {
            ss.meanSimple([]);
        });
        t.end();
    });
    t.end();
});
