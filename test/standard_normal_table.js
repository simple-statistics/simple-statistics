var test = require('tape');
var ss = require('../');

test('standard_normal_table', function(t) {
    test('all entries are numeric', function(t) {
        for (var i = 0; i < ss.standard_normal_table.length; i++) {
            t.equal(typeof ss.standard_normal_table[i], 'number');
            t.ok(ss.standard_normal_table[i] >= 0);
            t.ok(ss.standard_normal_table[i] <= 1);
        }
        t.end();
    });
    t.end();
});
