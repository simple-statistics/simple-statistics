/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test("coefficient_of_variation", function (t) {
    t.test(
        "can get the coefficientOfVariation of a six-sided die",
        function (t) {
            t.equal(rnd(ss.coefficientOfVariation([1, 2, 3, 4])), 0.516);
            t.end();
        },
    );

    t.end();
});
