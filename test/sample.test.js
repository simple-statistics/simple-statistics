/* eslint no-shadow: 0 */

const test = require("tap").test;
const Random = require("random-js");
const random = new Random.Random(Random.MersenneTwister19937.seed(0));
const ss = require("../");

function rng() {
    return random.real(0, 1);
}

test("sample", function(t) {
    t.deepEqual(ss.sample([], 0, rng), [], "edge case - zero array");
    t.deepEqual(ss.sample([], 2, rng), [], "edge case - zero array");
    t.deepEqual(ss.sample([1, 2, 3], 0, rng, 0), [], "edge case - zero array");
    t.deepEqual(ss.sample([1, 2, 3], 1, rng), [1], "edge case - sample of 1");
    t.deepEqual(ss.sample([1, 2, 3], 1, rng), [2]);
    t.deepEqual(ss.sample([1, 2, 3], 3, rng), [2, 3, 1]);
    t.deepEqual(ss.sample([1, 2, 3, 4], 2, rng), [3, 1]);
    t.deepEqual(ss.sample([1, 2, 3, 4, 6, 7, 8], 2, rng), [8, 7]);
    t.deepEqual(
        ss.sample(["foo", "bar"], 1, rng),
        ["foo"],
        "non-number contents"
    );
    t.end();
});
