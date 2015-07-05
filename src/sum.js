'use strict';

// # sum
//
// is simply the result of adding all numbers
// together, starting from zero.
//
// This runs on `O(n)`, linear time in respect to the array
function sum(x) {
    var value = 0;
    for (var i = 0; i < x.length; i++) {
        value += x[i];
    }
    return value;
}

module.exports = sum;
