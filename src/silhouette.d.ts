/**
 * https://simple-statistics.github.io/docs/#silhouette
 */
declare function silhouette(
    points: readonly number[][],
    labels: readonly number[]
): readonly number[];

export default silhouette;
