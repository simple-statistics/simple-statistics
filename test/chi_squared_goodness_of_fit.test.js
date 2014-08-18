var test = require('tape');
var ss = require('../');

// Data from Poisson goodness-of-fit example 10-19 in William W. Hines & Douglas C. Montgomery,
// "Probability and Statistics in Engineering and Management Science", Wiley (1980).
var data_10_19 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3
];

test('chi_squared_goodness_of_fit', function(t) {
    test('can reject the null hypothesis with level of confidence specified at 0.05', function(t) {
        t.equal(false, ss.chi_squared_goodness_of_fit(data_10_19, ss.poisson_distribution, 0.05));
        t.end();
    });
    test('can accept the null hypothesis with level of confidence specified at 0.10', function(t) {
        t.equal(true, ss.chi_squared_goodness_of_fit(data_10_19, ss.poisson_distribution, 0.10));
        t.end();
    });
    t.end();
});
