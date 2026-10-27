import ckmeans from "./ckmeans.js";

/**
 * Given an array of x, this will use Ckmeans clustering to compute
 * class breaks, in the same `[min, ...breaks, max]` shape that
 * `equalIntervalBreaks` returns. Unlike `equalIntervalBreaks`, which
 * divides the range of the data evenly, each internal break here is
 * the smallest value of the cluster it starts, so classes group
 * together values that Ckmeans found to be most alike: a value `v`
 * falls into class `i` when `breaks[i] <= v < breaks[i + 1]`, and the
 * last class also includes the maximum value.
 *
 * @param {Array<number>} x an array of number values
 * @param {number} nClasses number of desired classes
 * @returns {Array<number>} array of class break positions
 * @example
 * ckmeansBreaks([-1, 2, -1, 2, 4, 5, 6, -1, 2, -1], 3); // => [-1, 2, 4, 6]
 */
function ckmeansBreaks(x, nClasses) {
    const clusters = ckmeans(x, nClasses);
    const lastCluster = clusters[clusters.length - 1];

    return clusters
        .map((cluster) => cluster[0])
        .concat(lastCluster[lastCluster.length - 1]);
}

export default ckmeansBreaks;
