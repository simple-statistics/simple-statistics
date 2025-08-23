/**
 * https://simple-statistics.github.io/docs/#chisquaredgoodnessoffit
 */
declare function chiSquaredGoodnessOfFit(
    data: readonly number[],
    distributionType: Function,
    significance: number
): boolean;

export default chiSquaredGoodnessOfFit;
