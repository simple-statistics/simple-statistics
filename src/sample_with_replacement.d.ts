/**
 * https://simplestatistics.org/docs/#samplewithreplacement
 */
declare function sampleWithReplacement<T>(
    x: T[],
    n: number,
    randomSource?: () => number,
): T[];

export default sampleWithReplacement;
