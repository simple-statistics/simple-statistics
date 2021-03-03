import shuffleSubsetInPlace from "./shuffle_subset_in_place";

/**
 * Create a [simple random sample](http://en.wikipedia.org/wiki/Simple_random_sample)
 * from a given array of `n` elements.
 *
 * The sampled values will be in any order, not necessarily the order
 * they appear in the input.
 *
 * @param {Array<any>} x input array. can contain any type
 * @param {number} n count of how many elements to take
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @return {Array} subset of n elements in original array
 *
 * @example
 * var values = [1, 2, 4, 5, 6, 7, 8, 9];
 * sample(values, 3); // returns 3 random values, like [2, 5, 8];
 */
function sample(x, n, randomSource) {
    const data = x.slice();
    // shuffle the tail of the array using a fisher-yates shuffle
    return shuffleSubsetInPlace(data, n, randomSource);
}

export default sample;
