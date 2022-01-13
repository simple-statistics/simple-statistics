/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("errorFunction", function (t) {
    test("symmetry", function (t) {
        t.equal(ss.errorFunction(-1), -ss.errorFunction(1));
        t.end();
    });
    t.end();
    test("inverse", function (t) {
        for (let i = -1; i <= 1; i += 0.01) {
            t.equal(
                Math.abs(ss.errorFunction(ss.inverseErrorFunction(i)) - i) <
                    4 * ss.epsilon,
                true
            );
        }
        t.end();
    });
});
