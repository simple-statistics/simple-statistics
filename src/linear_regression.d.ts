/**
 * https://simple-statistics.github.io/docs/#linearregression
 */
declare function linearRegression(data: readonly number[][]): {
    m: number;
    b: number;
    r: number;
};

export default linearRegression;
