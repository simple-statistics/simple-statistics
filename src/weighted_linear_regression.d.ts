/**
 * https://simple-statistics.github.io/docs/#weightedlinearregression
 */
declare function weightedLinearRegression(
    data: readonly (readonly number[])[],
    weights: readonly number[]
): { m: number; b: number };

export default weightedLinearRegression;
