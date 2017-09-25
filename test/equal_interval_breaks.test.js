/* eslint no-shadow: 0 */


var test = require('tap').test;
var equalIntervalBreaks = require('../').equalIntervalBreaks;

test('equalIntervalBreaks', function(t) {
    t.deepEqual(equalIntervalBreaks([1], 4), [1], '1-length case');
    t.deepEqual(equalIntervalBreaks([1, 2, 3, 4, 5, 6], 4), [1, 2.25, 3.5, 4.75, 6], 'three breaks');
    t.deepEqual(equalIntervalBreaks([1, 2, 3, 4, 5, 6], 2), [1, 3.5, 6], 'two breaks');
    t.deepEqual(equalIntervalBreaks([1, 2, 3, 4, 5, 6], 1), [1, 6], 'one break');
    t.end();
});
