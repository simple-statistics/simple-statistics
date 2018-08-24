/* eslint no-shadow: 0 */

const test = require("tap").test;
const Random = require("random-js");
const random = new Random(Random.engines.mt19937().seed(0));
const ss = require("../");

function rng() {
    return random.real(0, 1);
}

test("sampleWithReplacement", function(t) {
    const input = [1, 2, 3, 4, 5, 6];
    t.deepEqual(ss.sampleWithReplacement(input, 2, rng), [6, 5]);
    t.deepEqual(ss.sampleWithReplacement(input, 3, rng), [3, 6, 4]);
    t.deepEqual(ss.sampleWithReplacement(input, 4, rng), [5, 2, 3, 4]);
    t.deepEqual(ss.sampleWithReplacement(input, 0, rng), []);
    t.deepEqual(ss.sampleWithReplacement([], 1, rng), []);
    t.end();
});
