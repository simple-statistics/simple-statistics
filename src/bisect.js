'use strict';
/* @flow */

var sign = require('./sign');
/**
 * [Bisection method](https://en.wikipedia.org/wiki/Bisection_method) is a root-finding 
 * method that repeatedly bisects an interval to find the root.
 * 
 * This function returns a numerical approximation to the exact value.
 * 
 * @param {Function} f input function
 * @param {Number} a start of interval
 * @param {Number} b end of interval
 * @param {Number} nMax the maximum number of iterations
 * @param {Number} tol the error tolerance
 * @returns {Number} estimated root value
 * @throws {TypeError} Argument func must be a function
 * 
 * @example
 * bisect(Math.cos,0,4,100,0.003); // => 1.572265625
 */
function bisect(func/*: (x: any) => number */, start/*: number */, end/*: number */, maxIterations/*: number */, errorTolerance/*: number */)/*:number*/ {
    if (typeof func !== 'function') throw new TypeError('func must be a function');
    
    var n = 1;
    while (n <= maxIterations) {
        var output = (start + end) / 2;

        if (func(output) === 0 || Math.abs((end - start) / 2) < errorTolerance) {
            return output;
        }

        if (sign(func(output)) === sign(func(start))) {
            start = output;

        } else {
            end = output;
        }
        n = n + 1;
    }
    
    throw new Error('maximum number of iterations exceeded');
}

module.exports = bisect;