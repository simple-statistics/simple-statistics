/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

test("standardError", function (t) {
    t.test(
        "can get the standard error of the wikipedia standard deviation example",
        function (t) {
            t.equal(
                ss.standardError([2, 4, 4, 4, 5, 5, 7, 9]),
                2 / Math.sqrt(8)
            );
            t.end();
        }
    );

    t.test("is zero for single-element arrays", function (t) {
        t.equal(ss.standardError([42]), 0);
        t.end();
    });

    t.test("is not defined for empty arrays", function (t) {
        t.throws(function () {
            ss.standardError([]);
        }, "standardError is not defined for empty arrays");
        t.end();
    });

    t.end();
});
