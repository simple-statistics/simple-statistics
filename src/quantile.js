'use strict';

var quantile_sorted = require('./quantile_sorted');

/**
 * # quantile
 *
 * This is a population quantile, since we assume to know the entire
 * dataset in this library. Thus I'm trying to follow the
 * [Quantiles of a Population](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
 * algorithm from wikipedia.
 *
 * Sample is a one-dimensional array of numbers,
 * and p is either a decimal number from 0 to 1 or an array of decimal
 * numbers from 0 to 1.
 * In terms of a k/q quantile, p = k/q - it's just dealing with fractions or dealing
 * with decimal values.
 * When p is an array, the result of the function is also an array containing the appropriate
 * quantiles in input order
 *
 * @param {Array<number>} sample
 * @param {number} p
 * @returns {number} quantile
 */
function quantile(sample, p) {

    // We can't derive quantiles from an empty list
    if (sample.length === 0) return null;

    // Sort a copy of the array. We'll need a sorted array to index
    // the values in sorted order.
    var sorted = sample.slice().sort(function (a, b) { return a - b; });

    if (p.length) {
        // Initialize the result array
        var results = [];
        // For each requested quantile
        for (var i = 0; i < p.length; i++) {
            results[i] = quantile_sorted(sorted, p[i]);
        }
        return results;
    } else {
        return quantile_sorted(sorted, p);
    }
}

module.exports = quantile;
