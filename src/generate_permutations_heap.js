/**
 * Implementation of [Heap's Algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm)
 * for generating permutations.
 *
 * @param {Array} elements any type of data
 */
function generatePermutationsHeap(elements) {
    const indexes = Array(elements.length).fill(0);
    let i = 0;
    const iter = {
        next: function() {
            for (; i < elements.length; ) {
                if (indexes[i] < i) {
                    // At odd indexes, swap from indexes[i] instead
                    // of from the beginning of the array
                    let swapFrom = 0;
                    if (i % 2 !== 0) {
                        swapFrom = indexes[i];
                    }

                    // swap between swapFrom and i, using
                    // a temporary variable as storage.
                    const temp = elements[swapFrom];
                    elements[swapFrom] = elements[i];
                    elements[i] = temp;

                    indexes[i]++;
                    i = 0;
                    return {
                        value: elements.slice(),
                        done: false
                    };
                } else {
                    indexes[i] = 0;
                    i++;
                }
            }
            return { done: true };
        },
        [Symbol.iterator]: function() {
            return this;
        }
    };
    return iter;
}

export default generatePermutationsHeap;
