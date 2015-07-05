'use strict';

// # max
//
// This is simply the maximum number in the set.
//
// This runs on `O(n)`, linear time in respect to the array
function max(x) {
    var value;
    for (var i = 0; i < x.length; i++) {
        // On the first iteration of this loop, max is
        // undefined and is thus made the maximum element in the array
        if (x[i] > value || value === undefined) value = x[i];
    }
    return value;
}

module.exports = max;
