'use strict';

var shuffle = require('./shuffle');

// # sample
//
// Create a [simple random sample](http://en.wikipedia.org/wiki/Simple_random_sample)
// from a given array of `n` elements.
function sample(array, n, randomSource) {
    // shuffle the original array using a fisher-yates shuffle
    var shuffled = shuffle(array, randomSource);

    // and then return a subset of it - the first `n` elements.
    return shuffled.slice(0, n);
}

module.exports = sample;
