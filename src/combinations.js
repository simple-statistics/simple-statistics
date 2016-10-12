/* @flow */
'use strict';
/**
 * Implementation of Combinations
 * https://en.wikipedia.org/wiki/Combination
 * @param {Array} elements any type of data
 * @param {int} k the number of objects in each group (without replacement)
 * @returns {Array<Array>} array of permutations
 */

function combinations(elements: Array<any>, k: number){
  var i,
  subI,
  ret = [],
  sub,
  next;
  for (i = 0; i < elements.length; i++){
    if (k === 1){
      ret.push([ elements[i] ])
    } else {
      sub = combinations(elements.slice(i+1, elements.length), k-1);
      for (subI = 0; subI < sub.length; subI++){
        next = sub[subI];
        next.unshift(elements[i]);
        ret.push(next);
      }
    }
  }
  return ret;
}

module.exports = combinations;
