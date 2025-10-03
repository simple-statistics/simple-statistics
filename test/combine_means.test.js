/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("combineMeans", function (t) {
    t.test("can combine the means of two lists", function (t) {
        const values1 = Object.freeze([8, 3, 4]);
        const values2 = Object.freeze([2, 6, 4]);
        t.equal(
            ss.combineMeans(
                ss.mean(values1),
                values1.length,
                ss.mean(values2),
                values2.length
            ),
            4.5
        );
        t.equal(
            ss.combineMeans(
                ss.mean(values1),
                values1.length,
                ss.mean(values2),
                values2.length
            ),
            ss.mean(values1.concat(values2))
        );
        t.end();
    });
    t.end();
});
