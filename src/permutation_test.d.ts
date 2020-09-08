/**
 * https://simplestatistics.org/docs/#permutationstest
 */
declare function permutationTest(
  sampleX: number[],
  sampleY: number[],
  string?: string,
  k?: number,
  randomSource?: () => number
): number;

export default permutationTest;
