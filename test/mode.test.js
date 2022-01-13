/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../index.js");

test("mode", function (t) {
    ["mode", "modeFast"].forEach(function (modeName) {
        t.test(modeName, function (t) {
            const modeFn = ss[modeName];

            t.test(
                "the mode of a single-number array is that one number",
                function (t) {
                    t.equal(modeFn([1]), 1);
                    t.end();
                }
            );

            t.test(
                "the mode of a two-number array is that one number",
                function (t) {
                    t.equal(modeFn([1, 1]), 1);
                    t.end();
                }
            );

            t.test("other cases", function (t) {
                t.equal(modeFn([1, 1, 2]), 1);
                t.equal(modeFn([1, 1, 2, 3]), 1);
                t.equal(modeFn([1, 1, 2, 3, 3]), 1);
                t.equal(modeFn([1, 1, 2, 3, 3, 3]), 3);
                t.equal(modeFn([1, 2, 2, 2, 1, 2, 3, 3, 3]), 2);
                t.equal(modeFn([1, 2, 3, 4, 5]), 1);
                t.equal(modeFn([1, 2, 3, 4, 5, 5]), 5);
                t.equal(modeFn([1, 2, 2, 3, 3, 4, 1, 4, 1]), 1);
                t.end();
            });

            t.test("the mode of an empty array is null", function (t) {
                t.throws(function () {
                    modeFn([]);
                });
                t.end();
            });

            t.test(
                "the mode of a three-number array with two same numbers is the repeated one",
                function (t) {
                    t.equal(modeFn([1, 2, 2]), 2);
                    t.end();
                }
            );

            t.end();
        });
    });

    t.test("mode sorted", function (t) {
        t.equal(ss.modeSorted([1, 2, 2]), 2);
        t.end();
    });

    t.end();
});
