var test = require('tape'),
    ss = require('../');

test('t test', function(t) {

    test('can compare a known value to the mean of samples', function(t) {
        var res = ss.t_test([1, 2, 3, 4, 5, 6], 3.385);
        t.equal(res, 0.1649415480881466);
        t.end();
    });

    test('can test independency of two samples', function(t) {
        var res = ss.t_test_two_sample([1, 2, 3, 4], [3, 4, 5, 6], 0);
        t.equal(res, -2.1908902300206643);
        t.end();
    });

    test('can test independency of two samples (mu == -2)', function(t) {
        var res = ss.t_test_two_sample([1, 2, 3, 4], [3, 4, 5, 6], -2);
        t.equal(res, 0);
        t.end();
    });

    test('can test independency of two samples of different lengths', function(t) {
        var res = ss.t_test_two_sample([1, 2, 3, 4], [3, 4, 5, 6, 1, 2, 0]);
        t.equal(res, -0.4165977904505309);
        t.end();
    });

    test('has an edge case for one sample being of size zero', function(t) {
        t.equal(ss.t_test_two_sample([1, 2, 3, 4], []), null);
        t.equal(ss.t_test_two_sample([], [1, 2, 3, 4]), null);
        t.equal(ss.t_test_two_sample([], []), null);
        t.end();
    });

    t.end();
});
