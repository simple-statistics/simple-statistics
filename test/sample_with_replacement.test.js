/* eslint no-shadow: 0 */

var test = require('tap').test;
var Random = require('random-js');
var random = new Random(Random.engines.mt19937().seed(0));
var ss = require('../');

function rng() {
  return random.real(0, 1);
}

test('sampleWithReplacement', function(t) {
  var input = [1, 2, 3, 4, 5, 6];
  t.deepEqual(ss.sampleWithReplacement(input, 2, rng), [6, 5]);
  t.deepEqual(ss.sampleWithReplacement(input, 3, rng), [3, 6, 4]);
  t.deepEqual(ss.sampleWithReplacement(input, 4, rng), [5, 2, 3, 4]);
  t.deepEqual(ss.sampleWithReplacement(input, 0, rng), []);
  t.deepEqual(ss.sampleWithReplacement([], 1, rng), []);
  t.end();
});
