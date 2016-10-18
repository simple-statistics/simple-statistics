/* @flow */
'use strict';

/**
 * Implementation of [Combinations](https://en.wikipedia.org/wiki/Combination) with replacement
 * Combinations are unique subsets of a collection - in this case, k elements from a collection at a time.
 * 'With replacement' means that a given element can be chosen multiple times.
 * Unlike permutation, order doesn't matter for combinations.
 * 
 * @param {Array} elements any type of data
 * @param {int} k the number of objects in each group (without replacement)
 * @returns {Array<Array>} array of permutations
 * @example
 * combinationsReplacement([1, 2], 2); // => [[1, 1], [1, 2], [2, 2]]
 */
function combinationsReplacement(
    elements /*: Array<any> */,
    k /*: number */) {

    var combinationList = [];

    for (var i = 0; i < elements.length; i++) {
        if (k === 1) {
            // If we're requested to find only one element, we don't need
            // to recurse: just push `elements[i]` onto the list of combinations.
            combinationList.push([elements[i]])
        } else {
            // Otherwise, recursively find combinations, given `k - 1`. Note that
            // we request `k - 1`, so if you were looking for k=3 combinations, we're
            // requesting k=2. This -1 gets reversed in the for loop right after this
            // code, since we concatenate `elements[i]` onto the selected combinations,
            // bringing `k` back up to your requested level.
            // This recursion may go many levels deep, since it only stops once
            // k=1.
            var subsetCombinations = combinationsReplacement(
                elements.slice(i, elements.length),
                k - 1);

            for (var j = 0; j < subsetCombinations.length; j++) {
                combinationList.push([elements[i]]
                    .concat(subsetCombinations[j]));
            }
        }
    }

    return combinationList;
}

module.exports = combinationsReplacement;
