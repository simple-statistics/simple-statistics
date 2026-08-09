import epsilon from "./epsilon.js";
import gammaln from "./gammaln.js";

// A distribution over more trials than this would need a table we cannot
// allocate. Past that we report a distribution we cannot produce rather than
// a partial one.
const maxCells = 1e6;

/**
 * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution) is the discrete probability
 * distribution of the number of successes in a sequence of n independent yes/no experiments, each of which yields
 * success with probability `probability`. Such a success/failure experiment is also called a Bernoulli experiment or
 * Bernoulli trial; when trials = 1, the Binomial Distribution is a Bernoulli Distribution.
 *
 * @param {number} trials number of trials to simulate
 * @param {number} probability
 * @returns {number[] | undefined} output
 */
function binomialDistribution(trials, probability) /*: ?number[] */ {
    // Check that `p` is a valid probability (0 ≤ p ≤ 1),
    // that `n` is an integer, strictly positive.
    if (probability < 0 || probability > 1 || trials <= 0 || trials % 1 !== 0) {
        return undefined;
    }

    // We initialize `x`, the random variable, and `accumulator`, an accumulator
    // for the cumulative distribution function to 0. `distribution_functions`
    // is the object we'll return with the `probability_of_x` and the
    // `cumulativeProbability_of_x`, as well as the calculated mean &
    // variance. We iterate until the `cumulativeProbability_of_x` is
    // within `epsilon` of 1.0.
    let x = 0;
    let cumulativeProbability = 0;
    const cells = [];
    // More successes than trials are impossible, and the table cannot outgrow
    // what we can allocate.
    const lastCell = Math.min(trials, maxCells - 1);

    // These are loop-invariant, so calculate them once up front.
    const logProbability = Math.log(probability);
    const log1Probability = Math.log(1 - probability);
    const gammalnTrials1 = gammaln(trials + 1);

    // This algorithm iterates through each potential outcome,
    // until the `cumulativeProbability` is very close to 1, at
    // which point we've defined the vast majority of outcomes
    do {
        // The probability of exactly `x` successes, taken through its logarithm: the
        // binomial coefficient and the two powers each leave floating-point range long
        // before the product they form does, so computing them separately loses cells
        // the distribution needs.
        // The logarithms below are undefined at the ends of the probability range,
        // where the outcome is certain anyway.
        if (probability === 0) {
            if (x === 0) {
                cells[x] = 1;
            } else {
                cells[x] = 0;
            }
        } else if (probability === 1) {
            if (x === trials) {
                cells[x] = 1;
            } else {
                cells[x] = 0;
            }
        } else {
            cells[x] = Math.exp(
                gammalnTrials1 -
                    gammaln(x + 1) -
                    gammaln(trials - x + 1) +
                    x * logProbability +
                    (trials - x) * log1Probability
            );
        }

        cumulativeProbability += cells[x];
        x++;
        // when the cumulativeProbability is nearly 1, we've calculated
        // the useful range of this distribution
    } while (cumulativeProbability < 1 - epsilon && x <= lastCell);

    // Stopping for any other reason - a probability that is not a number, or
    // more trials than the table can hold - leaves cells that do not add up to
    // a distribution, so report that rather than returning them.
    if (
        Number.isNaN(cumulativeProbability) ||
        cumulativeProbability < 1 - epsilon
    ) {
        return undefined;
    }

    return cells;
}

export default binomialDistribution;
