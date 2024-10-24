const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("zScore", function (t) {
    t.throws(() => ss.zScore(78, 80, 0), {
        message: "Standard deviation cannot be zero."
    });
    t.throws(() => ss.zScore(78, "80", 5), {
        message: "All parameters must be numbers."
    });
    t.end();
});

test("variance", function (t) {
    t.equal(ss.variance([1, "2", 3, "4", 5, "6"]), 2.9166666666666665); // Strings that can be parsed to numbers
    t.throws(() => ss.variance([]), {
        message: "variance requires at least one data point"
    });
    t.throws(() => ss.variance([78, "hello", 82]), {
        message:
            "All elements in the array must be numbers or parsable to numbers."
    }); // Unparsable string
    t.end();
});

test("sum", function (t) {
    t.equal(ss.sum([1, "2", "3"]), 6); // Strings that can be parsed to numbers
    t.throws(() => ss.sum([() => {}]), {
        message:
            "All elements in the array must be numbers or parsable to numbers."
    });
    t.throws(() => ss.sum([1, "hello", 3]), {
        message:
            "All elements in the array must be numbers or parsable to numbers."
    }); // Unparsable string
    t.end();
});
