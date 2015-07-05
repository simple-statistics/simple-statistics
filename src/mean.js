'use strict';

var sum = require('./sum');

// # mean
//
// is the sum over the number of values
//
// This runs on `O(n)`, linear time in respect to the array
function mean(x) {
    // The mean of no numbers is null
    if (x.length === 0) return null;

    return sum(x) / x.length;
}

module.exports = mean;
