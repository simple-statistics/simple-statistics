/* eslint no-shadow: 0 */

var test = require('tap').test, ss = require('../');

test('tTestTwoSample', function(t) {
  t.test('can test independency of two samples', function(t) {
    var res = ss.tTestTwoSample([1, 2, 3, 4], [3, 4, 5, 6], 0);
    t.equal(res, -2.1908902300206643);
    t.end();
  });

  t.test('can test independency of two samples (mu == -2)', function(t) {
    var res = ss.tTestTwoSample([1, 2, 3, 4], [3, 4, 5, 6], -2);
    t.equal(res, 0);
    t.end();
  });

  t.test('can test independency of two samples of different lengths', function(
    t
  ) {
    var res = ss.tTestTwoSample([1, 2, 3, 4], [3, 4, 5, 6, 1, 2, 0]);
    t.equal(res, -0.4165977904505309);
    t.end();
  });

  t.test('has an edge case for one sample being of size zero', function(t) {
    t.equal(ss.tTestTwoSample([1, 2, 3, 4], []), null);
    t.equal(ss.tTestTwoSample([], [1, 2, 3, 4]), null);
    t.equal(ss.tTestTwoSample([], []), null);
    t.end();
  });

  t.end();
});
