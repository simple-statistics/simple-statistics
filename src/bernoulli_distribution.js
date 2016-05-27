'use strict';
/* @flow */

var binomialDistribution = require('./binomial_distribution');

/**
 * The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution)
 * is the probability discrete
 * distribution of a random variable which takes value 1 with success
 * probability `p` and value 0 with failure
 * probability `q` = 1 - `p`. It can be used, for example, to represent the
 * toss of a coin, where "1" is defined to mean "heads" and "0" is defined
 * to mean "tails" (or vice versa). It is
 * a special case of a Binomial Distribution
 * where `n` = 1.
 *
 * @param {number} p input value, between 0 and 1 inclusive
 * @returns {number} value of bernoulli distribution at this point
 * @example
 * bernoulliDistribution(0.5); // => { '0': 0.5, '1': 0.5 }
 */
function bernoulliDistribution(p/*: number */) {
    // Check that `p` is a valid probability (0 ≤ p ≤ 1)
    if (p < 0 || p > 1 ) { return NaN; }

    return binomialDistribution(1, p);
}

module.exports = bernoulliDistribution;
