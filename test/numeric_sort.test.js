/* eslint no-shadow: 0 */

const test = require("tap").test;
const numericSort = require("../").numericSort;

test("numericSort", function(t) {
    t.deepEqual(numericSort([1, 2]), [1, 2]);
    t.deepEqual(numericSort([2, 1]), [1, 2]);

    const input = [2, 1];
    const output = [1, 2];
    t.deepEqual(numericSort(input), output);
    t.deepEqual(input, [2, 1], "does not mutate input");

    t.end();
});
