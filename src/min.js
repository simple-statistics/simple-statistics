'use strict';

/**
 * The min is the lowest number in the array. This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x input
 * @returns {number} minimum value
 */
function min(x) {
    var value;
    for (var i = 0; i < x.length; i++) {
        // On the first iteration of this loop, min is
        // undefined and is thus made the minimum element in the array
        if (x[i] < value || value === undefined) {
            value = x[i];
        }
    }
    return value;
}

module.exports = min;
