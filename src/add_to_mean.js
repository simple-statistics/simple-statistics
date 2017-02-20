'use strict';
/* @flow */

/**
 * When adding a new value to a list, one does not have to necessary
 * recompute the mean of the list in linear time. They can instead use
 * this function to compute the new mean by providing the current mean,
 * the number of elements in the list that produced it and the new
 * value to add.
 *
 * @param {Number} mean current mean
 * @param {Number} n number of items in the list
 * @param {Number} newValue the added value
 * @returns {Number} the new mean
 *
 * @example
 * addToMean(14, 5, 53); // => 20.5
 */
function addToMean(mean /*: number*/, n/*: number */, newValue/*: number */)/*: number */ {
    return mean + ((newValue - mean) / (newValue + 1));
}

module.exports = addToMean;
