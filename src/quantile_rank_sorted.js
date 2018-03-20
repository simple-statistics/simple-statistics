/* @flow */
/* eslint no-bitwise: 0 */

/**
 * This function returns the quantile in which one would find the given value in
 * the given array. With a sorted array, leveraging binary search, we can find
 * this information in logarithmic time.
 *
 * @param {Array<number>} x input
 * @returns {number} value value
 * @example
 * quantileRankSorted([1, 2, 3, 4], 3); // => 0.75
 * quantileRankSorted([1, 2, 3, 3, 4], 3); // => 0.7
 * quantileRankSorted([1, 2, 3, 4], 6); // => 1
 * quantileRankSorted([1, 2, 3, 3, 5], 4); // => 0.8
 */
function quantileRankSorted(
    x /*: Array<number> */,
    value /*: number */)/*: number */ {

    // Value is lesser than any value in the array
    if (value < x[0]) {
        return 0;
    }

    // Value is greater than any value in the array
    if (value > x[x.length - 1]) {
        return 1;
    }

    var l = lowerBound(x, value);

    // Value is not in the array
    if (x[l] !== value) {
        return l / x.length;
    }

    l++;

    var u = upperBound(x, value);

    // The value exists only once in the array
    if (u === l) {
        return l / x.length;
    }

    // Here, we are basically computing the mean of the range of indices
    // containing our searched value. But, instead, of initializing an
    // array and looping over it, there is a dedicated math formula that
    // we apply below to get the result.
    var r = u - l + 1;
    var sum = (r * (u + l)) / 2;
    var mean = sum / r;

    return mean / x.length;
}

function lowerBound(x, value) {
    var mid = 0;
    var lo = 0;
    var hi = x.length;

    while (lo < hi) {
        mid = (lo + hi) >>> 1;

        if (value <= x[mid]) {
            hi = mid;
        }
        else {
            lo = -~mid;
        }
    }

    return lo;
}

function upperBound(x, value) {
    var mid = 0;
    var lo = 0;
    var hi = x.length;

    while (lo < hi) {
        mid = (lo + hi) >>> 1;

        if (value >= x[mid]) {
            lo = -~mid;
        }
        else {
            hi = mid;
        }
    }

    return lo;
}

export default quantileRankSorted;
