/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var sortedUniqueCount = require('../src/sorted_unique_count');

test('sortedUniqueCount', function(t) {
    t.equal(sortedUniqueCount([]), 0);
    t.equal(sortedUniqueCount([1]), 1);
    t.equal(sortedUniqueCount([undefined]), 1);
    t.equal(sortedUniqueCount([1, 2, 3, 4]), 4);
    t.equal(sortedUniqueCount([1, 2, 3, 3, 4]), 4);
    t.equal(sortedUniqueCount([1, 2, 3, 3, 4, 4]), 4);
    t.equal(sortedUniqueCount([1, 1, 2, 3, 3, 4, 4]), 4);
    t.end();
});
