'use strict';

/**
 * Create a range of increasing numbers from 0 to high, not including high.
 *
 * @param {number} high
 * @returns {Array<number>} range
 * @example
 * makeRange(5); // [0, 1, 2, 3, 4]
 */
function makeRange(high) {
    var range = [];
    for (var i = 0; i < high; i++) {
        range.push(i);
    }
    return range;
}

module.exports = makeRange;
