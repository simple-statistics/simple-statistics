var test = require('tape');
var ss = require('../');

test('error_function', function(t) {
    test('symmetry', function(t) {
        t.equal(ss.error_function(-1), -ss.error_function(1));
        t.end();
    });
    t.end();
});
