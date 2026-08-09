import sampleCorrelation from "./sample_correlation.js";

/**
 * Rank values, giving tied values the average of the ranks they span.
 *
 * Spearman's rho is defined on these midranks. Assigning tied values
 * distinct consecutive ranks instead would make the rank of a value depend
 * on where it happens to sit in the input array, and therefore make the
 * correlation depend on the order the pairs are listed in.
 *
 * @private
 * @param {Array<number>} values input
 * @returns {Array<number>} ranks, in the order of the input
 */
function midranks(values) {
    const order = values
        .map((value, index) => [value, index])
        .sort((a, b) => a[0] - b[0]);

    const ranks = Array(values.length);
    let i = 0;
    while (i < order.length) {
        // Extend j across every value tied with the one at i.
        let j = i;
        while (j + 1 < order.length && order[j + 1][0] === order[i][0]) {
            j++;
        }
        const rank = (i + j) / 2;
        for (let k = i; k <= j; k++) {
            ranks[order[k][1]] = rank;
        }
        i = j + 1;
    }
    return ranks;
}

/**
 * The [rank correlation](https://en.wikipedia.org/wiki/Rank_correlation) is
 * a measure of the strength of monotonic relationship between two arrays
 *
 * Tied values share the average of the ranks they span, so the result
 * depends only on the paired data and not on the order the pairs are given
 * in. When either input has no rank variance the correlation is undefined
 * and the result is `NaN`.
 *
 * @param {Array<number>} x first input
 * @param {Array<number>} y second input
 * @returns {number} sample rank correlation
 * @example
 * sampleRankCorrelation([1, 2, 3, 4, 5], [1, 4, 9, 16, 25]);
 * // => 1
 */
function sampleRankCorrelation(x, y) {
    return sampleCorrelation(midranks(x), midranks(y));
}

export default sampleRankCorrelation;
