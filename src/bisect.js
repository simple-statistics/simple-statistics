'use strict';
/* @flow */

/**
 * [Bisection method](https://en.wikipedia.org/wiki/Bisection_method) is a root-finding 
 * method that repeatedlt bisects an interval to find the root.
 * 
 * This function returns a numerical approximation to the exact value.
 * 
 * @param {Function} f input function
 * @param {Number} a start of interval
 * @param {Number} b end of interval
 * @param {Number} nMax the maximum number of iterations
 * @param {Number} tol the error tolerance
 * @returns {Number} estimated root value
 * 
 * @example
 * bisect(Math.cos,0,4,100,0.003)
 */
function bisect(f, a, b, nMax, tol) {
    if (typeof f !== 'function') throw new SyntaxError('f must be a function');
    
    var n = 1;
    while (n <= nMax) {
        var c = (a + b) / 2;

        if (f(c) === 0 || Math.abs((b - a) / 2) < tol) {
            return c;
        }

        if (Math.sign(f(c)) === Math.sign(f(a))) {
            a = c;

        } else {
            b = c;
        }
        n = n + 1;
    }
    
    throw new Error('maximum number of iterations exceeded');
}

module.exports = bisect;