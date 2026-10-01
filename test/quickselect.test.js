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

it("quickselect preserves a range ending at zero", function () {
    const arr = [3, 2, 1];
    quickselect(arr, 0, 0, 0);
    assert.deepEqual(arr, [3, 2, 1]);
});

it("quickselect preserves a zero right bound when left is omitted", function () {
    const arr = [3, 2, 1];
    quickselect(arr, 0, undefined, 0);
    assert.deepEqual(arr, [3, 2, 1]);
});

it("quickselect defaults an omitted right bound to the end", function () {
    const arr = [3, 2, 1];
    quickselect(arr, 0, 0);
    assert.equal(arr[0], 1);
});

it("quickselect defaults an undefined right bound to the end", function () {
    const arr = [3, 2, 1];
    quickselect(arr, 0, 0, undefined);
    assert.equal(arr[0], 1);
});

it("quickselect defaults a null right bound to the end", function () {
    const arr = [3, 2, 1];
    quickselect(arr, 0, 0, null);
    assert.equal(arr[0], 1);
});

it("quickselect leaves values outside a nonzero subrange unchanged", function () {
    const arr = [99, 4, 1, 3, -99];
    quickselect(arr, 2, 1, 3);
    assert.equal(arr[0], 99);
    assert.equal(arr[2], 3);
    assert.equal(arr[4], -99);
    assert.ok(arr[1] <= arr[2]);
    assert.ok(arr[3] >= arr[2]);
});
