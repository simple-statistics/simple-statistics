/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../index.js");

test("factorial", function (t) {
    t.test(
        "cannot calculate the factorial of a number lower than zero",
        function (t) {
            t.throws(function () {
                ss.factorial(-1);
            });
            t.end();
        }
    );
    t.test("rejects floating-point inputs", function (t) {
        t.throws(function () {
            ss.factorial(0.5);
        });
        t.end();
    });
    t.test("can calculate 0! = 1", function (t) {
        t.equal(ss.factorial(0), 1);
        t.end();
    });
    t.test("can calculate 1! = 1", function (t) {
        t.equal(ss.factorial(1), 1);
        t.end();
    });
    t.test("can calculate 100! = 1", function (t) {
        t.equal(ss.factorial(100), 9.33262154439441e157);
        t.end();
    });
    t.end();
});
