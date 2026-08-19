/**
 * https://simple-statistics.github.io/docs/#jenks
 */
declare function jenks(
    data: readonly number[],
    nClasses: number
): number[] | null;

export default jenks;
