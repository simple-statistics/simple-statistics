/* eslint no-shadow: 0 */

const test = require("tap").test;
const bisect = require("../index.js").bisect;

test("bisect", function (t) {
    t.test("can find root of sin and cos", function (t) {
        t.equal(Number(bisect(Math.sin, 1, 4, 100, 0.003).toFixed(4)), 3.1416);
        t.equal(Number(bisect(Math.cos, 0, 4, 100, 0.003).toFixed(4)), 1.5723);
        t.throws(function () {
            t.equal(
                Number(bisect(Math.cos, 0, 4, 1, 0.003).toFixed(4)),
                1.5723
            );
        }, "Throws if it exceeds the number of iterations allowed");
        t.throws(function () {
            bisect(0);
        }, "Throws with syntax error f must be a function");
        t.end();
    });
    t.end();
});
