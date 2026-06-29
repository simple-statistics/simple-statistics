import assert from "node:assert/strict";
import { it } from "node:test";
import { quickselect } from "../index.js";

it("quickselect", function () {
    const arr = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
    quickselect(arr, 8);
    assert.deepEqual(
        arr,
        [39, 28, 28, 33, 21, 12, 22, 50, 53, 56, 59, 65, 90, 77, 95]
    );
});

it("quickselect long arrays", function () {
    const arr = [];
    for (let i = 1000; i >= 0; i--) arr.push(i);
    quickselect(arr, 300);
    assert.equal(arr[300], 300);
});

it("quickselect long arrays L35 coverage", function () {
    const arr = [];
    for (let i = 1000; i >= 0; i--) arr.push(i);
    quickselect(arr, 500, 10, 620);
    assert.equal(arr[300], 700);
});
