'use strict';

// # geometric mean
//
// a mean function that is more useful for numbers in different
// ranges.
//
// this is the nth root of the input numbers multiplied by each other
//
// This runs on `O(n)`, linear time in respect to the array
function geometric_mean(x) {
    // The mean of no numbers is null
    if (x.length === 0) return null;

    // the starting value.
    var value = 1;

    for (var i = 0; i < x.length; i++) {
        // the geometric mean is only valid for positive numbers
        if (x[i] <= 0) return null;

        // repeatedly multiply the value by each number
        value *= x[i];
    }

    return Math.pow(value, 1 / x.length);
}

module.exports = geometric_mean;
