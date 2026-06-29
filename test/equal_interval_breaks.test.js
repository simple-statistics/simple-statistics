const { it } = require("node:test");
const assert = require("node:assert/strict");
const equalIntervalBreaks =
    require("../dist/simple-statistics.js").equalIntervalBreaks;

it("equalIntervalBreaks", function () {
    assert.deepEqual(equalIntervalBreaks([1], 4), [1], "1-length case");
    assert.deepEqual(
        equalIntervalBreaks([1, 2, 3, 4, 5, 6], 4),
        [1, 2.25, 3.5, 4.75, 6],
        "three breaks"
    );
    assert.deepEqual(
        equalIntervalBreaks([1, 2, 3, 4, 5, 6], 2),
        [1, 3.5, 6],
        "two breaks"
    );
    assert.deepEqual(
        equalIntervalBreaks([1, 2, 3, 4, 5, 6], 1),
        [1, 6],
        "one break"
    );
});
