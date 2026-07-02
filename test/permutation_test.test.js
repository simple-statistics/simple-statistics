/* eslint no-shadow: 0 */

const test = require("tap").test;
const Random = require("random-js");
const random = new Random.Random(Random.MersenneTwister19937.seed(0));
const ss = require("../dist/simple-statistics.js");

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

    t.test("handles samples of unequal length", function (t) {
        // Each permutation keeps the original group sizes (3 and 1). The
        // observed difference is mean([10, 10, 10]) - mean([0]) = 10, which a
        // permutation can match only when the single 0 lands in the second
        // group, one quarter of the time. Splitting the pool in half instead
        // compared this against 2-vs-2 permutations, whose mean difference can
        // never reach 10, so the p-value collapsed to 0.
        const seeded = new Random.Random(Random.MersenneTwister19937.seed(42));
        const p = ss.permutationTest([10, 10, 10], [0], "two_side", 10000, () =>
            seeded.real(0, 1)
        );
        t.ok(Math.abs(p - 0.25) < 0.05);
        t.end();
    });

    t.end();
});
