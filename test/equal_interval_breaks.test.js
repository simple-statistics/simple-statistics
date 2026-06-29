import assert from "node:assert/strict";
import { it } from "node:test";
import { equalIntervalBreaks } from "../index.js";

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
