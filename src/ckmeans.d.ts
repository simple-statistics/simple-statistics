/**
 * https://simple-statistics.github.io/docs/#ckmeans
 */
declare function ckmeans<T extends readonly number[]>(
    x: T,
    nClusters: number
): T[];

export default ckmeans;
