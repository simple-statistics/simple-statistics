/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("logit", function (t) {
    t.test("throws on logit < 0", function (t) {
        t.throws(() => {
            ss.logit(-1);
        });
        t.end();
    });

    t.test("computes the logit otherwise", function (t) {
        t.equal(ss.logit(0.5), 0);
        t.end();
    });

    t.end();
});
