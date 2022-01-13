/* eslint no-shadow: 0 */

const test = require("tap").test;
const Random = require("random-js");
const random = new Random.Random(Random.MersenneTwister19937.seed(0));
const ss = require("../dist/simple-statistics.js");

function rng() {
    return random.real(0, 1);
}

test("shuffle", function (t) {
    const input = [1, 2, 3, 4, 5, 6];
    t.same(ss.shuffle([], rng), []);
    t.same(ss.shuffle(input, rng), [1, 5, 3, 2, 4, 6]);
    t.same(input, [1, 2, 3, 4, 5, 6], "does not change original array");
    t.same(ss.shuffle(input, rng), [5, 4, 1, 3, 6, 2]);
    t.same(input, [1, 2, 3, 4, 5, 6], "does not change original array");
    t.end();
});

test("shuffleInPlace", function (t) {
    const input = [1, 2, 3, 4, 5, 6];
    t.same(ss.shuffleInPlace([], rng), []);
    t.same(ss.shuffleInPlace(input, rng), [6, 1, 5, 2, 4, 3]);
    t.same(input, [6, 1, 5, 2, 4, 3], "changes original array");
    t.end();
});

test("shuffleInPlace truly random", function (t) {
    const input = [1, 2, 3, 4, 5, 6];
    t.same(ss.shuffleInPlace([]), []);
    t.same(ss.shuffleInPlace(input).sort(), [1, 2, 3, 4, 5, 6]);
    t.end();
});
