/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var cK = require('../src/ckmeans.js');

test('C k-means', function(t) {
    t.ok(cK, 'exports fn');
    t.deepEqual(cK([1, 4, 2, 2, 3]), [1, 2, 3, 4], 'exports fn');
    t.end();
});
