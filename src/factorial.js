'use strict';

// # [Factorial](https://en.wikipedia.org/wiki/Factorial)
//
// A factorial, usually written n!, is the product of all positive
// integers less than or equal to n. Often factorial is implemented
// recursively, but this iterative approach is significantly faster
// and simpler.
function factorial(n) {

    // factorial is mathematically undefined for negative numbers
    if (n < 0 ) { return null; }

    // typically you'll expand the factorial function going down, like
    // 5! = 5 * 4 * 3 * 2 * 1. This is going in the opposite direction,
    // counting from 2 up to the number in question, and since anything
    // multiplied by 1 is itself, the loop only needs to start at 2.
    var accumulator = 1;
    for (var i = 2; i <= n; i++) {
        // for each number up to and including the number `n`, multiply
        // the accumulator my that number.
        accumulator *= i;
    }
    return accumulator;
}

module.exports = factorial;
