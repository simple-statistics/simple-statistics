/**
 * https://simplestatistics.org/docs/#k_means_cluster
 */
declare function kMeansCluster(
  points: number[][],
  numCluster: number,
  randomSource?: () => number
): { labels: number[]; centroids: number[][] };

export default kMeansCluster;
