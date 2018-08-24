/* eslint no-shadow: 0 */

var test = require("tap").test;
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().seed(0));
var ss = require("../");

function rng() {
    return random.real(0, 1);
}

test("shuffle", function(t) {
    var input = [1, 2, 3, 4, 5, 6];
    t.deepEqual(ss.shuffle([], rng), []);
    t.deepEqual(ss.shuffle(input, rng), [1, 5, 3, 2, 4, 6]);
    t.deepEqual(input, [1, 2, 3, 4, 5, 6], "does not change original array");
    t.deepEqual(ss.shuffle(input, rng), [5, 4, 1, 3, 6, 2]);
    t.deepEqual(input, [1, 2, 3, 4, 5, 6], "does not change original array");
    t.end();
});

test("shuffleInPlace", function(t) {
    var input = [1, 2, 3, 4, 5, 6];
    t.deepEqual(ss.shuffleInPlace([], rng), []);
    t.deepEqual(ss.shuffleInPlace(input, rng), [6, 1, 5, 2, 4, 3]);
    t.deepEqual(input, [6, 1, 5, 2, 4, 3], "changes original array");
    t.end();
});

test("shuffleInPlace truly random", function(t) {
    var input = [1, 2, 3, 4, 5, 6];
    t.deepEqual(ss.shuffleInPlace([]), []);
    t.deepEqual(ss.shuffleInPlace(input).sort(), [1, 2, 3, 4, 5, 6]);
    t.end();
});
