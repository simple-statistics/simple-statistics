/* eslint no-shadow: 0 */

const BayesianClassifier =
    require("../dist/simple-statistics.js").BayesianClassifier;
const test = require("tap").test;

test("BayesianClassifier", function (t) {
    t.test("makes an easy call with one training round", function (t) {
        const bayes = new BayesianClassifier();
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        t.same(
            bayes.score({
                species: "Cat"
            }),
            {
                animal: 1
            }
        );
        t.end();
    });

    t.test("makes fify-fifty call", function (t) {
        const bayes = new BayesianClassifier();
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
        t.same(
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

    t.test("makes seventy-five/twenty-five call", function (t) {
        const bayes = new BayesianClassifier();
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
        t.same(
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

    t.test("tests multiple properties", function (t) {
        const bayes = new BayesianClassifier();
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
        t.same(
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

    t.test("classifies multiple things", function (t) {
        const bayes = new BayesianClassifier();
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
        t.same(
            bayes.score({
                species: "Cat"
            }),
            {
                animal: 0.25,
                chair: 0.25
            }
        );
        t.same(
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
