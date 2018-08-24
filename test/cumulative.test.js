/* eslint no-shadow: 0 */

var test = require("tap").test;
var ss = require("../");

test("cumulativeStdNormalProbability", function(t) {
    // https://en.wikipedia.org/wiki/Standard_normal_table#Examples_of_use
    t.test("wikipedia test example works", function(t) {
        t.equal(ss.cumulativeStdNormalProbability(0.4), 0.6554);
        t.end();
    });
    t.test("nondecreasing", function(t) {
        for (var i = 0; i < ss.standardNormalTable.length; i++) {
            if (
                !ss.cumulativeStdNormalProbability(i / 100) >=
                ss.cumulativeStdNormalProbability((i - 1) / 100)
            ) {
                t.fail("non-decreasing failure on " + i);
            }
        }
        t.end();
    });
    t.test("matches errorFunction", function(t) {
        for (var i = 0; i < ss.standardNormalTable.length; i++) {
            if (
                !(
                    Math.abs(
                        ss.cumulativeStdNormalProbability(i / 100) -
                            (0.5 +
                                0.5 * ss.errorFunction(i / 100 / Math.sqrt(2)))
                    ) < ss.epsilon
                )
            ) {
                t.fail("error-fn failure on " + i);
            }
        }
        t.end();
    });
    t.test("symmetry", function(t) {
        t.equal(
            Math.abs(
                ss.cumulativeStdNormalProbability(-1) -
                    (1 - ss.cumulativeStdNormalProbability(1))
            ) < ss.epsilon,
            true
        );
        t.end();
    });
    t.test("inverse", function(t) {
        for (var i = 0; i <= 1 + ss.epsilon; i += 0.01) {
            t.equal(
                Math.abs(ss.cumulativeStdNormalProbability(ss.probit(i)) - i) <
                    21 * ss.epsilon,
                true
            );
        }
        t.end();
    });
    t.end();
});
