'use strict';

/**
 * Sort an array of numbers by their numeric value, ensuring that the
 * array is not changed in place.
 * @param {Array<number>} array input array
 * @return {Array<number>} sorted array
 * @example
 * numericSort([3, 2, 1]) // [1, 2, 3]
 */
function numericSort(array) {
    return array.slice().sort(function(a, b) {
        return a - b;
    });
}

module.exports = numericSort;
