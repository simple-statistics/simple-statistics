/**
 * https://simple-statistics.github.io/docs/#weightedquantile
 */
declare function weightedQuantile(
    x: readonly number[],
    weights: readonly number[],
    p: number
): number;
declare function weightedQuantile(
    x: readonly number[],
    weights: readonly number[],
    p: readonly number[]
): number[];

export default weightedQuantile;
