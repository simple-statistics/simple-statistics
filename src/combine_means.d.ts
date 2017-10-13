/**
 * When combining two lists of values for which one already knows the means,
 * one does not have to necessary recompute the mean of the combined lists in
 * linear time. They can instead use this function to compute the combined
 * mean by providing the mean & number of values of the first list and the mean
 * & number of values of the second list.
 *
 * @since 3.0.0
 * @example
 * combineMeans(5, 3, 4, 3); // => 4.5
 */
declare function combineMeans(mean1 : number, n1: number, mean2: number, n2: number): number

export default combineMeans
