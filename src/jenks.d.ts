/**
 * https://simple-statistics.github.io/docs/#jenks
 */
declare function jenks(
    data: readonly number[],
    nClasses: number
): readonly number[];

export default jenks;
