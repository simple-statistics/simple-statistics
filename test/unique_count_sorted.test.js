/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var uniqueCountSorted = require('../src/unique_count_sorted');

test('uniqueCountSorted', function(t) {
    t.equal(uniqueCountSorted([]), 0);
    t.equal(uniqueCountSorted([1]), 1);
    t.equal(uniqueCountSorted([undefined]), 1);
    t.equal(uniqueCountSorted([1, 2, 3, 4]), 4);
    t.equal(uniqueCountSorted([1, 2, 3, 3, 4]), 4);
    t.equal(uniqueCountSorted([1, 2, 3, 3, 4, 4]), 4);
    t.equal(uniqueCountSorted([1, 1, 2, 3, 3, 4, 4]), 4);
    t.end();
});
