/* eslint no-shadow: 0 */

const test = require("tap").test;
const equalIntervalBreaks =
    require("../dist/simple-statistics.js").equalIntervalBreaks;

test("equalIntervalBreaks", function (t) {
    t.same(equalIntervalBreaks([1], 4), [1], "1-length case");
    t.same(
        equalIntervalBreaks([1, 2, 3, 4, 5, 6], 4),
        [1, 2.25, 3.5, 4.75, 6],
        "three breaks"
    );
    t.same(
        equalIntervalBreaks([1, 2, 3, 4, 5, 6], 2),
        [1, 3.5, 6],
        "two breaks"
    );
    t.same(equalIntervalBreaks([1, 2, 3, 4, 5, 6], 1), [1, 6], "one break");
    t.end();
});
