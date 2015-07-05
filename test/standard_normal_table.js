'use strict';

var test = require('tape');
var ss = require('../');

test('standardNormalTable', function(t) {
    test('all entries are numeric', function(t) {
        for (var i = 0; i < ss.standardNormalTable.length; i++) {
            t.equal(typeof ss.standardNormalTable[i], 'number');
            t.ok(ss.standardNormalTable[i] >= 0);
            t.ok(ss.standardNormalTable[i] <= 1);
        }
        t.end();
    });
    t.end();
});
