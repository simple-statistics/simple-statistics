'use strict';

var shuffle_in_place = require('./shuffle_in_place');

// # shuffle
//
// A [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
// is a fast way to create a random permutation of a finite set.
function shuffle(sample, randomSource) {
    // slice the original array so that it is not modified
    sample = sample.slice();

    // and then shuffle that shallow-copied array, in place
    return shuffle_in_place(sample.slice(), randomSource);
}

module.exports = shuffle;
