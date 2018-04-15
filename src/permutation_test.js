/* @flow */

import mean from './mean';
import shuffle from './shuffle';
import sum from './sum';

/**
 * Conducts a [permutation test](https://en.wikipedia.org/wiki/Resampling_(statistics)#Permutation_tests)
 * to determine if two data sets are *significantly* different from each other, using
 * the difference of means between the groups as the test statistic. 
 * The function allows for the following hypotheses:
 * - two_tail = Null hypothesis: the two distributions are equal.
 * - greater = Null hypothesis: observations from sampleX tend to be smaller than those from sampleY.
 * - less = Null hypothesis: observations from sampleX tend to be greater than those from sampleY.
 * [Learn more about one-tail vs two-tail tests.](https://en.wikipedia.org/wiki/One-_and_two-tailed_tests)
 *
 * @param {Array<number>} sampleX first dataset (e.g. treatment data)
 * @param {Array<number>} sampleY second dataset (e.g. control data)
 * @param {string} alternative alternative hypothesis, either 'two_sided' (default), 'greater', or 'less'
 * @param {number} k number of values in permutation distribution. 
 * @returns {number} p-value The probability of observing the difference between groups (as or more extreme than what we did), assuming the null hypothesis.
 *
 * @example
 * var control = [2, 5, 3, 6, 7, 2, 5];
 * var treatment = [20, 5, 13, 12, 7, 2, 2];
 * permutationTest(control, treatment); // ~0.1324 
 */
function permutationTest(
    sampleX/*: Array<number> */,
    sampleY/*: Array<number> */,
    alternative/*: string */ = 'two_side',
    k/*: number */ = 10000)/*: ?number */ {
    if (alternative !== 'two_side' && alternative !== 'greater' && alternative !== 'less') {
        throw new Error('`alternative` must be either \'two_tail\', \'greater\', or \'less\'');
    }

    // int pValue var
    var pValue;

    // get means for each sample
    var meanX = mean(sampleX);
    var meanY = mean(sampleY);

    // calculate initial test statistic. This will be our point of comparison with
    // the generated test statistics.
    var testStatistic = meanX - meanY;

    // create test-statistic distribution
    var testStatDsn = new Array(k);
    
    // combine datsets so we can easily shuffle later
    var allData = sampleX.concat(sampleY);
    var midArray = Math.floor(allData.length / 2);
    
    for (var i = 0; i < k; i++) {
        
        // 1. shuffle data assignments
        allData = shuffle(allData);
        var permLeft = allData.slice(0, midArray);
        var permRight = allData.slice(midArray, allData.length);

        // 2.re-calculate test statistic
        var permTestStatistic = mean(permLeft) - mean(permRight);

        // 3. store test statistic to build test statistic distribution
        testStatDsn[i] = permTestStatistic;
    }

    // Calculate p-value depending on alternative 
    // more info on p-value calculations: https://onlinecourses.science.psu.edu/stat464/node/35
    if (alternative === 'two_side') {
        pValue = sum(testStatDsn.map(function(tStat) {
            return +(Math.abs(tStat) >= Math.abs(testStatistic));
        })) / k;
    } else if (alternative === 'greater') {
        pValue = sum(testStatDsn.map(function(tStat) {
            return +(tStat >= testStatistic);
        })) / k;
    } else { // alternative === 'less'
        pValue = sum(testStatDsn.map(function(tStat) {
            return +(tStat <= testStatistic);
        })) / k;
    }
            
    return pValue
        
}

export default permutationTest;
