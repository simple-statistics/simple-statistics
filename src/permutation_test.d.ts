/**
 * https://simple-statistics.github.io/docs/#permutationstest
 */
declare function permutationTest(
    sampleX: readonly number[],
    sampleY: readonly number[],
    alternative?: "two_side" | "greater" | "less",
    k?: number,
    randomSource?: () => number
): number;

export default permutationTest;
