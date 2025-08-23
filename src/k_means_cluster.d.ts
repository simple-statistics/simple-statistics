/**
 * https://simple-statistics.github.io/docs/#k_means_cluster
 */
declare function kMeansCluster(
    points: readonly number[][],
    numCluster: number,
    randomSource?: () => number
): { labels: readonly number[]; centroids: readonly number[][] };

export default kMeansCluster;
