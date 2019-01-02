function permutationsHeap(elements) {
    const indexes = new Array(elements.length);
    const permutations = [elements.slice()];

    for (let i = 0; i < elements.length; i++) {
        indexes[i] = 0;
    }

    for (let i = 0; i < elements.length; ) {
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

            permutations.push(elements.slice());
            indexes[i]++;
            i = 0;
        } else {
            indexes[i] = 0;
            i++;
        }
    }

    return permutations;
}

/**
 * Implementation of [Heap's Algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm)
 * for generating permutations.
 *
 * @param {Array} elements any type of data
 * @returns {Array<Array>} array of permutations
 */
function* generatePermutationsHeap(elements) {
    const indexes = new Array(elements.length);
    const permutations = [elements.slice()];

    for (let i = 0; i < elements.length; i++) {
        indexes[i] = 0;
    }

    for (let i = 0; i < elements.length; ) {
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

            yield elements.slice();
            indexes[i]++;
            i = 0;
        } else {
            indexes[i] = 0;
            i++;
        }
    }

    return permutations;
}

console.time('Warmup');
for (let i = 0; i < 10; i++) {
    permutationsHeap(Array.from({ length: i }, (_, i) => i));
    [...generatePermutationsHeap(Array.from({ length: i }, (_, i) => i))];
}
console.timeEnd('Warmup');

console.time('control');
for (let j = 0; j < 100; j++) {
    for (let i = 0; i < 10; i++) {
        permutationsHeap(Array.from({ length: i }, (_, i) => i));
    }
}
console.timeEnd('control');

console.time('experimental');
for (let j = 0; j < 100; j++) {
    for (let i = 0; i < 10; i++) {
        Array.from(generatePermutationsHeap(Array.from({ length: i }, (_, i) => i)));
    }
}
console.timeEnd('experimental');

console.time('control');
for (let j = 0; j < 100; j++) {
    for (let i = 0; i < 10; i++) {
        permutationsHeap(Array.from({ length: i }, (_, i) => i));
    }
}
console.timeEnd('control');

console.time('experimental');
for (let j = 0; j < 100; j++) {
    for (let i = 0; i < 10; i++) {
        Array.from(generatePermutationsHeap(Array.from({ length: i }, (_, i) => i)));
    }
}
console.timeEnd('experimental');

console.time('control');
for (let j = 0; j < 100; j++) {
    for (let i = 0; i < 10; i++) {
        permutationsHeap(Array.from({ length: i }, (_, i) => i));
    }
}
console.timeEnd('control');

console.time('experimental');
for (let j = 0; j < 100; j++) {
    for (let i = 0; i < 10; i++) {
        Array.from(generatePermutationsHeap(Array.from({ length: i }, (_, i) => i)));
    }
}
console.timeEnd('experimental');



export default generatePermutationsHeap;
