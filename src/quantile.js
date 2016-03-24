'use strict';
/* @flow */

var quantileSorted = require('./quantile_sorted');
var quickselect = require('quickselect');

/**
 * The [quantile](https://en.wikipedia.org/wiki/Quantile):
 * this is a population quantile, since we assume to know the entire
 * dataset in this library. This is an implementation of the
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
 * @param {Array<number>} sample a sample from the population
 * @param {number} p the desired quantile, as a number between 0 and 1
 * @returns {number} quantile
 * @example
 * var data = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
 * quantile(data, 1); //= max(data);
 * quantile(data, 0); //= min(data);
 * quantile(data, 0.5); //= 9
 */
function quantile(sample /*: Array<number> */, p /*: Array<number> | number */) {
    var copy = sample.slice();

    if (Array.isArray(p)) {
        var indices = [];
        for (var i = 0; i < p.length; i++) {
            indices.push(quantileIndex(copy.length, p[i]));
        }

        multiQuantileSelect(copy, indices);

        // Initialize the result array
        var results = [];
        // For each requested quantile
        for (i = 0; i < p.length; i++) {
            results[i] = quantileSorted(copy, p[i]);
        }
        return results;
    } else {
        quantileSelect(copy, quantileIndex(copy.length, p), 0, copy.length - 1);
        return quantileSorted(copy, p);
    }
}

function compare(a, b) {
    return a - b;
}

function multiQuantileSelect(arr, indices) {
    var steps = indices.sort(compare);
    steps.unshift(0);
    steps.push(arr.length - 1);

    var stack = [0, steps.length - 1];

    while (stack.length) {
        var r = Math.ceil(stack.pop());
        var l = Math.floor(stack.pop());
        if (r - l <= 1) continue;

        var m = Math.floor((l + r) / 2);
        quantileSelect(arr, steps[m], steps[l], steps[r]);

        stack.push(l, m, m, r);
    }
}

function quantileSelect(arr, k, left, right) {
    if (k % 1 === 0) {
        quickselect(arr, k, left, right);
    } else {
        k = Math.floor(k);
        quickselect(arr, k, left, right);
        quickselect(arr, k + 1, k + 1, right);
    }
}

function quantileIndex(len /*: number */, p /*: number */)/*:number*/ {
    var idx = len * p;
    if (p === 1) {
        // If p is 1, directly return the last element
        return len - 1;
    } else if (p === 0) {
        // If p is 0, directly return the first element
        return 0;
    } else if (idx % 1 !== 0) {
        // If index is not integer, return the next element in array
        return Math.ceil(idx) - 1;
    } else if (len % 2 === 0) {
        // If the list has even-length, we'll take the average of this number
        // and the next value, if there is one
        return idx - 0.5;
    } else {
        // Finally, in the simple case of an integer value
        // with an odd-length list, return the sample value at the index.
        return idx;
    }
}

module.exports = quantile;
