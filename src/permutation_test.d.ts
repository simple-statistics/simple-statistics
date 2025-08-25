/**
 * https://simple-statistics.github.io/docs/#permutationstest
 */
declare function permutationTest(
    sampleX: readonly number[],
    sampleY: readonly number[],
    string?: string,
    k?: number,
    randomSource?: () => number
): number;

export default permutationTest;
