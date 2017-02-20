'use strict';
/* @flow */

/**
 * When adding a new value to a list, one does not have to necessary
 * recompute the mean of the list in linear time. They can instead use
 * this function to compute the new mean by providing the current mean,
 * the number of elements in the list that produced it and the new
 * value to add.
 *
 * @param {Number} current mean
 * @param {Number} number of items in the list
 * @param {Number} the added value
 * @returns {Number} the new mean
 *
 * @example
 * addToMean(14, 5, 53); // => 20.5
 */
function addToMean(mean /*: number*/, n/*: number */, x/*: number */)/*: number */ {
    return mean + ((x - mean) / (n + 1));
}

module.exports = addToMean;
