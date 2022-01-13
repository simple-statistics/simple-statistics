/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("log average", function (t) {
    t.test("cannot calculate for empty lists", function (t) {
        t.throws(function () {
            ss.logAverage([]);
        });
        t.end();
    });

    t.test("cannot calculate for lists with negative numbers", function (t) {
        t.throws(function () {
            ss.logAverage([-1]);
        });
        t.end();
    });

    t.test("does not overflow for large products", function (t) {
        const value = 1000;
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(value);
        }
        if (!isFinite(ss.logAverage(array))) {
            t.fail("log average failed for large product");
        }
        t.end();
    });

    t.test("does not underflow for small products", function (t) {
        const value = 0.001;
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(value);
        }
        if (ss.logAverage(array) === 0) {
            t.fail("log average failed for small product");
        }
        t.end();
    });

    t.test("agrees with geometricMean", function (t) {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(Math.exp(Math.random()));
        }
        if (Math.abs(ss.logAverage(arr) - ss.geometricMean(arr)) > ss.epsilon) {
            t.fail("log average and geometric mean are not equal");
        }
        t.end();
    });

    t.test("equals zero if array contains zero", function (t) {
        if (ss.logAverage([0, 1, 2]) !== 0) {
            t.fail("log average of array containing zero is not zero");
        }
        t.end();
    });
    t.end();
});
