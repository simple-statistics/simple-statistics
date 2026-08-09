import epsilon from "./epsilon.js";
import gammaln from "./gammaln.js";
import maxDistributionCells from "./max_distribution_cells.js";

/**
 * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution) is the discrete probability
 * distribution of the number of successes in a sequence of n independent yes/no experiments, each of which yields
 * success with probability `probability`. Such a success/failure experiment is also called a Bernoulli experiment or
 * Bernoulli trial; when trials = 1, the Binomial Distribution is a Bernoulli Distribution.
 *
 * Returns `undefined` when the distribution cannot be calculated: either
 * argument is outside its domain or is not a number, or when `trials` is large
 * enough that the table would run past a million cells.
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

    // More successes than trials are impossible, and the table cannot outgrow
    // what we can allocate.
    const lastCell = Math.min(trials, maxDistributionCells - 1);

    // The logarithms below are undefined at the ends of the probability range,
    // where the outcome is certain anyway.
    if (probability === 0) {
        return [1];
    }
    if (probability === 1) {
        if (trials > lastCell) {
            return undefined;
        }
        const certain = new Array(trials + 1).fill(0);
        certain[trials] = 1;
        return certain;
    }

    // `x` is the random variable: the number of successes. We iterate until
    // the cumulative probability is within `epsilon` of 1.0, at which point we
    // have the useful range of the distribution.
    let x = 0;
    let cumulativeProbability = 0;
    const cells = [];

    // The terms of the mass function below that do not vary with `x`
    const logTrialsFactorial = gammaln(trials + 1);
    const logProbability = Math.log(probability);
    // `log1p` rather than `Math.log(1 - probability)`, which cancels away the
    // low digits of the complement as `probability` approaches 1.
    const log1mProbability = Math.log1p(-probability);

    // This algorithm iterates through each potential outcome,
    // until the `cumulativeProbability` is very close to 1, at
    // which point we've defined the vast majority of outcomes
    do {
        // A [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function),
        // taken through its logarithm: the binomial coefficient and the two
        // powers each leave floating-point range long before the product they
        // form does, so computing them separately loses cells the distribution
        // needs.
        cells[x] = Math.exp(
            logTrialsFactorial -
                gammaln(x + 1) -
                gammaln(trials - x + 1) +
                x * logProbability +
                (trials - x) * log1mProbability
        );
        cumulativeProbability += cells[x];
        x++;
        // When the `cumulativeProbability` is nearly 1, we've calculated
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
