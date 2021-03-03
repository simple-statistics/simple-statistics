import shuffleSubsetInPlace from "./shuffle_subset_in_place";

/**
 * A [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
 * in-place - which means that it **will change the order of the original
 * array by reference**.
 *
 * This is an algorithm that generates a random [permutation](https://en.wikipedia.org/wiki/Permutation)
 * of a set.
 *
 * @param {Array} x sample of one or more numbers
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @returns {Array} x
 * @example
 * var x = [1, 2, 3, 4];
 * shuffleInPlace(x);
 * // x is shuffled to a value like [2, 1, 4, 3]
 */
function shuffleInPlace(x, randomSource) {
    return shuffleSubsetInPlace(x, x.length, randomSource);
}

export default shuffleInPlace;
