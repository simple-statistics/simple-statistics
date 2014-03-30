var assert = require('chai').assert;
var ss = require('../../');

// Data from Poisson goodness-of-fit example 10-19 in William W. Hines & Douglas C. Montgomery,
// "Probability and Statistics in Engineering and Management Science", Wiley (1980).
var data_10_19 = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    2,2,2,2,2,2,2,2,2,
    3,3,3,3
];
describe('chi_squared_goodness_of_fit', function() {
    it('can reject the null hypothesis with an unspecified level of confidence', function() {
        assert.isFalse(ss.chi_squared_goodness_of_fit(data_10_19, 'Poisson'));
    });
    it('can reject the null hypothesis with level of confidence specified at 0.05', function() {
        assert.isFalse(ss.chi_squared_goodness_of_fit(data_10_19, 'Poisson', 0.05));
    });
    it('can accept the null hypothesis with level of confidence specified at 0.10', function() {
        assert.isTrue(ss.chi_squared_goodness_of_fit(data_10_19, 'Poisson', 0.10));
    });
});
