/* @flow */
'use strict';
/**
 * Implementation of Combinations with replacement
 * Combinations are unique subsets of a collection - in this case, k elements from a collection at a time.
 * With replacement implies that a given element can be chosen multiple times.
 * Order is unimportant.
 * https://en.wikipedia.org/wiki/Combination
 * @param {Array} elements any type of data
 * @param {int} k the number of objects in each group (without replacement)
 * @returns {Array<Array>} array of permutations
 * @example
 * combinationsReplacement([1, 2], 2); // => [[1,1], [1,2], [2,2]]
 */

function combinationsReplacement(elements /*: Array<any> */, k/*: number */){
  var i;
  var subI;
  var combinationList = [];
  var subsetCombinations;
  var next;

  for (i = 0; i < elements.length; i++){
    if (k === 1){
      combinationList.push([ elements[i] ])
    } else {
      subsetCombinations = combinationsReplacement(elements.slice(i, elements.length), k-1);
      for (subI = 0; subI < subsetCombinations.length; subI++){
        next = subsetCombinations[subI];
        next.unshift(elements[i]);
        combinationList.push(next);
      }
    }
  }
  return combinationList;
}

module.exports = combinationsReplacement;
