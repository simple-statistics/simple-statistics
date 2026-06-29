const BayesianClassifier =
    require("../dist/simple-statistics.js").BayesianClassifier;
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

describe("BayesianClassifier", function () {
    it("makes an easy call with one training round", function () {
        const bayes = new BayesianClassifier();
        bayes.train(
            {
                species: "Cat"
            },
            "animal"
        );
        assert.deepEqual(
            bayes.score({
                species: "Cat"
            }),
            {
                animal: 1
            }
        );
    });

    it("makes fify-fifty call", function () {
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
        assert.deepEqual(
            bayes.score({
                species: "Cat"
            }),
            {
                animal: 0.5,
                chair: 0.5
            }
        );
    });

    it("makes seventy-five/twenty-five call", function () {
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
        assert.deepEqual(
            bayes.score({
                species: "Cat"
            }),
            {
                animal: 0.75,
                chair: 0.25
            }
        );
    });

    it("tests multiple properties", function () {
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
        assert.deepEqual(
            bayes.score({
                color: "white"
            }),
            {
                animal: 0,
                chair: 0.2
            }
        );
    });

    it("classifies multiple things", function () {
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
        assert.deepEqual(
            bayes.score({
                species: "Cat"
            }),
            {
                animal: 0.25,
                chair: 0.25
            }
        );
        assert.deepEqual(
            bayes.score({
                species: "Dog"
            }),
            {
                animal: 0.5,
                chair: 0
            }
        );
    });
});
