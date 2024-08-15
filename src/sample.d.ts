/**
 * https://simplestatistics.org/docs/#sample
 */
declare function sample<T>(x: T[], n: number, randomSource: () => number): T[];

export default sample;
