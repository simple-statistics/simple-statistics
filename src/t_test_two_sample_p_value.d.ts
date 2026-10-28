/**
 * https://simple-statistics.github.io/docs/#ttesttwosamplepvalue
 */
declare function tTestTwoSamplePValue(
    sampleX: readonly number[],
    sampleY: readonly number[],
    difference?: number
): number | null;

export default tTestTwoSamplePValue;
