/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

test("logit", function (t) {
    t.test("inverse", function (t) {
        for (let i = -3; i <= 3; i += 0.01) {
            if (
                Math.abs(ss.logit(ss.cumulativeStdLogisticProbability(i)) - i) >
                ss.epsilon
            ) {
                t.fail("not an inverse of logit at " + i);
            }
        }
        t.end();
    });

    t.test("out-of-bounds input", function (t) {
        t.throws(function () {
            ss.logit(2);
        });
        t.end();
    });

    t.end();
});
