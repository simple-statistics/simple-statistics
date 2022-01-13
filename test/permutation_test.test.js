/* eslint no-shadow: 0 */

const test = require("tap").test;
const Random = require("random-js");
const random = new Random.Random(Random.MersenneTwister19937.seed(0));
const ss = require("../index.js");

function rng() {
    return random.real(0, 1);
}

test("permutation test", function (t) {
    t.test(
        "P-value of identical distributions being different should be 1",
        function (t) {
            t.equal(
                ss.permutationTest([2, 2, 2, 2, 2], [2, 2, 2, 2, 2]),
                1,
                undefined,
                rng
            );
            t.end();
        }
    );
    t.test(
        "P-value of distribution less than itself should be 1",
        function (t) {
            t.equal(
                ss.permutationTest(
                    [2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2],
                    "greater",
                    undefined,
                    rng
                ),
                1
            );
            t.end();
        }
    );
    t.test(
        "P-value of small sample greater than large sample should be 0",
        function (t) {
            t.ok(
                ss.permutationTest(
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [
                        99999, 99999, 99999, 99999, 99999, 99999, 99999, 99999,
                        99999, 99999
                    ],
                    "less",
                    undefined,
                    rng
                ) < ss.epsilon
            );
            t.end();
        }
    );

    t.test(
        "permutationTest should throw error if wrong argument received",
        function (t) {
            t.throws(function () {
                ss.permutationTest([1, 69, 420], [42, 42, 42], "one-tailed");
            }, "alternative must be one of specified options");
            t.end();
        }
    );

    t.end();
});
