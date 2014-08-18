var test = require('tape');
var ss = require('../');

test('sample skewness', function(t) {

    test('the skewness of an empty sample is null', function(t) {
        var data = [];
        t.equal(ss.sample_skewness(data), null);
        t.end();
    });

    test('the skewness of an sample with one number is null', function(t) {
        var data = [1];
        t.equal(ss.sample_skewness(data), null);
        t.end();
    });

    test('the skewness of an sample with two numbers is null', function(t) {
        var data = [1, 2];
        t.equal(ss.sample_skewness(data), null);
        t.end();
    });

    test('can calculate the skewness of SAS example 1', function(t) {
        // Data and answer taken from SKEWNESS function documentation at
        // http://support.sas.com/documentation/c../lrdict/64316/HTML/default/viewer.htm#a000245947.htm
        var data = [0, 1, 1];
        t.equal(+ss.sample_skewness(data).toPrecision(10), -1.732050808);
        t.end();
    });

    test('can calculate the skewness of SAS example 2', function(t) {
        // Data and answer taken from SKEWNESS function documentation at
        // http://support.sas.com/documentation/c../lrdict/64316/HTML/default/viewer.htm#a000245947.htm
        var data = [2, 4, 6, 3, 1];
        t.equal(+ss.sample_skewness(data).toPrecision(10), 0.5901286564);
        t.end();
    });

    test('can calculate the skewness of SAS example 3', function(t) {
        // Data and answer taken from SKEWNESS function documentation at
        // http://support.sas.com/documentation/c../lrdict/64316/HTML/default/viewer.htm#a000245947.htm
        var data = [2, 0, 0];
        t.equal(+ss.sample_skewness(data).toPrecision(10), 1.732050808);
        t.end();
    });
    t.end();
});
