import * as ss from "../";

ss.addToMean(14, 5, 53); // => 20.5
ss.combineMeans(5, 3, 4, 3); // => 4.5
ss.combineVariances(14 / 3, 5, 3, 8 / 3, 4, 3); // => 47 / 12
ss.geometricMean([1.8, 1.166666, 1.428571]);
ss.harmonicMean([2, 3]).toFixed(2); // => '2.40'
ss.mean([0, 10]); // => 5
ss.median([10, 2, 5, 100, 2, 1]); // => 3.5
ss.medianSorted([10, 2, 5, 100, 2, 1]); // => 52.5

var bayes = new ss.BayesianClassifier();
bayes.train({ species: "Cat" }, "animal");
bayes.score({ species: "Cat" }); // => { animal: 1 }
bayes.score({ foo: "foo" }); // => { animal: 1 }

ss.bernoulliDistribution(0.3); // => [0.7, 0.3]
ss.bisect(Math.cos, 0, 4, 100, 0.003); // => 1.572265625

var data1019 = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3
];
ss.chiSquaredGoodnessOfFit(data1019, ss.poissonDistribution, 0.05); //= false
ss.chiSquaredDistributionTable[60][0.99];
ss.chunk([1, 2, 3, 4, 5, 6], 2);
ss.ckmeans([-1, 2, -1, 2, 4, 5, 6, -1, 2, -1], 3);
ss.combinationsReplacement([1, 2], 2); // => [[1, 1], [1, 2], [2, 2]]
ss.combinations([1, 2, 3], 2); // => [[1,2], [1,3], [2,3]]
ss.equalIntervalBreaks([1, 2, 3, 4, 5, 6], 4); // => [1, 2.25, 3.5, 4.75, 6]
ss.errorFunction(1).toFixed(2); // => '0.84'
ss.epsilon;
ss.factorial(5); // => 120
ss.interquartileRange([0, 1, 2, 3]); // => 2
var l = ss.linearRegressionLine(
  ss.linearRegression([
    [0, 0],
    [1, 1]
  ])
);
l(0); // => 0
l(2); // => 2
ss.linearRegressionLine({ b: 0, m: 1 })(1); // => 1
ss.linearRegressionLine({ b: 1, m: 1 })(1); // => 2
ss.linearRegression([
  [0, 0],
  [1, 1]
]); // => { m: 1, b: 0 }
ss.max([1, 2, 3, 4]);
ss.maxSorted([-100, -10, 1, 2, 5]); // => 5
ss.min([1, 5, -10, 100, 2]); // => -10
ss.minSorted([-100, -10, 1, 2, 5]); // => -100
ss.mean([0, 10]); // => 5
ss.medianAbsoluteDeviation([1, 1, 2, 2, 4, 6, 9]); // => 1
ss.medianSorted([10, 2, 5, 100, 2, 1]); // => 52.5
ss.median([10, 2, 5, 100, 2, 1]); // => 3.5
ss.modeFast(["rabbits", "rabbits", "squirrels"]); // => 'rabbits'
ss.mode([0, 0, 1]); // => 0
ss.modeSorted([0, 0, 1]); // => 0
ss.numericSort([3, 2, 1]); // => [1, 2, 3]

// Create the model
var p = new ss.PerceptronModel();
// Train the model with input with a diagonal boundary.
for (var i = 0; i < 5; i++) {
  p.train([1, 1], 1);
  p.train([0, 1], 0);
  p.train([1, 0], 0);
  p.train([0, 0], 0);
}
p.predict([0, 0]); // 0
p.predict([0, 1]); // 0
p.predict([1, 0]); // 0
p.predict([1, 1]); // 1
ss.product([1, 2, 3, 4]); // => 24
ss.quantileSorted([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
ss.quantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
ss.quantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], [0.5, 0.6, 0.7]);
var arr = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
ss.quickselect(arr, 8);
var samples = [
  [0, 0],
  [1, 1]
];
var regressionLine = ss.linearRegressionLine(ss.linearRegression(samples));
ss.rSquared(samples, regressionLine); // = 1 this line is a perfect fit
ss.rootMeanSquare([-1, 1, -1, 1]); // => 1
ss.sampleCorrelation([1, 2, 3, 4, 5, 6], [2, 2, 3, 4, 5, 60]).toFixed(2);
ss.sampleCovariance([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]); // => -3.5
ss.sampleKurtosis([1, 2, 2, 3, 5]); // => 1.4555765595463122
ss.sampleSkewness([2, 4, 6, 3, 1]); // => 0.590128656384365
ss.sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]).toFixed(2);
ss.sampleVariance([1, 2, 3, 4, 5]); // => 2.5
ss.sampleWithReplacement([1, 2, 3, 4], 2);
ss.sampleWithReplacement([1, 2, 3, 4], 2, Math.random);
ss.sampleWithReplacement([1, 2, 3, 4], 2, () => 10);
ss.shuffleInPlace([1, 2, 3, 4]);
ss.shuffleInPlace([1, 2, 3, 4], Math.random);
ss.shuffleInPlace([1, 2, 3, 4], () => 2);
ss.shuffle([1, 2, 3, 4]);
ss.sign(2); // => 1
ss.variance([2, 4, 4, 4, 5, 5, 7, 9]); // => 4
ss.standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]); // => 2
ss.subtractFromMean(20.5, 6, 53); // => 14
ss.sumNthPowerDeviations([1, 2, 3]);
ss.sumSimple([1, 2, 3]); // => 6
ss.sum([1, 2, 3]); // => 6
ss.tTestTwoSample([1, 2, 3, 4], [3, 4, 5, 6], 0); // => -2.1908902300206643
ss.tTest([1, 2, 3, 4, 5, 6], 3.385).toFixed(2); // => '0.16'
ss.uniqueCountSorted([1, 2, 3]); // => 3
ss.uniqueCountSorted([1, 1, 1]); // => 1
ss.variance([1, 2, 3, 4, 5, 6]); // => 2.9166666666666665
ss.zScore(78, 80, 5); // => -0.4
