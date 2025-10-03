/**
 * https://simple-statistics.github.io/docs/#rsquared
 */
declare function rSquared(
    x: readonly number[][],
    func: (x: number) => number
): number;

export default rSquared;
