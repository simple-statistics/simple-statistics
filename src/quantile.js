import quantileSorted from "./quantile_sorted.js";
import quickselect from "./quickselect.js";

/**
 * The [quantile](https://en.wikipedia.org/wiki/Quantile):
 * this is a population quantile, since we assume to know the entire
 * dataset in this library. This implementation uses linear interpolation,
 * equivalent to R's type=7 and numpy's default percentile method.
 *
 * Sample is a one-dimensional array of numbers,
 * and p is either a decimal number from 0 to 1 or an array of decimal
 * numbers from 0 to 1.
 * In terms of a k/q quantile, p = k/q - it's just dealing with fractions or dealing
 * with decimal values.
 * When p is an array, the result of the function is also an array containing the appropriate
 * quantiles in input order
 *
 * @param {Array<number>} x sample of one or more numbers
 * @param {Array<number> | number} p the desired quantile, as a number between 0 and 1
 * @returns {number} quantile
 * @example
 * quantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
 */
function quantile(x, p) {
    const copy = x.slice();

    if (Array.isArray(p)) {
        // rearrange elements so that each element corresponding to a requested
        // quantile is on a place it would be if the array was fully sorted
        multiQuantileSelect(copy, p);
        // Initialize the result array
        const results = [];
        // For each requested quantile
        for (let i = 0; i < p.length; i++) {
            results[i] = quantileSorted(copy, p[i]);
        }
        return results;
    } else {
        const idx = quantileIndex(copy.length, p);
        quantileSelect(copy, idx, 0, copy.length - 1);
        return quantileSorted(copy, p);
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

function multiQuantileSelect(arr, p) {
    // Collect every integer order statistic that the requested quantiles need.
    // Linear interpolation (type=7) reads x[floor(idx)] and x[ceil(idx)], so both
    // surrounding positions must be placed. Deduplicate to integer positions
    // so each is selected with an unambiguous index.
    const positions = new Set();
    for (let i = 0; i < p.length; i++) {
        const idx = quantileIndex(arr.length, p[i]);
        positions.add(Math.floor(idx));
        positions.add(Math.ceil(idx));
    }
    const indices = Array.from(positions).sort(compare);

    multiselect(arr, indices, 0, indices.length - 1, 0, arr.length - 1);
}

// Place every order statistic in `indices` by partitioning around the median
// requested position, then recursing into the two halves. The just-placed pivot
// is excluded from the child ranges (indices[mid] ± 1) so that a later, narrower
// quickselect cannot disturb an already-finalized position.
function multiselect(arr, indices, lo, hi, left, right) {
    if (lo > hi) return;
    const mid = (lo + hi) >> 1;
    quickselect(arr, indices[mid], left, right);
    multiselect(arr, indices, lo, mid - 1, left, indices[mid] - 1);
    multiselect(arr, indices, mid + 1, hi, indices[mid] + 1, right);
}

function compare(a, b) {
    return a - b;
}

function quantileIndex(len, p) {
    // Use (n-1) * p to match numpy's linear method (type=7)
    const idx = (len - 1) * p;
    if (p === 1) {
        // If p is 1, directly return the last index
        return len - 1;
    } else if (p === 0) {
        // If p is 0, directly return the first index
        return 0;
    } else if (idx % 1 !== 0) {
        // If index is not integer, keep the fractional position so we can
        // select both surrounding order statistics for interpolation.
        return idx;
    } else {
        // If index is integer, return that exact position.
        return idx;
    }
}

export default quantile;
