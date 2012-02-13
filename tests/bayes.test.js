var weather = require('./weather.js');
var bayesian = require('../bayesian.js');


describe('weather is well formed', function() {
    weather[0].observation.outlook.should.equal('sunny');
});

describe('bayes', function() {
    var b = bayesian();
    for (var i = 0; i < weather.length; i++) {
        b.train(weather[i].observation, weather[i].category);
    }

    describe('initial training should set overall stats', function() {
        b.n_samples().should.equal(14);
        b.categoryCount.yes.should.equal(9);
    });
});
