/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("gamma", function (t) {
    t.test("gamma for integer should return whole number", function (t) {
        t.equal(ss.gamma(5), 24);
        t.end();
    });
    t.test("gamma for positive real float should be correct", function (t) {
        t.ok(Math.abs(ss.gamma(11.54) - 13098426.039156161) < ss.epsilon);
        t.end();
    });
    t.test("gamma for negative real float should be correct", function (t) {
        t.ok(Math.abs(ss.gamma(-42.5) - -3.419793520724856e-52) < ss.epsilon);
        t.end();
    });
    t.test("gamma for negative integer should return NaN", function (t) {
        t.ok(Number.isNaN(ss.gamma(-2)));
        t.end();
    });
    t.test("gamma for zero should return NaN", function (t) {
        t.ok(Number.isNaN(ss.gamma(0)));
        t.end();
    });

    t.end();
});
