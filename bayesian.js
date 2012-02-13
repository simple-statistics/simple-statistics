// Categorical bayes implementation
function bayesian() {
    var c = {};

    // A dictionary of labels to the number of instances
    // they occur in the dataset.
    var categoryCount = {};

    // Keep track of the number of samples in order to
    // fill out some blanks with explaining the dataset.
    var n_samples = 0;

    c.categoryCount = categoryCount;

    c.n_samples = function() { return n_samples; };
    c.train = function(observation, category) {
        // Set the count to either one or one
        // greater than what it used to be.
        if (categoryCount[category]) {
            categoryCount[category]++;
        } else {
            categoryCount[category] = 1;
        }
        // This always counts as one sample
        n_samples++;
    };

    return c;
}

module.exports = bayesian;
