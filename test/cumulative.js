var test = require('tape');
var ss = require('../');

test('cumulative_std_normal_probability', function(t) {
    // https://en.wikipedia.org/wiki/Standard_normal_table#Examples_of_use
    test('wikipedia test example works', function(t) {
        for (var i = 0; i < ss.standard_normal_table.length; i++) {
            t.equal(ss.cumulative_std_normal_probability(0.4), 0.6554);
        }
        t.end();
    });
    t.end();
});
