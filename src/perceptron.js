'use strict';

// # [Perceptron Classifier](http://en.wikipedia.org/wiki/Perceptron)
//
// This is a single-layer perceptron classifier that takes
// arrays of numbers and predicts whether they should be classified
// as either 0 or 1 (negative or positive examples).
function perceptron() {
    var perceptron_model = {},
        // The weights, or coefficients of the model;
        // weights are only populated when training with data.
        weights = [],
        // The bias term, or intercept; it is also a weight but
        // it's stored separately for convenience as it is always
        // multiplied by one.
        bias = 0;

    // ## Predict
    // Use an array of features with the weight array and bias
    // to predict whether an example is labeled 0 or 1.
    perceptron_model.predict = function(features) {
        // Only predict if previously trained
        // on the same size feature array(s).
        if (features.length !== weights.length) return null;
        // Calculate the sum of features times weights,
        // with the bias added (implicitly times one).
        var score = 0;
        for (var i = 0; i < weights.length; i++) {
            score += weights[i] * features[i];
        }
        score += bias;
        // Classify as 1 if the score is over 0, otherwise 0.
        return score > 0 ? 1 : 0;
    };

    // ## Train
    // Train the classifier with a new example, which is
    // a numeric array of features and a 0 or 1 label.
    perceptron_model.train = function(features, label) {
        // Require that only labels of 0 or 1 are considered.
        if (label !== 0 && label !== 1) return null;
        // The length of the feature array determines
        // the length of the weight array.
        // The perceptron will continue learning as long as
        // it keeps seeing feature arrays of the same length.
        // When it sees a new data shape, it initializes.
        if (features.length !== weights.length) {
            weights = features;
            bias = 1;
        }
        // Make a prediction based on current weights.
        var prediction = perceptron_model.predict(features);
        // Update the weights if the prediction is wrong.
        if (prediction !== label) {
            var gradient = label - prediction;
            for (var i = 0; i < weights.length; i++) {
                weights[i] += gradient * features[i];
            }
            bias += gradient;
        }
        return perceptron_model;
    };

    // Conveniently access the weights array.
    perceptron_model.weights = function() {
        return weights;
    };

    // Conveniently access the bias.
    perceptron_model.bias = function() {
        return bias;
    };

    // Return the completed model.
    return perceptron_model;
}

module.exports = perceptron;
