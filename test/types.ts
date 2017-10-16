import * as ss from '../'

ss.addToMean(14, 5, 53); // => 20.5
ss.combineMeans(5, 3, 4, 3); // => 4.5
ss.combineVariances(14 / 3, 5, 3, 8 / 3, 4, 3); // => 47 / 12
ss.geometricMean([1.80, 1.166666, 1.428571]);
ss.harmonicMean([2, 3]).toFixed(2) // => '2.40'
ss.mean([0, 10]); // => 5
ss.median([10, 2, 5, 100, 2, 1]); // => 3.5
ss.medianSorted([10, 2, 5, 100, 2, 1]); // => 52.5
ss.subtractFromMean(20.5, 6, 53); // => 14

var bayes = new ss.BayesianClassifier();
bayes.train({species: 'Cat'}, 'animal');
bayes.score({species: 'Cat'}); // => { animal: 1 }
bayes.score({foo: 'foo'}); // => { animal: 1 }

ss.bernoulliDistribution(0.3); // => [0.7, 0.3]
ss.bisect(Math.cos, 0, 4, 100, 0.003); // => 1.572265625