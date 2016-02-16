'use strict';
/* @flow */

var max = require('./max'),
    min = require('./min');

/**
 * Given an array of data, this will find the extent of the
 * data and return an array of breaks that can be used
 * to categorize the data into a number of classes. The
 * returned array will always be 1 longer than the number of
 * classes because it includes the minimum value.
 *
 * @param {Array<number>} data input data, as an array of number values
 * @param {number} nClasses number of desired classes
 * @returns {Array<number>} array of class break positions
 * @example
 * equalIntervalBreaks([1, 2, 3, 4, 5, 6], 4); //= [1, 2.25, 3.5, 4.75, 6]
 */
function equalIntervalBreaks(data/*: Array<number> */, nClasses/*:number*/)/*: Array<number> */ {

    if (data.length <= 1) {
        return data;
    }

    var theMin = min(data),
        theMax = max(data); 

    // the first break will always be the minimum value
    // in the dataset
    var breaks = [theMin];

    // The size of each break is the full range of the data
    // divided by the number of classes requested
    var breakSize = (theMax - theMin) / nClasses;

    // In the case of nClasses = 1, this loop won't run
    // and the returned breaks will be [min, max]
    for (var i = 1; i < nClasses; i++) {
        breaks.push(breaks[0] + breakSize * i);
    }

    // the last break will always be the
    // maximum.
    breaks.push(theMax);

    return breaks;
}

module.exports = equalIntervalBreaks;
