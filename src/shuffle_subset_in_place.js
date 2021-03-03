function shuffleSubsetInPlace(x, n, randomSource) {
    // a custom random number source can be provided if you want to use
    // a fixed seed or another random number generator, like
    // [random-js](https://www.npmjs.org/package/random-js)
    randomSource = randomSource || Math.random;

    // store the current length of the x to determine
    // when no elements remain to shuffle.
    let length = x.length;

    // temporary is used to hold an item when it is being
    // swapped between indices.
    let temporary;

    // The index to swap at each stage.
    let index;

    // While there are still items to shuffle
    while (length > Math.max(x.length - n, 0)) {
        // choose a random index within the subset of the array
        // that is not yet shuffled
        index = Math.floor(randomSource() * length--);

        // store the value that we'll move temporarily
        temporary = x[length];

        // swap the value at `x[length]` with `x[index]`
        x[length] = x[index];
        x[index] = temporary;
    }

    return x.slice(x.length - n);
}

export default shuffleSubsetInPlace;
