'use strict';
/* @flow */

var quickselect = require('quickselect');

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
function median(x /*: Array<number> */)/*:number*/ {
    // The median of an empty list is NaN
    if (x.length === 0) { return NaN; }

    var copy = x.slice();
    var k;

    // If the length of the list is odd, it's the central number
    if (x.length % 2 === 1) {
        k = (x.length - 1) / 2;
        // Rearrange so that k-th element is k-th smallest
        quickselect(copy, k);
        return copy[k];

    // Otherwise, the median is the average of the two numbers at the center of the list
    } else {
        k = x.length / 2 - 1;
        // Rearrange so that k-th element is k-th smallest
        quickselect(copy, k);
        // Rearrange the remaining half so that the first element is smallest
        quickselect(copy, k + 1, k + 1);
        return (copy[k] + copy[k + 1]) / 2;
    }
}

module.exports = median;
