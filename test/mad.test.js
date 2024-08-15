const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("median absolute deviation (mad)", function (t) {
    t.test(
        "median absolute deviation of an example on wikipedia",
        function (t) {
            t.equal(ss.mad([1, 1, 2, 2, 4, 6, 9]), 1);
            t.end();
        }
    );

    // wolfram alpha: median absolute deviation {0,1,2,3,4,5,6,7,8,9,10}
    t.test("median absolute deviation of 0-10", function (t) {
        t.equal(ss.mad([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 3);
        t.end();
    });

    t.test("median absolute deviation of one number is zero", function (t) {
        t.equal(ss.mad([1]), 0);
        t.end();
    });

    t.test("zero-length corner case", function (t) {
        t.throws(function () {
            ss.mad([]);
        });
        t.end();
    });
    t.end();
});
