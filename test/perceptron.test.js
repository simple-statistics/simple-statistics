/* eslint no-shadow: 0 */

const PerceptronModel = require("../dist/simple-statistics.js").PerceptronModel;
const test = require("tap").test;

test("perceptron", function (t) {
    t.test("initializes to zeros if label is zero", function (t) {
        const p = new PerceptronModel();
        p.train([1, 2, 3], 0);
        t.same(p.weights, [0, 0, 0]);
        t.equal(p.bias, 0);
        t.end();
    });

    t.test("initializes to values if label is one", function (t) {
        const p = new PerceptronModel();
        p.train([1, 2, 3], 1);
        t.same(p.weights, [1, 2, 3]);
        t.equal(p.bias, 1);
        t.end();
    });

    t.test("base case of zero prediction features", function (t) {
        const p = new PerceptronModel();
        p.train([1, 2, 3], 1);
        t.same(p.predict([]), null);
        t.end();
    });

    t.test("train with invalid label", function (t) {
        const p = new PerceptronModel();
        t.same(p.train([1, 2, 3], 0.5), null);
        t.end();
    });

    t.test("learns to separate one from two", function (t) {
        const p = new PerceptronModel();
        for (let i = 0; i < 4; i++) {
            p.train([1], 0);
            p.train([2], 1);
        }
        t.equal(p.predict([1]), 0);
        t.equal(p.predict([2]), 1);
        t.end();
    });

    t.test("learns a diagonal boundary", function (t) {
        const p = new PerceptronModel();
        for (let i = 0; i < 5; i++) {
            p.train([1, 1], 1);
            p.train([0, 1], 0);
            p.train([1, 0], 0);
            p.train([0, 0], 0);
        }
        t.equal(p.predict([0, 0]), 0);
        t.equal(p.predict([0, 1]), 0);
        t.equal(p.predict([1, 0]), 0);
        t.equal(p.predict([1, 1]), 1);
        t.end();
    });
    t.end();
});
