/**
 * https://simple-statistics.github.io/docs/#silhouettemetric
 */
declare function silhouetteMetric(
    points: readonly number[][],
    labels: readonly number[]
): number;

export default silhouetteMetric;
