/**
 * Sampling with replacement is a type of sampling that allows the same
 * item to be picked out of a population more than once.
 *
 * @param {Array<*>} x an array of any kind of value
 * @param {number} n count of how many elements to take
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @example
 * var values = [1, 2, 3, 4];
 * sampleWithReplacement(values, 2); // returns 2 random values, like [2, 4];
 */
function generateSampleWithReplacement(x, n, randomSource) {
    // a custom random number source can be provided if you want to use
    // a fixed seed or another random number generator, like
    // [random-js](https://www.npmjs.org/package/random-js)
    randomSource = randomSource || Math.random;

    let i = 0;

    const iter = {
        next: function() {
            if (x.length === 0 || i === n - 1) return { done: true };
            const index = Math.floor(randomSource() * x.length);

            i++;
            return {
                value: x[index],
                done: false
            };
        },
        [Symbol.iterator]: function() {
            return this;
        }
    };
    return iter;
}

export default generateSampleWithReplacement;
