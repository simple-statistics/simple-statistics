var id3 = require('../id3');


describe('id3', function() {
    var dt = id3();
    var noentropy = [{ a: 1 }];
    describe('entropy is well-defined when there is none', function() {
        dt.entropy(noentropy, 'a').should.equal(0);
    });
    describe('entropy is well-defined when there is all', function() {
        dt.entropy(noentropy, 'b').should.equal(0);
    });
    describe('value gain', function() {
        dt.gain(noentropy, 'b', 'c').should.equal(0);
    });
});
