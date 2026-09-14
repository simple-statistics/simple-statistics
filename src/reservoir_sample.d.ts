/**
 * https://simple-statistics.github.io/docs/#reservoirsample
 */
declare function reservoirSample<T>(
    iterable: Iterable<T>,
    k: number,
    randomSource?: () => number
): T[];

export default reservoirSample;
