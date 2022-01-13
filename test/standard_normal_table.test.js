/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("standardNormalTable", function (t) {
    test("all entries are numeric", function (t) {
        for (let i = 0; i < ss.standardNormalTable.length; i++) {
            if (
                typeof ss.standardNormalTable[i] !== "number" ||
                ss.standardNormalTable[i] < 0 ||
                ss.standardNormalTable[i] > 1
            ) {
                t.fail("standard normal table value invalid");
            }
        }
        t.end();
    });
    t.end();
});
