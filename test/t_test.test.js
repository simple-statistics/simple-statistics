/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

test("t test", function (t) {
    t.test("can compare a known value to the mean of samples", function (t) {
        const res = ss.tTest([1, 2, 3, 4, 5, 6], 3.385);
        t.equal(res, 0.1649415480881466);
        t.end();
    });

    t.end();
});
