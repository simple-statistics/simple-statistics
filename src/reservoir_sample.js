/**
 * [Reservoir sampling](https://en.wikipedia.org/wiki/Reservoir_sampling) takes
 * `k` items uniformly at random from an input of unknown length, in a single
 * pass and using O(k) memory. This makes it useful for sampling from streams,
 * generators, or other iterables that are too large - or too slow - to load
 * into an array first.
 *
 * This implements Algorithm L, from Li, Kim-Hung. "Reservoir-sampling
 * algorithms of time complexity O(n(1+log(N/n)))." ACM Transactions on
 * Mathematical Software (TOMS) 20.4 (1994): 481-493.
 *
 * @param {Iterable<any>} iterable a stream, generator or other iterable
 * @param {number} k count of how many elements to take
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @return {Array} k sampled items from the iterable
 * @example
 * function* naturalNumbers() {
 *     let i = 1;
 *     while (true) {
 *         yield i++;
 *     }
 * }
 * reservoirSample(naturalNumbers(), 3); // => [482, 1913, 7006]
 */
function reservoirSample(iterable, k, randomSource) {
    randomSource = randomSource || Math.random;

    const reservoir = [];
    let w;
    let next;
    let i = 0;

    const iterator = iterable[Symbol.iterator]();
    let step = iterator.next();

    for (; !step.done; step = iterator.next()) {
        const item = step.value;
        i++;

        if (i <= k) {
            reservoir.push(item);
            if (i === k) {
                // jump straight to the next item that replaces one,
                // skipping everything in between
                w = Math.exp(Math.log(randomSource()) / k);
                next =
                    i +
                    Math.floor(Math.log(randomSource()) / Math.log(1 - w)) +
                    1;
            }
            continue;
        }

        if (i === next) {
            reservoir[Math.floor(randomSource() * k)] = item;
            w *= Math.exp(Math.log(randomSource()) / k);
            next += Math.floor(Math.log(randomSource()) / Math.log(1 - w)) + 1;
        }
    }

    return reservoir;
}

export default reservoirSample;
