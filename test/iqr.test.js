/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

test("interquartile range (iqr)", function (t) {
    // Data and results from
    // [Wikipedia](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
    t.test("can get proper iqr of an even-length list", function (t) {
        const even = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
        t.equal(
            ss.quantile(even, 0.75) - ss.quantile(even, 0.25),
            ss.iqr(even)
        );
        t.end();
    });

    t.test("can get proper iqr of an odd-length list", function (t) {
        const odd = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
        t.equal(ss.quantile(odd, 0.75) - ss.quantile(odd, 0.25), ss.iqr(odd));
        t.end();
    });

    t.test("an iqr of a zero-length list cannot be calculated", function (t) {
        t.throws(function () {
            ss.iqr([]);
        });
        t.end();
    });
    t.end();
});
