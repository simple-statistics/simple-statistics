/**
 * https://simple-statistics.github.io/docs/#quantile
 */
declare function quantile(x: readonly number[], p: number): number;
declare function quantile(
    x: readonly number[],
    p: readonly number[]
): number[];

export default quantile;
