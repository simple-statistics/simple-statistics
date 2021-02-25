import sampleCorrelation from "./sample_correlation";

/**
 * The [rank correlation](https://en.wikipedia.org/wiki/Rank_correlation) is
 * a measure of the strength of monotonic relationship between two arrays
 *
 * @param {Array<number>} x first input
 * @param {Array<number>} y second input
 * @returns {number} sample rank correlation
 */
function sampleRankCorrelation(x, y) {
    const sortedX = x.slice().sort((a, b) => a - b);
    const sortedY = y.slice().sort((a, b) => a - b);
    const xRanks = x.map((a) => sortedX.indexOf(a));
    const yRanks = y.map((a) => sortedY.indexOf(a));

    return sampleCorrelation(xRanks, yRanks);
}

export default sampleRankCorrelation;
