import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("sample rank correlation with tied values", function () {
    it("does not depend on the order the pairs are listed in", function () {
        // The same three paired observations {(1,1), (1,2), (2,1)}, with the
        // first two rows swapped. A correlation is a property of the pairs,
        // so both orderings must agree.
        const first = ss.sampleRankCorrelation([1, 1, 2], [1, 2, 1]);
        const second = ss.sampleRankCorrelation([1, 1, 2], [2, 1, 1]);
        assert.ok(
            Math.abs(first - second) < ss.epsilon,
            `orderings disagree: ${first} vs ${second}`
        );
    });

    it("gives tied values the average of the ranks they span", function () {
        // x ranks as [0.5, 0.5, 2] and y as [0.5, 2, 0.5], whose correlation
        // works out to exactly -0.5.
        const rankCorr = ss.sampleRankCorrelation([1, 1, 2], [1, 2, 1]);
        assert.ok(
            Math.abs(rankCorr - -0.5) < ss.epsilon,
            `expected -0.5, got ${rankCorr}`
        );
    });

    it("is zero when ties leave no monotonic association", function () {
        // Both variables rank as two tied pairs, arranged so that every
        // increase in one is matched by a decrease in the other.
        const rankCorr = ss.sampleRankCorrelation([1, 1, 2, 2], [1, 2, 1, 2]);
        assert.ok(
            Math.abs(rankCorr) < ss.epsilon,
            `expected 0, got ${rankCorr}`
        );
    });

    it("is not a number when an input has no rank variance", function () {
        // Every y is tied, so its ranks are constant and rho is undefined.
        assert.ok(
            Number.isNaN(ss.sampleRankCorrelation([1, 2, 3, 4], [5, 5, 5, 5]))
        );
    });

    it("is unchanged by reordering a larger tied dataset", function () {
        const x = Object.freeze([1, 1, 2, 2, 3, 3]);
        const y = Object.freeze([1, 2, 2, 3, 1, 3]);
        const expected = ss.sampleRankCorrelation(x, y);
        const orderings = [
            [5, 4, 3, 2, 1, 0],
            [1, 0, 3, 2, 5, 4],
            [2, 4, 0, 5, 1, 3],
            [3, 1, 4, 0, 2, 5]
        ];
        for (const order of orderings) {
            const rankCorr = ss.sampleRankCorrelation(
                order.map((i) => x[i]),
                order.map((i) => y[i])
            );
            assert.ok(
                Math.abs(rankCorr - expected) < ss.epsilon,
                `reordering changed the result: ${rankCorr} vs ${expected}`
            );
        }
    });

    it("still reports perfect correlation for a monotonic tie-free input", function () {
        const rankCorr = ss.sampleRankCorrelation(
            [1, 2, 3, 4],
            [10, 20, 30, 40]
        );
        assert.ok(
            Math.abs(rankCorr - 1) < ss.epsilon,
            `expected 1, got ${rankCorr}`
        );
    });
});
