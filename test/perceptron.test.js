/* eslint no-shadow: 0 */

var PerceptronModel = require("../").PerceptronModel;
var test = require("tap").test;

test("perceptron", function(t) {
    t.test("initializes to zeros if label is zero", function(t) {
        var p = new PerceptronModel();
        p.train([1, 2, 3], 0);
        t.deepEqual(p.weights, [0, 0, 0]);
        t.equal(p.bias, 0);
        t.end();
    });

    t.test("initializes to values if label is one", function(t) {
        var p = new PerceptronModel();
        p.train([1, 2, 3], 1);
        t.deepEqual(p.weights, [1, 2, 3]);
        t.equal(p.bias, 1);
        t.end();
    });

    t.test("learns to separate one from two", function(t) {
        var p = new PerceptronModel();
        for (var i = 0; i < 4; i++) {
            p.train([1], 0);
            p.train([2], 1);
        }
        t.equal(p.predict([1]), 0);
        t.equal(p.predict([2]), 1);
        t.end();
    });

    t.test("learns a diagonal boundary", function(t) {
        var p = new PerceptronModel();
        for (var i = 0; i < 5; i++) {
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
