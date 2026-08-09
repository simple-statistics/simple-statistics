import epsilon from "./epsilon.js";
import gammaln from "./gammaln.js";
import maxDistributionCells from "./max_distribution_cells.js";

/**
 * The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution)
 * is a discrete probability distribution that expresses the probability
 * of a given number of events occurring in a fixed interval of time
 * and/or space if these events occur with a known average rate and
 * independently of the time since the last event.
 *
 * The Poisson Distribution is characterized by the strictly positive
 * mean arrival or occurrence rate, `λ`.
 *
 * Returns `undefined` when the distribution cannot be calculated: when `lambda`
 * is not a strictly positive number, or when it is large enough that the table
 * would run past a million cells.
 *
 * @param {number} lambda location poisson distribution
 * @returns {number[] | undefined} values of poisson distribution at that point
 */
function poissonDistribution(lambda) /*: ?number[] */ {
    // Check that lambda is strictly positive
    if (lambda <= 0) {
        return undefined;
    }

    // The distribution peaks at `lambda`, so past the length of the table
    // there is nothing to tabulate and no reason to start.
    if (lambda >= maxDistributionCells) {
        return undefined;
    }

    // Our current place in the distribution
    let x = 0;
    // And we keep track of the current cumulative probability, in
    // order to know when to stop calculating chances.
    let cumulativeProbability = 0;
    // The calculated cells to be returned
    const cells = [];

    // The only term of the mass function below that does not vary with `x`
    const logLambda = Math.log(lambda);

    // This algorithm iterates through each potential outcome,
    // until the `cumulativeProbability` is very close to 1, at
    // which point we've defined the vast majority of outcomes
    do {
        // a [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function),
        // taken through its logarithm: `lambda` raised to `x` and the factorial
        // of `x` each leave floating-point range long before their ratio does,
        // so computing them separately loses cells the distribution needs.
        cells[x] = Math.exp(x * logLambda - lambda - gammaln(x + 1));
        cumulativeProbability += cells[x];
        x++;
        // When the `cumulativeProbability` is nearly 1, we've calculated
        // the useful range of this distribution
    } while (cumulativeProbability < 1 - epsilon && x < maxDistributionCells);

    // Stopping for any other reason - a lambda that is not a number, or a
    // distribution too wide for the table - leaves cells that do not add up to
    // a distribution, so report that rather than returning them.
    if (
        Number.isNaN(cumulativeProbability) ||
        cumulativeProbability < 1 - epsilon
    ) {
        return undefined;
    }

    return cells;
}

export default poissonDistribution;
