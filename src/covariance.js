/* @flow */

import mean from "./mean";

function covariance(
    data1 /*: Array<number> */,
    data2 /*: Array<number> */
) /*: number */ {
    if (data1.length === 0 || data2.length === 0) {
        throw new Error("covariance requires at least one data point");
    }

    const mean1 = mean(data1);
    const mean2 = mean(data2);

    let total = 0;
    let i;

    for (i = 0; i < data1.length; i++) {
        total += (data1[i] - mean1) * (data2[i] - mean2);
    }

    return total/(data1.length - 1);
}

export default covariance;
