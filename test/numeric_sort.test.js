/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var numericSort = require('../src/numeric_sort');

test('numericSort', function(t) {
    t.deepEqual(numericSort([1, 2]), [1, 2]);
    t.deepEqual(numericSort([2, 1]), [1, 2]);

    var input = [2, 1];
    var output = [1, 2];
    t.deepEqual(numericSort(input), output);
    t.deepEqual(input, [2, 1], 'does not mutate input');

    t.end();
});
