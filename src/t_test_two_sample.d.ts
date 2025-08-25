/**
 * https://simple-statistics.github.io/docs/#ttesttwosample
 */
declare function tTestTwoSample(
    sampleX: readonly number[],
    sampleY: readonly number[],
    difference?: number
): number | null;

export default tTestTwoSample;
