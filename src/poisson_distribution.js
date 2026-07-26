import epsilon from "./epsilon.js";
import gammaln from "./gammaln.js";

// The Poisson distribution has no upper bound, so cap the table at a length we
// can still allocate. Past that we report a distribution we cannot produce
// rather than a partial one.
const maxCells = 1e6;

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
 * @param {number} lambda location poisson distribution
 * @returns {number[]} values of poisson distribution at that point
 */
function poissonDistribution(lambda) /*: ?number[] */ {
    // Check that lambda is strictly positive
    if (lambda <= 0) {
        return undefined;
    }

    // our current place in the distribution
    let x = 0;
    // and we keep track of the current cumulative probability, in
    // order to know when to stop calculating chances.
    let cumulativeProbability = 0;
    // the calculated cells to be returned
    const cells = [];

    // This algorithm iterates through each potential outcome,
    // until the `cumulativeProbability` is very close to 1, at
    // which point we've defined the vast majority of outcomes
    do {
        // a [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function),
        // taken through its logarithm: `lambda` raised to `x` and the factorial
        // of `x` each leave floating-point range long before their ratio does,
        // so computing them separately loses cells the distribution needs.
        cells[x] = Math.exp(x * Math.log(lambda) - lambda - gammaln(x + 1));
        cumulativeProbability += cells[x];
        x++;
        // when the cumulativeProbability is nearly 1, we've calculated
        // the useful range of this distribution
    } while (cumulativeProbability < 1 - epsilon && x < maxCells);

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
