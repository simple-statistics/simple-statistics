'use strict';

var numericSort = require('./numeric_sort');

/**
 * The [median](http://en.wikipedia.org/wiki/Median) is
 * the middle number of a list. This is often a good indicator of 'the middle'
 * when there are outliers that skew the `mean()` value.
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * The median isn't necessarily one of the elements in the list: the value
 * can be the average of two elements if the list has an even length
 * and the two central values are different.
 *
 * @param {Array<number>} x input
 * @returns {number} median value
 * @example
 * var incomes = [10, 2, 5, 100, 2, 1];
 * median(incomes); //= 3.5
 */
function median(x) {
    // The median of an empty list is null
    if (x.length === 0) { return null; }

    // Sorting the array makes it easy to find the center, but
    // use `.slice()` to ensure the original array `x` is not modified
    var sorted = numericSort(x);

    // If the length of the list is odd, it's the central number
    if (sorted.length % 2 === 1) {
        return sorted[(sorted.length - 1) / 2];
    // Otherwise, the median is the average of the two numbers
    // at the center of the list
    } else {
        var a = sorted[sorted.length / 2 - 1];
        var b = sorted[sorted.length / 2];
        return (a + b) / 2;
    }
}

module.exports = median;
