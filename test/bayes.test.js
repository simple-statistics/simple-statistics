/* eslint no-shadow: 0 */

var BayesianClassifier = require("../").BayesianClassifier;
var test = require("tap").test;

test("BayesianClassifier", function(t) {
    t.test("makes an easy call with one training round", function(t) {
        var bayes = new BayesianClassifier();
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        t.deepEqual(
            bayes.score({
                species: "Cat"
            }),
            {
                animal: 1
            }
        );
        t.end();
    });

    t.test("makes fify-fifty call", function(t) {
        var bayes = new BayesianClassifier();
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        bayes.train(
            {
                species: "Cat"
            },
            "chair"
        );
        t.deepEqual(
            bayes.score({
                species: "Cat"
            }),
            {
                animal: 0.5,
                chair: 0.5
            }
        );
        t.end();
    });

    t.test("makes seventy-five/twenty-five call", function(t) {
        var bayes = new BayesianClassifier();
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        bayes.train(
            {
                species: "Cat"
            },
            "chair"
        );
        t.deepEqual(
            bayes.score({
                species: "Cat"
            }),
            {
                animal: 0.75,
                chair: 0.25
            }
        );
        t.end();
    });

    t.test("tests multiple properties", function(t) {
        var bayes = new BayesianClassifier();
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        bayes.train(
            {
                species: "Cat"
            },
            "chair"
        );
        bayes.train(
            {
                species: "Cat",
                color: "white"
            },
            "chair"
        );
        t.deepEqual(
            bayes.score({
                color: "white"
            }),
            {
                animal: 0,
                chair: 0.2
            }
        );
        t.end();
    });

    t.test("classifies multiple things", function(t) {
        var bayes = new BayesianClassifier();
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        bayes.train(
            {
                species: "Dog"
            },
            "animal"
        );
        bayes.train(
            {
                species: "Dog"
            },
            "animal"
        );
        bayes.train(
            {
                species: "Cat"
            },
            "chair"
        );
        t.deepEqual(
            bayes.score({
                species: "Cat"
            }),
            {
                animal: 0.25,
                chair: 0.25
            }
        );
        t.deepEqual(
            bayes.score({
                species: "Dog"
            }),
            {
                animal: 0.5,
                chair: 0
            }
        );
        t.end();
    });
    t.end();
});
