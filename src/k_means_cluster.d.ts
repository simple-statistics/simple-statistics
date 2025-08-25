/**
 * https://simple-statistics.github.io/docs/#k_means_cluster
 */
declare function kMeansCluster(
    points: readonly number[][],
    numCluster: number,
    randomSource?: () => number
): { labels: number[]; centroids: number[][] };

export default kMeansCluster;
