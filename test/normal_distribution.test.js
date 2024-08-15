/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("natural distribution and z-score", function (t) {
    t.test("normal table is exposed in the API", function (t) {
        t.equal(ss.standardNormalTable.length, 310);
        t.equal(ss.standardNormalTable[0], 0.5);
        t.end();
    });

    t.test("P(Z <= 0.4) is 0.6554", function (t) {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        t.equal(ss.cumulativeStdNormalProbability(0.4), 0.6554);
        t.end();
    });

    t.test("P(Z <= -1.20) is 0.1151", function (t) {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        t.equal(ss.cumulativeStdNormalProbability(-1.2), 0.1151);
        t.end();
    });

    t.test("P(X <= 82) when X ~ N (80, 25) is 0.6554", function (t) {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        // A professor's exam scores are approximately distributed normally with mean 80 and standard deviation 5.
        // What is the probability that a student scores an 82 or less?
        t.equal(
            ss.cumulativeStdNormalProbability(ss.zScore(82, 80, 5)),
            0.6554,
        );
        t.end();
    });

    t.test("P(X >= 90) when X ~ N (80, 25) is 0.0228", function (t) {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        // A professor's exam scores are approximately distributed normally with mean 80 and standard deviation 5.
        // What is the probability that a student scores a 90 or more?
        t.equal(
            +(
                1 - ss.cumulativeStdNormalProbability(ss.zScore(90, 80, 5))
            ).toPrecision(5),
            0.0228,
        );
        t.end();
    });

    t.test("P(X <= 74) when X ~ N (80, 25) is 0.1151", function (t) {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        // A professor's exam scores are approximately distributed normally with mean 80 and standard deviation 5.
        // What is the probability that a student scores a 74 or less?
        t.equal(
            ss.cumulativeStdNormalProbability(ss.zScore(74, 80, 5)),
            0.1151,
        );
        t.end();
    });

    t.test("P(78 <= X <= 88) when X ~ N (80, 25) is 0.6006", function (t) {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        // A professor's exam scores are approximately distributed normally with mean 80 and standard deviation 5.
        // What is the probability that a student scores between 78 and 88?
        const prob88 = ss.cumulativeStdNormalProbability(ss.zScore(88, 80, 5));
        const prob78 = ss.cumulativeStdNormalProbability(ss.zScore(78, 80, 5));

        t.equal(+(prob88 - prob78).toPrecision(5), 0.6006);
        t.end();
    });

    t.end();
});
