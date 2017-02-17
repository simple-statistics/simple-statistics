'use strict';
/* @flow */

/**
 * Sampling with replacement is a type of sampling that allows the same
 * item to be picked out of a population more than once.
 *
 * @param {Array} population an array of any kind of element
 * @param {number} n count of how many elements to take
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @return {Array} n sampled items from the population
 * @example
 * var sample = sampleWithReplacement([1, 2, 3, 4], 2);
 * sampleWithReplacement; // = [2, 4] or any other random sample of 2 items
 */
function sampleWithReplacement/*::<T>*/(population/*:Array<T>*/,
    n /*: number */,
    randomSource/*:Function*/) {

    if (population.length === 0) {
        return [];
    }

    // a custom random number source can be provided if you want to use
    // a fixed seed or another random number generator, like
    // [random-js](https://www.npmjs.org/package/random-js)
    randomSource = randomSource || Math.random;

    var length = population.length;
    var sample = [];

    for (var i = 0; i < n; i++) {
        var index = Math.floor(randomSource() * length);

        sample.push(population[index]);
    }

    return sample;
}

module.exports = sampleWithReplacement;
