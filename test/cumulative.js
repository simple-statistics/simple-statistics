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
    test('nondecreasing', function(t) {
        for (var i = 0; i < ss.standard_normal_table.length; i++) {
            t.equal(ss.cumulative_std_normal_probability(i / 100) >= ss.cumulative_std_normal_probability((i - 1) / 100), true);
        }
        t.end();
    });
    test('matches error_function', function(t) {
        for (var i = 0; i < ss.standard_normal_table.length; i++) {
            t.equal(Math.abs(ss.cumulative_std_normal_probability(i / 100) - (.5 + .5 * ss.error_function(i / 100 / Math.sqrt(2)))) < ss.epsilon, true);
        }
        t.end();
    });
    test('symmetry', function(t) {
        t.equal(Math.abs(ss.cumulative_std_normal_probability(-1) - (1 - ss.cumulative_std_normal_probability(1))) < ss.epsilon, true);
        t.end();
    });
    t.end();
});
